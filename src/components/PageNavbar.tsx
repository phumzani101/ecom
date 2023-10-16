"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function PageNavbar() {
  const { data, status } = useSession();
  return (
    <Navbar expand="lg" bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand href="/" as={Link}>
          🛒 Ecom
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Form className="d-flex me-auto my-2 my-lg-0">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Nav
            className="my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="#action1" as={Link}>
              Home
            </Nav.Link>
            <Nav.Link href="#action2" as={Link}>
              Link
            </Nav.Link>
            {status === "unauthenticated" ? (
              <NavDropdown
                title="Account"
                id="navbarScrollingDropdown"
                align="end"
              >
                <NavDropdown.Item href="/signin" as={Link}>
                  Sign In
                </NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item href="/signup" as={Link}>
                  Sign Up
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown
                title={`${data?.user?.name}`}
                id="navbarScrollingDropdown"
                align="end"
              >
                <NavDropdown.Item href="/profile" as={Link}>
                  Profile
                </NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item
                  href="#!"
                  as={Link}
                  onClick={() => signOut({ callbackUrl: "/signin" })}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default PageNavbar;
