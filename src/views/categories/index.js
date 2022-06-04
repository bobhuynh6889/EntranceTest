import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  StatusBar,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import LinearGradient from "react-native-linear-gradient";

import { saveLSCategoriesSelected } from "../../actions/common";
import NotificationView, {
  STATUS_NOTIFY,
} from "../../components/NotificationView";
import { customTxt } from "../../constants/css";
import Fonts from "../../constants/fonts";
import NavigationService from "../../navigation";
import api from "../../apis";

import imgCategories from "../../../assets/images/categories";

import Header from "../../components/Header";
import LoadingView from "../../components/LoadingView";

export default function CategoriesView() {
  const dataSignUp = useSelector((state) => state.common.dataSignUp);
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [isShowNoti, setShowNoti] = useState(false);
  const [dataNoti, setDataNoti] = useState();
  const [listCategories, setListCategories] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);

  useEffect(() => {
    if (dataSignUp?.token) {
      callAPIGetListCategories();
    }
  }, [dataSignUp]);

  const callAPIGetListCategories = () => {
    api
      .get(
        "categories?pageSize=100&pageNumber=0",
        {},
        {
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + dataSignUp?.token,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        console.log("dataCategories: ", res);
        if (res?.status === 200) {
          setListCategories(res?.data?.categories);
        } else {
          setShowNoti(true);
          if ((res?.data?.errors?.message || []).length > 0) {
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

  const RenderItem = (item) => {
    const _onPressSelection = () => {
      var selectID = [...selectedItem]
      if (selectID.includes(item)) {
        selectID = selectID.filter((val) => val?._id !== item?._id)
      }
      else {
        selectID.push(item)
      }
      setSelectedItem(selectID)
    }
    if (selectedItem.includes(item)) {
      return (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={["rgba(138, 0, 255, 1)", "rgba(138, 50, 169, 1)"]}
          style={styles.itemStyle}
        >
          <TouchableOpacity
            style={styles.itemStyleSelected}
            onPress={() => _onPressSelection()}
          >
            <Text style={[customTxt(Fonts.Regular, 14).txt]}>
              {item?.name || ""}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.itemStyle}
          onPress={() => {_onPressSelection()}}
        >
          <Text style={[customTxt(Fonts.Regular, 14).txt]}>
            {item?.name || ""}
          </Text>
        </TouchableOpacity>
      );
    }
  };

  const renderLsCategory = () => {
    return (
      <View style={styles.flatListCategories}>
        <FlatList
          data={listCategories}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => RenderItem(item)}
          contentContainerStyle={styles.contentContainerStyle}
          numColumns={3}
        />
      </View>
    );
  };

  const renderTitleAndContent = () => {
    return (
      <View style={styles.ctnTextTop}>
        <Text style={[customTxt(Fonts.Regular, 22).txt, styles.txtTitle]}>
          Wellcome to Nexle Entrance Test
        </Text>
        <Text style={[customTxt(Fonts.Regular, 14).txt, styles.txtContent]}>
          Please select categories what you would like to see on your feed. You
          can set this later on Filter.
        </Text>
      </View>
    )
  }

  const _onPressDone = () => {
    if ((selectedItem || []).length > 0) {
      dispatch(saveLSCategoriesSelected(selectedItem));
    }
  };

  return (
    <ImageBackground
      source={imgCategories.img_bg_categories}
      style={styles.container}
    >
      <StatusBar barStyle={"light-content"} backgroundColor="white" />
      <Header
        onPressLeft={() => {
          NavigationService.goBack();
        }}
        textRight={(selectedItem || []).length > 0 ? "Done" : null}
        onPressRight={_onPressDone}
      />
      {renderTitleAndContent()}
      <ScrollView>
        {renderLsCategory()}
      </ScrollView>
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
  ctnTextTop: {
    marginBottom: 10
  },
  txtTitle: {
    marginTop: 106,
    marginLeft: 16,
    marginRight: 40,
  },
  txtContent: {
    marginTop: 11,
    marginLeft: 16,
    marginRight: 40,
    lineHeight: 23,
    color: "rgba(255, 255, 255, 0.82)",
  },
  contentContainerStyle: {
    paddingBottom: 67,
  },
  flatListCategories: {
    marginTop: 10,
    alignItems: 'center'
  },
  itemStyle: {
    height: 71,
    width: Dimensions.get('window').width / 3 - 16,
    marginTop: 8,
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 8,
  },
  itemStyleSelected: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 71,
    width: Dimensions.get('window').width / 3 - 16,
  },
});
