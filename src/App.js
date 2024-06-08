import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { RiArrowDownDoubleFill } from "react-icons/ri";
import { FaGripLines } from "react-icons/fa6";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import Loader from './Loader'


const priorityIcons = {
  Lowest: <RiArrowDownDoubleFill className="text-blue-900 w-full" size={20} />,
  Low: <IoIosArrowDown className="text-blue-600 w-full" size={18} />,
  Medium: <FaGripLines className="text-yellow-600 w-full" size={20} />,
  High: <IoIosArrowUp className="text-red-500" size={20} />,
  Highest: <MdKeyboardDoubleArrowUp className="text-red-800" size={20} />,
};

const statusStyle = {
  "To Do":
    "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400 border border-gray-400",
  "In Progress":
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-400 border border-yellow-400",
  "Ready for Launch":
    "bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-400 border border-blue-400",
  Launched:
    "bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-400 border border-green-400",
};

const JiraIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/jira/issues`
        );
        setIssues(response.data.issues);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);
  console.log(issues, "issues");
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => {
      const totalPages = Math.ceil(issues.length / itemsPerPage);
      return Math.min(prev + 1, totalPages);
    }); 
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedItems = issues.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="container mx-auto p-4 max-w-[1200px] bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-[3rem] text-center">
          Jira GTMS Issues
        </h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="min-w-full text-sm text-left text-black">
            <thead className="text-xs text-white uppercase bg-gray-700 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Issue Key
                </th>
                <th scope="col" className="px-6 py-3">
                  Summary
                </th>
                <th scope="col" className="px-6 py-3">
                  Issue type
                </th>

                <th scope="col" className="px-6 py-3">
                  Priority
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Assignee
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedItems.map((issue) => (
                <tr
                  key={issue.id}
                  className="bg-white border-b  hover:bg-gray-50"
                >
                  <td className="px-6 py-4 flex items-center justify-around">
                    <img src={issue.fields.issuetype.iconUrl} alt={`Avatar`} />
                    {issue.key}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {issue.fields.summary}
                  </td>

                  <td className="px-6 py-4">{issue.fields.issuetype.name}</td>
                  <td className="px-6 py-4 flex items-center">
                    <span>{priorityIcons[issue.fields.priority.name]}</span>
                    <span className="ml-4">{issue.fields.priority.name}</span>
                  </td>
                  {/* <td className="px-6 py-4">{issue.fields.status.name}</td> */}
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded ${
                        statusStyle[issue.fields.status.name]
                      }`}
                    >
                      {issue.fields.status.name}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {issue.fields.assignee
                      ? issue.fields.assignee.displayName
                      : "Unassigned"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 text-white bg-blue-500 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span>Page {currentPage}</span>
          <button
            onClick={handleNextPage}
            disabled={currentPage * itemsPerPage >= issues.length}
            className="px-4 py-2 text-white bg-blue-500 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default JiraIssues;
