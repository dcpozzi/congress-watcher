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

const Stack = createNativeStackNavigator();
const headerBackgroundColor = '#0e7490';
function App(): JSX.Element {
  return (
     
    <Provider store={store}>
      <NativeBaseProvider>
      <NavigationContainer >
        <Stack.Navigator initialRouteName="Deputados" screenOptions={{headerShown:false, gestureEnabled: true}}>
          <Stack.Screen name="Deputados" component={MembersListScreen} />
          <Stack.Screen name="Deputado" component={MemberDetailScreen} />
          <Stack.Screen name="Despesas" component={ExpensesListScreen} />
          <Stack.Screen name="Despesa" component={ExpenseDetailScreen} />
        </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}
export default App;
