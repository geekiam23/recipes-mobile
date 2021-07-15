import 'react-native';
import React from 'react';
import {render, waitFor} from '@testing-library/react-native';

import RecipeScreen from 'containers/RecipeScreen';
import {testData} from 'lib/testing/testData';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('Recipe Screen', () => {
  it('displays the correct recipe info', async () => {
    const route = {
      params: {
        recipe: testData().recipes[0],
      },
    };
    const {getByTestId, getByText} = renderWithAllWrapper(
      <RecipeScreen route={route} />,
    );

    waitFor(() => {
      // Testing cooking info
      expect(getByTestId('cooking-info-time-container')).toHaveTextContent(
        'Ready In 45 Minutes',
      );
      expect(getByTestId('cooking-info-servings-container')).toHaveTextContent(
        'Servings: 2',
      );

      // Testing ingredients
      expect(getByText('1 1/4 cups whole milk')).toBeTruthy();
      expect(getByText('1 tablespoon rum, optional')).toBeTruthy();

      // Testing instructions
      expect(
        getByText(
          'In a heavy bottomed saucepan, heat the milk, salt and 1/4 cup sugar over med-low heat until steaming but not boiling and the sugar is dissolved.',
        ),
      ).toBeTruthy();
      expect(
        getByText(
          'Transfer the ice cream to a freezer safe container and freeze.',
        ),
      ).toBeTruthy();
    });
  });
});
