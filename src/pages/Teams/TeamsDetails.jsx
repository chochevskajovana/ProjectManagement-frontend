import React, {useEffect, useState} from 'react';
import TeamDetailsService from "../../repository/Teams/TeamDetailsService";
import {Table} from "react-bootstrap";
import "../../App.css"

const TeamsDetails = (props) => {
    const [allTeamsDetails, setAllTeamsDetails] = useState([])

    useEffect(() =>{
        getAllTeamsDetails();
    }, [])


    const getAllTeamsDetails = () => {
        TeamDetailsService.getAllTeamsDetails().then((data) => {
            setAllTeamsDetails(data.data)
        })
    }

    return(
        <div className={"container"}>
            <h3 className={"my-2 color-in-theme"}><i>Teams connection details view</i></h3>
            <Table striped>
                <thead>
                <tr>
                    <th>Team name</th>
                    <th>Employee name</th>
                    <th>Employee surname</th>
                    <th>Project name</th>
                </tr>
                </thead>
                <tbody>
                {allTeamsDetails.map((teams) =>{
                    return(
                        <tr>
                            <td>{teams.teamName}</td>
                            <td>{teams.employeeName}</td>
                            <td>{teams.employeeSurname}</td>
                            <td>{teams.projectName}</td>
                        </tr>
                    );
                })}
                </tbody>
            </Table>
        </div>
    )
}
export default TeamsDetails;
