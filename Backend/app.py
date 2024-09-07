from flask import Flask, jsonify, request
import joblib
from flask_cors import CORS
import mysql.connector
import pandas as pd

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing (CORS)

# MySQL connection configuration
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root123",
    database="healthcare_analytics"
)

if db.is_connected():
    print("Connected to MySQL database")

cursor = db.cursor(dictionary=True)

random_forest_model = joblib.load(r'Backend\Heart disease prediction\Main\Models\random_forest_model.pkl')

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    # Fetch user from database
    cursor = db.cursor(dictionary=True)
    query = "SELECT userId, role FROM users WHERE username = %s AND password = %s"
    cursor.execute(query, (username, password))
    user = cursor.fetchone()

    if user:
        # Ensure 'userId' and 'role' keys are present
        user_id = user.get('userId')
        role = user.get('role')
        if user_id is None or role is None:
            return jsonify({'error': 'User data is incomplete'}), 500
        
        response = {
            'userId': user_id,
            'role': role
        }
        return jsonify(response), 200
    else:
        return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/api/account-settings/<int:user_id>', methods=['GET'])
def get_account_settings(user_id):
    try:
        cursor = db.cursor(dictionary=True)
        query = "SELECT * FROM users WHERE userId = %s"
        cursor.execute(query, (user_id,))
        user = cursor.fetchone()
        cursor.close()
        if user:
            return jsonify(user)
        else:
            return jsonify({'error': 'User not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/account-settings/<int:user_id>', methods=['PUT'])
def update_account_settings(user_id):
    data = request.get_json()
    try:
        cursor = db.cursor()
        query = """
            UPDATE users
            SET name = %s, dateOfBirth = %s, age = %s, gender = %s, email = %s, phone = %s, address = %s, username = %s, password = %s, role = %s
            WHERE userId = %s
        """
        values = (
            data.get('name'),
            data.get('dateOfBirth'),
            data.get('age'),
            data.get('gender'),
            data.get('email'),
            data.get('phone'),
            data.get('address'),
            data.get('username'),
            data.get('password'),
            data.get('role'),
            user_id
        )
        cursor.execute(query, values)
        db.commit()
        cursor.close()
        return jsonify({'message': 'Account settings updated successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Route to check if patient data has been fetched
@app.route('/check_patient_data')
def check_patient_data():
    cursor.execute("SELECT COUNT(*) AS total_patients FROM patient")
    result = cursor.fetchone()
    total_patients = result['total_patients']
    if total_patients > 0:
        return 'Patient data has been fetched successfully!'
    else:
        return 'No patient data found.'


# Route for getting all patients
@app.route('/api/patients', methods=['GET'])
def get_patients():
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM patient")
    patients = cursor.fetchall()
    cursor.close()
    return jsonify(patients)

# Route for getting all users
@app.route('/api/users', methods=['GET'])
def get_users():
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users")
    users = cursor.fetchall()
    cursor.close()
    return jsonify(users)

# Route for deleting a user
@app.route('/api/users/<int:userId>', methods=['DELETE'])
def user(userId):
    cursor = db.cursor()
    query = "DELETE FROM users WHERE userId = %s"
    values = (userId,)
    cursor.execute(query, values)
    db.commit()
    cursor.close()
    return jsonify({'message': 'User deleted successfully'})


# Route for getting a single patient by ID
@app.route('/api/patients/<int:patient_id>', methods=['GET'])
def get_patient(patient_id):
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM patient WHERE patient_id = %s", (patient_id,))
    patient = cursor.fetchone()
    cursor.close()
    if patient:
        return jsonify(patient)
    else:
        return jsonify({"error": "Patient not found"}), 404


# Route for adding a new patient
@app.route('/api/patients', methods=['POST'])
def add_patient():
    data = request.get_json()
    admission_date = data.get('admission_date', None)

    cursor = db.cursor()
    query = "INSERT INTO patient (name, age, gender, email, phone, address, admission_date, dob) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
    values = (data['name'], data['age'], data['gender'], data['email'], data['phone'], data['address'],  data['admission_date'], data['dateOfBirth'])
    cursor.execute(query, values)
    db.commit()
    patient_id = cursor.lastrowid
    cursor.close()
    return jsonify({'patient_id': patient_id})

# Route for updating a patient
@app.route('/api/patients/<int:patient_id>', methods=['PUT'])
def update_patient(patient_id):
    data = request.get_json()
    cursor = db.cursor()
    query = "UPDATE patient SET name = %s, age = %s, gender = %s, email = %s, phone = %s, address = %s, diagnosis = %s, admission_date = %s, dob = %s WHERE patient_id = %s"
    values = (data['name'], data['age'], data['gender'], data['email'], data['phone'], data['address'], data['diagnosis'], data['admission_date'], data['dob'], patient_id)
    cursor.execute(query, values)
    db.commit()
    cursor.close()
    return jsonify({'message': 'Patient updated successfully'})

# Route for deleting a patient
@app.route('/api/patients/<int:patient_id>', methods=['DELETE'])
def delete_patient(patient_id):
    cursor = db.cursor()
    query = "DELETE FROM patient WHERE patient_id = %s"
    values = (patient_id,)
    cursor.execute(query, values)
    db.commit()
    cursor.close()
    return jsonify({'message': 'Patient deleted successfully'})

feature_names = random_forest_model.feature_names_in_

@app.route('/api/predict-heart-disease/<int:patient_id>', methods=['POST'])
def predict_heart_disease(patient_id):
    try:
        # Parse the JSON data from the request
        data = request.json
        print("Received data:", data)

        # Create a DataFrame manually with the incoming data
        # Ensure that all feature names match exactly
        input_data = pd.DataFrame({
            'age': [int(data.get('age', 0))],
            'sex ': [int(data.get('sex', 0))],
            'chest pain type': [int(data.get('chestPainType', 0))],
            'resting blood pressure': [int(data.get('restingBloodPressure', 0))],
            'serum cholestoral': [int(data.get('serumCholesterol', 0))],
            'fasting blood sugar': [int(data.get('fastingBloodSugar', 0))],
            'resting electrocardiographic results': [int(data.get('restingECGResults', 0))],
            'max heart rate': [int(data.get('maxHeartRate', 0))],
            'exercise induced angina': [int(data.get('exerciseInducedAngina', 0))],
            'oldpeak': [float(data.get('oldpeak', 0))],
            'ST segment': [int(data.get('stSegment', 0))],
            'major vessels': [int(data.get('majorVessels', 0))],
            'thal': [int(data.get('thal', 0))]
        })

        # Ensure DataFrame columns match the model's expected features
        input_data = input_data.reindex(columns=feature_names)
        
        # Print the DataFrame to verify
        print("Input DataFrame:\n", input_data)

        # Make predictions
        prediction = random_forest_model.predict(input_data)[0]
        prob = random_forest_model.predict_proba(input_data)[:, 1][0] * 100
        
        print("Prediction:", prediction)
        print("Probability:", prob)
        
        # Return the prediction and probability as JSON
        result = jsonify({
            'prediction': int(prediction),
            'probability': prob
        })

        # Push data to database
        push_to_database(patient_id, data, prob)

        return result

    except Exception as e:
        print("Error:", e)
        return jsonify({'error': str(e)}), 400


def push_to_database(patient_id, data, probability):
    cursor = db.cursor()
    query = "INSERT INTO heart_disease_analysis (patient_id, age, sex, chest_pain_type, resting_blood_pressure, serum_cholesterol, fasting_blood_sugar, resting_ecg_results, max_heart_rate, exercise_induced_angina, oldpeak, st_segment, major_vessels, thal, probability) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    values = (
        patient_id,
        data.get('age', 0),
        data.get('sex', 0),
        data.get('chestPainType', 0),
        data.get('restingBloodPressure', 0),
        data.get('serumCholesterol', 0),
        data.get('fastingBloodSugar', 0),
        data.get('restingECGResults', 0),
        data.get('maxHeartRate', 0),
        data.get('exerciseInducedAngina', 0),
        data.get('oldpeak', 0),
        data.get('stSegment', 0),
        data.get('majorVessels', 0),
        data.get('thal', 0),
        probability
    )
    cursor.execute(query, values)
    db.commit()
    cursor.close()

@app.route('/api/predictions/<int:patientId>', methods=['GET'])
def get_predictions(patientId):
    try:
        cursor = db.cursor(dictionary=True)
        query = """
            WITH recent_data AS (
                SELECT probability, ROW_NUMBER() OVER (PARTITION BY patient_id ORDER BY created_at DESC) AS row_num
                FROM heart_disease_analysis
                WHERE patient_id = %s
            )
            SELECT 
                (SELECT probability FROM recent_data WHERE row_num = 1) AS recently,
                (SELECT probability FROM recent_data WHERE row_num = 2) AS lastTime
            FROM heart_disease_analysis
            WHERE patient_id = %s
        """
        cursor.execute(query, (patientId, patientId))
        result = cursor.fetchall()
        cursor.close()
        if result:
            return jsonify({
                'data': {
                    'prob': result[0]['recently'],  # Access the first element of the list
                    'lastTime': result[0]['lastTime'],
                    'recently': result[0]['recently']
                }
            })
        else:
            return jsonify({
                'error': f"No prediction data found for patient ID {patientId}"
            }), 404
    except Exception as e:
        return jsonify({
            'error': str(e)
        }), 500
if __name__ == '__main__':
    app.run(debug=True)
    
