import React from 'react';
import styled from 'styled-components/native';
import {Image, Text, View} from 'react-native';

import Ingredient from 'components/Ingredient';
import Instructions from 'components/Instructions';

const StyledScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    alignItems: 'center',
    paddingBottom: 25,
    paddingTop: 10,
  },
}))``;

const RecipeImage = styled(Image)`
  width: 95%;
  align-items: center;
  height: 196;
  border-radius: 4;
`;

const CookingInfoContainer = styled(View)`
  justify-content: flex-start;
  width: 90%;
`;

const CookingInfoTextContainer = styled(View)`
  flex-direction: row;
  padding-top: 10px;
`;

const CookingIngedStepsContainer = styled(View)`
  width: 90%;
  justify-content: flex-start;
  padding-top: 20px;
`;

const Border = styled(View)`
  border-color: black;
  border-top-width: 4px;
`;

const RecipeScreen = ({route}) => {
  const {recipe} = route.params;

  return (
    <StyledScrollView>
      <RecipeImage source={{uri: recipe?.image}} />

      <CookingInfoContainer>
        <Text>Cooking Info</Text>
        <CookingInfoTextContainer>
          <Text>Ready In </Text>
          <Text>{recipe.readyInMinutes} </Text>
          <Text>Minutes</Text>
        </CookingInfoTextContainer>
        <CookingInfoTextContainer>
          <Text>Servings: </Text>
          <Text>{recipe.servings}</Text>
        </CookingInfoTextContainer>
      </CookingInfoContainer>
      <CookingIngedStepsContainer>
        <Text>Ingredients</Text>
        {recipe?.extendedIngredients?.map(ingredient => (
          <Ingredient key={ingredient.id} ingredient={ingredient} />
        ))}

        <Border />
        <Text>Cooking Steps</Text>

        {recipe?.analyzedInstructions[0].steps.length > 0 &&
          recipe?.analyzedInstructions[0]?.steps.map(step => (
            <Instructions key={step.number} step={step} />
          ))}
      </CookingIngedStepsContainer>
    </StyledScrollView>
  );
};

export default RecipeScreen;
