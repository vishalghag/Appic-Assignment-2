import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import User from "./User";
import {  ascendingDescending, fetchTableData} from "../utils";
import { employeeDataStatic } from "../static";
import { ASC, DESC } from "../utils/constant";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp, faEnvelope } from '@fortawesome/free-solid-svg-icons'

const DynamicTable = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [toggle,SetToggle] = useState(true);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = () => {
    setLoader(true)
    const {data,status} = fetchTableData()
    if(status === 200){
      setEmployeeData(data)
    }
    // setEmployeeData([])
    setEmployeeData(employeeDataStatic)
    setLoader(false)
  }

  const renderTable = () => {
    return (
      <>
        <h2>Dynamic Table</h2>
        <table>
          <thead>
            <tr>
              <th>ID's</th>
              <th>Employee Name</th>
              <th>Age</th>
              {toggle ? <th>Employee Salary <button onClick={() => ascendingDescending(employeeData,setEmployeeData,ASC,SetToggle)}><FontAwesomeIcon icon={faArrowUp}/></button> </th> : <th>Employee Salary <button onClick={() => ascendingDescending(employeeData,setEmployeeData,DESC,SetToggle)}><FontAwesomeIcon icon={faArrowDown}/></button> </th> }
            </tr>
          </thead>
          <tbody>
            <User users={employeeData} />
          </tbody>
        </table>
      </>
    );
  };

  return loader ? <HashLoader size={40} color='#443C68'/> : !!employeeData.length ? renderTable() : <h2>Error While Fetching Data</h2>;
};

export default DynamicTable;
