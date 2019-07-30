import React from 'react';
import Base from 'shared/components/Base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from 'store/entities/user';

import {Spinner} from "@vkontakte/vkui";


const mapStateToProps = state => ({
  user: state.entities.user
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

class AuthWrapper extends Base {
  componentDidMount() {
    this.props.actions.getCurrent();
  }

  render() {
    if (this.props.user.isLoading) {
      return <Spinner size="large" />
    }
    if (this.props.user.error) {
      return <div>Something gone wrong</div>;
    }
    return this.props.children;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthWrapper);