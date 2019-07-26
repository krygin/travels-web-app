import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from 'shared/components/Base';

import {
  Panel,
  PanelHeader,
  Button,
  Group,
  FormLayout,
  File
} from "@vkontakte/vkui";
import Icon24Camera from '@vkontakte/icons/dist/24/camera';


export default class extends BaseComponent {
  static defaultProps = {
    onSkipCallback: () => {}
  };

  static propTypes = {
    onSkipCallback: PropTypes.func
  };

  // constructor(props) {
  //   super(props);
  //
  //   this.state = {
  //     isLoading: false,
  //     isLoadingItem: null,
  //     value: null,
  //     list: []
  //   };
  // }

  render() {
    return (
      <Panel id={this.props.id}>
        <PanelHeader>Пункты</PanelHeader>
        <div className="b-milestones">
          <Group>
            <FormLayout>
              <File top="Загрузите ваше фото" before={<Icon24Camera />} size="l">
                Открыть галерею
              </File>
            </FormLayout>
          </Group>
        </div>
        <Button
          size="xl"
          level="secondary"
          onClick={ this.props.onSkipCallback }
        >
          Пропустить
        </Button>
      </Panel>
    );
  }
}
