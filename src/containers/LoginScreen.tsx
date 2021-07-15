import React, {FC, useContext, useState} from 'react';
import {
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Text,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import styled from 'styled-components/native';

import {AuthContext} from 'lib/context/AuthContext/AuthContextProvider';
import {RootStackParamList} from 'types';
import image from 'assets/login_bg.jpg';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const BackgroundImage = styled(ImageBackground)`
  opacity: 0.3;
  flex: 1;
  width: 100%;
`;

const BodyContainer = styled(View)`
  flex: 1;
  position: absolute;
  width: 100%;
  margin-top: 240px;
  align-items: center;
`;

const Container = styled(View)`
  flex: 1;
`;

const FooterContainer = styled(View)`
  margin-top: 140px;
  flex-direction: row;
`;

const FooterLink = styled(Text)`
  font-weight: bold;
  color: black;
  height: 30px;
  margin-left: 5px;
  text-decoration-line: underline;
`;

const FooterText = styled(Text)`
  height: 30px;
  color: black;
`;

const Header = styled(Text)`
  font-family: Helvetica Neue;
  font-weight: bold;
  font-size: 36px;
  line-height: 44px;
  color: black;
  padding-bottom: 100px;
`;

const InputContainer = styled(View)`
  color: black;
  border-bottom-color: black;
  border-bottom-width: 4px;
  width: 80%;
  height: 45px;
  margin-bottom: 20px;
`;

const Input = styled(TextInput)`
  height: 50px;
  flex: 1;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
  color: black;
`;

const LoginBtnText = styled(Text)`
  font-weight: bold;
  color: white;
  font-size: 22px;
  line-height: 27px;
  text-align: center;
`;

const LoginBtn = styled(TouchableOpacity)`
  width: 60%;
  border-radius: 8px;
  height: 50px;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  background-color: black;
`;

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
    <Container>
      <StatusBar barStyle="dark-content" />
      <BackgroundImage source={image} />
      <BodyContainer>
        <Header>Welcome back</Header>
        <InputContainer>
          <Input
            testID="login-email-input"
            placeholder="Email"
            placeholderTextColor="#000"
            onChangeText={text => setEmail(text)}
            value={email}
          />
        </InputContainer>

        <InputContainer>
          <Input
            testID="login-password-input"
            placeholder="Password"
            placeholderTextColor="#000"
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
            value={password}
          />
        </InputContainer>

        <LoginBtn>
          <LoginBtnText onPress={onLoginPress}>Sign In</LoginBtnText>
        </LoginBtn>
        <FooterContainer>
          <FooterText>Don't have an account?</FooterText>
          <FooterLink onPress={onFooterLinkPress}>Sign Up</FooterLink>
        </FooterContainer>
      </BodyContainer>
    </Container>
  );
};

export default Login;
