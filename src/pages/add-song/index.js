import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import styles from './index.module.css';
import Title from '../../components/core/title';

class AddSongPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            song: "",
            artist: "",
            youtubeIdent: "",
            imgUrl: ""
        }
    }

    onBlur = (ev, type) => {
        const newState = {};
        newState[type] = ev.target.value;
        this.setState(newState);
    }

    render() {
        const { song, artist, youtubeIdent, imgUrl } = this.state;

        return (
            <div>
                <Form className={styles["form-container"]} display={this.state.showForm} >
                    <Title title="Add new song" />
                    <Form.Group controlId="formBasicSong">
                        <Form.Label>Song</Form.Label>
                        <Form.Control onBlur={(e) => this.onBlur(e, song)} type="text" autoFocus placeholder="Song name ..." />
                        <Form.Text className="text-danger">Song msg</Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicArtist">
                        <Form.Label>Artist</Form.Label>
                        <Form.Control onBlur={(e) => this.onBlur(e, artist)} type="text" placeholder="Artist name ..." />
                        <Form.Text className="text-danger">Artist msg</Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicYoutubeIdent">
                        <Form.Label>Youtube ID or URL</Form.Label>
                        <Form.Control onBlur={(e) => this.onBlur(e, youtubeIdent)} type="text" placeholder="Youtube ID or URL ..." />
                        <Form.Text className="text-danger">Youtube ID or URL msg</Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicImgUrl">
                        <Form.Label>Pictute URL</Form.Label>
                        <Form.Control onBlur={(e) => this.onBlur(e, imgUrl)} type="text" placeholder="https:// ..." />
                        <Form.Text className="text-danger">Pictute URL msg</Form.Text>
                    </Form.Group>

                    <Button variant="success" type="button" disabled={true}>Add</Button>
                </Form>
            </div>
        );
    }
}

export default AddSongPage;