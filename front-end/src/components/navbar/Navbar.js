import {Container, Nav, Navbar} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";
import {useGlobalContext} from "../../globalContext/GlobalContext";
import styles from "./navbar.module.css"



 export const Navbars = ()=> {
const {token ,logout } =useGlobalContext() ;
const history = useHistory()
    return (
        <Navbar bg="light" expand="lg" className={styles.navbarStyle}>
            <Container>
                <Navbar.Brand href="#">Rflix</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className={`me-auto ${styles.inNavLinks}`}>
                        <Link to="/" >Home</Link>
                        <Link to="/explore">Explore</Link>



                    </Nav>

                    {!token && (
                        <>
                                <div className={styles.outNavLinks}>
                                <Link to="/login">
                                    login
                                </Link>
                                </div>
                                <div className={styles.outNavLinks}>
                                <Link to="/register">
                                    Register
                                </Link>
                                </div>
                        </>
                    )}
                    {token && (
                        <>
                            <div className={styles.outNavLinks}>
                            <Link to="/profile"> profile</Link>
                            </div>
                        <div  className={styles.logout} onClick={()=>{

                            history.push("/");
                            logout();

                        }} >Logout</div>

                        </>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
