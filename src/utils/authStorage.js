import AsyncStorage from '@react-native-community/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const raw = await AsyncStorage.getItem(
      `${this.namespace}:accessToken`
    );
    return raw;
  }

  async setAccessToken(token) {
    await AsyncStorage.setItem(
      `${this.namespace}:accessToken`,
      token
    );
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:accessToken`);
  }
}

export default AuthStorage;