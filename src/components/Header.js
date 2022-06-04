/* eslint-disable no-sparse-arrays */
import React, {useEffect} from 'react';
import {
  View,
  Text,
  NativeModules,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image
} from 'react-native';
import {customTxt} from '../constants/css';
import Fonts from '../constants/fonts';
import {colorFFFFFF} from '../constants/colors';
import icSignUp from '../../assets/images/sign_up';

export default function Header({
  backgroundColor,
  onPressLeft,
  onPressRight,
  textRight,
  txtRightStyle,
  iconLeft,
  textRightColor,
  rightDisabled,
}) {
  const [h, setH] = React.useState(0);

  useEffect(() => {
    const {StatusBarManager} = NativeModules;
    setH(StatusBarManager.HEIGHT);
  }, []);

  const txtTextRightColor = {color: textRightColor || colorFFFFFF};
  const txtBackgroundColor = {backgroundColor: backgroundColor};

  const onPressNull = () => {};

  return (
    <View style={heighNavi(h).fullView}>
      {/* STATUS BAR */}
      {Platform.OS === 'ios' && (
        <View style={[txtBackgroundColor, {height: h}]} />
      )}
      {/* HEADER */}
      <View style={[styles.container, txtBackgroundColor]}>
        {/* LEFT */}
        <TouchableOpacity
          onPress={onPressLeft || onPressNull}
          style={styles.contentCornerLeft}>
          <Image
            style={styles.imgIcon}
            source={iconLeft || icSignUp.ic_back}
          />
        </TouchableOpacity>
        {/* CENTER */}
        <View style={styles.centerView} />
        {/* RIGHT */}
        <TouchableOpacity
          disabled={rightDisabled}
          onPress={onPressRight || onPressNull}
          style={styles.contentCornerRight}>
          {textRight && (
            <Text
              style={[
                customTxt(Fonts.Regular, 14).txt,
                txtTextRightColor,
                styles.marginR16,
                txtRightStyle,
                ,
              ]}>
              {textRight}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 46,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentCornerLeft: {
    height: '100%',
    width: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentCornerRight: {
    height: '100%',
    minWidth: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  marginR16: {
    marginRight: 16,
  },
  centerView: {
    flex: 1,
  },
  imgIcon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
  }
});

const heighNavi = h =>
  StyleSheet.create({
    fullView: {
      width: '100%',
      height: Platform.OS === 'android' ? 40 + h : 46 + h,
    },
  });
