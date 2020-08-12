import React, { useContext } from 'react';
import PageLayout from '../../components/core/page-layout';
import SelectedPlaylist from '../../components/items/selected-playlist';
import Banner from '../../components/items/banner';
import Context from '../../Context';

const Home = () => {
    const context = useContext(Context);
    return (
        <PageLayout >
            {context.selectedPlaylist ? <SelectedPlaylist /> : <Banner />}
        </PageLayout>
    )
}

export default Home;