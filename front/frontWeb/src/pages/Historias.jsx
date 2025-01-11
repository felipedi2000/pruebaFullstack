//import React from 'react'
import { Box,TableBody,TableContainer,Table, TableHead,TableRow,TableCell, Paper } from "@mui/material"
import NavBar from "../components/NavBar"
import { useNavigate } from "react-router-dom";
import HistoryUserService from "../service/HistoryUserService";
import { useState, useEffect } from "react";


export default function Historias() {

  const navigate = useNavigate();
  const [histories, setHistories] = useState([]);
  const [dataIn, setDataIn] = useState([]);

  useEffect(() => {
    // Obtener las historias
    HistoryUserService.getAllHistories()
      .then((data) => {
        console.log(data);
        const transformedData = data.map((historie) => ({
          id: historie.id,
          titulo: historie.titleHistory,
          descripcion: historie.descriptionHistory,
          creador: historie.userCreator.nameUser,
          empresa: historie.projectHistory.companyProject.nameCompany,
          proyecto: historie.projectHistory.nameProject
        }));

        setDataIn(data);
        setHistories(transformedData);
      })
      .catch((error) => {

        // como hay error cargar datos de prueba ####################################
        const transformedData = [
          {
            id: 1,
            titulo: "Historia 1",
            descripcion: "Descripción de la historia 1",
            creador: "Juan Pérez",
            empresa: "Compañía A",
            proyecto: "Proyecto A"
          },
          {
            id: 2,
            titulo: "Historia 2",
            descripcion: "Descripción de la historia 2",
            creador: "Ana Gómez",
            empresa: "Compañía B",
            proyecto: "Proyecto B"
          },
          {
            id: 3,
            titulo: "Historia 3",
            descripcion: "Descripción de la historia 3",
            creador: "Carlos Ruiz",
            empresa: "Compañía C",
            proyecto: "Proyecto C"
          }
          
        ];
        setHistories(transformedData);
        // ##########################################################
        console.error("Error al obtener los proyectos:", error);
      });

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      navigate("/dashboard", { replace: true });

    };

    window.addEventListener("popstate", handleBeforeUnload);

    return () => {
      window.removeEventListener("popstate", handleBeforeUnload);
    };
  }, [navigate]);
  
  const handleVerTickets = (id) => {

    const historia = dataIn.find((historie) => historie.id === id);

    if (historia && historia.ticketHistory) {
      const tickets = historia.ticketHistory.map((ticket) => ({
        id: ticket.id,
        title: ticket.ticketTitle,
        description: ticket.ticketDescription,
        status: ticket.ticketStatus,
        comentario: ticket.ticketComentary,
        creadoPor: ticket.userCreator.nameUser,
        historia: historia.titleHistory
      }));
      navigate('/historias/ticket', { state: { tickets: tickets } });
    } else{
      // Datos de pruebaa#######################
      const tickets =[
        {
          id: 201,
          title: "Ticket 2A",
          description: "Descripción del ticket 2A",
          status: 1,
          comentario: "Comentario 2A",
          creadoPor: "Ana Gómez",
          historia: "Historia 2"
        },
        {
          id: 202,
          title: "Ticket 2B",
          description: "Descripción del ticket 2B",
          status: 3,
          comentario: "Comentario 2B",
          creadoPor: "Ana Gómez",
          historia: "Historia 2"
        },
        {
          id: 203,
          title: "Ticket 2C",
          description: "Descripción del ticket 2C",
          status: 2,
          comentario: "Comentario 2C",
          creadoPor: "Ana Gómez",
          historia: "Historia 2"
        },
        {
          id: 204,
          title: "Ticket 2D",
          description: "Descripción del ticket 2D",
          status: 1,
          comentario: "Comentario 2D",
          creadoPor: "Ana Gómez",
          historia: "Historia 2"
        }
      ]
      
      navigate('/historias/ticket', { state: { tickets: tickets } });
      // ##############################################################

    }
  };

  const handleEditar = (id, titulo, descripcion) => {
    navigate(`/historias/editar?id=${id}&titulo=${titulo}&descripcion=${descripcion}`);
  };

  const handleAgregar = (id) => {
    navigate(`/reg/ticket?id=${id}`);
    
  }

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
      <NavBar title="Historias de Usuario"/>
      <Box sx={{display: 'flex', justifyContent:'center', alignItems:'start',}}>
      <TableContainer component={Paper} sx={{border: 'solid 1px', borderRadius: '10px', marginTop: 5, width:'100%'}}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead sx={{backgroundColor:'#23cf9c'}}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Título</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Creador</TableCell>
              <TableCell>Empresa</TableCell>
              <TableCell>Proyecto</TableCell>
              <TableCell>Tickets</TableCell>
              <TableCell>Agregat Ticket</TableCell>
              <TableCell>Editar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {histories.map((hitorie) => (
              <TableRow key={hitorie.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{hitorie.id}</TableCell>
                <TableCell>{hitorie.titulo}</TableCell>
                <TableCell>{hitorie.descripcion}</TableCell>
                <TableCell>{hitorie.creador}</TableCell>
                <TableCell>{hitorie.empresa}</TableCell>
                <TableCell>{hitorie.proyecto}</TableCell>

                <TableCell>
                  <Box 
                    sx={{
                      cursor: 'pointer', 
                      '&:hover': { textDecoration: 'underline',color: 'blue' }
                    }} 
                    onClick={() => handleVerTickets(hitorie.id)}
                  >
                    Ver Tickets
                  </Box>
                </TableCell>
                <TableCell>
                  <Box 
                    sx={{
                      cursor: 'pointer', 
                      '&:hover': { textDecoration: 'underline',color: 'blue' }
                    }} 
                    onClick={() => handleAgregar(hitorie.id)}
                  >
                    Agregar
                  </Box>
                </TableCell>
                <TableCell>
                  <Box 
                    sx={{
                      cursor: 'pointer', 
                      '&:hover': { textDecoration: 'underline',color: 'blue' }
                    }} 
                    onClick={() => handleEditar(hitorie.id, hitorie.titulo, hitorie.descripcion)}
                  >
                    Editar
                  </Box>
                </TableCell>
              </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}
