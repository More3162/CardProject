import { Container, Typography } from "@mui/material";
import React from "react";
import PageHeader from "../components/PageHeader";

export default function AboutPage() {
  return (
    <Container>
      <PageHeader
        title="About Page"
        subtitle="On this page you can find explanations about using the application"
      />
      <Container
        sx={{
          mt: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Container sx={{ flex: 1, mr: 2 }}>
          <Typography variant="body1" paragraph>
            Welcome to our Business Cards platform!
          </Typography>
          <Typography variant="body1" paragraph>
            This project is designed to provide a seamless experience for managing and showcasing business cards. Users can explore a comprehensive database of available cards, register to become business users, and create their own custom cards. Our platform also allows users to add cards to their favorites, which can be viewed on a dedicated favorites page. Each feature, from card creation to favorites management, has its own intuitive page for a smooth user experience.
          </Typography>
          <Typography variant="body1" paragraph>
            Our website is powered by React, offering a dynamic and responsive user interface. We incorporate Material-UI (MUI) for a sleek, modern design, and use vanilla JavaScript for essential functionality. By following Object-Oriented Programming (OOP) principles, we ensure that our code remains clean, modular, and maintainable. Additionally, we utilize LocalStorage for efficient data handling, and rely on JSON Web Tokens (JWT) to provide secure user authentication and authorization.
          </Typography>
          <Typography variant="body1">
            Thank you for visiting, and we hope you enjoy using our platform to create and manage your business cards!
          </Typography>
        </Container>
        <Container sx={{ flex: 1 }}>
          <img
            src="/images/card.png"
            alt="Card"
            style={{ width: "100%", maxWidth: 400 }}
          />
        </Container>
      </Container>
    </Container>
  );
}
