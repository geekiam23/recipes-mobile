import firestore from '@react-native-firebase/firestore';

export const loadFirestoreUser = async currentUser => {
  firestore()
    .collection('users')
    .doc(currentUser?.id)
    .get()
    .then(async documentSnapshot => {
      if (documentSnapshot?.data()?.favRecipes) {
        const dbFavRecipes = (await documentSnapshot?.data()?.favRecipes) || [];

        if (dbFavRecipes.length === 0) {
          return;
        }
        const recipesIds = dbFavRecipes?.toString();

        return recipesIds;
      }
    });
};
