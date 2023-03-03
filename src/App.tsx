import React from 'react';
import MembersListScreen from './screens/MembersListScreen';
import store from './redux/store';
import {Provider} from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MemberDetailScreen from './screens/MemberDetailScreen';
import { NativeBaseProvider } from "native-base";

const Stack = createNativeStackNavigator();
const headerBackgroundColor = '#0e7490';
function App(): JSX.Element {
  return (
     
    <Provider store={store}>
      <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Deputados"
              screenOptions={{
                headerStyle: {
                  backgroundColor: headerBackgroundColor,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}>
          <Stack.Screen name="Deputados" component={MembersListScreen} />
          <Stack.Screen name="Deputado" component={MemberDetailScreen} />
        </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}
export default App;
