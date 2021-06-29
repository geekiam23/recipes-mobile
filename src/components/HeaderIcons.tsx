import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import Heart from '../assets/Heart';
import Profile from '../assets/Profile';

const HeaderIcons = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.heartContainer}>
        <Heart />
      </TouchableOpacity>
      <TouchableOpacity>
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
