/**
 * Created by guoshuyu on 2017/11/10.
 */

import React, {Component} from 'react';
import {
    View, InteractionManager, StatusBar, TextInput, TouchableOpacity, Keyboard, StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import {Actions} from 'react-native-router-flux';
import styles, {navBarHeight} from "../style"
import * as Constant from "../style/constant"
import repositoryActions from "../store/actions/repository"
import I18n from '../style/i18n'
import issueActions from '../store/actions/issue'
import PullListView from './widget/PullLoadMoreListView'
import IssueItem from './widget/IssueItem'
import {getFullName} from '../utils/htmlUtils'
import Icon from 'react-native-vector-icons/Ionicons'
import * as Config from '../config/'
import CommonBottomBar from "./widget/CommonBottomBar";

/**
 * 搜索
 */
class IssueListPage extends Component {

    constructor(props) {
        super(props);
        this._searchTextChange = this._searchTextChange.bind(this);
        this._searchText = this._searchText.bind(this);
        this._refresh = this._refresh.bind(this);
        this._getBottomItem = this._getBottomItem.bind(this);
        this._loadMore = this._loadMore.bind(this);
        this.searchText = "";
        this.filter = null;
        this.page = 2;
        this.selectTypeData = null;
        this.selectSortData = null;
        this.selectLanguageData = null;
        this.state = {
            select: 0,
            dataSource: []
        }
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this._searchText();
        });
    }

    componentWillUnmount() {

    }

    _searchTextChange(text) {
        this.searchText = text;
    }

    _searchText() {
        Keyboard.dismiss();
        if (this.refs.pullList) {
            this.refs.pullList.refreshComplete(false);
        }
        if (this.refs.pullList) {
            this.refs.pullList.showRefreshState();
        }
        if (this.searchText === null || this.searchText.trim().length === 0) {
            issueActions.getRepositoryIssue(0, this.props.userName, this.props.repositoryName, this.filter).then((res) => {
                let size = 0;
                if (res && res.result) {
                    this.page = 2;
                    let dataList = res.data;
                    this.setState({
                        dataSource: dataList
                    });
                    size = res.data.length;
                }
                if (this.refs.pullList) {
                    this.refs.pullList.refreshComplete((size >= Config.PAGE_SIZE));
                    this.refs.pullList.scrollToTop();
                }
            });
            return
        }
        repositoryActions.searchRepositoryIssue(this.searchText, this.props.userName, this.props.repositoryName, 1).then((res) => {
            let size = 0;
            if (res && res.result) {
                this.page = 2;
                this.setState({
                    dataSource: res.data
                });
                size = res.data.length;
            }
            setTimeout(() => {
                if (this.refs.pullList) {
                    this.refs.pullList.refreshComplete((size >= Config.PAGE_SIZE));
                    this.refs.pullList.scrollToTop();
                }
            }, 500);
        });
    }

    _renderRow(rowData, sectionID, rowID, highlightRow) {
        let fullName = getFullName(rowData.repository_url);
        return (
            <IssueItem
                actionTime={rowData.created_at}
                actionUser={rowData.user.login}
                actionUserPic={rowData.user.avatar_url}
                issueComment={fullName + rowData.title}
                commentCount={rowData.comments + ""}
                state={rowData.state}
                issueTag={"#" + rowData.number}
                onPressItem={() => {
                    Actions.IssueDetail({
                        issue: rowData, title: fullName,
                        repositoryName: this.props.repositoryName,
                        userName: this.props.userName
                    })
                }}/>
        )
    }

    /**
     * 刷新
     * */
    _refresh() {
        this._searchText();
    }

    /**
     * 加载更多
     * */
    _loadMore() {
        if (this.searchText === null || this.searchText.trim().length === 0) {
            issueActions.getRepositoryIssue(this.page, this.props.userName, this.props.repositoryName, this.filter).then((res) => {
                let size = 0;
                if (res && res.result) {
                    this.page++;
                    let dataList = this.state.dataSource.concat(res.data);
                    this.setState({
                        dataSource: dataList
                    });
                    size = res.data.length;
                }
                if (this.refs.pullList) {
                    this.refs.pullList.refreshComplete((size >= Config.PAGE_SIZE));
                }
            });
            return
        }
        repositoryActions.searchRepositoryIssue(this.searchText, this.props.userName, this.props.repositoryName, this.page).then((res) => {
            let size = 0;
            if (res && res.result) {
                this.page++;
                let dataList = this.state.dataSource.concat(res.data);
                this.setState({
                    dataSource: dataList
                });
                size = res.data.length;
            }
            if (this.refs.pullList) {
                this.refs.pullList.refreshComplete((size >= Config.PAGE_SIZE));
            }
        });
    }

    _getBottomItem() {
        let {select} = this.state;
        return [{
            itemName: I18n("issueAllText"),
            itemTextColor: select === 0 ? Constant.white : Constant.subTextColor,
            icon: select === 0 ? "check" : null,
            iconColor: Constant.white,
            itemClick: () => {
                this.setState({
                    select: 0,
                    dataSource: [],
                });
                this.filter = null;
                this._searchText()
            }, itemStyle: {}
        }, {
            itemName: I18n("issueOpenText"),
            itemTextColor: select === 1 ? Constant.white : Constant.subTextColor,
            icon: select === 1 ? "check" : null,
            iconColor: Constant.white,
            itemClick: () => {
                this.setState({
                    select: 1,
                    dataSource: [],
                });
                this.filter = 'open';
                this._searchText()
            }, itemStyle: {
                borderLeftWidth: StyleSheet.hairlineWidth, borderLeftColor: Constant.lineColor,
            }
        }, {
            itemName: I18n("issueCloseText"),
            itemTextColor: select === 2 ? Constant.white : Constant.subTextColor,
            icon: select === 2 ? "check" : null,
            iconColor: Constant.white,
            itemClick: () => {
                this.setState({
                    select: 2,
                    dataSource: [],
                });
                this.filter = 'closed';
                this._searchText()
            }, itemStyle: {
                borderLeftWidth: StyleSheet.hairlineWidth, borderLeftColor: Constant.lineColor,
            }
        }]
    }

    render() {
        return (
            <View style={styles.mainBox}>
                <StatusBar hidden={false} backgroundColor={'transparent'} translucent barStyle={'light-content'}/>
                <View style={[styles.flexDirectionRowNotFlex, styles.shadowCard, {
                    backgroundColor: '#FFF',
                    borderBottomRightRadius: 4,
                    borderBottomLeftRadius: 4,
                    height: 40,
                    paddingVertical: Constant.normalMarginEdge / 3,
                }]}>
                    <TextInput
                        onChangeText={(text) => {
                            this._searchTextChange(text)
                        }}
                        placeholder={I18n('search')}
                        returnKeyType={'search'}
                        returnKeyLabel={'search'}
                        onSubmitEditing={(event) => {
                            this.searchText = event.nativeEvent.text;
                            this._searchText()
                        }}
                        underlineColorAndroid="transparent"
                        clearButtonMode="always"
                        style={[styles.smallText, {
                            padding: 0,
                            paddingLeft: Constant.normalMarginEdge / 2,
                            marginHorizontal: Constant.normalMarginEdge / 2,
                            borderRadius: 3,
                            backgroundColor: Constant.subLightTextColor,
                        }, styles.flex]}/>

                    <TouchableOpacity
                        style={[styles.centered, {marginTop: 2, marginHorizontal: Constant.normalMarginEdge}]}
                        onPress={() => {
                            this._searchText()
                        }}>
                        <Icon name={'md-search'} size={28} color={Constant.subLightTextColor}/>
                    </TouchableOpacity>
                </View>


                <CommonBottomBar
                    rootStyles={{
                        marginHorizontal: Constant.normalMarginEdge,
                        backgroundColor: Constant.primaryColor,
                        marginTop: Constant.normalMarginEdge,
                        borderRadius: 4,
                    }}
                    dataList={this._getBottomItem()}/>

                <PullListView
                    style={{flex: 1}}
                    ref="pullList"
                    enableRefresh={false}
                    renderRow={(rowData, sectionID, rowID, highlightRow) =>
                        this._renderRow(rowData, sectionID, rowID, highlightRow)
                    }
                    refresh={this._refresh}
                    loadMore={this._loadMore}
                    dataSource={this.state.dataSource}
                />
            </View>
        )
    }
}


IssueListPage.propTypes = {
    userName: PropTypes.string,
    repositoryName: PropTypes.string,
};


IssueListPage.defaultProps = {
    userName: '',
    repositoryName: '',
};

export default IssueListPage