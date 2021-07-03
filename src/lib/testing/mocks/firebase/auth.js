export default () => ({
  onAuthStateChanged: () => {},
  signInWithEmailAndPassword: jest.fn(() => Promise.resolve(true)),
  createUserWithEmailAndPassword: () => {},
});
