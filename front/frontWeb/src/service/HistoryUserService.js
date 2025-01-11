import axios from "axios";
class HistoryUserService {
  static HIS_BASE_API_URL = "http://localhost:8181/api/histories";

  getAllHistories() {
    return axios
      .get(HistoryUserService.HIS_BASE_API_URL)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response) {
          console.error(
            "Error en la respuesta del servidor:",
            error.response.data
          );
        } else if (error.request) {
          console.error("No se recibió respuesta del servidor:", error.request);
        } else {
          console.error("Error al configurar la solicitud:", error.message);
        }
      });
  }

  updateHitory(hitsDto){
    return axios
      .put(`${HistoryUserService.HIS_BASE_API_URL}/update`, hitsDto)
      .then((response) => {
        console.log("Historia actualizada:", response.data);
        return response.data;
      })
      .catch((error) => {
        if (error.response) {
          console.error(
            "Error en la respuesta del servidor:",
            error.response.data
          );
        } else if (error.request) {
          console.error("No se recibió respuesta del servidor:", error.request);
        } else {
          console.error("Error al configurar la solicitud:", error.message);
        }
      });
  }

  saveHitoryTicket(objDto){
    return axios.post(`${HistoryUserService.HIS_BASE_API_URL}/saveHistTick`, objDto)
    .then((response) => {
      console.log("Historia creada:", response.data);
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        console.error(
          "Error en la respuesta del servidor:",
          error.response.data
        );
      } else if (error.request) {
        console.error("No se recibió respuesta del servidor:", error.request);
      } else {
        console.error("Error al configurar la solicitud:", error.message);
      }
    });
  }
}

export default new HistoryUserService();