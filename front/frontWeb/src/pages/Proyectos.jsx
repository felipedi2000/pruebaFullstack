///import React from 'react'
import { Box, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper} from "@mui/material"
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar"
import ProjectService from "../service/ProjectService"

export default function Proyectos() {

  const [projects, setProjects] = useState([]);


  useEffect(() => {
    ProjectService.getAllProjects()
      .then((data) => {
        const transformedData = data.map((project) => ({
          id: project.id,
          nombre: project.nameProject,
          descripcion: project.descriptionProject,
          compania: project.companyProject.nameCompany,
          nit: project.companyProject.nitCompany,
          telefono: project.companyProject.phoneCompany,
          direccion: project.companyProject.adressCompany,
          email: project.companyProject.mailCompany,
        }));
        setProjects(transformedData);
      })
      .catch((error) => {
        console.error("Error al obtener los proyectos:", error);
      });
  }, []);
  
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(to bottom right, #818f8b, #3d3336)",
        margin: -1,
      }}
    >
      <NavBar title="Proyectos" />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "satart",
          marginTop: 6,
          maxHeight: 400,
          overflowY: "auto",
        }}
      >
        <TableContainer
          component={Paper}
          sx={{ border: "solid 1px", borderRadius: "10px" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="company table">
            <TableHead sx={{ backgroundColor: "#23cf9c" }}>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Compañía</TableCell>
                <TableCell>NIT Compañía</TableCell>
                <TableCell>Teléfono Compañía</TableCell>
                <TableCell>Dirección Compañía</TableCell>
                <TableCell>Email Compañía</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((projects) => (
                <TableRow
                  key={projects.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {projects.id}
                  </TableCell>{" "}
                  <TableCell>{projects.nombre}</TableCell>
                  <TableCell>{projects.descripcion}</TableCell>
                  <TableCell>{projects.compania}</TableCell>
                  <TableCell>{projects.nit}</TableCell>
                  <TableCell>{projects.telefono}</TableCell>
                  <TableCell>{projects.direccion}</TableCell>
                  <TableCell>{projects.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};