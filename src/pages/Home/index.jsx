import NavBar from '../../components/NavBar';
import CreateEmployee from "../../components/CreateEmployee/index.jsx";
import '../../main.scss';


const Home = () => {
    return (
        <main className="main-wrapper">
            <NavBar/>
            <CreateEmployee/>
        </main>
    );
}

export default Home;