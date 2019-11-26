import React, { Component } from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap';
import { connect } from 'react-redux';
import { addPost } from '../actions/postActions'

class postModal extends Component {
    state = {
        isOpen: false,
        modal: false,
        title: '',
        body: ''
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    onChange1 = e => {
        this.setState({ [e.target.title]: e.target.value })
    }

    onChange2 = e => {
        this.setState({ [e.target.body]: e.target.value })
    }


    render() {
        return (
            <div>
                <Button
                    color='green'
                    style={{margin: '3rem'}}
                    onClick={this.toggle}
                >Add Post
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add A Post</ModalHeader>
                    <ModalBody>
                    <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for='title'>title</Label>
                                <Input 
                                    type='text'
                                    title='title' //match state
                                    // id='item'
                                    placeholder='Add Title For Post'
                                    onChange={this.onChange1}
                                 />
                                <Label for='post'>post</Label>
                                    <Input 
                                        type='textarea'
                                        body='body' //match state
                                        // id='item'
                                        placeholder='Add Post'
                                        onChange={this.onChange2}
                                />
                            </FormGroup>
                    </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default connect(mapStateToProps, )(postModal)
