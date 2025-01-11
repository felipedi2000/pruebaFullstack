import { AppBar, Box, Button, Toolbar, Typography, Avatar } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';


export default function NavBar({title}) {

  const navigate = useNavigate();

  const onHandleClik = () => {
    localStorage.clear();
    navigate('/');
  }
  return (
    <Box sx={{ width: '100%'}}>
      <AppBar position="static" sx={{backgroundColor: '#157457'}}>
        <Toolbar >
        <Avatar sx={{ marginRight: 2 }}>
          {title.charAt(11)}
        </Avatar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Button onClick={onHandleClik} color="inherit">Salir</Button>
        </Toolbar>
      </AppBar>
  </Box>
  )
}

NavBar.propTypes = {
  title: PropTypes.string.isRequired
};
