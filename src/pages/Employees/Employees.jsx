import React, {useEffect, useState} from 'react';
import EmployeeDetailsService from "../../repository/Employees/EmployeeDetailsService";
import {Table} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";
import EmployeesService from "../../repository/Employees/EmployeesService";
import "../../App.css";

const Employees = (props) => {
    const [allEmployees, setAllEmployees] = useState([]);
    const [allEmployeeDetails, setAllEmployeeDetails] = useState([]);

    useEffect(() => {
        getAllEmployees();
        getAllEmployeeDetails();
    }, [])

    const getAllEmployees = () => {
        EmployeesService.getAllEmployees().then((data) => {
            setAllEmployees(data.data)
        })
    }

    const getAllEmployeeDetails = () => {
        EmployeeDetailsService.getAllEmployeeDetails().then((data) => {
            setAllEmployeeDetails(data.data)
        })
    }

    const navigate = useNavigate();
    const toEmployeePage = (employee) => {
        navigate("/employee/" + employee.employeeId, {state: {employee: employee}});
    };


    return (
        <>
            <div className={"container d-flex justify-content-center m-auto mb-3"}>
                {allEmployees.map((employee) => {
                    return (
                        <Card style={{width: '18rem'}} key={employee.employeeId} className={"m-1"}>
                            <Card.Body>
                                <Card.Title>{employee.emName} {employee.emSurname}
                                    <i className={"color-in-theme"}> - {employee.roleId.roName}</i>
                                </Card.Title>

                                <Card.Text className={"mt-3"}>
                                    <p><span className={"color-in-theme"}>Email: </span>{employee.emEmail}<br/>
                                        <span className={"color-in-theme"}>Adress: </span>{employee.address}<br/>
                                        <span className={"color-in-theme"}>Months of experience: </span>{employee.experience}<br/>
                                        <span className={"color-in-theme"}>Salary sum: </span>{employee.salary}</p>
                                </Card.Text>

                                <Card.Footer className={"bg-white"}>
                                    <div className={"d-flex justify-content-center"}>
                                        <Button className={"px-4 py-0 "}
                                                variant="outline-secondary" onClick={() => toEmployeePage(employee)}>
                                            Details
                                        </Button>
                                    </div>

                                </Card.Footer>
                            </Card.Body>
                        </Card>
                    );
                })}
            </div>

            <div className={"container"}>
                <h3 className={"my-2 color-in-theme"}><i>Employees connection details view</i></h3>
                <Table striped>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Email</th>
                        <th>Salary</th>
                        <th>Technologies</th>
                        <th>Role</th>
                        <th>Team</th>
                    </tr>
                    </thead>
                    <tbody>
                    {allEmployeeDetails.map((row) => {
                        return (
                            <tr>
                                <td>{row.name}</td>
                                <td>{row.surname}</td>
                                <td>{row.email}</td>
                                <td>{row.salary}</td>
                                <td>{row.technology}</td>
                                <td>{row.role}</td>
                                <td>{row.team}</td>
                            </tr>
                        );
                    })}


                    </tbody>
                </Table>

            </div>
        </>
    )
}
export default Employees;
