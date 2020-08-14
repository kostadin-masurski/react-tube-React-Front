import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import styles from './index.module.css';
import PageLayout from '../../components/core/page-layout';
import Title from '../../components/core/title';
import AddSong from '../add-song'

class EditPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlist: "",
            imgUrl: "",
            showForm: false,
            newSongButtonText: "Add New Song"
        }
    }

    onChange = (ev, type) => {
        const newState = {};
        newState[type] = ev.target.value;
        this.setState(newState);
    }

    toggleAddForm = () => {
        if(this.state.showForm) {
            this.setState(
                { showForm: false, newSongButtonText: "Add New Song" }
            )
        } else {
            this.setState(
                { showForm: true, newSongButtonText: "Hide Add Form" }
            )
        }
    }

    render() {
        const { playlist, imgUrl } = this.state;

        return (
            <PageLayout>
                <Form className={styles["form-container"]}>
                    <Title title="Edit your playlist"/>
                    <Form.Group controlId="formBasicPlaylist">
                        <Form.Label>Usename</Form.Label>
                        <Form.Control onChange={(e) => this.onChange(e, playlist)} type="imgUrl" placeholder="My playlist is ..." />
                        <Form.Text className="text-danger">Playlist msg</Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicImgUrl">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control onChange={(e) => this.onChange(e, imgUrl)} type="imgUrl" placeholder="https://..." />
                        <Form.Text className="text-danger">ImgUrl msg</Form.Text>
                    </Form.Group>

                    <Button variant="success" type="button" disabled={true}>Edit</Button>
                </Form>
                
                <hr />
                <Button variant="success" type="button" onClick={this.toggleAddForm} >{this.state.newSongButtonText}</Button>
                <Button variant="danger" type="button">Remove: Artist - Song</Button>
                {this.state.showForm ? <AddSong /> : null}
                <hr />
            </PageLayout>
        );
    }
}

export default EditPage;