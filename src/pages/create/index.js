import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import { playlistService } from '../../servives/playlistService';
import { validate } from '../../servives/validationService';
import styles from './index.module.css';
import PageLayout from '../../components/core/page-layout';
import Title from '../../components/core/title';
import Context from '../../Context';

class CreatePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlist: "",
            imgUrl: "",
            msg: false,
            playlistMsg: "",
            imgUrlMsg: false,
            disableSubmit: true
        }
    }

    static contextType = Context;

    onChange = async (ev, type) => {
        await this.setState(validate(ev.target.value, type));

        this.setState({ disableSubmit: true});
        if (this.state.playlistMsg === false && this.state.imgUrlMsg === false) {
            this.setState({ disableSubmit: false});
        }
    }

    handleSubmit = async (ev) => {
        ev.preventDefault();

        const response = await playlistService.create({name: this.state.playlist, imgUrl: this.state.imgUrl});
        if (response.message) {
            this.setState({ msg: response.message });
            return;
        }

        await this.context.loadPlaylists(await playlistService.loadAll());
        this.context.selectPlaylist(this.context.playlists[this.context.playlists.length - 1]);
        this.props.history.push('/playlist/edit');
    }

    render() {
        return (
            <PageLayout>
                <Form className={styles["form-container"]} onSubmit={this.handleSubmit}>
                    <Title title="Create your playlist"/>
                    <Form.Group controlId="formBasicPlaylist">
                        <Form.Label>Playlist</Form.Label>
                        <Form.Control onChange={(e) => this.onChange(e, 'playlist')} type="imgUrl" placeholder="My playlist is ..." />
                        {this.state.playlistMsg ? <Form.Text className="text-danger">{this.state.playlistMsg}</Form.Text> : null}
                    </Form.Group>

                    <Form.Group controlId="formBasicImgUrl">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control onChange={(e) => this.onChange(e, 'imgUrl')} type="imgUrl" placeholder="https://..." />
                        {this.state.imgUrlMsg ? <Form.Text className="text-danger">{this.state.imgUrlMsg}</Form.Text> : null}
                    </Form.Group>

                    <Button variant="success" type="submit" disabled={this.state.disableSubmit}>Create</Button>
                </Form>
            </PageLayout>
        );
    }
}

export default withRouter(CreatePage);