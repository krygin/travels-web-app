import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {
    Panel,
    PanelHeader,
    Div,
    HeaderButton,
    platform,
    IOS
} from "@vkontakte/vkui";
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import "react-image-gallery/styles/css/image-gallery.css";
import "./image-gallery.css"

import ImageGallery from 'react-image-gallery';

const osname = platform();


const JourneysDetailsPanel = (props) => (
    <Panel id={props.id} journeyId={props.journeyId}>
        <PanelHeader
            addon={<HeaderButton onClick={props.onBackClick}>Назад</HeaderButton>}
            left={<HeaderButton onClick={props.onBackClick}>{osname === IOS ? <Icon28ChevronBack/> :
                <Icon24Back/>}</HeaderButton>}>Путешествие</PanelHeader>
        <Div>
            <ImageGallery
                items={[
                    {
                        original: "https://www.votpusk.ru/country/ctimages/new/FR01.jpg",
                        thumbnail: "https://www.votpusk.ru/country/ctimages/new/FR01.jpg",
                    },
                    {
                        original: "https://s.zagranitsa.com/images/articles/4823/870x486/be5bce1abac2ce76c47d918bf50017a9.jpg?1477669487",
                        thumbnail: "https://s.zagranitsa.com/images/articles/4823/870x486/be5bce1abac2ce76c47d918bf50017a9.jpg?1477669487",
                    },
                    {
                        original: "https://frenchparis.ru/wp-content/uploads/frenchparis/2016/06/%D0%92-%D0%9F%D0%B0%D1%80%D0%B8%D0%B6-%D0%BD%D0%B0-%D1%82%D1%80%D0%B8-%D0%B4%D0%BD%D1%8F-2.jpg",
                        thumbnail: "https://frenchparis.ru/wp-content/uploads/frenchparis/2016/06/%D0%92-%D0%9F%D0%B0%D1%80%D0%B8%D0%B6-%D0%BD%D0%B0-%D1%82%D1%80%D0%B8-%D0%B4%D0%BD%D1%8F-2.jpg",

                    },
                ]}
                showThumbnails={false}
                showFullscreenButton={false}
                showPlayButton={false}/>

        </Div>
    </Panel>
);

JourneysDetailsPanel.propTypes = {
    id: PropTypes.string.isRequired,
    journeyId: PropTypes.string.isRequired,
    onBackClick: PropTypes.func.isRequired
};

export default JourneysDetailsPanel