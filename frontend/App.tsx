import React from 'react'
import { StatusBar } from './src/styles'
import { Provider } from 'react-redux'
import { store } from './src/store'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Garage from './src/screens/Garage'
import Detail from './src/screens/Detail'

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Garage" component={Garage} />
          <Stack.Screen name="Details" component={Detail} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
