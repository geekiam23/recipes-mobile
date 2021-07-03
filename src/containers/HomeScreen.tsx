import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';

import VerticalImageIndex from '../components/VerticalImageIndex';

import {StackNavigationProp} from '@react-navigation/stack';

import {RootStackParamList} from '../types';
import {Recipe} from '../types/recipe';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

type Item = {
  item: Recipe;
};

const HomeScreen = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    try {
      const response = await axios.get(
        'https://api.spoonacular.com/recipes/random',
        {
          params: {
            limitLicense: false,
            number: 2,
            apiKey: Config.API_KEY,
          },
        },
      );

      if (response?.data.length === 0) {
        return;
      }
      setPhotos(response.data.recipes);
    } catch (error) {
      console.error(error);
    }
  };

  const renderPhotos = ({item}) => {
    return <VerticalImageIndex photo={item} />;
  };

  return (
    <>
      <FlatList
        data={photos}
        style={styles.flatList}
        onEndReached={getRecipes}
        onEndReachedThreshold={0.5}
        renderItem={renderPhotos}
      />
    </>
  );
};

const styles = StyleSheet.create({
  flatList: {
    display: 'flex',
    backgroundColor: '#092235',
  },
});

export default HomeScreen;
