/**
 * Created by guoshuyu on 2017/11/10.
 */

import React, {Component} from 'react';
import loginActions from '../store/actions/login'
import userActions from '../store/actions/user'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import BasePersonPage from "./widget/BasePersonPage";

class MyPage extends BasePersonPage {

    constructor(props) {
        super(props);
        this.refreshUnRead = this.refreshUnRead.bind(this);
    }

    componentDidMount() {
        super.componentDidMount();
        this.refreshUnRead();
    }

    _refresh() {
        super._refresh();
        this.refreshUnRead();
    }

    getBackNotifyCall() {
        this.refreshUnRead();
    }

    refreshUnRead() {
        userActions.getNotifation(false, false, 0).then((res) => {
            if (res && res.result && res.data && res.data.length > 0) {
                this.setState({
                    unRead: true,
                })
            } else {
                this.setState({
                    unRead: false,
                })
            }
        })
    }

    getUserInfo() {
        let {userState} = this.props;
        return (userState.userInfo) ? userState.userInfo : {};
    }

    getSetting() {
        return true
    }
}

export default connect(state => ({
    userState: state.user,
}), dispatch => ({
    loginAction: bindActionCreators(loginActions, dispatch),
    userAction: bindActionCreators(userActions, dispatch)
}))(MyPage)