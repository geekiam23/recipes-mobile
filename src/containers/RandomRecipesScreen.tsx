import React, {useEffect, useState} from 'react';
import {FlatList, StatusBar} from 'react-native';
import _ from 'lodash';
import styled from 'styled-components/native';

import VerticalImageIndex from 'components/VerticalImageIndex';
import {loadRandomRecipes} from 'services/spoonacular';

const StyledFlatlist = styled(FlatList)`
  background-color: #093150;
`;

const RandomRecipesScreen = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    const response = await loadRandomRecipes();
    const newData = [...recipes, ...response];
    const uniqData = _.unionBy(newData, 'id');
    setRecipes(uniqData);
  };

  const renderRecipes = ({item}) => {
    return <VerticalImageIndex recipe={item} />;
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
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

export default RandomRecipesScreen;
