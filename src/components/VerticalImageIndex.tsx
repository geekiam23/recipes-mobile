import React, {FC} from 'react';
import {
  View,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import ImageToolbar from './ImageToolbar';
import {Recipe} from '../types/recipe';

type Props = {
  recipe: Recipe;
  navigation?: any;
};

const VerticalImageIndex: FC<Props> = ({recipe, navigation}) => {
  const onImagePress = () => {
    navigation.navigate('Recipe', {recipe});
  };

  return (
    <View style={styles.container} key={recipe?.id} testID="recipes">
      <StatusBar barStyle="light-content" />
      <TouchableOpacity style={styles.recipeContainer} onPress={onImagePress}>
        <Image style={styles.image} source={{uri: recipe?.image}} />

        <ImageToolbar recipe={recipe} fullScreen={false} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    display: 'flex',
    marginBottom: 14,
    paddingTop: 10,
  },
  recipeContainer: {
    width: '100%',
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: 196,
    borderRadius: 4,
  },
  bottomToolbar: {
    position: 'absolute',
    bottom: 0,
    height: 34,
    width: '90%',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  avatar: {
    height: 23,
    width: 23,
    borderRadius: 16,
    marginLeft: 7,
  },
  username: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
    fontSize: 13,
    color: '#FFF',
    paddingLeft: 6,
    flex: 1,
  },
  heartIcon: {
    marginRight: 12,
  },
});

export default VerticalImageIndex;
