import React, {useContext} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import {AuthContext} from '../context/auth.context';
import {useNavigate} from 'react-router-dom';
import UsersList from './UsersList';

export const TablePage = () => {

  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const logoutHandler = event => {
    event.preventDefault();
    auth.logout();
    navigate('/auth');
  }

    return (
        <div>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>Welcome, {auth.userNAME} </Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Button variant="outline-light" onClick={logoutHandler}>Logout</Button>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <UsersList/>
        </div>
      )
};