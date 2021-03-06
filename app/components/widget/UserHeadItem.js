import React, {Component} from 'react';
import {
    View, Text, Image, StyleSheet, TouchableOpacity
} from 'react-native';
import styles, {screenWidth} from "../../style"
import PropTypes from 'prop-types';
import * as Constant from '../../style/constant'
import IconTextItem from './IconTextItem'
import IconTextAutoLinkItem from './IconTextAutoLinkItem'
import Icon from 'react-native-vector-icons/Ionicons'
import IconF from 'react-native-vector-icons/FontAwesome'
import {Actions} from "react-native-router-flux";
import I18n from '../../style/i18n'
import NameValueItem from './NameValueItem'
import {RepositoryFilter} from '../../utils/filterUtils'

const hintNum = '---';

class UserHeadItem extends Component {


    render() {
        let halfEdge = Constant.normalMarginEdge / 2;
        let hint = I18n('userInfoNoting');
        let {
            link, userPic, userName, userDisPlayName, des, location, groupName,
            follower, followed, repos, star, setting, notify, unRead
        } = this.props;
        return (
            <View style={[{
                paddingHorizontal: Constant.normalMarginEdge,
                paddingTop: 2 * Constant.normalMarginEdge,
                backgroundColor: Constant.primaryColor,
                shadowColor: '#000',
                shadowOffset: {
                    width: 1,
                    height: 2
                },
                shadowOpacity: 0.7,
                shadowRadius: 5,
                borderBottomRightRadius: 2,
                borderBottomLeftRadius: 2,
                elevation: 2,
            }]}>
                <View style={[
                    {
                        position: "absolute",
                        left: screenWidth - 100,
                        right: Constant.normalMarginEdge,
                        top: Constant.normalMarginEdge,
                        bottom: 80,
                        zIndex: 12,
                    }, styles.alignItemsEnd]}>
                    <TouchableOpacity
                        style={[styles.flexDirectionRowNotFlex, {marginTop: Constant.normalMarginEdge / 2,}]}
                        onPress={() => {
                            Actions.SettingPage();
                        }}>
                        <Icon name={'ios-settings'} size={setting ? 25 : 1}
                              color={Constant.miWhite}/>
                    </TouchableOpacity>
                </View>
                <View style={[styles.flexDirectionRowNotFlex]}>
                    <View style={[{
                        height: Constant.largeIconSize, width: Constant.largeIconSize,
                    }]}>
                        <Image source={{uri: userPic}}
                               resizeMethod="scale"
                               style={[styles.centerH, {
                                   height: Constant.largeIconSize, width: Constant.largeIconSize,
                                   borderRadius: Constant.largeIconSize / 2,
                                   marginTop: 5
                               }]}/>
                    </View>
                    <View style={{marginLeft: Constant.normalMarginEdge}}>
                        <View style={[styles.centerH, styles.flexDirectionRowNotFlex]}>
                            <Text style={[styles.largeTextWhite, {fontWeight: "bold",}]}>
                                {(userDisPlayName) ? userDisPlayName : hintNum}
                            </Text>
                            <TouchableOpacity
                                style={[styles.flexDirectionRowNotFlex, {marginLeft: Constant.normalMarginEdge / 2,}]}
                                onPress={() => {
                                    Actions.NotifyPage({backNotifyCall: this.props.backNotifyCall});
                                }}>
                                <IconF name={'bell'} size={setting ? 15 : 1}
                                       color={unRead ? Constant.actionBlue : Constant.miWhite}/>
                            </TouchableOpacity>
                        </View>
                        <Text style={[styles.subLightSmallText,]}>{(userName) ? userName : hintNum}</Text>
                        <IconTextItem
                            text={(groupName) ? groupName : hint} icon={'group'}
                            viewstyle={[{marginTop: halfEdge}]}
                            textstyle={[{marginLeft: halfEdge}, styles.smallTextWhite,]}/>
                        <IconTextItem
                            text={(location) ? location : hint} icon={'map-marker'}
                            viewstyle={[{marginTop: halfEdge}]}
                            textstyle={[{marginLeft: halfEdge}, styles.smallTextWhite,]}/>
                    </View>
                </View>
                <IconTextAutoLinkItem text={(link) ? link : hint} icon={'link'}
                                      textstyle={[{marginLeft: Constant.normalMarginEdge},
                                          {fontSize: Constant.smallTextSize},]}
                                      viewstyle={[{marginTop: halfEdge}]}/>
                <IconTextItem text={(des) ? des : hint}
                              textstyle={[{marginVertical: Constant.normalMarginEdge},
                                  styles.subLightSmallText,]}/>

                <View style={[styles.flexDirectionRowNotFlex,
                    {borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: Constant.primaryLightColor},
                    {borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: Constant.primaryLightColor},
                ]}>
                    <NameValueItem
                        itemStyle={[styles.flex, styles.centered,]}
                        itemName={I18n("repositoryText")}
                        itemValue={repos ? repos : hintNum}
                        onItemPress={() => {
                            Actions.ListPage({
                                dataType: 'user_repos', showType: 'repository',
                                currentUser: userDisPlayName, title: userDisPlayName + " - " + I18n('repositoryText'),
                                needRightBtn: true,
                                rightBtn: 'filter',
                                filterSelect: RepositoryFilter()[0].itemValue,
                                rightBtnPress: () => {
                                    Actions.OptionModal({dataList: RepositoryFilter()});
                                }
                            })
                        }}/>
                    <NameValueItem
                        itemStyle={[styles.flex, styles.centered,
                            {borderLeftWidth: StyleSheet.hairlineWidth, borderLeftColor: Constant.primaryLightColor},
                            {borderRightWidth: StyleSheet.hairlineWidth, borderRightColor: Constant.primaryLightColor},
                        ]}
                        itemName={I18n("FollowersText")}
                        itemValue={follower ? follower : hintNum}
                        onItemPress={() => {
                            Actions.ListPage({
                                dataType: 'follower', showType: 'user',
                                currentUser: userDisPlayName, title: userDisPlayName + " - " + I18n('FollowersText')
                            })
                        }}/>
                    <NameValueItem
                        itemStyle={[styles.flex, styles.centered,]}
                        itemName={I18n("FollowedText")}
                        itemValue={followed ? followed : hintNum}
                        onItemPress={() => {
                            Actions.ListPage({
                                dataType: 'followed', showType: 'user',
                                currentUser: userDisPlayName, title: userDisPlayName + " - " + I18n('FollowedText')
                            })
                        }}/>
                    <NameValueItem
                        itemStyle={[styles.flex, styles.centered,
                            {borderLeftWidth: StyleSheet.hairlineWidth, borderLeftColor: Constant.primaryLightColor},]}
                        itemName={I18n("staredText")}
                        itemValue={star ? star : hintNum}
                        onItemPress={() => {
                            Actions.ListPage({
                                dataType: 'user_star', showType: 'repository',
                                currentUser: userDisPlayName, title: userDisPlayName + " - " + I18n('repositoryText'),
                                needRightBtn: true,
                                rightBtn: 'filter',
                                filterSelect: RepositoryFilter()[0].itemValue,
                                rightBtnPress: () => {
                                    Actions.OptionModal({dataList: RepositoryFilter()});
                                }
                            })
                        }}/>
                </View>
            </View>
        )
    }
}


UserHeadItem.propTypes = {
    userDisPlayName: PropTypes.string,
    userName: PropTypes.string,
    userPic: PropTypes.string,
    groupName: PropTypes.string,
    location: PropTypes.string,
    link: PropTypes.string,
    des: PropTypes.string,
    star: PropTypes.string,
    follower: PropTypes.string,
    followed: PropTypes.string,
    repos: PropTypes.string,
    setting: PropTypes.bool,
};


UserHeadItem.defaultProps = {
    userDisPlayName: ' ',
    userName: ' ',
    star: hintNum,
    follower: hintNum,
    followed: hintNum,
    repos: hintNum,
    setting: false,
};


export default UserHeadItem;