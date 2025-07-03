import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UiKitProvider from '../features/uiKit/providers/Provider';
import { Provider as StoreProvider } from 'react-redux';
import { store } from '../store';

import AppTab from './AppTab';

import PlanningSpace from '../features/planningSpace/containers/planningSpace';
import PlanningItem from '../features/planningItem/containers/planningItem';
import PlanningCalculate from '../features/planningCalculate/containers/PlanningCalculate';
import PlanningSuccess from '../features/planningSuccess/containers/PlanningSuccess';
import AddSpace from '../features/addSpace/containers/AddSpace';
import UpdateSpace from '../features/updateSpace/containers/UpdateSpace';
import AddItem from '../features/addItem/containers/AddItem';
import UpdateItem from '../features/updateItem/containers/UpdateItem';
import Planning from '../features/planning/containers/Planning';

const { Navigator, Screen } = createStackNavigator();

const AppStack = () => {
  return (
    <StoreProvider store={store} >
      <UiKitProvider>
        <NavigationContainer>
          <Navigator screenOptions={{ headerShown: false, gestureEnabled: false }} initialRouteName='AppTab' >
            <Screen name='AppTab' component={AppTab} />
            <Screen name='PlanningSpace' component={PlanningSpace} />
            <Screen name='PlanningItem' component={PlanningItem} />
            <Screen name='PlanningCalculate' component={PlanningCalculate} />
            <Screen name='PlanningSuccess' component={PlanningSuccess} />
            <Screen name='AddSpace' component={AddSpace} />
            <Screen name='UpdateSpace' component={UpdateSpace} />
            <Screen name='AddItem' component={AddItem} />
            <Screen name='UpdateItem' component={UpdateItem} />
            <Screen name='Planning' component={Planning} />
          </Navigator>
        </NavigationContainer>
      </UiKitProvider>
    </StoreProvider>
  )
}

export default AppStack;