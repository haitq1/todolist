import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import HomeVM from '../screens/Home/HomeVM';
import {useTranslation} from 'react-i18next';
import {useState, useCallback, useEffect, useMemo} from 'react';
import {Picker} from '@react-native-picker/picker';
import {useDispatch, useSelector} from 'react-redux';
import {Language} from '../redux/actions/Home.act';
import {TouchableOpacity} from 'react-native-gesture-handler';

function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>
    </View>
  );
}

const RewardScreen = () => {
  const completeText = 'Mục tiêu hoàn thành';
  const uncompleteText = 'Mục tiêu chưa hoàn thành';
  const totalText = ' Tổng số mục tiêu';
  const [complete, setComplete] = useState(completeText);
  const handleComplete = () => {
    complete == completeText ? setComplete('30') : setComplete(completeText);
  };
  const [uncomplete, setunComplete] = useState(uncompleteText);
  const handleUncomplete = () => {
    uncomplete == uncompleteText
      ? setunComplete('30')
      : setunComplete(uncompleteText);
  };
  const [total, setTotal] = useState(completeText);
  const handleTotal = () => {
    total == totalText ? setTotal('30') : setTotal(totalText);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity style={{padding: 20}} onPress={handleComplete}>
        <Text style={styles.bigblue}>{complete}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{padding: 20}} onPress={handleUncomplete}>
        <Text style={styles.bigblue}>{uncomplete}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{padding: 20}} onPress={handleTotal}>
        <Text style={styles.bigblue}>{total}</Text>
      </TouchableOpacity>
    </View>
  );
};

const useConnect = () => {
  const dispatch = useDispatch();
  const mapDispatch = useMemo(
    () => ({
      onLanguage: (language: string) => dispatch(Language(language)),
    }),
    [dispatch],
  );
  return {
    ...mapDispatch,
  };
};

function SettingsScreen() {
  const {onLanguage} = useConnect();
  const {i18n} = useTranslation();
  const language = useSelector((state: any) => state.home.language);
  const handleLanguage = useCallback((item: any) => {
    onLanguage(item);
    i18n.changeLanguage(item);
  }, []);
  return (
    <View>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{margin: 50, padding: 50}}>dnahjgbtv</Text>
        <Picker
          selectedValue={language}
          style={{height: 50, width: 100}}
          onValueChange={handleLanguage}>
          <Picker.Item label="Tiếng Việt" value="vi" />
          <Picker.Item label="Tiếng Anh" value="en" />
        </Picker>
      </View>
    </View>
  );
}

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const {t} = useTranslation();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            } else if (route.name === 'account') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'reward') {
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
        <Tab.Screen
          name="home"
          options={{
            title: t('main.home'),
          }}
          component={HomeVM}
        />
        <Tab.Screen
          name="reward"
          options={{
            title: t('main.reward'),
          }}
          component={RewardScreen}
        />
        <Tab.Screen
          name="settings"
          options={{
            title: t('main.settings'),
          }}
          component={SettingsScreen}
        />
        <Tab.Screen
          name="account"
          options={{
            title: t('main.account'),
          }}
          component={HomeScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  bigblue: {
    color: 'black',
    borderRadius: 30,
    fontSize: 20,
    borderColor: 'black',
    borderWidth: 2,
    padding: 20,
  },
});
export default TabNavigator;
