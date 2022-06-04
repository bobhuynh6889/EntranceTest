import React, { useEffect, useState } from 'react';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store';
import RootNavigation from './src/navigation/AppNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  const [isConnect, setConnect] = useState(false);
  const [isShowNoti, setNoti] = useState(false);
  const [activeApp, setActiveApp] = useState(true);

  useEffect(() => {
    setNoti(isConnect);
  }, [isConnect]);

  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <RootNavigation />
      </SafeAreaProvider>
    </Provider>
  );
}
