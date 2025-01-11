import { Box, TableBody, TableContainer, Table, TableHead, TableRow, TableCell, Paper } from "@mui/material";
import NavBar from "../components/NavBar";
import { useNavigate, useLocation } from "react-router-dom";

export default function TicketsHistoria() {
  const navigate = useNavigate();
  const location = useLocation();
  const tickets = location.state?.tickets || [];

  const handleEditar = (id, titulo, descripcion,status,comentario,creadoPor) => {
    navigate(
      `/ticket/editar?id=${id}&titulo=${titulo}&descripcion=${descripcion}&estado=${status}&comentario=${comentario}&creador=${creadoPor}`
    );
  };

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
      <NavBar title= {`Tickets de la Historia ${tickets[0].historia}`} />
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "start" }}
      >
        <TableContainer
          component={Paper}
          sx={{ border: "solid 1px", borderRadius: "10px", marginTop: 5, whidt:8}}
        >
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead sx={{ backgroundColor: "#23cf9c" }}>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Título</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Comentario</TableCell>
                <TableCell>Creado por</TableCell>
                <TableCell>Editar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tickets.length > 0 ? (
                tickets.map((ticket) => (
                  <TableRow
                    key={ticket.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{ticket.id}</TableCell>
                    <TableCell>{ticket.title}</TableCell>
                    <TableCell>{ticket.description}</TableCell>
                    <TableCell>{ticket.status === 1 ? "Activo" : ticket.status === 2 ? "En Proceso" : ticket.status === 3 ? "Finalizado" : "Desconocido"}</TableCell>
                    <TableCell>{ticket.comentario}</TableCell>
                    <TableCell>{ticket.creadoPor}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          cursor: "pointer",
                          "&:hover": {
                            textDecoration: "underline",
                            color: "blue",
                          },
                        }}
                        onClick={() =>
                          handleEditar(
                            ticket.id,
                            ticket.title,
                            ticket.description,
                            ticket.status,
                            ticket.comentario,
                            ticket.creadoPor
                          )
                        }
                      >
                        Editar
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No hay tickets disponibles para esta historia.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
