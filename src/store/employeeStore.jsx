import { create } from "zustand";
import employeesMock from "../data/employees.json"; // Importez vos données mockées

const useEmployeeStore = create((set) => ({
  employees: employeesMock, // Initialisez avec les données mockées
  isModalOpen: false,
  selectedDateOfBirth: null,
  selectedStartDate: null,
  isError: false,
  addEmployee: (employee) =>
    set((state) => ({
      employees: [...state.employees, employee],
      isModalOpen: true,
    })),
  removeEmployee: (id) => set((state) => ({
    employees: state.employees.filter((employee) => employee.id !== id),
  })),
  closeModal: () => set({ isModalOpen: false }),
  setSelectedDateOfBirth: (date) => set({ selectedDateOfBirth: date }),
  setSelectedStartDate: (date) => set({ selectedStartDate: date }),
  setError: (error) => set({ isError: error }),
}));

export default useEmployeeStore;