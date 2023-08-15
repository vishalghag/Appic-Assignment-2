import SecureAxios from "./configAxios/SecureAxios";
import { ASC, DESC, EmployeeUrl } from "./constant";

export const fetchTableData = async () => {
  SecureAxios({
    method: "GET",
    url: EmployeeUrl,
  })
    .then(({ data, status }) => {
      return { data, status };
    })
    .catch((error) => error);
};

export const ascendingDescending = (
  employeeData,
  setEmployeeData,
  operation,
  SetToggle
) => {
  let updatedEmployeeData = [...employeeData]; // Create a copy of the array

  if (operation === ASC) {
    updatedEmployeeData.sort((a, b) => a.employee_salary - b.employee_salary);
    SetToggle(false);
  }
  if (operation === DESC) {
    updatedEmployeeData.sort((a, b) => b.employee_salary - a.employee_salary);
    SetToggle(true);
  }

  setEmployeeData(updatedEmployeeData);
};

export const filterToAgeRange = (employeeData, min, max) =>
  employeeData.filter(
    (number) => number.employee_age >= min && number.employee_age <= max
  );

export const generateAgeRange = (employeeData) => {
  const maxAge = Math.max(
    ...employeeData.map((ele) => parseInt(ele.employee_age))
  );
  const rangeCount = Math.ceil(maxAge / 20);
  const ranges = [];

  for (let i = 0; i < rangeCount; i++) {
    const minAge = i * 20;
    const maxAge = minAge + 20;
    const datum = {
      value: {
        min: minAge,
        max: maxAge,
      },
      label: `${minAge}-${maxAge}`,
    };
    ranges.push(datum);
  }

  return ranges;
};
