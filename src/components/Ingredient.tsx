import React from 'react';
import styled from 'styled-components/native';
import {Image, Text, View} from 'react-native';

const IngredientContainer = styled(View)`
  display: flex;
  margin-bottom: 15px;
  margin-right: 5px;
  align-self: flex-start;
`;

const IngredientText = styled(Text)`
  margin-left: 3px;
`;

const ImageContainer = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const IngredientImage = styled(Image)`
  height: 50px;
  width: 50px;
  border-radius: 25px;
  margin-right: 5px;
`;

const Ingredient = ({ingredient}) => {
  return (
    <IngredientContainer key={ingredient.id}>
      <ImageContainer>
        <IngredientImage
          source={{
            uri: `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`,
          }}
        />
        <View>
          <IngredientText>{ingredient.original}</IngredientText>
          <Text>({ingredient.aisle})</Text>
        </View>
      </ImageContainer>
    </IngredientContainer>
  );
};

export default Ingredient;
