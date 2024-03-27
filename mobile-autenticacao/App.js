import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from './src/pages/Home/Home'
import Login from './src/pages/Login/Login';
import Toast, { ErrorToast } from 'react-native-toast-message';

const Stack = createStackNavigator();
export default function App() {
  const toastConfig = {
    error: (props) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 10
        }}
        text2Style={{
          fontSize: 8
        }}
        text2NumberOfLines={2}
        style={{ borderLeftColor: "red" }}
      />
    )
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home}></Stack.Screen>
          <Stack.Screen name="Login" component={Login}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </>
  );
}
