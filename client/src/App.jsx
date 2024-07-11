import React from 'react';
import { Container, Typography, Button } from '@mui/material';

function App() {
  return (
    <Container>
      <Typography variant="h1" component="h2">
        Welcome to MERN Stack with Vite + React and Material-UI
      </Typography>
      <Button variant="contained" color="primary">
        Hello World
      </Button>
    </Container>
  );
}

export default App;
