import { Route, Routes } from "react-router-dom";
import "./App.css";
import PatientManagementPage from "./page/PatientManagement/PatientManagementPage";
import Dashboard from "./page/Dashboard";
import Demo from "./page/demo";
import PatientSummaryPage from "./page/Statistics/Patient-stats/PatientSummaryPage";
import HeartDiseasePredictionPage from "./page/Analytical-Tools/Disease-Prediction/Heart-Disease/HeartDiseasePredictionPage";
import SettingsPage from "./page/Settings/SettingsPage";
import Login from "./page/Login/Login";
import UserManagementPage from "./page/UserManagement/UserManagementPage";
import ViewPatientPage from "./page/PatientManagement/ViewPatientPage";
import ReportPage from "./page/Report/Patient-stats/ReportPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/patient-management" element={<PatientManagementPage />} />
        <Route path="/user-management" element={<UserManagementPage />} />
        <Route
          path="/patient-management/:patientId"
          element={<ViewPatientPage />}
        />
        <Route path="/demo" element={<Demo />} />
        <Route
          path="/statistics/patient-summary"
          element={<PatientSummaryPage />}
        />
        <Route path="/report/:patientId" element={<ReportPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route
          path="/analytical-tools/disease-prediction/heart-disease-prediction"
          element={<HeartDiseasePredictionPage />}
        />
        <Route
          path="/analytical-tools/disease-prediction/heart-disease-prediction/:patientId"
          element={<HeartDiseasePredictionPage />}
        />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </div>
  );
}

export default App;
