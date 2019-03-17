import React from 'react'
import PropTypes from 'prop-types';
import {
    Panel,
    PanelHeader,
    Group,
    Avatar,
    Cell,
    CellButton,
    FormLayout,
    Input,
    Textarea,
    Header,
    Button,
    Div
} from "@vkontakte/vkui";
import Icon24Add from '@vkontakte/icons/dist/24/add';
import {WithContext as ReactTags} from 'react-tag-input';
import './react-tags.css'

const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class JourneysCreatePanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: [
            ],
            suggestions: [

            ]
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }

    handleDelete(i) {
        const {tags} = this.state;
        this.setState({
            tags: tags.filter((tag, index) => index !== i),
        });
    }

    handleAddition(tag) {
        this.setState(state => ({tags: [...state.tags, tag]}));
    }

    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({tags: newTags});
    }

    render() {
        const {tags, suggestions} = this.state;
        return (
            <Panel id={this.props.id}>
                <PanelHeader>
                    Новое путешествие
                </PanelHeader>
                <Group>
                    <FormLayout>
                        <Header level="2">Путешественники</Header>
                        <Cell before={
                            <Avatar
                                src={"https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-1/c0.0.320.320a/p320x320/41691084_1062665947248198_4774319593655107584_n.jpg?_nc_cat=103&_nc_ht=scontent-arn2-1.xx&oh=c3008299968110b209973243ce650f73&oe=5D14B679"}>
                            </Avatar>}>
                            Иван Крыгин
                        </Cell>
                        <CellButton before={<Icon24Add/>}>Добавить путешественника</CellButton>
                        <Header level="2">Путешествие</Header>
                        <Input placeholder={"Выберите место"}/>
                        <Textarea placeholder={"Описание"}/>
                        <ReactTags tags={tags}
                                   suggestions={suggestions}
                                   handleDelete={this.handleDelete}
                                   handleAddition={this.handleAddition}
                                   handleDrag={this.handleDrag}
                                   delimiters={delimiters}/>
                        <Div style={{display: 'flex'}}>
                            <Button level={"primary"} stretched style={{marginLeft: 4}}>Создать</Button>
                        </Div>
                    </FormLayout>
                </Group>
            </Panel>
        )
    }
}

JourneysCreatePanel.state = {
    tags: [
        {id: "Thailand", text: "Thailand"},
        {id: "India", text: "India"}
    ],
    suggestions: [
        {id: 'USA', text: 'USA'},
        {id: 'Germany', text: 'Germany'},
        {id: 'Austria', text: 'Austria'},
        {id: 'Costa Rica', text: 'Costa Rica'},
        {id: 'Sri Lanka', text: 'Sri Lanka'},
        {id: 'Thailand', text: 'Thailand'}
    ]
};

JourneysCreatePanel.propTypes = {
    id: PropTypes.string.isRequired,
};

export default JourneysCreatePanel