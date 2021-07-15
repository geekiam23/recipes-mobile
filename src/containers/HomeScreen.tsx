import React, {useContext, useEffect, useState} from 'react';
import {FlatList, StatusBar} from 'react-native';
import styled from 'styled-components/native';

import {AuthContext} from 'lib/context/AuthContext/AuthContextProvider';
import VerticalImageIndex from 'components/VerticalImageIndex';
import {loadRecipes} from 'services/spoonacular';

const StyledFlatlist = styled(FlatList)`
  background-color: #093150;
`;

const HomeScreen = () => {
  const [favsData, setFavsData] = useState(null);
  const {currentUser} = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    getUserInfo();
  }, [currentUser]);

  const getUserInfo = async () => {
    const data = await loadRecipes(currentUser.favRecipes?.toString());
    setFavsData(data);
  };

  const renderRecipes = ({item}) => {
    return <VerticalImageIndex recipe={item} />;
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <StyledFlatlist
        data={favsData}
        renderItem={renderRecipes}
        testID="flat-list"
      />
    </>
  );
};

export default HomeScreen;
