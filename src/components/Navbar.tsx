import { Nav, NavDropdown, NavItem, NavbarBrand } from "react-bootstrap";


const Navbar: React.FC  = ({ }) => {
    return(
        <Nav>
            <NavbarBrand>
                <img className="img-fluid navImg" src="/assets/logo/logo.png" alt="an alien reading a newspaper logo" />
            </NavbarBrand>
            <NavItem>


            </NavItem>
                <img className="img-fluid navImg" src="/assets/logo/logo2.png" alt="an alien reading a newspaper logo" />
        </Nav>
        
    )


}

export default Navbar;