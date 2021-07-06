import React, {FC, useContext, useState} from 'react';
import {
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Text,
  StyleSheet,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {AuthContext} from '../lib/context/AuthContext/AuthContextProvider';
import {RootStackParamList} from '../types';
import image from '../assets/login_bg.jpg';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const Login: FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signIn} = useContext(AuthContext);

  const onLoginPress = () => {
    signIn(email, password);
  };

  const onFooterLinkPress = () => {
    navigation.navigate('Registration');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ImageBackground source={image} style={styles.image} />
      <View style={styles.bodyContainer}>
        <Text style={styles.header}>Welcome back</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            testID="login-email-input"
            placeholder="Email"
            placeholderTextColor="#000"
            onChangeText={text => setEmail(text)}
            value={email}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            testID="login-password-input"
            placeholder="Password"
            placeholderTextColor="#000"
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
            value={password}
          />
        </View>

        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText} onPress={onLoginPress}>
            Sign In
          </Text>
        </TouchableOpacity>
        <View style={styles.footer_text_container}>
          <Text style={styles.footer_text}>Don't have an account?</Text>
          <Text style={styles.footer_btn} onPress={onFooterLinkPress}>
            Sign Up
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
  },

  image: {
    width: '100%',
    opacity: 0.3,
    flex: 1,
  },

  header: {
    fontFamily: 'Helvetica Neue',
    fontWeight: 'bold',
    fontSize: 36,
    lineHeight: 44,
    color: '#000',
    paddingBottom: 100,
  },

  bodyContainer: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    marginTop: 240,
    alignItems: 'center',
  },

  inputView: {
    color: '#000',
    borderBottomColor: '#000',
    borderBottomWidth: 4,
    width: '80%',
    height: 45,
    marginBottom: 20,
  },

  textInput: {
    height: 50,
    flex: 1,
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 22,
    color: '#000',
  },

  footer_text_container: {
    marginTop: 140,
    flexDirection: 'row',
  },

  footer_btn: {
    fontWeight: 'bold',
    color: '#000',
    height: 30,
    marginLeft: 5,
    textDecorationLine: 'underline',
  },

  footer_text: {
    height: 30,
    color: '#000',
  },

  loginText: {
    fontWeight: 'bold',
    color: '#FFF',
    fontSize: 22,
    lineHeight: 27,
    textAlign: 'center',
  },

  loginBtn: {
    width: '60%',
    borderRadius: 8,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#000',
  },
});
export default Login;
