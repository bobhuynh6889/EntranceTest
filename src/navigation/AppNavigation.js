import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef, isMountedRef } from "./index";
import Routes from "./Routes";

import CategoriesView from "../views/categories";
import SignUpView from "../views/sign_up";

const Stack = createStackNavigator();

export default function RootNavigation() {
  useEffect(() => {
    isMountedRef.current = true;
    return () => (isMountedRef.current = false);
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        headerMode="none"
        initialRouteName={Routes.SIGN_UP_SCREEN}
      >
        <Stack.Screen name={Routes.SIGN_UP_SCREEN} component={SignUpView} />
        <Stack.Screen
          name={Routes.CHOOSE_CATEGORIES_SCREEN}
          component={CategoriesView}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
