/**
 * Created by guoshuyu on 2017/11/12.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    BackHandler,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import styles, {screenWidth, screenHeight} from "../../style"
import * as Constant from "../../style/constant"
import I18n from '../../style/i18n'
import Modal from 'react-native-modalbox';
import Spinner from 'react-native-spinkit';
import {Actions} from "react-native-router-flux";


/**
 * 登陆Modal
 */
class CommentConfirmModal extends Component {

    constructor(props) {
        super(props);
        this.onClose = this.onClose.bind(this);
        this.text = this.props.text;
    }

    componentDidMount() {
        this.refs.loginModal.open();
    }

    componentWillUnmount() {
    }

    onClose() {
        Actions.pop();
        return true;
    }

    render() {
        let width = screenWidth - 100;
        return (
            <Modal ref={"loginModal"}
                   style={[{height: screenHeight, width: screenWidth, backgroundColor: "#F0000000"}]}
                   position={"center"}
                   onClosed={this.onClose}
                   backdrop={this.props.backExit}
                   backButtonClose={this.props.backExit}
                   swipeToClose={this.props.backExit}
                   backdropOpacity={0.8}>
                <View style={[styles.centered, {flex: 1,}]}>
                    <View style={[{borderRadius: 3, backgroundColor: Constant.white}, styles.centered]}>
                        <View style={[styles.flexDirectionRowNotFlex, {marginTop: 10, paddingBottom: 10},
                            {backgroundColor: Constant.white, width: width}, styles.centered]}>
                            <Text
                                style={[styles.normalText, {fontWeight: 'bold'}]}>{this.props.titleText}</Text>
                        </View>
                        <View style={[{
                            marginHorizontal: Constant.normalMarginEdge,
                        }]}>
                            <Text
                                style={[styles.normalText, {
                                    padding: Constant.normalMarginEdge,
                                }]}>{this.props.text}</Text>
                        </View>
                        <View
                            style={[styles.flexDirectionRowNotFlex, {
                                paddingVertical: Constant.normalMarginEdge,
                                width: width
                            }]}>
                            <TouchableOpacity
                                style={[styles.flex, styles.centerH, {borderBottomLeftRadius: 3,}]}
                                onPress={() => {
                                    Actions.pop();
                                }}>
                                <Text style={[styles.subNormalText, {fontWeight: 'bold'}]}>{I18n("cancel")}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.flex, styles.centerH, {
                                    borderLeftWidth: 1,
                                    borderLeftColor: Constant.miWhite,
                                    borderBottomRightRadius: 3,
                                },]}
                                onPress={() => {
                                    if (this.text && this.text.trim().length > 0) {
                                        Actions.pop();
                                        this.props.textConfirm && this.props.textConfirm(this.text);
                                    }
                                }}>
                                <Text style={[styles.normalText, {fontWeight: 'bold'}]}>{I18n("ok")}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

CommentConfirmModal.propTypes = {
    text: PropTypes.string,
    titleText: PropTypes.string,
    textConfirm: PropTypes.func,
};
CommentConfirmModal.defaultProps = {
    text: '',
    titleText: '',
};


export default CommentConfirmModal;