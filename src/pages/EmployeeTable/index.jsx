import { useEffect, useState } from "react";
import TableComponent from "../../components/Table/index.jsx";
import NavBar from "../../components/NavBar";
import "../../main.scss";
import { apiService } from "../../services/apiService.js";
import employeesMock from "../../data/employees.json";
import useEmployeeStore from "../../store/employeeStore.jsx";

/**
 * Composant pour afficher le tableau des employés.
 * @component
 * @returns {JSX.Element} Le composant EmployeeTable.
 */
const EmployeeTable = () => {
  const { employees, setEmployees } = useEmployeeStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setIsLoading(true);
        const fetchedEmployees = await apiService.getEmployees();
        console.log("Fetched employees:", fetchedEmployees);
        setEmployees(fetchedEmployees);
      } catch (error) {
        console.log("Failed to fetch employees:", error);
        setEmployees(employeesMock);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, [setEmployees]);


  return (
    <main className="main-wrapper">
      <NavBar showViewCurentEmployeesButton={false} />
      <TableComponent employees={employees} isLoading={isLoading}/>
    </main>
  );
};

export default EmployeeTable;
