import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from 'shared/components/Base';
import {bindActionCreators} from "redux";
import {actions as milestonesActions} from 'site/components/journeys/MilestonesPanel/redux';
import {connect} from "react-redux";
import './styles.scss';

import {
  Panel,
  PanelHeader,
  Button,
  Group,
  FormLayout,
  File,
  Spinner,
  Textarea
} from "@vkontakte/vkui";
import Icon24Camera from '@vkontakte/icons/dist/24/camera';
import {journeyActions} from "store/entities/journey";


const mapStateToProps = state => ({
  milestones: state.site.milestones
});

const mapDispatchToProps = dispatch => ({
  journeyActions: bindActionCreators(journeyActions, dispatch),
  milestonesActions: bindActionCreators(milestonesActions, dispatch)
});


class MilestonesPanel extends BaseComponent {
  static defaultProps = {
    onSkipCallback: () => {},
    onFinishCallback: () => {}
  };

  static propTypes = {
    journeyId: PropTypes.number.isRequired,
    onSkipCallback: PropTypes.func,
    onFinishCallback: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };
  }

  createMilestone = e => {
    const data = new FormData();
    data.append('file', e.target.files[0]);
    this.props.milestonesActions.createMilestone(data);
  };

  updateMilestone = async () => {
    const milestoneIds = this.props.milestones.ids;
    const milestones = milestoneIds.map(id => {
      const m = this.props.milestones.objects[id];
      return {
        attachment: m.attachment.id,
        description: m.description
      }
    });

    this.setState({isLoading: true});
    await this.props.journeyActions.updateMilestones(
      this.props.journeyId,
      milestones
    );
    this.setState({isLoading: false});
    this.props.milestonesActions.clean();
    this.props.onFinishCallback();
  };

  render() {
    const milestoneIds = this.props.milestones.ids;
    const milestones = milestoneIds.map(id => {
      const m = this.props.milestones.objects[id];
      let content;
      if (m.isLoading) {
        content = <Spinner className="b-milestone__spinner" size="regular"/>;
      } else {
        content = (
          <div className="b-milestone">
            <div
              className="b-milestone__image"
              style={{'backgroundImage': `url(${m.attachment.url})`}}
            />
            <div className="b-milestone__description-wrapper">
              <Textarea
                placeholder="Описание"
                onChange={ e => this.props.milestonesActions.updateMilestone(id, e.target.value) }
                value={m.description || ''}
              />
            </div>
          </div>
        )
      }
      return (
        <Group key={id}>
          { content }
        </Group>
      )
    });

    return (
      <Panel id={this.props.id}>
        <PanelHeader>Пункты путешествия</PanelHeader>
        <div className="b-milestones">
          { milestones }
          <Group>
            <FormLayout>
              <File
                top={milestoneIds.length === 0 ? "Загрузите фото" : "Загрузите еще фото"}
                before={<Icon24Camera />}
                size="l"
                onChange={ this.createMilestone }
              >
                Открыть галерею
              </File>
            </FormLayout>
          </Group>
          <div className="b-milestones__button">
            { milestoneIds.length === 0 ?
              <Button size="xl" level="secondary"
                      onClick={this.props.onSkipCallback}>Пропустить</Button> :
              <Button size="xl" onClick={ this.updateMilestone }>Сохранить</Button>
            }
          </div>
          {this.state.isLoading && <Spinner size="regular"/>}
        </div>
      </Panel>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MilestonesPanel);
