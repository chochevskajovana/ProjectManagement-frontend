import {useEffect, useState} from "react";
import ReportsService from "../../repository/Reports/ReportsService";
import {Table} from "react-bootstrap";

const Reports = (props) => {

    const [countOfEmployeesInTeamsPerProject, setCountOfEmployeesInTeamsPerProject] = useState([]);
    const [countOfTechnologiesOnTypeOfProject, setCountOfTechnologiesOnTypeOfProject] = useState([]);
    const [countProjectsAndEmployeesForTechnology, setCountProjectsAndEmployeesForTechnology] = useState([]);
    const [employeesThatCurrentlyWorkInTeam, setEmployeesThatCurrentlyWorkInTeam] = useState([]);

    useEffect(() => {
        getCountOfEmployeesInTeamsPerProject();
        getCountOfTechnologiesOnTypeOfProject();
        getCountProjectsAndEmployeesForTechnology();
        getEmployeesThatCurrentlyWorkInTeam();
    }, [])

    const getCountOfEmployeesInTeamsPerProject = () => {
        ReportsService.getCountOfEmployeesInTeamsPerProject().then((data) => {
            setCountOfEmployeesInTeamsPerProject(data.data);
        })
    }

    const getCountOfTechnologiesOnTypeOfProject = () => {
        ReportsService.getCountOfTechnologiesOnTypeOfProject().then((data) => {
            setCountOfTechnologiesOnTypeOfProject(data.data);
        })
    }

    const getCountProjectsAndEmployeesForTechnology = () => {
        ReportsService.getCountProjectsAndEmployeesForTechnology().then((data) => {
            setCountProjectsAndEmployeesForTechnology(data.data);
        })
    }

    const getEmployeesThatCurrentlyWorkInTeam = () => {
        ReportsService.getEmployeesThatCurrentlyWorkInTeam().then((data) => {
            setEmployeesThatCurrentlyWorkInTeam(data.data);
        })
    }

    return (
        <div className={"container"}>
            <div className={"row mt-3"}>
                <div className={"col-5"}>
                    <h4 className={"color-in-theme"}><i>Number of employees in teams per project</i> </h4>
                    <Table striped className={"mb-4"}>
                        <thead>
                        <tr>
                            <th>Project name</th>
                            <th>Team name</th>
                            <th>Employees on team</th>
                        </tr>
                        </thead>
                        <tbody>
                        {countOfEmployeesInTeamsPerProject.length > 0 && countOfEmployeesInTeamsPerProject.map((data) => {
                            return (
                                <tr>
                                    <td>{data.projectName}</td>
                                    <td>{data.teamName}</td>
                                    <td>{data.employeesInTeamsOnProjectCount}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                </div>
                <div className={"col-7"}>
                    <h4 className={"color-in-theme"}><i>Number of technology types per project</i></h4>
                    <Table striped className={"mb-4"}>
                        <thead>
                        <tr>
                            <th>Type name</th>
                            <th>Project name</th>
                            <th>Number of technologies</th>
                        </tr>
                        </thead>
                        <tbody>
                        {countOfTechnologiesOnTypeOfProject.length > 0 && countOfTechnologiesOnTypeOfProject.map((data) => {
                            return (
                                <tr>
                                    <td>{data.typeName}</td>
                                    <td>{data.projectName}</td>
                                    <td>{data.technologiesOnProjectTypeCount}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>

                    <h4 className={"color-in-theme mt-3"}><i>Number of projects and employees that use the same technology</i></h4>
                    <Table striped className={"mb-4"}>
                        <thead>
                        <tr>
                            <th>Technology name</th>
                            <th>Number of projects</th>
                            <th>Number of employees</th>
                        </tr>
                        </thead>
                        <tbody>
                        {countProjectsAndEmployeesForTechnology.length > 0 && countProjectsAndEmployeesForTechnology.map((data) => {
                            return (
                                <tr>
                                    <td>{data.technologyName}</td>
                                    <td>{data.projectUsesTechnologyCount}</td>
                                    <td>{data.employeesUseTechnologyCount}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>

                    <h4 className={"color-in-theme mt-3"}><i>Employees that currently work in a team</i></h4>
                    <Table striped className={"mb-4"}>
                        <thead>
                        <tr>
                            <th>Employee name</th>
                            <th>Employee surname</th>
                            <th>Team name</th>
                            <th>Started at</th>
                            <th>Ended at</th>
                        </tr>
                        </thead>
                        <tbody>
                        {employeesThatCurrentlyWorkInTeam.length > 0 && employeesThatCurrentlyWorkInTeam.map((data) => {
                            return (
                                <tr>
                                    <td>{data.employeeName}</td>
                                    <td>{data.employeeSurname}</td>
                                    <td>{data.teamName}</td>
                                    <td>{data.dateStarted}</td>
                                    <td>{data.dateEnded}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                </div>
            </div>



        </div>
    )

}
export default Reports
