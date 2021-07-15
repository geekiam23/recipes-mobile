import React, {FC, useContext} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import Heart from 'assets/Heart';
import {Recipe} from 'types/recipe';
import {AuthContext} from 'lib/context/AuthContext/AuthContextProvider';

type Props = {
  recipe: Recipe;
  fullScreen?: boolean;
};

const ImageToolbar: FC<Props> = ({recipe, fullScreen}) => {
  const {currentUser} = useContext(AuthContext);

  const favoritedRecipe = currentUser?.favRecipes.includes(recipe.id);

  const handleFavorites = () => {
    // TODO: Write test for this.
    let newFavsArray;
    if (currentUser?.favRecipes.includes(recipe.id)) {
      newFavsArray = currentUser?.favRecipes.filter(id => id !== recipe.id);
    } else {
      newFavsArray = [...currentUser?.favRecipes, recipe.id];
    }
    firestore().collection('users').doc(currentUser?.id).update({
      favRecipes: newFavsArray,
    });
  };

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
      <TouchableOpacity style={styles.heartIcon} onPress={handleFavorites}>
        <Heart color={favoritedRecipe && 'red'} />
      </TouchableOpacity>
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
