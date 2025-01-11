//import React from 'react'
import { Box } from "@mui/material"
import NavBar from "../components/NavBar"
import CardComponent from "../components/CardComponent";
import image1 from "../assets/project.jpg"
import image2 from "../assets/usuario.jpg"
import image3 from "../assets/ticket.png"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const name = localStorage.getItem("userName");
  const title = "Bienvenido " + name;

  const navigate = useNavigate();

  useEffect(() => {

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      localStorage.clear();
      navigate("/", { replace: true });
    };

    window.addEventListener("popstate", handleBeforeUnload);

    return () => {
      window.removeEventListener("popstate", handleBeforeUnload);
    };
  }, [navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(to bottom right, #818f8b, #3d3336)',
        margin: -1
      }}
    >
      <NavBar title={title}/>
      <Box sx={{display: 'flex', justifyContent:'center', alignItems:'center', flex: 1}}>
      <CardComponent
        title="Proyectos"
        route="/proyectos"
        imageUrl={image1}
      />
      <CardComponent
        title="Historias de usuario"
        route="/historias"
        imageUrl={image2}
      />
      <CardComponent
        title="Registrar historia"
        route="/reg/historia"
        imageUrl={image3}
      />
      </Box>
    </Box>
  )
}
