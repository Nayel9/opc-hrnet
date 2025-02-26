import { create } from "zustand";
import employeesMock from "../data/employees.json";

const useEmployeeStore = create((set) => ({
  employees: employeesMock, // Initialisez avec les données mockées
  isModalOpen: false,
  selectedDate: "",
  formValues: {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    startDate: "",
    department: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
  },
  errors: {},
  addEmployee: (employee) =>
    set((state) => ({
      employees: [...state.employees, employee],
      isModalOpen: true,
    })),
  removeEmployee: (id) =>
    set((state) => ({
      employees: state.employees.filter((employee) => employee.id !== id),
    })),
  setSelectedDate: (date) => set({ selectedDate: date }),
  closeModal: () => set({ isModalOpen: false }),
  setFormValues: (values) =>
    set((state) => ({
      formValues: { ...state.formValues, ...values },
    })),
  setErrors: (errors) => set({ errors }),
  resetForm: () =>
    set({
      formValues: {
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        startDate: "",
        department: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
      },
      errors: {},
    }),
}));

export default useEmployeeStore;
