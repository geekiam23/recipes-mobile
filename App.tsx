import 'react-native-gesture-handler';
import React, {FC, useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
  HomeScreen,
  LoginScreen,
  RecipeScreen,
  RegistrationScreen,
  RandomRecipesScreen,
} from 'containers';
import HeaderIcons from 'components/HeaderIcons';
import {AuthContext} from 'lib/context/AuthContext/AuthContextProvider';

const Stack = createStackNavigator();

const App: FC = () => {
  const {currentUser} = useContext(AuthContext);

  const HomeStack = () => (
    <>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'My Recipes',
          headerStyle: {
            backgroundColor: '#092235',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
            paddingBottom: 5,
          },
          headerRight: () => <HeaderIcons />,
        }}
      />
      <Stack.Screen
        name="RandomRecipes"
        component={RandomRecipesScreen}
        options={{
          title: 'Random Recipes',
          headerStyle: {
            backgroundColor: '#092235',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
            paddingBottom: 5,
          },
          headerRight: () => <HeaderIcons />,
        }}
      />
      <Stack.Screen
        name="Recipe"
        component={RecipeScreen}
        options={({route}) => ({title: route?.params?.recipe.title})}
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
