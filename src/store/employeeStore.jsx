// src/store/employeeStore.jsx
        import { create } from "zustand";
        import employeesMock from "../data/employees.json"; // Importez vos données mockées

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
          errors: {}, // Ajoutez cet état pour les erreurs
          addEmployee: (employee) =>
            set((state) => ({
              employees: [...state.employees, employee],
              isModalOpen: true,
            })),
          removeEmployee: (id) => set((state) => ({
            employees: state.employees.filter((employee) => employee.id !== id),
          })),
          setSelectedDate: (date) => set({ selectedDate: date }),
          closeModal: () => set({ isModalOpen: false }),
          setFormValues: (values) => set((state) => ({
            formValues: { ...state.formValues, ...values },
          })), // Assurez-vous que cette fonction est définie
          setErrors: (errors) => set({ errors }), // Utilisez cette fonction pour mettre à jour les erreurs
          resetForm: () => set({
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
          }), // Ajoutez cette fonction pour réinitialiser le formulaire
        }));

        export default useEmployeeStore;