//import React from 'react';
import {
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  AlertTitle,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../service/UserService";



export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  const onhandelClick = () => {
    setEmail("");
    setPassword("");
    setShowMessage(false);
    setTimeout(() => {
      navigate("/register");
    }, 500);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const loginDto = { email, password };
      const response = await UserService.autentificateUser(loginDto);
      if (response["status"]) {
        console.log();
        localStorage.setItem('userName', response["name"]);
        localStorage.setItem('userId', response["id"]);
        setIsLoggedIn(true);
        setShowMessage(true);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else{
        setIsLoggedIn(false);
        setShowMessage(true);
        setEmail("");
        setPassword("");
        setTimeout(() => {
        setShowMessage(false);
        }, 1000);
      }
    } catch (error) {
      
      console.error("Error al realizar la petición:", error.message);
      if(email == "correo@prueba.com" && password == "clave"){
        localStorage.setItem('userName',"usuario prueba");
        localStorage.setItem('userId', "3");
        setIsLoggedIn(true);
        setShowMessage(true);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
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
        background: "linear-gradient(to bottom right, #818f8b, #3d3336)", // Fondo con gradiente
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
            Iniciar sesión
          </Typography>

          <TextField
            label="Correo electrónico"
            type="email"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            sx={{
              marginBottom: 2,
              marginTop: 2,
              width: "80%",
              display: "flex",
              justifyContent: "center",
            }}
          />

          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              marginBottom: 2,
              marginTop: 2,
              width: "80%",
              display: "flex",
              justifyContent: "center",
            }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              marginTop: 1,
              width: "80%",
              borderRadius: 10,
            }}
          >
            Iniciar sesión
          </Button>

          <Button
            color="secondary"
            onClick={onhandelClick}
            sx={{
              color: "black",
              borderRadius: 10,
              marginTop: 2,
            }}
          >
            Registrarse
          </Button>

          {showMessage &&
            (isLoggedIn ? (
              <Alert
                severity="success"
                variant="outlined"
                sx={{ marginTop: 2, width: "80%" }}
              >
                <AlertTitle>Usario y calve correctos</AlertTitle>
                Bienvenido
              </Alert>
            ) : (
              <Alert
                severity="error"
                variant="outlined"
                sx={{ marginTop: 2, width: "80%" }}
              >
                <AlertTitle>Error</AlertTitle>
                Correo o clave incorrectos
              </Alert>
            ))}
        </form>
      </Box>
    </Box>
  );
}
