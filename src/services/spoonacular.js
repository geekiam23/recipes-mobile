import axios from 'axios';
import Config from 'react-native-config';

const baseUrl = 'https://api.spoonacular.com/recipes/';

export const loadRandomRecipes = async () => {
  try {
    const response = await axios.get(`${baseUrl}/random`, {
      params: {
        limitLicense: false,
        number: 5,
        apiKey: Config.API_KEY,
      },
    });

    if (response?.data.length === 0) {
      return;
    }

    return response?.data?.recipes;
  } catch (error) {
    console.error(error);
  }
};

export const loadRecipes = async recipesIds => {
  if (!recipesIds) {
    return;
  }

  try {
    const response = await axios.get(`${baseUrl}/informationBulk`, {
      params: {
        ids: recipesIds,
        includeNutrition: true,
        apiKey: Config.API_KEY,
      },
    });

    if (response?.data.length === 0) {
      return;
    }

    return response?.data;
  } catch (error) {
    console.error(error);
  }
};
