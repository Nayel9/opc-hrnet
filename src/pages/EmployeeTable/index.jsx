import NavBar from '../../components/NavBar';
import '../../main.scss';
import TableComponent from "../../components/Table/index.jsx";

const EmployeeTable = () => {
    return (
        <main className="main-wrapper">
            <NavBar showViewCurentEmployeesButton={false}/>
            <TableComponent/>
        </main>
    );
}

export default EmployeeTable;