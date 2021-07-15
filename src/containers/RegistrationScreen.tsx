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

import {RootStackParamList} from 'types';
import image from 'assets/login_bg.jpg';
import {AuthContext} from 'lib/context/AuthContext/AuthContextProvider';

type RegistrationScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Registration'
>;

type Props = {
  navigation: RegistrationScreenNavigationProp;
};

//TODO: Refactor to use styled components

const Registration: FC<Props> = ({navigation}) => {
  const {registerAccount} = useContext(AuthContext);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onRegisterPress = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }

    registerAccount(displayName, email, password);
  };

  const onFooterLinkPress = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ImageBackground source={image} style={styles.image} />
      <View style={styles.bodyContainer}>
        <Text style={styles.header}>Welcome to Recipes</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Display Name"
            placeholderTextColor="#000"
            onChangeText={setDisplayName}
            value={displayName}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            placeholderTextColor="#000"
            onChangeText={setEmail}
            value={email}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            placeholderTextColor="#000"
            secureTextEntry={true}
            onChangeText={setPassword}
            value={password}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Confirm Password"
            placeholderTextColor="#000"
            secureTextEntry={true}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
          />
        </View>
        <TouchableOpacity
          style={styles.registrationBtn}
          onPress={onRegisterPress}>
          <Text style={styles.registrationText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.footer_text_container}>
          <Text style={styles.footer_text}>Already have an account?</Text>
          <Text style={styles.footer_btn} onPress={onFooterLinkPress}>
            Sign In
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
    marginTop: 200,
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
    marginTop: 70,
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
  registrationText: {
    fontWeight: 'bold',
    fontSize: 22,
    lineHeight: 27,
    color: '#FFF',
    textAlign: 'center',
  },
  registrationBtn: {
    width: '60%',
    borderRadius: 8,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#000',
  },
});
export default Registration;
