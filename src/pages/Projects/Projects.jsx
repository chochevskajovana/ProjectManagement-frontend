import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ProjectService from "../../repository/Projects/ProjectsService";
import {Badge, Form, Modal, Table} from "react-bootstrap";
import ProjectDetailsService from "../../repository/Projects/ProjectDetailsService";
import {useNavigate} from "react-router-dom";
import Select from "react-select";
import ClientService from "../../repository/ClientsRepository/ClientService";
import "../../App.css"
import Swal from "sweetalert2";


const Projects = (props) => {

    const navigate = useNavigate();

    const [clients, setClients] = useState([]);

    const [client, setClient] = useState({});

    const toProjectPage = (project) => {
        navigate("/project/" + project.project_id, {state: {project: project}});
    };

    const [allProjects, setAllProjects] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);
    const [allProjectDetails, setAllProjectDetails] = useState([]);

    const handleClose = () => setModalShow(false);
    const handleShow = () => setModalShow(true);

    const [formData, updateFormData] = useState({
        name: "",
        description: "",
        image: "",
        dateStarted: "",
        dateFinished: "",
        isActive: false
    });

    const handleChange = (e) => {
        console.log(e)
        const {name, value, type, checked} = e.target;
        const newValue = type === "checkbox" ? checked : value;
        updateFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : newValue,
        });
    };

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

    useEffect(() => {
        getAllProjects();
        getAllProjectDetails();
        getAllClients();
    }, [])

    const getAllProjects = () => {
        ProjectService.getAllProjects().then((data) => {
            setAllProjects(data.data)
        })
    }

    const getAllProjectDetails = () => {
        ProjectDetailsService.getAllProjectDetails().then((data) => {
            setAllProjectDetails(data.data)
        })
    }

    const getAllClients = () => {
        ClientService.getAllClients().then((data) => {
            let converter = data.data.map((n) => ({
                value: n.clientId,
                label: n.clName
            }))
            setClients(converter);
        })
    }

    const handleClientChange = (selectedOption) => {
        setClient(selectedOption)
    }

    console.log(client)
    console.log(formData)

    const addNewProject = (name, description, dateStarted, dateFinished, isActive, image, clientId) => {
        ProjectService.addNewProject(name, description, dateStarted, dateFinished, isActive, image, clientId).then(() => {
            getAllProjects()
            successAlert();
        }).catch((e) => {
            console.log(e);
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault();

        const name = formData.name ? formData.name : null;
        const description = formData.description ? formData.description : null;
        const dateStarted = formData.dateStarted ? formData.dateStarted : null;
        const dateFinished = formData.dateFinished ? formData.dateFinished : null;
        const isActive = formData.isActive
        const image = formData.image ? formData.image : null;
        const clientId = client.value ? client.value : null;

        addNewProject(name, description, dateStarted, dateFinished, isActive, image, clientId);
    }

    return (
        <>
            <div className={"container my-2 d-flex"}>
                <h3 className={"color-in-theme"}><i>All Projects</i></h3>
                <Button
                    className={"px-4 py-0 ms-auto"}
                    variant="outline-success" onClick={handleShow}>
                    Add new project</Button>
            </div>

            <Modal show={modalShow} onHide={handleClose}>
                <Form onSubmit={onFormSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add new project</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text"
                                          onChange={handleChange}
                                          name={"name"}
                                          value={formData.name}
                                          placeholder="Project name"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea"
                                          rows={3}
                                          onChange={handleChange}
                                          name={"description"}
                                          value={formData.description}
                                          placeholder="Project description"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="image">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="text"
                                          onChange={handleChange}
                                          value={formData.image}
                                          name={"image"}
                                          placeholder="https://example.url"/>
                        </Form.Group>
                        <div className={"d-flex"}>
                            <Form.Group className="mb-3 me-2" controlId="dateStarted">
                                <Form.Label>Date started</Form.Label>
                                <Form.Control type="date"
                                              placeholder=""
                                              onChange={handleChange}
                                              value={formData.dateStarted}
                                              name={"dateStarted"}/>
                            </Form.Group>
                            <Form.Group className="mb-3 me-2" controlId="dateFinished">
                                <Form.Label>Date finished</Form.Label>
                                <Form.Control type="date"
                                              placeholder=""
                                              value={formData.dateFinished}
                                              name={"dateFinished"}
                                              onChange={handleChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Project is active</Form.Label>
                                <br/>
                                <input
                                    type="checkbox"
                                    name={"isActive"}
                                    value={formData.isActive}
                                    checked={formData.isActive}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </div>
                        <Form.Group className="mb-3">
                            <Form.Label>Clients for project</Form.Label>
                            <Select options={clients}
                                    onChange={handleClientChange}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type="submit" variant="success" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <div className={"container"}>
                <div className={"row"}>
                    {allProjects.map((project) => {
                        return (
                            <div className={"col-2 mb-2"}>
                                <Card key={project.projectId} className={"m-1 min_height min_width"}>
                                    <Card.Img variant="top" src={project.prImage}/>
                                    <Card.Body>
                                        <div className={"d-flex"}>
                                            <Card.Title>
                                                {project.prName}
                                            </Card.Title>
                                            <div className={"ms-auto"}>
                                                {project.isActive ? (
                                                    <Badge bg="success">active</Badge>
                                                ) : (
                                                    <Badge bg="danger">not active</Badge>
                                                )}
                                            </div>
                                        </div>
                                        <Card.Footer className={"bg-white"}>
                                            <div className={"d-flex justify-content-center"}>
                                                <Button className={"px-4 py-0 "}
                                                        variant="outline-secondary"
                                                        onClick={() => toProjectPage(project)}>
                                                    Details
                                                </Button>
                                            </div>

                                        </Card.Footer>
                                    </Card.Body>
                                </Card>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className={"container"}>
                <h3 className={"color-in-theme"}><i>Project connection details view</i></h3>
                <Table striped>
                    <thead>
                    <tr>
                        <th>Project name</th>
                        <th>Project technology</th>
                        <th>Project team name</th>
                        <th>Project type</th>
                    </tr>
                    </thead>
                    <tbody>
                    {allProjectDetails.length > 0 && allProjectDetails.map((row) => {
                        return (
                            <tr>
                                <td>{row.projectName}</td>
                                <td>{row.technologyName}</td>
                                <td>{row.teamName}</td>
                                <td>{row.typeName}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
            </div>
        </>
    )
}
export default Projects;
