import axios from "../../axios/axios";

const ClientService = {

    getAllClients: () => {
        return axios.get("/client/getAll");
    }

}

export default ClientService;
