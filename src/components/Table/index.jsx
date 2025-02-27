import { useState, useMemo, useCallback, useEffect, Fragment } from "react";
import { useDebounce } from "use-debounce";
import PropTypes from "prop-types";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import "./table.scss";
import { FaSortDown, FaSortUp, FaSort } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import useEmployeeStore from "../../store/employeeStore";
import { Modale } from "modale-opc-p14";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaTimes } from "react-icons/fa";
import { apiService } from "../../services/apiService";
import { RiseLoader } from "react-spinners";

/**
 * Composant TableComponent pour afficher et gérer une table d'employés.
 * @returns {JSX.Element} Le composant TableComponent.
 */
const TableComponent = ({ isLoading }) => {
  const employees = useEmployeeStore((state) => state.employees);
  const removeEmployee = useEmployeeStore((state) => state.removeEmployee);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [showResetIcon, setShowResetIcon] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeIdToDelete, setEmployeeIdToDelete] = useState(null);
  /**
   * Formate une date en chaîne de caractères au format "MM/DD/YYYY".
   * @param {string} dateString - La date à formater.
   * @returns {string} La date formatée.
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Définition des colonnes de la table
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

  // Filtrage des données en fonction de la recherche
  const filteredData = useMemo(() => {
    return employees.filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(debouncedSearch.toLowerCase()),
      ),
    );
  }, [debouncedSearch, employees]);

  // Configuration de la table avec les données filtrées et les colonnes
  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Mise à jour de la taille de la page
  useEffect(() => {
    table.setPageSize(pageSize);
  }, [pageSize, table]);

  // Mise à jour de l'index de la page
  useEffect(() => {
    table.setPageIndex(pageIndex);
  }, [pageIndex, table]);

  const rowCount = table.getCoreRowModel().rows.length;
  const startRow = pageIndex * pageSize + 1;
  const endRow = Math.min(startRow + pageSize - 1, rowCount);
  const navigate = useNavigate();

  /**
   * Gère le changement de la recherche.
   * @param {Object} e - L'événement de changement.
   */
  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setSearch(value);
    setShowResetIcon(value.length > 0);
    setPageIndex(0);
  }, []);

  /**
   * Réinitialise la recherche.
   */
  const handleResetSearch = () => {
    setSearch("");
    setShowResetIcon(false);
    setPageIndex(0);
  };

  /**
   * Gère le changement de la taille de la page.
   * @param {Object} e - L'événement de changement.
   */
  const handlePageSizeChange = useCallback((e) => {
    setPageSize(Number(e.target.value));
    setPageIndex(0);
  }, []);

  /**
   * Gère le passage à la page précédente.
   */
  const handlePreviousPage = useCallback(() => {
    setPageIndex((currentPageIndex) => currentPageIndex - 1);
  }, []);

  /**
   * Gère le passage à la page suivante.
   */
  const handleNextPage = useCallback(() => {
    setPageIndex((currentPageIndex) => currentPageIndex + 1);
  }, []);
  /**
   * Affiche ou masque les détails de l'employé sélectionné.
   * @param {string} employeeId - L'ID de l'employé.
   */
  const viewEditEmployee = (employeeId) => {
    setSelectedEmployeeId((prevSelectedEmployeeId) =>
      prevSelectedEmployeeId === employeeId ? null : employeeId,
    );
  };

  /**
   * Supprime un employé.
   * @param {string} employeeId - L'ID de l'employé à supprimer.
   */
  const handleDeleteEmployee = (employeeId) => {
    setEmployeeIdToDelete(employeeId);
    setIsModalOpen(true);
  };

  const confirmDeleteEmployee = async () => {
    try {
      await apiService.deleteEmployee(employeeIdToDelete);
      removeEmployee(employeeIdToDelete);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting employee:", error);
      // Gérer l'erreur (par exemple, afficher un message à l'utilisateur)
    }
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
        {isLoading ? (
          <tbody>
            <tr>
              <td colSpan={columns.length} className="loading">
                <span className="loader">
                  <RiseLoader
                      color="#69a141"
                      margin={10}
                      size={15}
                      speedMultiplier={1}
                  />
                </span>
              </td>
            </tr>
          </tbody>
        ) : (
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
                    onClick={() => viewEditEmployee(row.original._id)}
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
                  {selectedEmployeeId === row.original._id && (
                    <tr className="employee_edit">
                      <td colSpan={columns.length}>
                        <div
                          key={row.original._id}
                          className="employee-actions"
                        >
                          <RiDeleteBin5Line
                            onClick={() => {
                              handleDeleteEmployee(row.original._id);
                            }}
                          ></RiDeleteBin5Line>
                          {isModalOpen && (
                            <Modale
                              title="Confirmation"
                              content="Are you sure you want to delete this employee?"
                              onClose={() => setIsModalOpen(false)}
                              error={false}
                              ariaLabel="Confirmation modal"
                            >
                              <button
                                className="modale__button"
                                onClick={confirmDeleteEmployee}
                              >
                                Confirm
                              </button>
                            </Modale>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))
            )}
          </tbody>
        )}
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

TableComponent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default TableComponent;
