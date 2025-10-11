// import './i18n';
import { I18nextProvider, useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { StyleSheet, I18nManager } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider as PaperProvider } from 'react-native-paper';

import Login from './src/pages/login';
import Register from './src/pages/register';
import AdminPanel from './src/pages/adminpanel/Adminpanel';
import Home from './src/pages/Home';
import AboutUs from './src/pages/AboutUs';
import Favorites from './src/pages/Favorites';
import Courses from './src/pages/courses';
import CoursesDetails from './src/pages/CoursesDetails';
import { Provider } from 'react-redux';
import storeToolKit from './Store/FavSlice';
import i18n from './i18n';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MainDrawer() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [drawerPosition, setDrawerPosition] = useState(isRTL ? 'right' : 'left');

  useEffect(() => {
    const handleLanguageChange = (lng) => {
      const rtl = lng === 'ar';
      setDrawerPosition(rtl ? 'right' : 'left');

      if (rtl !== I18nManager.isRTL) {
        I18nManager.forceRTL(rtl);
        I18nManager.allowRTL(true);
      }
    };

    i18n.on('languageChanged', handleLanguageChange);
    return () => i18n.off('languageChanged', handleLanguageChange);
  }, [i18n]);

  return (
    <Drawer.Navigator
      key={drawerPosition}
      screenOptions={{
        headerShown: true,
        drawerPosition: drawerPosition,
        drawerType: 'front',
        drawerStyle: { width: '70%' },
        overlayColor: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      <Drawer.Screen name={t("Home")} component={Home} />
      <Drawer.Screen name={t("About Us")} component={AboutUs} />
      <Drawer.Screen name={t("Courses")} component={Courses} />
      <Drawer.Screen name={t("Favorites")} component={Favorites} />
      {/* <Drawer.Screen name={t("Admin Panel")} component={AdminPanel} /> */}
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={storeToolKit}>
        <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="login">
            <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="register" component={Register} options={{ headerShown: false }} />
            <Stack.Screen name="All Courses" component={MainDrawer} options={{ headerShown: false }} />
            <Stack.Screen name="CoursesDetails" component={CoursesDetails} />
            <Stack.Screen name="Courses" component={Courses} />
            <Stack.Screen name="Adminpanel"component={AdminPanel}options={{ headerShown: false }}/>
          </Stack.Navigator>
        </NavigationContainer>
        </PaperProvider>
        </Provider>
    </I18nextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3C467B",
    padding: 10,
  },
});
