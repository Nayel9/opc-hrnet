import { create } from "zustand";
import employeesMock from "../data/employees.json";

const useEmployeeStore = create((set) => ({
  employees: [],
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
  setEmployees: (employees) => set({ employees }),
  addEmployee: (employee) =>
    set((state) => ({
      employees: [...state.employees, employee],
      isModalOpen: true,
    })),
  removeEmployee: (_id) =>
    set((state) => ({
      employees: state.employees.filter((employee) => employee._id !== _id),
    })),
  setSelectedDate: (date) => set({ selectedDate: date }),
  openModal: () => set({ isModalOpen: true }),
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
