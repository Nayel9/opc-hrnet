import { useState, useMemo, useCallback, useEffect, Fragment } from "react";
import { useDebounce } from "use-debounce";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import "./table.scss"; // Fichier CSS personnalisé
import { FaSortDown, FaSortUp, FaSort } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import useEmployeeStore from "../../store/employeeStore";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaTimes } from "react-icons/fa";

const TableComponent = () => {
  const employees = useEmployeeStore((state) => state.employees);
  const removeEmployee = useEmployeeStore((state) => state.removeEmployee);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [showResetIcon, setShowResetIcon] = useState(false); // État pour gérer la visibilité de l'icône de réinitialisation

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const columns = useMemo(
    () => [
      { accessorKey: "first_name", header: "First Name" },
      { accessorKey: "last_name", header: "Last Name" },
      {
        accessorKey: "start_date",
        header: "Start Date",
        cell: (info) => formatDate(info.getValue()),
      },
      { accessorKey: "department", header: "Department" },
      {
        accessorKey: "birthday",
        header: "Date of Birth",
        cell: (info) => formatDate(info.getValue()),
      },
      { accessorKey: "street", header: "Street" },
      { accessorKey: "city", header: "City" },
      { accessorKey: "state_abb", header: "State" },
      { accessorKey: "Zip_code", header: "Zip Code" },
    ],
    [],
  );

  const filteredData = useMemo(() => {
    return employees.filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(debouncedSearch.toLowerCase()),
      ),
    );
  }, [debouncedSearch, employees]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    table.setPageSize(pageSize);
  }, [pageSize, table]);

  useEffect(() => {
    table.setPageIndex(pageIndex);
  }, [pageIndex, table]);

  const rowCount = table.getCoreRowModel().rows.length;
  const startRow = pageIndex * pageSize + 1;
  const endRow = Math.min(startRow + pageSize - 1, rowCount);
  const navigate = useNavigate();

  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setSearch(value);
    setShowResetIcon(value.length > 0); // Afficher l'icône si le champ n'est pas vide
    setPageIndex(0);
  }, []);

  const handleResetSearch = () => {
    setSearch("");
    setShowResetIcon(false); // Masquer l'icône de réinitialisation
    setPageIndex(0);
  };

  const handlePageSizeChange = useCallback((e) => {
    setPageSize(Number(e.target.value));
    setPageIndex(0);
  }, []);

  const handlePreviousPage = useCallback(() => {
    setPageIndex((currentPageIndex) => currentPageIndex - 1);
  }, []);

  const handleNextPage = useCallback(() => {
    setPageIndex((currentPageIndex) => currentPageIndex + 1);
  }, []);

  const viewEditEmployee = (employeeId) => {
    setSelectedEmployeeId((prevSelectedEmployeeId) =>
      prevSelectedEmployeeId === employeeId ? null : employeeId,
    );
  };

  const handleDeleteEmployee = (employeeId) => {
    removeEmployee(employeeId);
  };

  return (
    <div className="table-container">
      <div className="search-pagination-control">
        <div className="page-size-label">
          <p>Show</p>
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
            className="page-size-select"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <p>entries</p>
        </div>
        <div className="search-pagination">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleSearchChange}
            className="search-input"
          />
          {showResetIcon && (
            <FaTimes className="reset-icon" onClick={handleResetSearch} />
          )}
        </div>
      </div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  style={{ cursor: "pointer" }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                  <span className="sort-icon">
                    {header.column.getIsSorted() === "asc" ? (
                      <FaSortUp />
                    ) : header.column.getIsSorted() === "desc" ? (
                      <FaSortDown />
                    ) : (
                      <FaSort />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="no-data">
                No data available in table !
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <Fragment key={row.id}>
                <tr
                  className="employee_tr"
                  onClick={() => viewEditEmployee(row.original.id)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
                {selectedEmployeeId === row.original.id && (
                  <tr className="employee_edit">
                    <td colSpan={columns.length}>
                      <div key={row.original.id} className="employee-actions">
                        <RiDeleteBin5Line
                          onClick={() => handleDeleteEmployee(row.original.id)}
                        ></RiDeleteBin5Line>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))
          )}
        </tbody>
      </table>
      <div className="table-footer">
        <div className="pagination-info">
          Showing {startRow} to {endRow} of {rowCount} entries
        </div>

        <button
          className="button pagination__button"
          onClick={() => navigate("/")}
        >
          Home
        </button>

        <div className="pagination">
          <button
            onClick={handlePreviousPage}
            disabled={!table.getCanPreviousPage()}
            className="button pagination__button"
          >
            Previous
          </button>
          <span>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <button
            onClick={handleNextPage}
            disabled={!table.getCanNextPage()}
            className="button pagination__button"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
