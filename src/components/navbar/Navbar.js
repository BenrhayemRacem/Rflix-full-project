import {Container, Nav, Navbar} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";
import {useGlobalContext} from "../../globalContext/GlobalContext";
import {FiSearch} from "react-icons/fi";


 export const Navbars = ()=> {
const {token ,logout ,handleShow} =useGlobalContext() ;
const history = useHistory()
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#">Rflix</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/">Home</Link>
                        <Link to="/explore">Explore</Link>



                    </Nav>

                    {!token && (
                        <>
                            <button>
                                <Link to="/login">
                                    login
                                </Link>
                            </button>
                            <button>
                                <Link to="/register">
                                    Register
                                </Link>
                            </button>
                        </>
                    )}
                    {token && (
                        <>
                            <Link to="/profile"> profile</Link>
                        <button onClick={()=>{
                            console.log("logging out");
                            history.push("/");
                            logout();

                        }} >Logout</button>

                        </>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
