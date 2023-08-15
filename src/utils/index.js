import SecureAxios from "./configAxios/SecureAxios";
import {ASC,DESC, EmployeeUrl} from "./constant"

export const fetchTableData = async () => {
  SecureAxios({
    method: "GET",
    url:EmployeeUrl,
  })
    .then(({ data, status }) => {
      return { data, status }
    })
    .catch((error) => error);
};

export const ascendingDescending = (employeeData, setEmployeeData, operation,SetToggle) => {
    let updatedEmployeeData = [...employeeData]; // Create a copy of the array

    if (operation === ASC) {
        updatedEmployeeData.sort((a, b) => a.employee_salary - b.employee_salary);
        SetToggle(false)
    } 
    if (operation === DESC) {
        updatedEmployeeData.sort((a, b) => b.employee_salary - a.employee_salary);
        SetToggle(true)
    }

    setEmployeeData(updatedEmployeeData);
};

