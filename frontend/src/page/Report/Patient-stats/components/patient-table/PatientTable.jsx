/* eslint-disable react/prop-types */
import { useMemo, useState } from "react";
import { useTable, usePagination } from "react-table";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const PatientTable = ({ patients, handleViewPatientStats }) => {
  const [pageIndex, setPageIndex] = useState(0);

  const columns = useMemo(
    () => [
      { Header: "Id", accessor: "patient_id" },
      { Header: "Name", accessor: "name" },
      { Header: "Age", accessor: "age" },
      { Header: "Gender", accessor: "gender" },
      { Header: "Diagnosis", accessor: "diagnosis" },
      {
        Header: "Admission Date",
        accessor: "admission_date",
        Cell: ({ value }) => formatDate(value),
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <button
            className="bg-gray-100 border hover:bg-gray-300 text-gray-800 border-gray-500 py-2 px-4 rounded"
            onClick={() => handleViewPatientStats(row.original.patient_id)}
          >
            View Patient Stats
          </button>
        ),
      },
    ],
    [handleViewPatientStats]
  );

  const data = useMemo(() => {
    // Sort the patients data by admission date in descending order
    const sortedData = patients.sort(
      (a, b) => new Date(b.admission_date) - new Date(a.admission_date)
    );
    return sortedData;
  }, [patients]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex }, // Set initial page index
    },
    usePagination
  );

  return (
    <>
      <div className="overflow-x-auto">
        <table
          {...getTableProps()}
          className="min-w-full divide-y divide-gray-200 shadow-md border border-gray-200"
        >
          <thead className="bg-gray-50">
            {headerGroups.map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((column) => (
                  <th
                    key={column.id}
                    {...column.getHeaderProps()}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider "
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody
            {...getTableBodyProps()}
            className="bg-white divide-y divide-gray-200"
          >
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr key={row.id} {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td
                      key={cell.column.id}
                      {...cell.getCellProps()}
                      className="px-6 py-4 whitespace-nowrap text-left text-sm  text-gray-900"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4 space-x-4">
        <button
          onClick={() => {
            previousPage();
            setPageIndex((pageIndex) => pageIndex - 1);
          }}
          disabled={!canPreviousPage}
          className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 -offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous Page
        </button>
        <button
          onClick={() => {
            nextPage();
            setPageIndex((pageIndex) => pageIndex + 1);
          }}
          disabled={!canNextPage}
          className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next Page
        </button>
      </div>
    </>
  );
};

export default PatientTable;
