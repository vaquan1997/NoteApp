import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import AddScreen from '../screens/AddScreen';
import SettingScreen from '../screens/SettingScreen';
import IonIcon from 'react-native-vector-icons/Ionicons';
import EditScreen from '../screens/EditScreen';
const Tab = createBottomTabNavigator();
const CustomTabBarButton = ({children, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        top: -35,
        justifyContent: 'center',
        alignItems: 'center',
        ...styles.shadow,
      }}
      onPress={onPress}>
      <View
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
          backgroundColor: '#e32f45',
        }}>
        {children}
      </View>
    </TouchableOpacity>
  );
};
const Tabs = () => {

  return (
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'relative',
            bottom: 0,
            left: 0,
            right: 0,
            elevation: 0,
            backgroundColor: '#ffffff',
            borderRadius: 15,
            height: 80,
            ...styles.shadow,
          },
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown:false,
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <IonIcon
                  name="home"
                  size={22}
                  style={{
                    width: 25,
                    height: 25,
                    color: focused ? '#e32f45' : '#748c94',
                  }}
                />
                <Text
                  style={{
                    color: focused ? '#e32f45' : '#748c94',
                    fontSize: 12,
                  }}>
                  HOME
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Add"
          component={AddScreen}
          initialParams={AddScreen}
          options={{
            headerShown:false,
            tabBarIcon: ({focused}) => (
              <IonIcon
                name="add"
                size={35}
                style={{
                  width: 35,
                  height: 35,
                  color: '#fff',
                }}
              />
            ),
            tabBarButton: props => <CustomTabBarButton {...props} />,
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingScreen}
          options={{
            headerShown:false,
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <IonIcon
                  name="settings-sharp"
                  size={22}
                  style={{
                    width: 25,
                    height: 25,
                    color: focused ? '#e32f45' : '#748c94',
                  }}
                />
                <Text
                  style={{
                    color: focused ? '#e32f45' : '#748c94',
                    fontSize: 12,
                  }}>
                  SETTING
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Edit"
          component={EditScreen}
          initialParams={{HomeScreen,EditScreen}}
          options={{
          
            headerShown:false,
            tabBarButton: () => null,   
            tabBarVisible: false, 
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <IonIcon
                  name="settings-sharp"
                  size={22}
                  style={{
                    width: 25,
                    height: 25,
                    color: focused ? '#e32f45' : '#748c94',
                  }}
                />
                <Text
                  style={{
                    color: focused ? '#e32f45' : '#748c94',
                    fontSize: 12,
                  }}>
                  Edit
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
  );
};

export default Tabs;
const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
