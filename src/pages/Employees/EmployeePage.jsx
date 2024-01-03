import React, {useEffect, useState} from "react";
import TechnologyService from "../../repository/Technologies/TechnologyService";
import EmployeeWorksWithTechnologyService
    from "../../repository/Employees/EmployeeWorksWithTechnology/EmployeeWorksWithTechnology";
import {Form} from "react-bootstrap";
import Select from "react-select";
import {useLocation} from "react-router-dom";
import TeamService from "../../repository/Teams/TeamsService";
import EmployeeIsPartOfTeamService from "../../repository/Employees/EmployeeIsPartOfTeam/EmployeeIsPartOfTeam";
import Swal from "sweetalert2";

const EmployeePage = (props) => {

    const location = useLocation();
    const employee = location.state ? location.state.employee : null;

    const [technologies, setTechnologies] = useState([]);
    const [technology, setTechnology] = useState({});

    const [teams, setTeams] = useState([]);
    const [team, setTeam] = useState({});

    const [startDate, setStartDate] = useState({});
    const [endDate, setEndDate] = useState({});


    useEffect(() => {
        getAllTechnologies();
        getAllTeams();
    }, [])

    const successAlert = () => {
        Swal.fire({
            icon: "success",
            title: "Project added successfully!!!",
            showConfirmButton: false,
            timer: 1500
        });
    }

    const errorAlert = () => {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            showConfirmButton: false,
            timer: 1500
        });
    }

    const getAllTechnologies = () => {
        TechnologyService.getAllTechnologies().then((data) => {
            let converter = data.data.map((n) => ({
                value: n.technologyId,
                label: n.teName + ', ' + n.type
            }))
            setTechnologies(converter);
        })
    }

    const handleTechnologyChange = (selectedOption) => {
        setTechnology(selectedOption)
    }

    const addEmployeeWorksWithTechnology = (employeeId, technologyId) => {
        EmployeeWorksWithTechnologyService.addEmployeeWorksWithTechnology(employeeId, technologyId).then(() => {
            successAlert();
        }).catch(() => {
            errorAlert();
        })
    }

    const onEmployeeTechnologyFormSubmit = (e) => {
        e.preventDefault();

        const employeeId = employee.employeeId !== "" ? employee.employeeId : null;
        const technologyId = technology.value;

        console.log(employeeId)
        console.log(technologyId)

        addEmployeeWorksWithTechnology(employeeId, technologyId);
    }

    const getAllTeams = () => {
        TeamService.getAllTeams().then((data) => {
            let converter = data.data.map((n) => ({
                value: n.teamId,
                label: n.tmName
            }))
            setTeams(converter);
        })
    }

    const handleTeamChange = (selectedOption) => {
        setTeam(selectedOption)
    }

    const handleStartDateChange = (e) =>{
        setStartDate(e.target.value)
    }

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value)
    }

    const addEmployeeToTeam = (employeeId, teamId, startDate, ensDate) => {
        EmployeeIsPartOfTeamService.addEmployeeToTeam(employeeId, teamId, startDate, ensDate).then(() => {
            successAlert();
        }).catch(() => {
            errorAlert();
        })
    }

    const onEmployeeTeamFormSubmit = (e) => {
        e.preventDefault();

        const employeeId = employee.employeeId !== "" ? employee.employeeId : null;
        const teamId = team.value;

        console.log(employeeId)
        console.log(teamId)

        addEmployeeToTeam(employeeId, teamId, startDate, endDate);
    }

    return (
        <div className={"container"}>
            <div className={"row mt-4"}>
                <div className={"col-6"}>
                    <Form onSubmit={onEmployeeTeamFormSubmit}>
                        <Form.Group>
                            <Select options={teams} onChange={handleTeamChange}/>
                            <div className={"d-flex"}>
                                <input name={"dateStarted"}
                                       value={startDate}
                                       type={"date"}
                                       onChange={handleStartDateChange}
                                       className={"mt-2 me-2 form-control"}
                                />
                                <input name={"dateEnded"}
                                       value={endDate}
                                       type={"date"}
                                       onChange={handleEndDateChange}
                                       className={"mt-2 form-control"}
                                />
                            </div>
                        </Form.Group>
                        <button className={"btn btn-success mt-2"} type={"submit"}>
                            Add employee to team
                        </button>
                    </Form>
                </div>

                <div className={"col-6"}>
                    <Form onSubmit={onEmployeeTechnologyFormSubmit}>
                        <Form.Group>
                            <Select options={technologies} onChange={handleTechnologyChange}/>
                        </Form.Group>
                        <button className={"btn btn-success mt-2"} type={"submit"}>
                            Add technology to employee
                        </button>
                    </Form>
                </div>

            </div>

        </div>
    )
}
export default EmployeePage;
