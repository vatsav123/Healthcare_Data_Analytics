const data = [
  {
    date: "21 Jan 2023",
    restingBloodPressure: 140,
    chestPainType: "Non-anginal pain",
    restingElectrocardiographicResults: "Normal",
    maxHeartRate: 150,
    status: "High",
  },
  {
    date: "04 Feb 2023",
    restingBloodPressure: 145,
    chestPainType: "Asymptomatic",
    restingElectrocardiographicResults: "Abnormal ST-T wave",
    maxHeartRate: 150,
    status: "Normal",
  },
  {
    date: "22 Mar 2023",
    restingBloodPressure: 120,
    chestPainType: "Atypical angina",
    restingElectrocardiographicResults: "Probable or definite LVH",
    maxHeartRate: 150,
    status: "Normal",
  },
  {
    date: "25 April 2023",
    restingBloodPressure: 130,
    chestPainType: "Typical angina",
    restingElectrocardiographicResults: "Normal",
    maxHeartRate: 120,
    status: "Normal",
  },
  {
    date: "04 May 2023",
    restingBloodPressure: 145,
    chestPainType: "Asymptomatic",
    restingElectrocardiographicResults: "Abnormal ST-T wave",
    maxHeartRate: 150,
    status: "Normal",
  },
];

const ListAlerts = () => {
  return (
    <div className="mr-10 ">
      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            List Alerts
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Resting Blood Pressure
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Chest Pain Type
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Resting ECG
                </th>
                <th
                  scope="col"
                  className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                >
                  Max Heart Rate
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((row, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {row.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                    {row.restingBloodPressure}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {row.chestPainType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {row.restingElectrocardiographicResults}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    {row.maxHeartRate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        row.status.toLowerCase() === "high"
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListAlerts;
