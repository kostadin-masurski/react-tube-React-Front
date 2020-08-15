import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { playlistService } from '../../servives/playlistService';
import { songService } from '../../servives/songService';
import { validate } from '../../servives/validationService';
import { Form, Button } from 'react-bootstrap';
import styles from './index.module.css';
import Title from '../../components/core/title';
import Context from '../../Context';

class AddSongPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            artist: '',
            youtubeIdent: '',
            imgUrl: '',
            nameMsg: '',
            artistMsg: '',
            youtubeIdentMsg: '',
            imgUrlMsg: false,
            msg: '',
            disableSubmit: true
        }
    }

    static contextType = Context;
    toggleAddForm = this.props.toggleAddForm;
    editedPlaylist = this.props.editedPlaylist;

    onChange = async (ev, type) => {
        await this.setState(validate(ev.target.value, type));
        
        this.setState({ disableSubmit: true});
        if (this.state.nameMsg === false && this.state.artistMsg === false && this.state.youtubeIdentMsg === false && this.state.imgUrlMsg === false) {
            this.setState({ disableSubmit: false});
        }
    }

    handleSubmit = async (ev) => {
        ev.preventDefault();
        await this.setState({
            youtubeIdent: this.state.youtubeIdent.substr(this.state.youtubeIdent.length - 11)
        })

        let response = await songService.create(this.state);
        if (response.message) {
            this.setState({ msg: response.message });
            return;
        }

        const newSong = await songService.getSong(this.state.youtubeIdent)
        this.context.selectSong(newSong);
        this.editedPlaylist.songs.push(newSong);

        response = await playlistService.edit(this.editedPlaylist);
        if (response.message) {
            this.setState({ msg: response.message });
            return;
        }
        this.toggleAddForm();
        this.context.loadPlaylists(await playlistService.loadAll());
    }

    render() {
        return (
            <div>
                <Form className={styles["form-container"]} display={this.state.showForm} onSubmit={this.handleSubmit} >
                    <Title title="Add new song" />
                    <Form.Group controlId="formBasicSong">
                        <Form.Label>Song</Form.Label>
                        <Form.Control onChange={(e) => this.onChange(e, 'name')} type="text" autoFocus placeholder="Song name ..." />
                        {this.state.nameMsg ? <Form.Text className="text-danger">{this.state.nameMsg}</Form.Text> : null}
                    </Form.Group>
                    <Form.Group controlId="formBasicArtist">
                        <Form.Label>Artist</Form.Label>
                        <Form.Control onChange={(e) => this.onChange(e, 'artist')} type="text" placeholder="Artist name ..." />
                        {this.state.artistMsg ? <Form.Text className="text-danger">{this.state.artistMsg}</Form.Text> : null}
                    </Form.Group>
                    <Form.Group controlId="formBasicYoutubeIdent">
                        <Form.Label>Youtube ID or URL</Form.Label>
                        <Form.Control onChange={(e) => this.onChange(e, 'youtubeIdent')} type="text" placeholder="Youtube ID or URL ..." />
                        {this.state.youtubeIdentMsg ? <Form.Text className="text-danger">{this.state.youtubeIdentMsg}</Form.Text> : null}
                    </Form.Group>
                    <Form.Group controlId="formBasicImgUrl">
                        <Form.Label>Pictute URL</Form.Label>
                        <Form.Control onChange={(e) => this.onChange(e, 'imgUrl')} type="text" placeholder="https:// ..." />
                        {this.state.imgUrlMsg ? <Form.Text className="text-danger">{this.state.imgUrlMsg}</Form.Text> : null}
                    </Form.Group>
                    {this.state.msg ? <p className={styles.msg}>{this.state.msg}</p> : null}
                    <Button variant="success" type="submit" disabled={this.state.disableSubmit}>Add</Button>
                </Form>
            </div>
        );
    }
}

export default AddSongPage;