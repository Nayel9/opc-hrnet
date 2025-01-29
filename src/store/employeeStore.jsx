// src/store/employeeStore.js
import { create } from "zustand";

const useEmployeeStore = create((set) => ({
  employees: [],
  isModalOpen: false,
  addEmployee: (employee) =>
    set((state) => ({
      employees: [...state.employees, employee],
      isModalOpen: true,
    })),
  closeModal: () => set({ isModalOpen: false }),
}));

export default useEmployeeStore;
