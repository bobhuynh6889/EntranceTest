import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch } from "react-redux";

import api from "../../apis";
import Fonts from "../../constants/fonts";
import {
  color647FFF,
  color808080,
  color828283,
  color91E2B7,
  colorE05151,
  colorE3A063,
} from "../../constants/colors";
import NavigationService from "../../navigation";
import Routes from "../../navigation/Routes";
import { saveDataSignUp } from "../../actions/common";
import NotificationView, { STATUS_NOTIFY } from "../../components/NotificationView";
import { customTxt } from "../../constants/css";

import icSignUp from "../../../assets/images/sign_up";

import Header from "../../components/Header";
import LoadingView from "../../components/LoadingView";

export default function SignUpView() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isShow, setShow] = useState(true);
  const [isCheckBox16, setCheckBox16] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [isShowNoti, setShowNoti] = useState(false);
  const [dataNoti, setDataNoti] = useState();
  const [statusPass, setStatusPass] = useState();

  const STATUS_PASSWORD = {
    Weak: "Weak",
    Fair: "Fair",
    Good: "Good",
    Strong: "Strong",
    TooShort: "Too short",
  };

  useEffect(() => {
    checkLevelPassword();
  }, [password]);

  const checkLevelPassword = () => {
    if (password) {
      var levelPass = 0;
      // The password must be between 6-18 characters.
      const regex = /(?=.{6,18})/;
      // Contains both lowercase and uppercase letters.
      const regex2 = /(?=.*[a-z])(?=.*[A-Z])/;
      // Contains at least one numeric character.
      const regex3 = /(?=.*[0-9])/;
      // Contains special characters.
      const regex4 = /([^A-Za-z0-9])/;

      if (!regex.test(password)) {
        setStatusPass(STATUS_PASSWORD.TooShort);
        return;
      } else {
        levelPass += 1;
      }
      if (regex2.test(password)) {
        levelPass += 1;
      }
      if (regex3.test(password)) {
        levelPass += 1;
      }
      if (regex4.test(password)) {
        levelPass += 1;
      }

      switch (levelPass) {
        case 1:
          setStatusPass(STATUS_PASSWORD.Weak);
          break;
        case 2:
          setStatusPass(STATUS_PASSWORD.Fair);
          break;
        case 3:
          setStatusPass(STATUS_PASSWORD.Good);
          break;
        case 4:
          setStatusPass(STATUS_PASSWORD.Strong);
          break;
        default:
          setStatusPass();
          break;
      }
    }
  };

  const checkColorStatus = () => {
    switch (statusPass) {
      case STATUS_PASSWORD.TooShort:
        return {
          color: color828283,
          text: STATUS_PASSWORD.TooShort,
        };
      case STATUS_PASSWORD.Weak:
        return {
          color: colorE05151,
          text: STATUS_PASSWORD.Weak,
        };
      case STATUS_PASSWORD.Fair:
        return {
          color: colorE3A063,
          text: STATUS_PASSWORD.Fair,
        };
      case STATUS_PASSWORD.Good:
        return {
          color: color647FFF,
          text: STATUS_PASSWORD.Good,
        };
      case STATUS_PASSWORD.Strong:
        return {
          color: color91E2B7,
          text: STATUS_PASSWORD.Strong,
        };
      default:
        return {
          color: color647FFF,
          text: "",
        };
        break;
    }
  };

  const renderEmailTextInput = () => {
    return (
      <View style={styles.ctnEmailTextInput}>
        <Text style={customTxt(Fonts.Regular, 12, color828283).txt}>
          {email ? "Your email" : ""}
        </Text>
        <TextInput
          value={email}
          style={[
            customTxt(Fonts.Regular, email ? 16 : 12).txt,
            styles.txtInput,
            styles.border,
          ]}
          onChangeText={(txt) => setEmail(txt)}
          placeholder={"Your email"}
          placeholderTextColor={color828283}
          autoCapitalize={'none'}
        />
      </View>
    );
  };

  const renderPassTextInput = () => {
    return (
      <View style={styles.ctnPassTextInput}>
        <Text style={customTxt(Fonts.Regular, 12, color828283).txt}>
          {password ? "Your password" : ""}
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <TextInput
            value={password}
            style={[
              customTxt(Fonts.Regular, password ? 16 : 12).txt,
              styles.txtInput,
              styles.border,
            ]}
            onChangeText={(txt) => setPassword(txt)}
            secureTextEntry={isShow}
            placeholder={"Your password"}
            placeholderTextColor={color828283}
          />
          <TouchableOpacity
            style={styles.ctnIconShowPass}
            onPress={() => setShow(!isShow)}
          >
            <Image source={icSignUp.ic_eye} style={styles.iconEye} />
          </TouchableOpacity>
        </View>
        {password !== "" && (
          <Text
            style={[
              customTxt(Fonts.Regular, 12, checkColorStatus().color).txt,
              styles.levelPassStyle,
            ]}
          >
            {checkColorStatus().text}
          </Text>
        )}
      </View>
    );
  };

  const renderCheck16View = () => {
    return (
      <TouchableOpacity
        style={styles.ctnCheckBox16}
        onPress={() => setCheckBox16(!isCheckBox16)}
      >
        <Image
          source={isCheckBox16 ? icSignUp.ic_box_checked : icSignUp.ic_box_empty}
          style={styles.checkBox}
        />
        <Text style={[customTxt(Fonts.Regular, 14).txt, styles.txtContentCheck16]}>
          I am over 16 years of age
        </Text>
      </TouchableOpacity>
    );
  };

  const renderTermsAndPrivacy = () => {
    return (
      <View style={styles.termAndPrivacy}>
        <Text style={customTxt(Fonts.Medium, 12, color828283).txt}>
          By clicking Sign Up, you are indicating that you have read and agree
          to the{" "}
          <Text style={customTxt(Fonts.Medium, 12, color647FFF).txt}>
            Terms of Service
          </Text>{" "}
          and{" "}
          <Text style={customTxt(Fonts.Medium, 12, color647FFF).txt}>
            Privacy Policy
          </Text>
        </Text>
      </View>
    );
  };

  const renderSignUp = () => {
    return (
      <View style={styles.ctnSignUp}>
        <Text style={customTxt(Fonts.Medium, 16).txt}>
          Sign Up
        </Text>
        <TouchableOpacity disabled={checkDisableSignUpButton()} onPress={_onPressSignUp}>
          <Image source={icSignUp.ic_next_page} style={styles.iconNextStyle} />
        </TouchableOpacity>
      </View>
    );
  };

  const checkDisableSignUpButton = () => {
    if (email || password) {
      return false;
    } else {
      return true;
    }
  };

  const _onPressSignUp = () => {
    if (!email) {
      setShowNoti(true);
      setDataNoti({
        status: STATUS_NOTIFY.WARNING,
        content: "The email is empty.",
      });
      return;
    }
    if (email) {
      const regexCheckEmailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!regexCheckEmailValid.test(email)) {
        setShowNoti(true);
        setDataNoti({
          status: STATUS_NOTIFY.WARNING,
          content: "The email is not valid.",
        });
        return;
      }
    }
    if (!password) {
      setShowNoti(true);
      setDataNoti({
        status: STATUS_NOTIFY.WARNING,
        content: "The password is empty.",
      });
      return;
    }
    setLoading(true);
    api
      .post("auth/signup", {
        firstName: "Huynh",
        lastName: "Thuan",
        email: email,
        password: password,
      })
      .then((res) => {
        console.log("resSignUp: ", res);
        if (res?.data?.token) {
          Promise.all([dispatch(saveDataSignUp(res?.data))]);
          setTimeout(() => {
            setLoading(false);
            NavigationService.navigate(Routes.CHOOSE_CATEGORIES_SCREEN);
          }, 500);
        } else {
          setLoading(false);
          setShowNoti(true);
          if ((res?.data?.errors?.password || []).length > 0) {
            setDataNoti({
              status: STATUS_NOTIFY.ERROR,
              content: res?.data?.errors?.password[0] || "Error",
            });
          } else if ((res?.data?.errors?.message || []).length > 0) {
            setDataNoti({
              status: STATUS_NOTIFY.ERROR,
              content: res?.data?.errors?.message[0] || "Error",
            });
          } else {
            setDataNoti({
              status: STATUS_NOTIFY.ERROR,
              content: "Error",
            });
          }
        }
      })
      .catch(() => {
        setLoading(false);
        setShowNoti(true);
        setDataNoti({
          status: STATUS_NOTIFY.WARNING,
          content: "Can not connect to server.",
        });
      });
  };

  const renderBody = () => {
    return (
      <View style={styles.ctnBody}>
        <Text style={[customTxt(Fonts.Regular, 22).txt, styles.txtTitleSignUp]}>
          Let’s get you started!
        </Text>
        {renderEmailTextInput()}
        {renderPassTextInput()}
        {renderCheck16View()}
        {renderTermsAndPrivacy()}
        {renderSignUp()}
      </View>
    )
  }

  return (
    <ImageBackground source={icSignUp.img_bg_sign_up} style={styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor="white" />
      <Header />
      <KeyboardAwareScrollView>
        {renderBody()}
      </KeyboardAwareScrollView>
      {isLoading && <LoadingView />}
      <NotificationView
        isShow={isShowNoti}
        status={dataNoti?.status || STATUS_NOTIFY.ERROR}
        content={dataNoti?.content || ""}
        setShow={(val) => setShowNoti(val)}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ctnBody: {
    paddingBottom: 60,
  },
  txtTitleSignUp: {
    marginTop: 255,
    marginLeft: 24,
  },
  ctnEmailTextInput: {
    marginTop: 41,
    marginHorizontal: 24,
  },
  txtInput: {
    height: 42,
    alignItems: "center",
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: color647FFF,
    width: '100%',
  },
  ctnPassTextInput: {
    marginTop: 26,
    marginHorizontal: 24,
  },
  ctnIconShowPass: {
    marginLeft: -24,
  },
  iconEye: {
    width: 19,
    height: 10,
  },
  levelPassStyle: {
    marginTop: 8,
    textAlign: "right",
  },
  ctnCheckBox16: {
    flexDirection: "row",
    marginTop: 49,
    marginHorizontal: 24,
    alignItems: "center",
  },
  checkBox: {
    width: 23,
    height: 23,
  },
  txtContentCheck16: {
    marginLeft: 8,
  },
  termAndPrivacy: {
    marginTop: 29,
    marginLeft: 24,
    marginRight: 40,
  },
  ctnSignUp: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    marginTop: 50,
    marginLeft: 26,
    marginRight: 24,
  },
  iconNextStyle: {
    width: 54,
    height: 54
  }
});
