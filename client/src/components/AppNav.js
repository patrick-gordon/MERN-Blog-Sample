import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavbarToggler,
    NavLink,
    Container
} from 'reactstrap';

export default class AppNav extends Component {
    state = {
        isOpen: false
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }


    render() {
        return (
            <div>
                <Navbar color='dark' dark expand='sm' className='mb5'>
                    <Container>
                        <NavbarBrand href='/'>PatChat</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className='ml-auto' navbar>
                                <NavItem style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <NavLink href='/login'>
                                        Login
                                    </NavLink>
                                    <NavLink href='/signup'>
                                        signup
                                    </NavLink>
                                    <NavLink href='/posts'>
                                        posts
                                    </NavLink>
                                    <NavLink href='/profile'>
                                        profile
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}


