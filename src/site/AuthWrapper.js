import React from 'react';
import Base from 'shared/components/Base';
import { connect as reduxConnect } from 'react-redux';
import connect from '@vkontakte/vk-connect';
import { bindActionCreators } from 'redux';
import { actions } from 'store/entities/user';


const mapStateToProps = state => ({
  user: state.entities.user
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

class AuthWrapper extends Base {
  componentDidMount() {
    connect.send("VKWebAppInit", {});
    connect.subscribe((e) => {
      console.log(e);
      switch (e.detail.type) {
        case 'VKWebAppGetUserInfoResult':
          this.setState({fetchedUser: e.detail.data});
          break;
        default:
          break;
      }
    });
    const searchParams = window.location.search
      .slice(1)
      .split('&')
      .map(p => p.split('='))
      .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
    connect.send('VKWebAppGetUserInfo', {});
    this.props.actions.vkAuth(searchParams);
  }

  render() {
    if (this.props.user.error) {
      return <div>Something gone wrong</div>;
    }
    return this.props.children;
  }
}

export default reduxConnect(mapStateToProps, mapDispatchToProps)(AuthWrapper);