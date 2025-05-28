import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-3 mt-4">
      <Container className="text-center">
        <p className="mb-0">© {new Date().getFullYear()} E-Commerce CI/CD Demo Application</p>
        <p className="small mb-0">Created for CI/CD demonstration purposes</p>
      </Container>
    </footer>
  );
};

export default Footer;
