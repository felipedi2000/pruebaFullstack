import React, { useState } from "react";
import {
  Box,
  TextField,
  Alert,
  Typography,
  Autocomplete,
  Button,
} from "@mui/material";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import HistoryUserService from "../service/HistoryUserService";

export default function RegistrarHistoria() {
  const [created, setCreated] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [proyecto, setProyecto] = useState("");
  const [tituloTicket, setTituloTicket] = useState("");
  const [descripcionTicket, setDescripcionTicket] = useState("");
  const [estadoTicket, setEstadoTicket] = useState("");
  const [comentarioTicket, setComentarioTicket] = useState("");
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const states = ["Activo", "En proceso", "Finalizado"];

  const proyectos = [
    "E-commerce Platform",
    "Gestión de Inventarios",
    "Aplicación Móvil",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const objectDto = {
      titleHistory: titulo,
      descriptionHistory: descripcion,
      historyCreatedBy: Number(localStorage.getItem("userId")),
      idProject: Number(proyectos.indexOf(proyecto)+1),
      titleTicket: tituloTicket,
      descriptionTicket: descripcionTicket,
      ticketComent: comentarioTicket
    };

    console.log(objectDto);

    if (!titulo || !descripcion || !proyecto || !tituloTicket || !descripcionTicket || !estadoTicket || !comentarioTicket) {
      setCreated(false);
      setSubmitted(true);
      setErrorMsg("Campos sin llenar");
      setTimeout(() => {
        setSubmitted(false);
      }, 1000);
      return;
    }

    try {
      const response = await HistoryUserService.saveHitoryTicket(objectDto);
      if (response == "History not add") {
        setErrorMsg("Historia no agregada");
        setCreated(false);
        setSubmitted(true);
        setTitulo("");
        setDescripcion("");
        setComentarioTicket("");
        setEstadoTicket("");
        setTimeout(() => {
          setSubmitted(false);
        }, 1000);
      } else if (response == "ticket add"){
        setTitulo("");
        setDescripcion("");
        setComentarioTicket("");
        setEstadoTicket("");
        setSubmitted(true);
        setCreated(true);
        setTimeout(() => {
          setSubmitted(false);
          navigate("/Dashboard");
        }, 1000);
      }
    } catch (error) {
      console.log("hubo un error", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "100%",
        background: "linear-gradient(to bottom right, #818f8b, #3d3336)",
        margin: -1,
      }}
    >
      <NavBar title="Registrar Historia" />

      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "start",
            backgroundColor: "white",
            marginTop: 5,
            borderRadius: "8px",
            padding: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginBottom: 0,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  marginBottom: 2.5,
                  textAlign: "center",
                }}
              >
                Registrar Historia
              </Typography>
            </Box>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 2,
              }}
            >
              <Box sx={{ width: "48%" }}>
                <TextField
                  label="Titulo"
                  type="text"
                  variant="outlined"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  sx={{
                    marginBottom: 2,
                    marginTop: 2,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                />
                <TextField
                  id="outlined-multiline-static"
                  label="Descripción"
                  type="text"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  sx={{
                    marginTop: 2,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                />
                <Autocomplete
                  disablePortal
                  options={proyectos}
                  sx={{ width: "100%", marginTop: 2 }}
                  value={proyecto}
                  onChange={(e, value) => setProyecto(value)}
                  renderInput={(params) => (
                    <TextField {...params} label="Proyecto" />
                  )}
                />
              </Box>
              <Box sx={{ width: "48%" }}>
                <TextField
                  label="Titulo ticket"
                  type="text"
                  variant="outlined"
                  value={tituloTicket}
                  onChange={(e) => setTituloTicket(e.target.value)}
                  sx={{
                    marginBottom: 2,
                    marginTop: 2,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                />
                <TextField
                  id="outlined-multiline-static"
                  label="Descripción Ticket"
                  type="text"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={descripcionTicket}
                  onChange={(e) => setDescripcionTicket(e.target.value)}
                  sx={{
                    marginTop: 2,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                />
                <Autocomplete
                  disablePortal
                  options={states}
                  value={estadoTicket}
                  onChange={(e, value) => setEstadoTicket(value)}
                  sx={{ width: "100%", marginTop: 2 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Estado" />
                  )}
                />
              </Box>
            </Box>

            <Box
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
              <TextField
                id="outlined-multiline-static"
                label="Comentario ticket"
                type="text"
                variant="outlined"
                multiline
                rows={1}
                value={comentarioTicket}
                onChange={(e) => setComentarioTicket(e.target.value)}
                sx={{
                  marginTop: 2,
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              />
            </Box>
            <Box
              sx={{ width: "100%", display: "flex", alignItems:'center', justifyContent: "center" , flexDirection: 'column'}}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ marginTop: 2, borderRadius: 3, width: "80%" }}
              >
                Registrar Historia
              </Button>
              {submitted && (
                <Alert
                  severity={created ? "success" : "error"}
                  variant="outlined"
                  sx={{ marginTop: 2, width: "40%" }}
                >
                  {created ? "Usuario creado correctamente" : errorMsg}
                </Alert>
              )}
            </Box>
          </Box>
        </Box>
      </form>
    </Box>
  );
}
