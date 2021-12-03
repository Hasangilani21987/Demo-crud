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

  getEmployee: (employee) =>
    set((state) => {
      return {
        ...state,
        employee: employee,
      };
    }),

  deleteEmployee: (Id) =>
    set((state) => {
      return {
        ...state,
        employee: state.employee.filter((e) => e._id !== Id),
      };
    }),
}));

export default useEmployeeStore;
