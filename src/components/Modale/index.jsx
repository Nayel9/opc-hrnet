// src/components/Modale/index.jsx
import useEmployeeStore from "../../store/employeeStore";
import "./modale.scss";

const Modale = () => {
  const closeModal = useEmployeeStore((state) => state.closeModal);

  return (
    <div className="modale">
      <div className="modale-content">
        <div className="modale-text">
          <h2>Confirmation</h2>
          <p>Employee saved successfully!</p>
        </div>
        <button className="button modale__button" onClick={closeModal}>
          Fermer
        </button>
      </div>
    </div>
  );
};

export default Modale;
