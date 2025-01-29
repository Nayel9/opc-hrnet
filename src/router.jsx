import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/index.jsx';

/**
 * Composant principal de l'application qui gère les routes.
 * @returns {JSX.Element} Le composant Router avec les routes définies.
 */
const App = () => {
    return (
        <Router>
            <Routes>
                {/* Route pour la page d'accueil */}
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    );
};

export default App;