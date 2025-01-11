import { Card, CardContent, Typography, Button, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';



const CardComponent = ({ title, imageUrl, route }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(route);
  };

  return (
    <Card sx={{ minWidth: 275, margin: 2 , backgroundColor: '#30a381', border: 'solid 2px', borderRadius: '8px'}}>
      <CardMedia
        component="img"
        alt={title}
        height="100"
        image={imageUrl}
        sx={{
            height:250
        }}
      />
      <CardContent>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Button onClick={handleNavigation} variant="contained" color="primary" sx={{marginTop:1.5}}>
          Ir a {title}
        </Button>
      </CardContent>
    </Card>
  );
};

CardComponent.propTypes = {
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
};

export default CardComponent;
