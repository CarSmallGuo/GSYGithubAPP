/**
 * Created by guoshuyu on 2017/11/10.
 */

import React, {Component} from 'react';
import {
    View, StatusBar, InteractionManager
} from 'react-native';
import PropTypes from 'prop-types';
import styles from "../style"
import I18n from '../style/i18n'
import reposActions from '../store/actions/repository'
import WebComponent from './widget/WebComponent'
import {generateCode2HTml} from '../utils/htmlUtils'


class CodeDetailPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detail: this.props.detail
        }
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            if (this.props.needRequest) {
                reposActions.getReposFileDir(this.props.ownerName,
                    this.props.repositoryName, this.props.path).then((res) => {
                        if (res && res.result) {
                            this.setState({
                                detail: generateCode2HTml(res.data),
                            })
                        } else {
                            this.setState({
                                detail: "<h1>" + I18n("fileNotSupport") + "</h1>",
                            })
                        }
                        setTimeout(() => {
                            if (this.refs.pullList) {
                                this.refs.pullList.refreshComplete(false);
                            }
                        }, 500);

                    }
                )
            }
        })
    }

    componentWillUnmount() {

    }


    render() {
        let {detail} = this.state;
        return (
            <View style={styles.mainBox}>
                <StatusBar hidden={false} backgroundColor={'transparent'} translucent barStyle={'light-content'}/>
                <WebComponent
                    source={{html: detail}}/>
            </View>
        )
    }
}


CodeDetailPage.propTypes = {
    path: PropTypes.string,
    ownerName: PropTypes.string,
    repositoryName: PropTypes.string,
    title: PropTypes.string,
    branch: PropTypes.string,
    detail: PropTypes.string,
    needRequest: PropTypes.bool,
};


CodeDetailPage.defaultProps = {
    path: '',
    title: '',
    ownerName: '',
    repositoryName: '',
    branch: 'master',
    needRequest: true,
};

export default CodeDetailPage