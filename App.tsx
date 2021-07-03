import 'react-native-gesture-handler';
import React, {FC, useContext} from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

import {HomeScreen, LoginScreen, RegistrationScreen} from './src/containers';
import HeaderIcons from './src/components/HeaderIcons';
import {AuthContext} from './src/lib/context/AuthContext/AuthContextProvider';
import {RootStackParamList} from './src/types';

type RootScreenNavigationProp = StackNavigationProp<RootStackParamList, 'App'>;

type Props = {
  navigation: RootScreenNavigationProp;
};

const Stack = createStackNavigator();

const App: FC<Props> = ({navigation}) => {
  const {currentUser} = useContext(AuthContext);

  const HomeStack = () => (
    <>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Recipes',
          headerStyle: {
            backgroundColor: '#092235',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 30,
            paddingBottom: 5,
          },
          headerRight: () => <HeaderIcons />,
        }}
      />
    </>
  );

  const AuthStack = () => (
    <>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Registration"
        component={RegistrationScreen}
        options={{headerShown: false}}
      />
    </>
  );

  return (
    <Stack.Navigator>{currentUser ? HomeStack() : AuthStack()}</Stack.Navigator>
  );
};

export default App;
