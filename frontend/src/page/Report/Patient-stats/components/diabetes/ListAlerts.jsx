const data = [
  {
    date: "21 Apr 2023",
    glucoseLevel: 120,
    skinThickness: 25,
    insulinLevel: 10,
    BMI: 29.5,
    status: "High",
  },
  {
    date: "04 Apr 2023",
    glucoseLevel: 135,
    skinThickness: 30,
    insulinLevel: 15,
    BMI: 27.8,
    status: "Normal",
  },
  {
    date: "22 Mar 2023",
    glucoseLevel: 115,
    skinThickness: 28,
    insulinLevel: 12,
    BMI: 31.2,
    status: "Normal",
  },
  {
    date: "25 Mar 2023",
    glucoseLevel: 130,
    skinThickness: 27,
    insulinLevel: 10,
    BMI: 30.1,
    status: "Normal",
  },
];
const ListAlerts = () => {
  return (
    <div className="mr-12">
      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Diabetes Data
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Glucose Level
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Skin Thickness
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Insulin Level
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  BMI
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                    {row.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                    {row.glucoseLevel}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                    {row.skinThickness}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                    {row.insulinLevel}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                    {row.BMI}
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
