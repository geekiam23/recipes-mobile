export interface User {
  additionalUserInfo: AdditionalUserInfo;
  user: User;
}

export interface Context {
  currentUser: User;
  currentUserLoading: boolean;
  signIn: (email: String, password: String) => void;
  registerAccount: () => void;
  signOut: () => void;
}

export interface AdditionalUserInfo {
  isNewUser: boolean;
  profile: null;
  providerId: string;
  username: null;
}

export interface User {
  displayName: null;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  metadata: string[];
  phoneNumber: null;
  photoURL: null;
  providerData: string[];
  providerId: string;
  refreshToken: string;
  tenantId: null;
  uid: string;
}
