import { MdOutlineAnalytics } from "react-icons/md";
import { IoBulbOutline } from "react-icons/io5";
import { useEffect } from "react";

const InsightTable = () => {
  useEffect(() => {
    // Chart data
    const data = {
      labels: [
        "Age",
        "Sex",
        "Chest Pain",
        "Resting BP",
        "Serum Cholesterol",
        "Max Heart Rate",
        "ST Segment",
      ],
      datasets: [
        {
          label: "Feature Importance",
          data: [75, 80, 65, 70, 85, 140, 10],

          backgroundColor: "rgba(255, 0, 0, 0.6)",
          borderColor: "rgba(255, 0, 0, 1)",
          borderWidth: 1,
          barThickness: 15,
        },
      ],
    };

    // Get the canvas element
    const canvas = document.getElementById("myChart");

    // Destroy existing chart if it exists
    if (canvas && canvas.chart) {
      canvas.chart.destroy();
    }

    // eslint-disable-next-line no-undef
    canvas.chart = new Chart(canvas, {
      type: "bar",
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 160,
          },
        },
      },
    });
  }, []);

  return (
    <div>
      <div className=" mt-[-60px] flex flex-col gap-6">
        <div className="bg-white p-6 rounded-md shadow-md">
          <div className="p-6 bg-gradient-to-r from-orange-800 to-red-500 rounded-md text-start">
            <p className="text-xl text-white mb-3">
              Heart Disease Prediction Model
            </p>
            <span className="text-gray-300 text-xs textJustify-auto">
              This user-friendly model predicts the risk of heart disease by
              examining basic medical information. By considering factors like
              age, blood pressure, and cholesterol levels, it provides
              straightforward predictions.
              <br />
              <br />
              Healthcare providers can use this tool for early detection and
              suggesting simple preventive measures, promoting better heart
              health outcomes.
            </span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-md shadow-md">
          <div className="flex items-center gap-14 mb-4">
            <div>
              <p className="text-lg font-medium">
                Insights on Feature Analysis
              </p>
              <p className="text-xs font-medium text-gray-500">
                Based on Explored Vital Heart Health Indicators
              </p>
            </div>
            <MdOutlineAnalytics className="text-red-500 text-3xl" />
          </div>
          <div>
            <canvas id="myChart" width="400" height="400"></canvas>
          </div>
        </div>
        <div className="bg-white p-6 rounded-md shadow-md">
          <div className="flex flex-col">
            <div className="flex items-center gap-14 mb-6">
              <div className="flex flex-col">
                <p className="text-lg font-medium">
                  Heart Disease Risk Factors
                </p>
                <p className="text-xs font-medium text-gray-500">
                  Assessing Heart Disease Risk Through Various Metrics
                </p>
              </div>
              <IoBulbOutline className="text-red-500 text-3xl" />
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <p className="font-medium text-sm">Chest Pain Type :</p>
                <p className="text-xs text-gray-600">
                  This feature indicates the type of chest pain experienced by
                  individuals, which can provide insights into potential heart
                  issues. Higher values may suggest more severe symptoms.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-medium font-sm">Resting Blood Pressure :</p>
                <p className="text-xs text-gray-600">
                  Reflecting the pressure in the arteries when the heart is at
                  rest, this metric is crucial for assessing cardiovascular
                  health. Elevated values may indicate hypertension, a
                  significant risk factor for heart disease.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-medium font-sm">Serum Cholesterol :</p>
                <p className="text-xs text-gray-600">
                  Cholesterol levels in the bloodstream play a pivotal role in
                  heart health. High serum cholesterol, especially low-density
                  lipoprotein (LDL) cholesterol, increases the risk of
                  atherosclerosis and heart disease.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-medium font-sm">Fasting Blood Sugar :</p>
                <p className="text-xs text-gray-600">
                  Elevated fasting blood sugar levels are associated with
                  diabetes, a condition closely linked to heart disease.
                  Monitoring blood sugar levels is essential for managing
                  overall cardiovascular risk.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-medium font-sm">
                  Resting Electrocardiographic Results :
                </p>
                <p className="text-xs text-gray-600">
                  Electrocardiography (ECG) measures the electrical activity of
                  the heart. Abnormal ECG findings may indicate underlying heart
                  conditions, aiding in the diagnosis and management of heart
                  disease.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-medium font-sm">Max Heart Rate :</p>
                <p className="text-xs text-gray-600">
                  he maximum heart rate achieved during physical activity
                  provides insights into cardiovascular fitness. An elevated max
                  heart rate may suggest increased cardiac workload and
                  potential cardiovascular risk.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-medium font-sm">Exercise-Induced Angina :</p>
                <p className="text-xs text-gray-600">
                  Angina, or chest pain, experienced during physical exertion
                  can signal inadequate blood flow to the heart. Identifying
                  exercise-induced angina helps assess cardiovascular function
                  and risk.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightTable;
