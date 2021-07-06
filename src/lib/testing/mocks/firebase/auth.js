import {jest} from '@jest/globals';

export default () => ({
  onAuthStateChanged: () => {},
  signInWithEmailAndPassword: jest.fn(() => Promise.resolve(true)),
  createUserWithEmailAndPassword: () => {},
});
