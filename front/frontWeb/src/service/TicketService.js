import axios from "axios";

class TicketService {
  static TCK_BASE_API_URL = "http://localhost:8181/api/ticket";

//   getAllTickets() {
//     return axios
//       .get(this.TCK_BASE_API_URL)
//       .then((response) => response.data)
//       .catch((error) => {
//         console.error("Error", error.response || error.message);
//       });
//   }

  createTicket(userDto) {
    return axios
      .post(`${TicketService.TCK_BASE_API_URL}/save`, userDto)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error al crear el ticket:", error.response.data);
        } else if (error.request) {
          console.error("No se recibió respuesta del servidor:", error.request);
        } else {
          console.error("Error de configuración de solicitud:", error.message);
        }
        return null;
      });
  }

  updateTicket(tickDto) {
    return axios
      .put(`${TicketService.TCK_BASE_API_URL}/update`, tickDto)
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
}

export default new TicketService();