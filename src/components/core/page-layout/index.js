import React, {useContext} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
//import styles from './index.module.css';
import Navigation from '../navigation';
import Playlists from '../../items/playlists';
import Songs from '../../items/songs';
import Player from '../player';
import Footer from '../footer';
import Context from '../../../Context';

const PageLayout = (props) => {
  const context = useContext(Context);

  return (
    <div>
      <Navigation />
      <Container>
        <Row>
          <Col sm={6} md={2}>
            <Playlists />
          </Col>
          <Col sm={6} md={2}>
            <Songs />
          </Col>
          <Col sm={12} md={8}>
            {context.selectedSong ? <Player /> : null }
            {props.children}
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default PageLayout;
