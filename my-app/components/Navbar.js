import { readToken, removeToken } from '@/lib/authenticate';
import { useRouter } from 'next/router';
import { Navbar, Nav, Container } from "react-bootstrap";
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from "next/link";


export default function Navibar(){

    let token = readToken();

    const router = useRouter();

    function logout() {
        removeToken();
        router.push('/');
    }

    return (
              

        <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand as={Link} href="/">Quote APP {token && <>- Welcome {token.userName}</>}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link as={Link} href="/">Home</Nav.Link>
                {token && <Nav.Link as={Link} href="/favorites">Favorites</Nav.Link>}
            </Nav>
            <Nav className="ml-auto">
                {!token && <Nav.Link as={Link} href="/login">Login</Nav.Link>}
                {token && <Nav.Link onClick={logout}>Logout</Nav.Link>}
                <Nav.Link as={Link} href="/daily.">Daily Quote</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
}

