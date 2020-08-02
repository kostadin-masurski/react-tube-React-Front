import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import styles from './index.module.css';
import PageLayout from '../../components/core/page-layout';
import Title from '../../components/core/title';

class CreatePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlist: "",
            imgUrl: ""
        }
    }

    onBlur = (ev, type) => {
        const newState = {};
        newState[type] = ev.target.value;
        this.setState(newState);
    }

    render() {
        const { playlist, imgUrl } = this.state;

        return (
            <PageLayout>
                <Form className={styles["form-container"]}>
                    <Title title="Create your playlist"/>
                    <Form.Group controlId="formBasicPlaylist">
                        <Form.Label>Usename</Form.Label>
                        <Form.Control onBlur={(e) => this.onBlur(e, playlist)} type="imgUrl" placeholder="My playlist is ..." />
                        <Form.Text className="text-danger">Playlist msg</Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicImgUrl">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control onBlur={(e) => this.onBlur(e, imgUrl)} type="imgUrl" placeholder="https://..." />
                        <Form.Text className="text-danger">ImgUrl msg</Form.Text>
                    </Form.Group>

                    <Button variant="success" type="button" disabled={true}>Create</Button>
                </Form>
            </PageLayout>
        );
    }
}

export default CreatePage;