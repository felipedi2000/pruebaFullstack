import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Alert, Button, Autocomplete } from '@mui/material';
import UserService from '../service/UserService';

export default function Register() {
  const [created, setCreated] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [empresa, setEmpresa] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const empresas = ['Tecnología Innovadora S.A.S.', 'Soluciones IT Ltda.', 'Comercio Global S.A.'];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userDto = {
      userName: nombre,
      email: email,
      passwordHash: contrasena,
      idCompany: empresas.indexOf(empresa) + 1
    };

    if (!nombre || !email || !contrasena || !empresa) {
      setCreated(false);
      setSubmitted(true);
      setErrorMsg('Campos sin llenar');
      setTimeout(() => {
        setSubmitted(false);
      }, 1000);
      return;
    }
    //console.log(userDto);
    try{
      const savedUser = await UserService.saveUser(userDto);
      if(savedUser["id"]=='0'){
        setErrorMsg('Usuario existente');
        setCreated(false);
        setSubmitted(true);
        setNombre('');
        setEmail('');
        setContrasena('');
        setEmpresa('');
        setTimeout(() => {
          setSubmitted(false);
        }, 1000);
      } else{
        console.log(savedUser);
        setSubmitted(true);
        setCreated(true);
        setTimeout(() => {
          setSubmitted(false);
          navigate('/')
        }, 1000);
      }
    } catch(error){
      console.log("hubo un error", error);
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
        background: 'linear-gradient(to bottom right, #818f8b, #3d3336)', // Fondo con gradiente
        margin: -1,
      }}
    >
      <Box
        sx={{
          width: '30%',
          maxWidth: 500,
          padding: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
            Registrarse
          </Typography>
          <TextField
            label="Nombre"
            type="Text"
            variant="outlined"
            value={nombre}
            onChange={(e)=> setNombre(e.target.value)}
            sx={{
              marginTop: 0.5,
              width: '80%',
              display: 'flex',
              justifyContent: 'center',
            }}
          />

          <TextField
            label="Correo electrónico"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            sx={{
              marginTop: 2,
              width: '80%',
              display: 'flex',
              justifyContent: 'center',
            }}
          />

          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            value={contrasena}
            onChange={(e)=> setContrasena(e.target.value)}
            sx={{
              marginBottom: 1.5,
              marginTop: 1.5,
              width: '80%',
              display: 'flex',
              justifyContent: 'center',
            }}
          />

          <Autocomplete
            disablePortal
            options={empresas}
            value={empresa}
            sx={{ width: '80%' }}
            renderInput={(params) => <TextField {...params} label="Empresa" />}
            onChange={(e, value)=> setEmpresa(value)}
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
            Registrar
          </Button>

          {submitted && (
            <Alert
              severity={created ? 'success' : 'error'}
              variant="outlined"
              sx={{ marginTop: 2, width: '80%' }}
            >
              {created ? 'Usuario creado correctamente' : errorMsg }
            </Alert>
          )}
        </form>
      </Box>
    </Box>
  );
}
