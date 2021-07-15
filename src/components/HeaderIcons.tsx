import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import {AuthContext} from 'lib/context/AuthContext/AuthContextProvider';
import Star from 'assets/Star';
import Profile from 'assets/Profile';
import Dice from 'assets/Dice';

const HeaderIcons = () => {
  const {signOut} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.heartContainer} onPress={signOut}>
        <Heart />
      </TouchableOpacity>
      <TouchableOpacity onPress={signOut}>
        <Profile />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 25,
    display: 'flex',
    flexDirection: 'row',
  },
  heartContainer: {
    paddingRight: 20,
  },
});

export default HeaderIcons;
