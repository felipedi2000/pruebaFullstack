import axios from "axios";

class ProjectService{

    static PRTJ_BASE_API_URL = 'http://localhost:8181/api/projects';

    static getAllProjects(){
        return axios.get(this.PRTJ_BASE_API_URL)
        .then(response => response.data)
        .catch(error =>{
			console.error("Error", error.response || error.message);
		});
    }
}

export default ProjectService;