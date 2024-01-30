import React, { useState } from 'react';
import { Nav, NavbarBrand, Form, FormControl, Button } from "react-bootstrap";
import { useApi } from "./DataProvider";

const Navbar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { fetchData } = useApi();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchData('articles', undefined, searchTerm);
        fetchData('blogs', undefined, searchTerm);
    };

    return (
        <Nav>
            <NavbarBrand>
                <img className="img-fluid navImg" src="/assets/logo/logo.png" alt="an alien reading a newspaper logo" />
            </NavbarBrand>
            <Form onChange={handleSearchSubmit}>
                <FormControl 
                    type="text" 
                    placeholder="Cerca" 
                    className="mr-sm-2" 
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <Button type="submit">Cerca</Button>
            </Form>
        </Nav>
    );
}

export default Navbar;