import axios from "axios";

const insance = axios.create({
    baseURL: "http://localhost:8080/rest"
})

export default insance;
