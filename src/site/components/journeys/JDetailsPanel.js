import React from 'react';
import PropTypes from 'prop-types';
import Base from 'shared/components/Base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { journeyActions } from 'store/entities/journey';
import { Panel, PanelHeader, HeaderButton } from '@vkontakte/vkui';
import { platform, IOS } from '@vkontakte/vkui';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';


const mapStateToProps = state => ({
  journey: state.entities.journey
});

const mapDispatchToProps = dispatch => ({
  journeyActions: bindActionCreators(journeyActions, dispatch)
});

class JDetailsPanel extends Base {
  static defaultProps = {
    backCallback: () => {}
  };

  static propTypes = {
    journeyId: PropTypes.string.isRequired,
    backCallback: PropTypes.func
  };

  render() {
    const osname = platform();

    return (
      <Panel id={ this.props.id }>
        <PanelHeader
          left={
            <HeaderButton onClick={ this.props.backCallback }>
              {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
            </HeaderButton>
          }
          addon={
            <HeaderButton onClick={ this.props.backCallback }>Назад</HeaderButton>}
        >
          Заголовок
        </PanelHeader>
        <div>journey #{ this.props.journeyId }</div>
      </Panel>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JDetailsPanel);