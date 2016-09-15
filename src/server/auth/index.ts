

export class Auth {
  private static _instance: Auth = null;

  constructor() {
    if (Auth._instance) {
      throw new Error('Auth singleton has already been initialized');
    }
    Auth._instance = this;
  }

  public static instance(): Auth {
    return Auth._instance;
  }
}