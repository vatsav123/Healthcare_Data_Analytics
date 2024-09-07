import numpy as np
import pandas as pd
from matplotlib import pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split, GridSearchCV, RandomizedSearchCV
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier, VotingClassifier
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report, roc_curve, auc, precision_recall_curve
from imblearn.over_sampling import SMOTE
from sklearn.feature_selection import SelectFromModel
import joblib

# Load the dataset
df = pd.read_csv('../Dataset/dataset_heart.csv')

# Preprocess the data
def boxplots(df):
    cols = df.columns[:-1]
    n = (len(cols) - 1) // 6 + 1
    m = min(len(cols), 6)
    fig, axes = plt.subplots(nrows=n, ncols=m, figsize=(15, 10))
    for idx, col in enumerate(cols):
        i = idx // m
        j = idx % m
        sns.boxplot(data=df, x=col, ax=axes[i][j])

    plt.tight_layout()
    plt.show()

def outliers_removal(df, i):
    perc = np.percentile(df[i], [0, 25, 50, 75, 100])
    iqr = perc[3] - perc[1]
    _min = perc[1] - 1.5*iqr
    _max = perc[3] + 1.5*iqr
    df.loc[df[i] > _max, i] = _max
    df.loc[df[i] < _min, i] = _min
    return df

for i in df.columns[:-1]:
    df = outliers_removal(df, i)

# Prepare the data for modeling
X = df.drop('heart disease', axis=1)
y = df['heart disease']
y = y.map({1: 0, 2: 1})

# Split data into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Oversampling minority class using SMOTE
smote = SMOTE()
X_train_resampled, y_train_resampled = smote.fit_resample(X_train, y_train)

# Feature selection using SelectFromModel
# Feature selection using SelectFromModel
selector = SelectFromModel(estimator=RandomForestClassifier(random_state=42)).fit(X_train_resampled, y_train_resampled)
feature_mask = selector.get_support()  # Store the feature selection mask
X_train_selected = selector.transform(X_train_resampled)
X_test_selected = selector.transform(X_test)

# Hyperparameter tuning for Random Forest
rf_param_grid = {'n_estimators': [100, 200, 300],
                 'max_depth': [None, 5, 10],
                 'max_features': ['sqrt', 'log2']}

rf_grid_search = GridSearchCV(estimator=RandomForestClassifier(random_state=42),
                              param_grid=rf_param_grid,
                              scoring='accuracy',
                              cv=5,
                              n_jobs=-1)

rf_grid_search.fit(X_train_selected, y_train_resampled)
rf_best_model = rf_grid_search.best_estimator_

# Hyperparameter tuning for Gradient Boosting
gb_param_grid = {'n_estimators': [100, 200, 300],
                 'max_depth': [3, 5, 7],
                 'learning_rate': [0.01, 0.05, 0.1]}

gb_grid_search = GridSearchCV(estimator=GradientBoostingClassifier(random_state=42),
                              param_grid=gb_param_grid,
                              scoring='accuracy',
                              cv=5,
                              n_jobs=-1)

gb_grid_search.fit(X_train_selected, y_train_resampled)
gb_best_model = gb_grid_search.best_estimator_

# Hyperparameter tuning for SVM
svm_param_grid = {'C': [0.1, 1, 10],
                  'kernel': ['linear', 'rbf'],
                  'gamma': ['scale', 'auto']}

svm_grid_search = GridSearchCV(estimator=SVC(probability=True, random_state=42),
                               param_grid=svm_param_grid,
                               scoring='accuracy',
                               cv=5,
                               n_jobs=-1)

svm_grid_search.fit(X_train_selected, y_train_resampled)
svm_best_model = svm_grid_search.best_estimator_

# Ensemble models
ensemble_model = VotingClassifier(estimators=[('rf', rf_best_model),
                                              ('gb', gb_best_model),
                                              ('svm', svm_best_model)],
                                  voting='soft')

ensemble_model.fit(X_train_selected, y_train_resampled)

# Evaluate ensemble model
y_pred_ensemble = ensemble_model.predict(X_test_selected)
ensemble_accuracy = accuracy_score(y_test, y_pred_ensemble)
print(f'Ensemble Model Accuracy: {ensemble_accuracy}')

cm = confusion_matrix(y_test, y_pred_ensemble)
print('Confusion Matrix:')
print(cm)

report = classification_report(y_test, y_pred_ensemble)
print('Classification Report:')
print(report)

probas = ensemble_model.predict_proba(X_test_selected)
fpr, tpr, thresholds = roc_curve(y_test, probas[:, 1])
roc_auc = auc(fpr, tpr)

plt.figure()
plt.plot(fpr, tpr, label='ROC curve (area = %0.2f)' % roc_auc)
plt.plot([0, 1], [0, 1], 'k--')
plt.xlim([0.0, 1.0])
plt.ylim([0.0, 1.05])
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.title('Receiver Operating Characteristic')
plt.legend(loc="lower right")
plt.show()

precision, recall, thresholds = precision_recall_curve(y_test, probas[:, 1])

plt.figure()
plt.plot(recall, precision, label='Precision-Recall curve')
plt.xlabel('Recall')
plt.ylabel('Precision')
plt.title('Precision-Recall Curve')
plt.legend(loc="lower left")
plt.show()

# Save the ensemble model
joblib.dump(ensemble_model, '../Models/ensemble_model.pkl')

test_data = pd.DataFrame([
    [65, 1, 1, 160, 280, 1, 1, 120, 1, 2.5, 3, 2, 7],
    [45, 0, 4, 120, 180, 0, 0, 170, 0, 0.8, 1, 0, 3]
], columns=['age', 'sex', 'chest_pain_type', 'resting_blood_pressure', 'serum_cholesterol',
            'fasting_blood_sugar', 'resting_ecg', 'max_heart_rate', 'exercise_induced_angina',
            'oldpeak', 'st_slope', 'major_vessels', 'thal'])

ensemble_model=joblib.load('../Models/ensemble_model.pkl')

test_data_selected = test_data.iloc[:, feature_mask]

# Make predictions using the ensemble model
predictions = ensemble_model.predict(test_data_selected)


# Make predictions and calculate accuracy for ensemble model
print("Ensemble Model:")
ensemble_predictions = ensemble_model.predict(test_data_selected)
ensemble_accuracy = accuracy_score(ensemble_predictions, [1, 0])
print("Predictions:", ensemble_predictions)
print("Accuracy:", ensemble_accuracy)