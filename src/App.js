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
import {HeaderButton, Panel, PanelHeader} from "@vkontakte/vkui";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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
                <View id="journeys_list" activePanel="journeys_list">
                    <JourneysListPanel id="journeys_list"/>
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
                            left={<HeaderButton>Куку</HeaderButton>}
                            right={<HeaderButton>Test</HeaderButton>}>More</PanelHeader>
                    </Panel>
                </View>
            </Epic>
        );
    }
}

export default App;