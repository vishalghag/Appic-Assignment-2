const User = ({ users }) => {

    return (
        users.map((empData) => {
            const { id = '-', employee_name = '-', employee_age = '-', employee_salary = '-' } = empData

            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{employee_name}</td>
                    <td>{employee_age}</td>
                    <td>{employee_salary}</td>
                </tr>
            )
        })
    )
}

export default User
