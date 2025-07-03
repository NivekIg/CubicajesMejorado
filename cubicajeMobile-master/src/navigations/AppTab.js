import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

import Items from '../features/items/containers/Items';
import Plannings from '../features/plannings/containers/Plannings';
import Spaces from '../features/spaces/containers/Spaces';

const { Navigator, Screen } = createBottomTabNavigator();

function MyTabs() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Plannings" component={Plannings} options={{
        tabBarLabel: 'Cubicajes',
        tabBarIcon: ({ color, size }) => (
          <Icon name="collage" size={size} color={color} />
        ),
      }} />
      <Screen name="Items" component={Items} options={{
        tabBarLabel: 'Items',
        tabBarIcon: ({ color, size }) => (
          <Icon name="cube" size={size} color={color} />
        ),
      }} />
      <Screen name="Spaces" component={Spaces} options={{
        tabBarLabel: 'Bodegas',
        tabBarIcon: ({ color, size }) => (
          <Icon name="warehouse" size={size} color={color} />
        ),
      }} />
    </Navigator>
  );
}

export default MyTabs;