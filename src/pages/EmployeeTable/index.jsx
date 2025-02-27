import { useEffect } from "react";
import TableComponent from "../../components/Table/index.jsx";
import NavBar from "../../components/NavBar";
import "../../main.scss";
import {apiService} from "../../services/apiService.js";
import employeesMock from "../../data/employees.json";
import useEmployeeStore from "../../store/employeeStore.jsx";


const EmployeeTable = () => {

    const { employees, setEmployees } = useEmployeeStore();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const fetchedEmployees = await apiService.getEmployees();
                console.log("Fetched employees:", fetchedEmployees);
                setEmployees(fetchedEmployees);
            } catch (error) {
                console.log("Failed to fetch employees:", error);
                setEmployees(employeesMock);
            }
        };

        fetchEmployees();
    }, [setEmployees]);

  return (
    <main className="main-wrapper">
      <NavBar showViewCurentEmployeesButton={false} />
      <TableComponent employees={employees} />
    </main>
  );
};

export default EmployeeTable;
