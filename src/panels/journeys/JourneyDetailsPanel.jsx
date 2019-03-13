import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {
    Panel,
    PanelHeader,
    Div,
    HeaderButton,
    platform,
    IOS,
    Group,
    Header,
    HorizontalScroll,
    Avatar,
    Link,
    Button
} from "@vkontakte/vkui";
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import "react-image-gallery/styles/css/image-gallery.css";
import "./image-gallery.css"

import ImageGallery from 'react-image-gallery';

const osname = platform();

const itemStyle = {
    flexShrink: 0,
    width: 80,
    height: 94,
    display: 'flex',
    flexDirection:
        'column',
    alignItems: 'center',
    fontSize: 12
};


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
        <Group style={{paddingBottom: 8}}>
            <Header level="2">Путешественники</Header>
            <HorizontalScroll>
                <div style={{display: 'flex'}}>
                    <div style={{...itemStyle, paddingLeft: 4}}>
                        <Avatar size={64} style={{marginBottom: 8}}
                                src={"https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-1/c0.0.320.320a/p320x320/41691084_1062665947248198_4774319593655107584_n.jpg?_nc_cat=103&_nc_ht=scontent-arn2-1.xx&oh=c3008299968110b209973243ce650f73&oe=5D14B679"}/>
                        Иван
                    </div>
                    <div style={itemStyle}>
                        <Avatar size={64} style={{marginBottom: 8}}
                                src={"https://pp.userapi.com/c834302/v834302359/f63bf/6GedgEhFXdg.jpg"}/>
                        Александр
                    </div>
                    <div style={itemStyle}>
                        <Avatar size={64} style={{marginBottom: 8}}
                                src={"https://pp.userapi.com/c638428/v638428150/1e67a/s2izkbJKMFk.jpg"}/>
                        Сергей
                    </div>
                    <div style={{...itemStyle, paddingRight: 4}}>
                        <Avatar size={64} style={{marginBottom: 8}}
                                src={"https://pp.userapi.com/c845218/v845218455/e0e5d/IAVDeYEeE4E.jpg"}/>
                        Антон
                    </div>
                    <div style={{...itemStyle, paddingRight: 4}}>
                        <Avatar size={64} style={{marginBottom: 8}}
                                src={"https://pp.userapi.com/c841630/v841630478/6c3d0/y5iDnH5PrgU.jpg"}/>
                        Игорь
                    </div>

                    <div style={{...itemStyle, paddingRight: 4}}>
                        <Avatar size={64} style={{marginBottom: 8}}
                                src={"https://pp.userapi.com/c630629/v630629510/b77b/3ETWFeQXGQE.jpg"}/>
                        Владимир
                    </div>

                    <div style={{...itemStyle, paddingRight: 4}}>
                        <Avatar size={64} style={{marginBottom: 8}}
                                src={"https://pp.userapi.com/c830401/v830401409/d3f9f/TwHefS4aMUE.jpg"}/>
                        Дарья
                    </div>
                    <div style={itemStyle}>
                        <Avatar size={64} style={{marginBottom: 8}}
                                src={"https://pp.userapi.com/c847121/v847121120/c1e5d/yRvnH0NFGEY.jpg"}/>
                        Максим
                    </div>
                    <div style={itemStyle}>
                        <Avatar size={64} style={{marginBottom: 8}}
                                src={"https://pp.userapi.com/c638716/v638716174/3fa12/vAq6MFYwvCE.jpg?ava=1"}/>
                        Анна
                    </div>
                    <div style={itemStyle}>
                        <Avatar size={64} style={{marginBottom: 8}}
                                src={"https://pp.userapi.com/c631319/v631319174/3feaa/B0NxwE7Hkqc.jpg"}/>
                        Алексей
                    </div>
                    <div style={itemStyle}>
                        <Avatar size={64} style={{marginBottom: 8}}
                                src={"https://pp.userapi.com/c849228/v849228743/2020/x8gqwyWIyas.jpg"}/>
                        Эльвира
                    </div>
                </div>
            </HorizontalScroll>
        </Group>
        <Group>
            <Header level="2">Путешествие</Header>
            <Div>
                Норма́ндия (фр. Normandie, норманд. Normaundiа) — регион и историческая область на северо-западе
                Франции. Образован 1 января 2016 года слиянием регионов Верхняя и Нижняя Нормандия[2]. Известен своей
                историей, фермами, яблочными плантациями и молочной промышленностью, в первую очередь сырами: Камамбер,
                Ливаро и Пон-л’Эвек.
            </Div>
            <Div>
                <Link href={"#"}>#Франция</Link>
                <Link href={"#"}>#Нормандия</Link>
                <Link href={"#"}>#Весна</Link>
                <Link href={"#"}>#ДиснейЛенд</Link>
                <Link href={"#"}>#Стриптиз</Link>
                <Link href={"#"}>#МонсенМишель</Link>
                <Link href={"#"}>#Вино</Link>
                <Link href={"#"}>#Лягушки</Link>
                <Link href={"#"}>#Ананасики</Link>
            </Div>
            <Div style={{display: 'flex'}}>
                <Button level={"secondary"} stretched style={{marginRight: 4}}>В закладки</Button>
                <Button level={"primary"} stretched style={{marginLeft: 4}}>Присоединиться</Button>
            </Div>
        </Group>
    </Panel>
);

JourneysDetailsPanel.propTypes = {
    id: PropTypes.string.isRequired,
    journeyId: PropTypes.string.isRequired,
    onBackClick: PropTypes.func.isRequired
};

export default JourneysDetailsPanel