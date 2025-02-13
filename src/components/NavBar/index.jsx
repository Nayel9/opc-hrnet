import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./navbar.scss";
import propTypes from "prop-types";

const NavBar = ({ showViewCurentEmployeesButton = true}) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/employees-table");
  };

  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/" className="navbar__logo navbar__logo-left">
          <img src={logo} alt="logo" className="navbar__logo-img" />
        </Link>
        <h1 className="navbar__title">HRnet</h1>
        <Link to="/" className="navbar__logo navbar__logo-right">
          <img src={logo} alt="logo" className="navbar__logo-img" />
        </Link>
      </nav>
      {showViewCurentEmployeesButton && (
      <button onClick={handleNavigate} className="button navbar__button">View current employees</button>
        )}
    </header>
  );
};

NavBar.propTypes = {
  showViewCurentEmployeesButton: propTypes.bool,
};

export default NavBar;