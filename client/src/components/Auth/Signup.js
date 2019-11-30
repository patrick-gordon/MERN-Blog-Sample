import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Container, 
    Alert
} from 'reactstrap';

import { register } from '../../actions/authActions';

class Signup extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        msg: null
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error) {
            //check for register error
            if(error.id === 'REGISTER_FAIL'){
                this.setState({ msg: error.msg.msg})
              } else {
                 this.setState({ msg: null });
            }
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault();

        const { username, email, password } = this.state;

        //new user object
        const newUser = {
            username,
            email, 
            password
        };

        //Attempt to register
        this.props.register(newUser);
    };

  

    render() {
        return (
            <div>
                <Container>
        {/* { this.state.msg ? ( <Alert color='danger'>{ this.state.msg } </Alert> ) : null} */}
                <Form onSubmit={this.onSubmit} >
                    <FormGroup>
                        <Label for='name'>Username</Label>
                        <Input
                            className='mb-3'
                            type='text'
                            name='username'
                            id='username'
                            placeholder="Username"
                            onChange={this.onChange}
                            />
                        <Label for='password'>Password</Label>
                        <Input
                            className='mb-3'
                            type='password'
                            name='password'
                            id='password'
                            placeholder="Password"
                            onChange={this.onChange}
                            />
                        <Label for='email'>Email</Label>
                        <Input
                            className='mb-3'
                            type='email'
                            name='email'
                            id='email'
                            placeholder="Email"
                            onChange={this.onChange}
                            />
                        <Button color='dark' style={{ width: '10rem'}} block className='mt-3'>
                            Submit
                        </Button>
                    </FormGroup>
                </Form>
                </Container>
                
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error

});

export default connect(
    mapStateToProps,
    { register }  
)(Signup);
