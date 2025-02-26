import { Link, useNavigate } from "react-router-dom";
        import logo from "../../assets/logo.png";
        import "./navbar.scss";
        import propTypes from "prop-types";

        /**
         * Composant NavBar pour l'application HRnet.
         * @param {Object} props - Les propriétés du composant.
         * @param {boolean} props.showViewCurentEmployeesButton - Indique si le bouton "View current employees" doit être affiché.
         * @returns {JSX.Element} Le composant NavBar.
         */
        const NavBar = ({ showViewCurentEmployeesButton = true }) => {
          const navigate = useNavigate();

          /**
           * Fonction pour naviguer vers la page des employés actuels.
           */
          const handleNavigate = () => {
            navigate("/employees-table");
          };

          return (
            <header className="header">
              <nav className="navbar">
                {/* Lien vers la page d'accueil avec le logo à gauche */}
                <Link to="/" className="navbar__logo navbar__logo-left">
                  <img src={logo} alt="logo" className="navbar__logo-img" />
                </Link>
                {/* Titre de la barre de navigation */}
                <h1 className="navbar__title">HRnet</h1>
                {/* Lien vers la page d'accueil avec le logo à droite */}
                <Link to="/" className="navbar__logo navbar__logo-right">
                  <img src={logo} alt="logo" className="navbar__logo-img" />
                </Link>
              </nav>
              {/* Bouton pour afficher les employés actuels, affiché seulement si showViewCurentEmployeesButton est vrai */}
              {showViewCurentEmployeesButton && (
                <button onClick={handleNavigate} className="button navbar__button">
                  View current employees
                </button>
              )}
            </header>
          );
        };

        NavBar.propTypes = {
          showViewCurentEmployeesButton: propTypes.bool,
        };

        export default NavBar;