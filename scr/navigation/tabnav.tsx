import * as React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import HomeVM from '../screens/Home/HomeVM';
import i18n from '../localization/i18n'

function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === i18n.t('main.home')) {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === i18n.t('main.settings')) {
              iconName = focused ? 'settings' : 'settings-outline';
            } else if (route.name === i18n.t('main.account')) {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === i18n.t('main.reward')) {
              iconName = focused ? 'trophy' : 'trophy-outline';
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name={i18n.t('main.home')} component={HomeVM} />
        <Tab.Screen name={i18n.t('main.reward')} component={SettingsScreen} />
        <Tab.Screen name={i18n.t('main.settings')} component={SettingsScreen} />
        <Tab.Screen name={i18n.t('main.account')} component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default TabNavigator;
