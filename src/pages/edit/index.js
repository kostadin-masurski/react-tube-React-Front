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
            editedPlaylist: {},
            name: 'My playlist is ...',
            imgUrl: 'https:// ...',
            nameMsg: '',
            imgUrlMsg: false,
            showForm: false,
            newSongButtonText: "Add New Song",
            msg: false,
            disableSubmit: true
        }
    }

    static contextType = Context;

    componentWillMount() {
        this.setState({
            editedPlaylist: this.context.selectedPlaylist,
            name: this.context.selectedPlaylist.name,
            imgUrl: this.context.selectedPlaylist.imgUrl
        })
    }

    onChange = async (ev, type) => {
        await this.setState(validate(ev.target.value, type));
        
        this.setState({ disableSubmit: true});
        if (this.state.nameMsg === false && this.state.imgUrlMsg === false) {
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

    edit = async (playlist) => {
        const response = await playlistService.edit(playlist);
        if (response.message) {
            this.setState({ msg: response.message });
            return;
        }        
        this.context.loadPlaylists(await playlistService.loadAll());
        this.context.selectPlaylist(playlist, false);
    }

    handleSubmit = async (ev) => {
        ev.preventDefault();
        let updatedPlaylist = this.state.editedPlaylist;
        updatedPlaylist.name = this.state.name;
        updatedPlaylist.imgUrl = this.state.imgUrl;
        this.edit(updatedPlaylist);
    }

    add = async () => {
        let updatedPlaylist = this.state.editedPlaylist;
        updatedPlaylist.songs.push(this.context.selectedSong);
        this.edit(updatedPlaylist);
    }

    remove = async () => {
        let updatedPlaylist = this.state.editedPlaylist;
        updatedPlaylist.songs = updatedPlaylist.songs
        .filter(s => s.youtubeIdent !== this.context.selectedSong.youtubeIdent);
        this.edit(updatedPlaylist);
    }

    render() {
        const addSong = this.context.selectedSong && this.state.editedPlaylist.songs.filter(s => s.youtubeIdent === this.context.selectedSong.youtubeIdent) < 1 ? true : false;
        return (
            <PageLayout>
                <Form className={styles["form-container"]} onSubmit={this.handleSubmit}>
                    <Title title="Edit your playlist"/>
                    <Form.Group controlId="formBasicPlaylist">
                        <Form.Label>Playlist {addSong} </Form.Label>
                        <Form.Control onChange={(e) => this.onChange(e, 'name')} type="text" value={this.state.name} />
                        {this.state.nameMsg ? <Form.Text className="text-danger">{this.state.nameMsg}</Form.Text> : null}
                    </Form.Group>

                    <Form.Group controlId="formBasicImgUrl">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control onChange={(e) => this.onChange(e, 'imgUrl')} type="text"  value={this.state.imgUrl} />
                        {this.state.imgUrlMsg ? <Form.Text className="text-danger">{this.state.imgUrlMsg}</Form.Text> : null}
                    </Form.Group>

                    {this.state.msg ? <p className={styles.msg}>{this.state.msg}</p> : null}
                    <Button variant="success" type="submit" disabled={this.state.disableSubmit}>Edit</Button>
                </Form>

                <hr />
                <Button variant="success" type="button" onClick={this.toggleAddForm} >{this.state.newSongButtonText}</Button>
                {this.context.selectedSong ? 
                <Button type="button" variant={addSong ? 'success' : 'danger'} onClick={addSong ? this.add : this.remove} >
                    {addSong ? 'Add' : 'Remove'} : {this.context.selectedSong.artist} - {this.context.selectedSong.name}
                </Button> : null }
                {this.state.showForm ? <AddSong editedPlaylist={this.state.editedPlaylist} toggleAddForm={this.toggleAddForm} /> : null}
                <hr />
            </PageLayout>
        );
    }
}

export default withRouter(EditPage);