import React, {useContext} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './index.module.css';
import Navigation from '../navigation';
import Playlists from '../../items/playlists';
import Songs from '../../items/songs';
//import Player from '../player';
import Footer from '../footer';
import Context from '../../../Context';

const PageLayout = (props) => {
  const context = useContext(Context);
  const path = window.location.pathname;

  return (
    <div>
      <Navigation />
      <Container>
        <Row>
          <Col sm={2}>
            <Playlists />
          </Col>
          <Col sm={2}>
            <Songs />
          </Col>
          <Col sm={8}>
            <div className={context.selectedSong && path !== '/' && path !== 'home' ? styles['layout-container'] : null}>
            {props.children}
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default PageLayout;
