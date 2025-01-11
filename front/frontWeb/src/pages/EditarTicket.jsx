import React from 'react'
import { useState } from 'react';
import { Box, Typography, TextField, Alert, Button,Autocomplete} from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom';
import TicketService from '../service/TicketService';
import { use } from 'react';

export default function EditarTicket() {
  const [created, setCreated] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idTick = queryParams.get('id');
  const [titulo, setTitulo] = useState(queryParams.get('titulo') || ''); 
  const [descripcion, setDescripcion] = useState(queryParams.get('descripcion') || ''); 
  const [estado, setEstado] = useState(queryParams.get('estado' || ''));
  const [comentario, setComentario] = useState(queryParams.get('comentario' || ''));


  const states = ['Activo', 'En proceso', 'Finalizado'];
  const [estadoSelect, setEstadoSelect] = useState(states[estado - 1] || '');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const dataDto = {
      id: Number(idTick),
      title: titulo,
      description: descripcion,
      coment: comentario,
      status: Number(estado),
    };
  
    console.log(dataDto);
  
    if (!titulo || !descripcion || !estado || !comentario) {
      setCreated(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
      }, 1000);
      return;
    }
  
    try {
      const response = await TicketService.updateTicket(dataDto);
      
      if (response) {
        setCreated(true);
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          navigate('/historias');
        }, 1500);
        console.log('Ticket actualizado', response);
      } else {
        throw new Error('No se recibieron datos actualizados');
      }
    } catch (error) {
      console.error("Error al actualizar la historia:", error);
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
          width: "100%",
          maxWidth: 500,
          padding: 3,
          backgroundColor: "rgba(255, 255, 255, 1)",
          borderRadius: 2,
          boxShadow: 2,
          boxSizing: "border-box",
          margin: 0,
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
              marginBottom: 2.5,
              textAlign: "center",
            }}
          >
            Editar Ticket
          </Typography>
          <TextField
            label="Título"
            type="text"
            variant="outlined"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            sx={{
              marginTop: 0,
              width: "90%",
              display: "flex",
              justifyContent: "center",
            }}
          />

          <TextField
            id="outlined-multiline-static"
            label="Descripción"
            type="text"
            variant="outlined"
            value={descripcion}
            multiline
            rows={4}
            onChange={(e) => setDescripcion(e.target.value)}
            sx={{
              marginTop: 2,
              width: "90%",
              display: "flex",
              justifyContent: "center",
            }}
          />

          
          <TextField
            id="outlined-multiline-static"
            label="Comentario"
            type="text"
            variant="outlined"
            value={comentario}
            multiline
            rows={3}
            onChange={(e) => setComentario(e.target.value)}
            sx={{
              marginTop: 2,
              width: "90%",
              display: "flex",
              justifyContent: "center",
            }}
          />
  
          <Autocomplete
            value={estadoSelect}
            disablePortal
            options={states}
            sx={{ width: "90%" , marginTop: 2}}
            onChange={(e, value) => {
              setEstadoSelect(value);
              setEstado(states.indexOf(value) + 1);
            }}
            renderInput={(params) => <TextField {...params} label="Estado" />}
          />
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              marginTop: 2,
              width: "80%",
              borderRadius: 10,
            }}
          >
            Actualizar
          </Button>

          {submitted && (
            <Alert
              severity={created ? 'success' : 'error'}
              variant="outlined"
              sx={{ marginTop: 2, width: '80%' }}
            >
              {created ? 'Actualizado Correctamente' : 'Campos vacios'}
            </Alert>
          )}
        </form>
      </Box>
    </Box>
  );
}
