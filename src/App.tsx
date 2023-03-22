import React from 'react';
import MembersListScreen from './screens/MembersListScreen';
import ExpensesListScreen from './screens/ExpensesListScreen';
import store from './redux/store';
import {Provider} from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MemberDetailScreen from './screens/MemberDetailScreen';
import ExpenseDetailScreen from './screens/ExpenseDetailScreen';
import { NativeBaseProvider } from "native-base";
import { Screens } from './constants/navigatorScreens';
const Stack = createNativeStackNavigator();
const headerBackgroundColor = '#0e7490';
function App(): JSX.Element {
  return (
     
    <Provider store={store}>
      <NativeBaseProvider>
      <NavigationContainer >
        <Stack.Navigator initialRouteName="Deputados" screenOptions={{headerShown:false, gestureEnabled: true}}>
          <Stack.Screen name={Screens.MEMBERS_LIST_SCREEN} component={MembersListScreen} />
          <Stack.Screen name={Screens.MEMBER_DETAIL_SCREEN} component={MemberDetailScreen} />
          <Stack.Screen name={Screens.EXPENSES_LIST_SCREEN} component={ExpensesListScreen} />
          <Stack.Screen name={Screens.EXPENSE_DETAIL_SCREEN} component={ExpenseDetailScreen} />
        </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}
export default App;
