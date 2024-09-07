/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useMemo, useState, useEffect } from "react";
import { useTable, usePagination } from "react-table";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const UserTable = ({ users }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    setTableData(users);
  }, [users]);

  const columns = useMemo(
    () => [
      { Header: "Id", accessor: "userId" },
      { Header: "Name", accessor: "name" },
      { Header: "UserName", accessor: "username" },
      { Header: "Email", accessor: "email" },
      { Header: "Role", accessor: "role" },
      {
        Header: "Created At",
        accessor: "createdAt",
        Cell: ({ value }) => formatDate(value),
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="flex">
            <Link to={`/user-management/edit/${row.original.userId}`}>
              <button className="bg-blue-500 border hover:bg-blue-600 text-white  py-2 px-4 rounded-lg mr-2 flex gap-2">
                <FiEdit /> Edit
              </button>
            </Link>
            <button
              className="bg-red-500 border hover:bg-red-600 text-white  py-2 px-4 rounded-lg flex gap-2"
              onClick={async () => {
                try {
                  const response = await axios.delete(
                    `/api/users/${row.original.userId}`
                  );
                  if (response.status === 200) {
                    toast.success(
                      `User ${row.original.userId} deleted successfully`
                    );
                    const updatedUsers = tableData.filter(
                      (user) => user.userId !== row.original.userId
                    );
                    setTableData(updatedUsers);
                  } else {
                    console.error(`Error deleting user ${row.original.userId}`);
                  }
                } catch (error) {
                  console.error(error);
                }
              }}
            >
              <FiTrash /> Delete
            </button>
          </div>
        ),
      },
    ],
    [tableData]
  );

  const data = useMemo(() => {
    if (tableData && tableData.length > 0) {
      // Sort the users data by admission date in descending order
      const sortedData = [...tableData].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      return sortedData;
    }
    return [];
  }, [tableData]);

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
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="px-6 py-4 whitespace-nowrap text-left text-sm text-gray-900"
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
            setPageIndex((prevIndex) => prevIndex - 1);
          }}
          disabled={!canPreviousPage}
          className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous Page
        </button>
        <button
          onClick={() => {
            nextPage();
            setPageIndex((prevIndex) => prevIndex + 1);
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

export default UserTable;
