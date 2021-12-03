import create from "zustand";

const useEmployeeStore = create((set) => ({
  employee: [],
  addEmployee: (newEmployee) =>
    set((state) => {
      return {
        ...state,
        employee: [...state.employee, newEmployee],
      };
    }),
}));

export default useEmployeeStore;
