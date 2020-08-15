import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import { playlistService } from '../../servives/playlistService';
import { validate } from '../../servives/validationService';
import styles from './index.module.css';
import PageLayout from '../../components/core/page-layout';
import Title from '../../components/core/title';
import AddSong from '../add-song';
import Context from '../../Context';

class EditPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlist: 'My playlist is ...',
            imgUrl: 'https:// ...',
            playlistMsg: false,
            imgUrlMsg: false,
            showForm: false,
            newSongButtonText: "Add New Song",
            disableSubmit: true
        }
    }

    static contextType = Context;

    componentDidMount() {
        this.setState({
            playlist: this.context.selectedPlaylist ? this.context.selectedPlaylist.name: 'My playlist is ...',
            imgUrl: this.context.selectedPlaylist ? this.context.selectedPlaylist.imgUrl: 'https:// ...'
        })
    }

    onChange = async (ev, type) => {
        await this.setState(validate(ev.target.value, type));
        
        this.setState({ disableSubmit: true});
        if (this.state.playlistMsg === false && this.state.imgUrlMsg === false) {
            this.setState({ disableSubmit: false});
        }
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

    handleSubmit = async (ev) => {
        ev.preventDefault();

        this.context.selectedPlaylist.name = this.state.playlist;
        this.context.selectedPlaylist.imgUrl = this.state.imgUrl;

        const response = await playlistService.edit(this.context.selectedPlaylist);
        if (response.message) {
            this.setState({ msg: response.message });
            return;
        }
        
        this.context.loadPlaylists(await playlistService.loadAll());
    }

    render() {
        return (
            <PageLayout>
                <Form className={styles["form-container"]} onSubmit={this.handleSubmit}>
                    <Title title="Edit your playlist"/>
                    <Form.Group controlId="formBasicPlaylist">
                        <Form.Label>Usename</Form.Label>
                        <Form.Control onChange={(e) => this.onChange(e, 'playlist')} type="text" value={this.state.playlist} />
                        {this.state.playlistMsg ? <Form.Text className="text-danger">{this.state.playlistMsg}</Form.Text> : null}
                    </Form.Group>

                    <Form.Group controlId="formBasicImgUrl">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control onChange={(e) => this.onChange(e, 'imgUrl')} type="text"  value={this.state.imgUrl} />
                        {this.state.imgUrlMsg ? <Form.Text className="text-danger">{this.state.imgUrlMsg}</Form.Text> : null}
                    </Form.Group>

                    <Button variant="success" type="submit" disabled={this.state.disableSubmit}>Edit</Button>
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

export default withRouter(EditPage);