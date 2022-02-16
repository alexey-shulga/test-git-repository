import React, {useEffect, useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import {useHTTP} from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook';

export const RegPage = () => {

    const navigate = useNavigate();
    const message = useMessage();
    const {loading, error, request, clearError} = useHTTP();
    const [form, setForm] = useState({
        email: '', password: '', name: ''
    });
    
   useEffect( () => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const changeHandler = event => {
        setForm({...form, 
            [event.target.name]: event.target.value,
            registrationDate: new Date().toLocaleString(),
            lastLoginDate: new Date().toLocaleString(),
            userStatus: true
        });
    };

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            message(data.message);
            navigate('/login');
        } catch (e) {

        }
    }

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>Reg page</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <NavLink to="/login"><Button variant="outline-light">Login</Button></NavLink>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="AuthPageCSS">
            <Card style={{ width: '100%' }}>
                <Card.Body>
                    <Card.Title>Enter your info</Card.Title>
                    <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>Your E-mail</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="email" name="email" onChange={changeHandler} placeholder="Email" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>Set password</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="password" name="password" onChange={changeHandler} placeholder="Password" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
                        <Form.Label column sm={2}>Your name</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text"  name="name" onChange={changeHandler} placeholder="Your name" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Col sm={{span: 10, offset: 2}}>
                        <Button variant="outline-dark" onClick={registerHandler}>Register</Button>
                        </Col>
                    </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
            </div>
        </div>
    )
};