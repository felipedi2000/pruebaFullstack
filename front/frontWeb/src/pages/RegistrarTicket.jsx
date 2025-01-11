import React from "react";
import { useState } from "react";
import { Box, Typography, TextField, Button, Alert, Autocomplete } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import TicketService from "../service/TicketService";

export default function RegistrarTicket() {

  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const [created, setCreated] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [comentarioTicket, setComentarioTicket] = useState("");
  const [estadoTicket, setEstadoTicket] = useState("");
  const [errorMsg, setErrorMsg] = useState('');
  const idHist = queryParams.get('id');


  const states = ["Activo", "En proceso", "Finalizado"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const objectDto = {
      title: titulo,
      description: descripcion,
      coment: comentarioTicket,
      createdBy: Number(localStorage.getItem("userId")),
      historyUser: Number(idHist),
      status: states.indexOf(estadoTicket) + 1
    }

    console.log(objectDto);

    if(!titulo || !descripcion || !comentarioTicket || !estadoTicket){
      setCreated(false);
      setSubmitted(true);
      setErrorMsg('Campos sin llenar');
      setTimeout(() => {
        setSubmitted(false);
      }, 1000);
      return;
    }
    
    try {
      const response = await TicketService.createTicket(objectDto);
      if (response == "ticket existente") {
        setErrorMsg("Ticket existente");
        setCreated(false);
        setSubmitted(true);
        setTitulo("");
        setDescripcion("");
        setComentarioTicket("");
        setEstadoTicket("");
        setTimeout(() => {
          setSubmitted(false);
        }, 1000);
      } else {
        setTitulo("");
        setDescripcion("");
        setComentarioTicket("");
        setEstadoTicket("");
        setSubmitted(true);
        setCreated(true);
        setTimeout(() => {
          setSubmitted(false);
          navigate("/historias");
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
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(to bottom right, #818f8b, #3d3336)",
        margin: -1,
      }}
    >
      <Box
        sx={{
          width: "30%",
          maxWidth: 500,
          padding: 3,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: 2,
          boxShadow: 2,
          boxSizing: "border-box",
          marginTop: 0,
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              marginBottom: 0,
              textAlign: "center",
            }}
          >
            Registrar Ticket
          </Typography>

          <TextField
            label="Titulo"
            type="text"
            variant="outlined"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            sx={{
              marginBottom: 0,
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

          <TextField
            id="outlined-multiline-static"
            label="Comentario"
            type="text"
            variant="outlined"
            multiline
            rows={2}
            value={comentarioTicket}
            onChange={(e) => setComentarioTicket(e.target.value)}
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
            renderInput={(params) => <TextField {...params} label="Estado" />}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: 2, borderRadius: 3 }}
          >
            Registrar
          </Button>
        </form>
        {submitted && (
          <Alert
            severity={created ? "success" : "error"}
            variant="outlined"
            sx={{ marginTop: 2, width: "80%" }}
          >
            {created ? "Usuario creado correctamente" : errorMsg}
          </Alert>
        )}
      </Box>
    </Box>
  );
}
