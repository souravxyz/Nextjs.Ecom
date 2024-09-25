import { Container, Typography } from '@mui/material'
import React from 'react'

export default function loader() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Loading...
      </Typography>
    </Container>
  )
}
