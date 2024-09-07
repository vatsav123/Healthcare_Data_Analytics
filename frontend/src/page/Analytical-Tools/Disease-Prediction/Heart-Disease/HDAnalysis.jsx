import { useState, useEffect } from "react";
import { FaHeartbeat } from "react-icons/fa";
import InsightTable from "./components/InsightTable";
import PatientDropdown from "../../../../components/PatientDropdown";
import { useParams } from "react-router-dom";
import axios from "axios";

const HDAnalysis = () => {
  const { patientId } = useParams();
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientDetails, setPatientDetails] = useState(null);

  useEffect(() => {
    if (selectedPatient && selectedPatient.patient_id) {
      fetchPatientDetails();
    }
  }, [selectedPatient]);

  const fetchPatientDetails = async () => {
    try {
      const response = await fetch(
        `/api/patients/${selectedPatient.patient_id}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPatientDetails(data);
    } catch (error) {
      console.error("Error fetching patient details:", error);
      setPatientDetails(null); // Clear patientDetails if there's an error
    }
  };

  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    chestPainType: "",
    restingBloodPressure: "",
    serumCholesterol: "",
    fastingBloodSugar: "",
    restingECGResults: "",
    maxHeartRate: "",
    exerciseInducedAngina: "",
    oldpeak: "",
    stSegment: "",
    majorVessels: "",
    thal: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPredictions();
  }, [patientId]);

  const fetchPredictions = async () => {
    try {
      const response = await axios.get(`/api/predictions/${patientId}`);
      const data = response.data.data;
      console.log(data);
      setPrediction(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Form Data:", formData);

    try {
      const response = await fetch(`/api/predict-heart-disease/${patientId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setPrediction(result);
    } catch (error) {
      console.error("Error making prediction:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className=" bg-gray-100 flex px-4 justify-between">
        <div className="flex flex-col gap-8">
          <div className="bg-white p-8 rounded-md shadow-md mt-4">
            <PatientDropdown onPatientSelect={setSelectedPatient} />
          </div>
          <div className="bg-white p-8 rounded-md shadow-md mt-4">
            <p className="text-xl font-medium mb-6 mt-[-12px]">Patient</p>
            {patientDetails ? (
              <div className="flex justify-between ">
                <div className="flex flex-col mr-2 gap-4">
                  <div className="flex font-medium">
                    <p className="text-gray-500">Name&nbsp;: &nbsp; </p>
                    <p>{patientDetails.name}</p>
                  </div>
                  <div className="flex font-medium">
                    <p className="text-gray-500">Blood Group&nbsp;: &nbsp;</p>
                    <p>{patientDetails.blood_group}</p>
                  </div>
                </div>
                <div className="flex flex-col mr-2 gap-4">
                  <div className="flex font-medium">
                    <p className="text-gray-500">Gender&nbsp;: &nbsp; </p>
                    <p>{patientDetails.gender}</p>
                  </div>
                  <div className="flex font-medium">
                    <p className="text-gray-500">Height&nbsp;: &nbsp;</p>
                    <p>{patientDetails.height}cm</p>
                  </div>
                </div>
                <div className="flex flex-col mr-2 gap-4">
                  <div className="flex font-medium">
                    <p className="text-gray-500">Age&nbsp;: &nbsp; </p>
                    <p>{patientDetails.age}</p>
                  </div>
                  <div className="flex font-medium">
                    <p className="text-gray-500">Weight&nbsp;: &nbsp;</p>
                    <p>{patientDetails.weight}Kg</p>
                  </div>
                </div>
              </div>
            ) : (
              <p>No patient selected</p>
            )}
          </div>
          <div className="bg-white p-8 rounded-md shadow-md">
            <p className="text-center text-gray-600 mb-6">
              Fill out the form below to predict the likelihood of heart disease
              based on health metrics.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1 mb-4">
                  <label className="block text-gray-700 mb-2">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded outline-none text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Enter age in years.
                  </p>
                </div>
                <div className="col-span-1 mb-4">
                  <label className="block text-gray-700 mb-2">Sex</label>
                  <select
                    name="sex"
                    value={formData.sex}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded outline-none text-sm "
                  >
                    <option value="">Select Sex</option>
                    <option value="0">Female</option>
                    <option value="1">Male</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-2">
                    Select biological sex.
                  </p>
                </div>
                <div className="col-span-1 mb-4">
                  <label className="block text-gray-700 mb-2">
                    Chest Pain Type
                  </label>
                  <select
                    name="chestPainType"
                    value={formData.chestPainType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded outline-none text-sm "
                  >
                    <option value="">Select Chest Pain Type</option>
                    <option value="1">Typical angina</option>
                    <option value="2">Atypical angina</option>
                    <option value="3">Non-anginal pain</option>
                    <option value="4">Asymptomatic</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-2">
                    Describe the type of chest pain you experience.
                  </p>
                </div>
                <div className="col-span-1 mb-4">
                  <label className="block text-gray-700 mb-2">
                    Resting Blood Pressure (mm Hg)
                  </label>
                  <input
                    type="number"
                    name="restingBloodPressure"
                    value={formData.restingBloodPressure}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded outline-none text-sm "
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Enter resting blood pressure in mm Hg.
                  </p>
                </div>
                <div className="col-span-1 mb-4">
                  <label className="block text-gray-700 mb-2">
                    Serum Cholesterol (mg/dL)
                  </label>
                  <input
                    type="number"
                    name="serumCholesterol"
                    value={formData.serumCholesterol}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded outline-none text-sm "
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Enter serum cholesterol level in mg/dL.
                  </p>
                </div>
                <div className="col-span-1 mb-4">
                  <label className="block text-gray-700 mb-2">
                    Fasting Blood Sugar
                  </label>
                  <select
                    name="fastingBloodSugar"
                    value={formData.fastingBloodSugar}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded outline-none text-sm "
                  >
                    <option value="">Select</option>
                    <option value="0">False</option>
                    <option value="1">True</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-2">
                    Is fasting blood sugar &gt; 120 mg/dL?
                  </p>
                </div>
                <div className="col-span-1 mb-4">
                  <label className="block text-gray-700 mb-2">
                    Resting ECG Results
                  </label>
                  <select
                    name="restingECGResults"
                    value={formData.restingECGResults}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded outline-none text-sm "
                  >
                    <option value="">Select ECG Results</option>
                    <option value="0">Normal</option>
                    <option value="1">ST-T wave abnormality</option>
                    <option value="2">Left ventricular hypertrophy</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-2">
                    Choose the result of resting ECG.
                  </p>
                </div>
                <div className="col-span-1 mb-4">
                  <label className="block text-gray-700 mb-2">
                    Max Heart Rate
                  </label>
                  <input
                    type="number"
                    name="maxHeartRate"
                    value={formData.maxHeartRate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded outline-none text-sm "
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Enter the maximum heart rate achieved during exercise.
                  </p>
                </div>
                <div className="col-span-1 mb-4">
                  <label className="block text-gray-700 mb-2">
                    Exercise Induced Angina
                  </label>
                  <select
                    name="exerciseInducedAngina"
                    value={formData.exerciseInducedAngina}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded outline-none text-sm "
                  >
                    <option value="">Select</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-2">
                    Do you experience angina induced by exercise?
                  </p>
                </div>
                <div className="col-span-1 mb-4">
                  <label className="block text-gray-700 mb-2">Oldpeak</label>
                  <input
                    type="number"
                    name="oldpeak"
                    value={formData.oldpeak}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded outline-none text-sm "
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Enter the ST depression induced by exercise relative to
                    rest.
                  </p>
                </div>
                <div className="col-span-1 mb-4">
                  <label className="block text-gray-700 mb-2">ST Segment</label>
                  <select
                    name="stSegment"
                    value={formData.stSegment}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded outline-none text-sm "
                  >
                    <option value="">Select ST Segment</option>
                    <option value="1">Upsloping</option>
                    <option value="2">Flat</option>
                    <option value="3">Downsloping</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-2">
                    Choose the slope of the peak exercise ST segment.
                  </p>
                </div>
                <div className="col-span-1 mb-4">
                  <label className="block text-gray-700 mb-2">
                    Major Vessels
                  </label>
                  <input
                    type="number"
                    name="majorVessels"
                    value={formData.majorVessels}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded outline-none text-sm "
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Enter the number of major vessels (0-3) colored by
                    fluoroscopy.
                  </p>
                </div>
                <div className="col-span-1 mb-4">
                  <label className="block text-gray-700 mb-2">
                    Thalassemia
                  </label>
                  <select
                    name="thal"
                    value={formData.thal}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded outline-none text-sm "
                  >
                    <option value="">Select Thalassemia</option>
                    <option value="3">Normal</option>
                    <option value="6">Fixed defect</option>
                    <option value="7">Reversible defect</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-2">
                    Select thalassemia status.
                  </p>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-2 px-4 rounded mt-6 hover:bg-teal-700"
              >
                Predict
              </button>
            </form>
          </div>
          <div>
            {loading && (
              <div className="flex justify-center items-center w-full h-[350px] bg-gray-200 rounded-md shadow-md">
                <p className="text-gray-700">Loading...</p>
              </div>
            )}

            {!loading && prediction && (
              <div className="w-full h-[350px] rounded-md shadow-sm bg-gradient-to-r from-orange-800 to-red-500 p-6 flex flex-col">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-900 flex items-center justify-center w-16 h-16 rounded-full">
                    <FaHeartbeat className="text-white" size={36} />
                  </div>
                  <span className="text-lg font-medium text-white">
                    Heart Disease
                  </span>
                </div>
                <p className="text-white text-lg my-4 text-center">
                  Chronic conditions
                </p>
                <div className="flex items-center justify-around mx-8">
                  <div className="text-white flex flex-col gap-2">
                    <span className="font-medium text-xl">
                      {prediction.lastTime}%
                    </span>
                    <span className="text-xs">Last time</span>
                  </div>
                  <div className="border-r-2 h-12">&nbsp;</div>
                  <div className="text-white flex flex-col gap-2">
                    <span className="font-medium text-xl">
                      {prediction.recently}%
                    </span>
                    <span className="text-xs">Recently</span>
                  </div>
                </div>
                <p className="text-white font-medium text-base my-7 text-center">
                  {prediction.prob < 50
                    ? "Low Probability of Heart Disease"
                    : "High Probability of Heart Disease"}
                </p>
                <button className="bg-white text-red-600 px-4 py-2 rounded-md shadow-md hover:bg-red-600 hover:text-white transition duration-300">
                  View Full Report
                </button>
              </div>
            )}
          </div>
          \
        </div>

        <div className="w-1/3">
          <InsightTable />
        </div>
      </div>
    </div>
  );
};

export default HDAnalysis;
