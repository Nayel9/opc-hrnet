// src/store/employeeStore.js
import { create } from "zustand";

const useEmployeeStore = create((set) => ({
  employees: [],
  isModalOpen: false,
  selectedDateOfBirth: null,
  selectedStartDate: null,
  isError: false,
  addEmployee: (employee) =>
    set((state) => ({
      employees: [...state.employees, employee],
      isModalOpen: true,
    })),
  closeModal: () => set({ isModalOpen: false }),
  setSelectedDateOfBirth: (date) => set({ selectedDateOfBirth: date }),
  setSelectedStartDate: (date) => set({ selectedStartDate: date }),
  setError: (error) => set({ isError: error }),
}));

export default useEmployeeStore;