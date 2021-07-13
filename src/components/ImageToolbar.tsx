import React, {FC} from 'react';
import {Text, View, StyleSheet} from 'react-native';

import Heart from '../assets/Heart';
import {Recipe} from '../types/recipe';

type Props = {
  recipe: Recipe;
  fullScreen?: boolean;
};

const ImageToolbar: FC<Props> = ({recipe, fullScreen}) => {
  return (
    <View
      style={
        fullScreen
          ? {
              ...styles.bottomToolbar,
              ...styles.bottomToolbarFullSize,
            }
          : styles.bottomToolbar
      }>
      <View style={styles.usernameContainer}>
        <Text style={styles.username}>{recipe?.title}</Text>
      </View>
      <View style={styles.heartIcon}>
        <Heart />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomToolbar: {
    position: 'absolute',
    bottom: 0,
    height: '15%',
    width: '90%',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  bottomToolbarFullSize: {
    width: '100%',
    height: '10%',
    paddingBottom: 5,
  },
  avatar: {
    height: 23,
    width: 23,
    borderRadius: 16,
    marginLeft: 7,
  },
  usernameContainer: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
    fontSize: 13,
    color: '#FFF',
    paddingLeft: 6,
    flex: 1,
  },
  username: {
    color: '#FFF',
  },
  heartIcon: {
    marginRight: 12,
  },
});

export default ImageToolbar;
