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
class CommonOptionModal extends Component {

    constructor(props) {
        super(props);
        this.onClose = this.onClose.bind(this);
        this._renderItem = this._renderItem.bind(this);
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

    _renderItem(data) {
        let width = screenWidth - 100;
        return (
            <TouchableOpacity style={[styles.centered, {width: width, height: 50}, styles.centerH, data.itemStyle]}
                              onPress={() => {
                                  Actions.pop();
                                  data.itemClick && data.itemClick(data);
                              }}
                              key={data.itemName}>
                <Text style={[styles.normalText]}>{data.itemName}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        let {dataList} = this.props;
        let items = [];
        dataList.forEach((data) => {
            items.push(this._renderItem(data))
        });
        return (
            <Modal ref={"loginModal"}
                   style={[{height: screenHeight, width: screenWidth, backgroundColor: "#F0000000"}]}
                   position={"center"}
                   onClosed={this.onClose}
                   backdrop={true}
                   backButtonClose={true}
                   swipeToClose={true}
                   backdropOpacity={0.8}>
                <View style={[styles.centered, {height: screenHeight, width: screenWidth}]}>
                    <View style={[styles.centered, {backgroundColor: Constant.white, borderRadius: 4}]}>
                        {items}
                    </View>
                </View>
            </Modal>
        )
    }
}

CommonOptionModal.propTypes = {
    dataList: PropTypes.array,
};


CommonOptionModal.defaultProps = {
    dataList: [],
};

export default CommonOptionModal;