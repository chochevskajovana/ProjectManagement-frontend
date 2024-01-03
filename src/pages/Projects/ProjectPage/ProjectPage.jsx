import {useLocation} from "react-router-dom";
import {Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import TechnologyService from "../../../repository/Technologies/TechnologyService";
import Select from "react-select";
import ProjectUsesTechnology from "../../../repository/Projects/ProjectUsesTechnology/ProjectUsesTechnology";
import TeamWorksOnProjectService from "../../../repository/Teams/TeamWorksOnProject/TeamWorksOnProject";
import TeamService from "../../../repository/Teams/TeamsService";
import Swal from "sweetalert2";

const ProjectPage = (props) => {

    const location = useLocation();
    const project = location.state ? location.state.project : null;

    const [technologies, setTechnologies] = useState([]);
    const [technology, setTechnology] = useState({});

    const [teams, setTeams] = useState([]);
    const [team, setTeam] = useState({});


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

    const addProjectUsesTechnology = (projectId, technologyId) => {
        ProjectUsesTechnology.addProjectUsesTechnology(projectId, technologyId).then(() => {
            successAlert();
        }).catch(() => {
            errorAlert();
        })
    }

    const onProjectTechnologyFormSubmit = (e) => {
        e.preventDefault();

        const projectId = project.projectId !== "" ? project.projectId : null;
        const technologyId = technology.value;

        console.log(projectId)
        console.log(technologyId)

        addProjectUsesTechnology(projectId, technologyId);
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

    const addTeamWorksOnProject = (projectId, teamId) => {
        TeamWorksOnProjectService.addTeamWorksOnProject(projectId, teamId).then(() => {
            successAlert();
        }).catch(() => {
            errorAlert();
        })
    }

    const onTeamProjectFormSubmit = (e) => {
        e.preventDefault();

        const projectId = project.projectId !== "" ? project.projectId : null;
        const teamId = team.value;

        console.log(projectId)
        console.log(teamId)

        addTeamWorksOnProject(projectId, teamId);
    }

    return (
        <div className={"container"}>
            <div className={"row mt-4"}>
                <div className={"col-6 mt-4"}>
                    <div className={"border-1"}>
                        <h4>Details for the project: <b>{project.prName}</b></h4>
                        <p>{project.prDescription}</p>
                        <div className={"row"}>
                            <div className={"col-6"}><p>Date started: {project.dateStarted}</p></div>
                            <div className={"col-6"}><p>Date finished: {project.dateFinished}</p></div>
                        </div>
                    </div>
                </div>

                <div className={"col-6"}>
                    <div className={"row"}>
                        <div className={"col-12 mt-2"}>
                            <Form onSubmit={onProjectTechnologyFormSubmit}>
                                <Form.Group>
                                    <Select options={technologies} onChange={handleTechnologyChange}/>
                                </Form.Group>
                                <button className={"btn btn-success mt-2"} type={"submit"}>
                                    Add technology to project
                                </button>
                            </Form>
                        </div>
                        <div className={"col-12 mt-2"}>
                            <Form onSubmit={onTeamProjectFormSubmit}>
                                <Form.Group>
                                    <Select options={teams} onChange={handleTeamChange}/>
                                </Form.Group>
                                <button className={"btn btn-success mt-2"} type={"submit"}>
                                    Add team that works on project
                                </button>
                            </Form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectPage;
