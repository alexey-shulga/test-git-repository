import React, {useContext, useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import {useHTTP} from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook';
import {AuthContext} from '../context/auth.context';

export const AuthPage = () => {

    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, error, request, clearError} = useHTTP();
    const [form, setForm] = useState({
        email: '', password: ''
    });

    useEffect( () => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const changeHandler = event => {
        setForm({ ...form,
            [event.target.name]: event.target.value,
            lastLoginDate: new Date().toLocaleString()
        });
    };

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            auth.login(data.token, data.userID, data.userNAME);
        } catch (e) { }
    }

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>Auth page</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <NavLink to="/register"><Button variant="outline-light">Register</Button></NavLink>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="AuthPageCSS">
            <Card style={{ width: '100%' }}>
                <Card.Body>
                    <Card.Title>Enter your E-mail & password</Card.Title>
                    <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>Email</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="email" name="email" onChange={changeHandler} placeholder="Email" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>Password</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="password" name="password" onChange={changeHandler} placeholder="Password" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Col sm={{span: 10, offset: 2}}>
                        <Button variant="outline-dark" onClick={loginHandler}>Login</Button>
                        </Col>
                    </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
            </div>
        </div>
    )
};