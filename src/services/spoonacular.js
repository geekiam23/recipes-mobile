import axios from 'axios';
import Config from 'react-native-config';

export const loadRandomRecipes = async () => {
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

    return response?.data?.recipes;
  } catch (error) {
    console.error(error);
  }
};
