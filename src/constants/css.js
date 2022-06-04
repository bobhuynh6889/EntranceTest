import {StyleSheet} from 'react-native';
import {colorFFFFFF} from './colors';
import Fonts from './fonts';

export const customTxt = (family, size, txtColor) =>
  StyleSheet.create({
    txt: {
      fontFamily: family || Fonts.Regular,
      fontSize: size || 12,
      color: txtColor || colorFFFFFF,
    },
  });
