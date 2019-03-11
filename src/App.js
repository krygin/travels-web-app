import React from 'react';
import connect from '@vkontakte/vkui-connect';
import {View} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Icon28SearchOutline from '@vkontakte/icons/dist/28/search_outline';
import Icon28AddOutline from '@vkontakte/icons/dist/28/add_outline';
import Icon28More from '@vkontakte/icons/dist/28/more';
import Icon28Place from '@vkontakte/icons/dist/28/place';
import {Epic, Tabbar, TabbarItem} from "@vkontakte/vkui";
import JourneysListPanel from "./panels/journeys/JourneysListPanel";
import JourneysCreatePanel from "./panels/journeys/JourneysCreatePanel";
import JourneysMapPanel from "./panels/journeys/JourneysMapPanel";
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import {HeaderButton, Panel, PanelHeader, platform, IOS, Div} from "@vkontakte/vkui";
import "react-image-gallery/styles/css/image-gallery.css";


import ImageGallery from 'react-image-gallery';


const osname = platform();


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeJourneysPanel: "list",
            activeStory: "journeys_list",
            fetchedUser: null,
        };
        this.onStoryChange = this.onStoryChange.bind(this);
    }

    componentDidMount() {
        connect.send("VKWebAppInit", {});
        connect.subscribe((e) => {
            switch (e.detail.type) {
                case 'VKWebAppGetUserInfoResult':
                    this.setState({fetchedUser: e.detail.data});
                    break;
                default:
                    console.log(e.detail.type);
            }
        });
        connect.send('VKWebAppGetUserInfo', {});
    }


    onStoryChange(e) {
        this.setState({activeStory: e.currentTarget.dataset.story})
    }

    render() {
        return (
            <Epic activeStory={this.state.activeStory} tabbar={
                <Tabbar>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === "journeys_list"}
                        data-story="journeys_list"
                        text="Путешествия"><Icon28SearchOutline/></TabbarItem>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === "journeys_create"}
                        data-story="journeys_create"
                        text="Создать"><Icon28AddOutline/></TabbarItem>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === "journeys_map"}
                        data-story="journeys_map"
                        text="Карта"><Icon28Place/></TabbarItem>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === "more"}
                        data-story="more"
                        text="Еще"><Icon28More/></TabbarItem>
                </Tabbar>
            }>
                <View id="journeys_list" activePanel={this.state.activeJourneysPanel}>
                    <JourneysListPanel id="list" onItemClick={() => {
                        let state = this.state;
                        state["activeJourneysPanel"] = "details";
                        this.setState(state)
                    }}/>
                    <Panel id="details">
                        <PanelHeader
                            addon={<HeaderButton onClick={() => {
                                let state = this.state;
                                state["activeJourneysPanel"] = "list";
                                this.setState(state)
                            }}>Назад</HeaderButton>}
                            left={<HeaderButton onClick={() => {
                                let state = this.state;
                                state["activeJourneysPanel"] = "list";
                                this.setState(state)
                            }}>{osname === IOS ? <Icon28ChevronBack/> :
                                <Icon24Back/>}</HeaderButton>}>Путешествие</PanelHeader>
                        <Div>
                            <ImageGallery
                                items={[
                                    {
                                        original: "https://www.votpusk.ru/country/ctimages/new/FR01.jpg",
                                        thumbnail: "https://www.votpusk.ru/country/ctimages/new/FR01.jpg"
                                    },
                                    {
                                        original: "https://s.zagranitsa.com/images/articles/4823/870x486/be5bce1abac2ce76c47d918bf50017a9.jpg?1477669487",
                                        thumbnail: "https://s.zagranitsa.com/images/articles/4823/870x486/be5bce1abac2ce76c47d918bf50017a9.jpg?1477669487"
                                    },
                                    {
                                        original: "https://frenchparis.ru/wp-content/uploads/frenchparis/2016/06/%D0%92-%D0%9F%D0%B0%D1%80%D0%B8%D0%B6-%D0%BD%D0%B0-%D1%82%D1%80%D0%B8-%D0%B4%D0%BD%D1%8F-2.jpg",
                                        thumbnail: "https://frenchparis.ru/wp-content/uploads/frenchparis/2016/06/%D0%92-%D0%9F%D0%B0%D1%80%D0%B8%D0%B6-%D0%BD%D0%B0-%D1%82%D1%80%D0%B8-%D0%B4%D0%BD%D1%8F-2.jpg"
                                    },
                                ]}
                                showThumbnails={false}/>

                        </Div>
                    </Panel>
                </View>
                <View id="journeys_create" activePanel="journeys_create">
                    <JourneysCreatePanel id="journeys_create"/>
                </View>
                <View id="journeys_map" activePanel="journeys_map">
                    <JourneysMapPanel id="journeys_map"/>
                </View>
                <View id="more" activePanel="more">
                    <Panel id={"more"}>
                        <PanelHeader
                            addon={<HeaderButton>Назад</HeaderButton>}
                            left={<HeaderButton>Куку</HeaderButton>}>More</PanelHeader>
                    </Panel>
                </View>
            </Epic>
        );
    }
}

export default App;