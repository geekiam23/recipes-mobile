import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import axios from 'axios';
import _ from 'lodash';
import Config from 'react-native-config';
import styled from 'styled-components';

import VerticalImageIndex from '../components/VerticalImageIndex';

const StyledFlatlist = styled(FlatList)`
  background-color: #093150;
`;
const HomeScreen = () => {
  const [recipes, setRecipes] = useState([]);

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
            number: 5,
            apiKey: Config.API_KEY,
          },
        },
      );

      if (response?.data.length === 0) {
        return;
      }
      const newData = [...recipes, ...response.data.recipes];
      const uniqData = _.unionBy(newData, 'id');
      setRecipes(uniqData);
    } catch (error) {
      console.error(error);
    }
  };

  const renderRecipes = ({item}) => {
    return <VerticalImageIndex recipe={item} />;
  };

  return (
    <>
      <StyledFlatlist
        data={recipes}
        onEndReached={getRecipes}
        onEndReachedThreshold={0.5}
        renderItem={renderRecipes}
        testID="flat-list"
      />
    </>
  );
};

export default HomeScreen;
