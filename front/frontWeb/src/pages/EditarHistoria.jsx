import { useState } from 'react';
import { TextField, Box, Typography, Button, Alert } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import HistoryUserService from '../service/HistoryUserService';

export default function EditarHistoria() {
  const [created, setCreated] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  
  const queryParams = new URLSearchParams(location.search);
  const idHist = queryParams.get('id');
  const [titulo, setTitulo] = useState(queryParams.get('titulo') || '');
  const [descripcion, setDescripcion] = useState(queryParams.get('descripcion') || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataDto ={
      id: idHist,
      titleHistory: titulo,
      descriptionHistory: descripcion
    }

    if(!titulo || !descripcion){
      setCreated(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
      }, 1000);
      return;
    }
    try {
      const updatedHistory = await HistoryUserService.updateHitory(dataDto);
      setCreated(true);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        navigate('/historias')
      }, 1500);
      console.log("Historia actualizada con éxito:", updatedHistory);
    } catch (error) {
      console.error("Error al actualizar la historia:", error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(to bottom right, #818f8b, #3d3336)',
        margin: -1,
      }}
    >
      <Box
        sx={{
          width: '60%',
          maxWidth: 500,
          padding: 3,
          backgroundColor: 'rgba(255, 255, 255, 1)',
          borderRadius: 2,
          boxShadow: 2,
          boxSizing: 'border-box',
          margin: 0,
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            

          }}
        >
          <Typography
            variant="h4"
            sx={{
              marginBottom: 2.5,
              textAlign: 'center',
            }}
          >
            Editar historia
          </Typography>
          <TextField
            label="Título"
            type="text"
            variant="outlined"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            sx={{
              marginTop: 0.5,
              width: '80%',
              display: 'flex',
              justifyContent: 'center',
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
              width: '80%',
              display: 'flex',
              justifyContent: 'center',
            }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              marginTop: 2,
              width: '80%',
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
