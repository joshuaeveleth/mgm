
var urllib = require('urllib');

export class JWT {
  private static _instance: JWT = null;
  
  private userServerURL: string = '';

  constructor(userServerURL: string) {
    if (JWT._instance) {
      throw new Error('JWT singleton has already been initialized');
    }
    this.userServerURL = userServerURL;
    JWT._instance = this;
  }

  public static instance(): JWT {
    return JWT._instance;
  }
  
  static GetConsoleToken(username: string, password: string): Promise<string>{
    let url = userServerURL + '/auth/jwt/remote-console';
    return urllib.request(url, {
      method: 'POST',
      contentType: 'json',
      data: { 
        'username' : username,
        'password': password
      }
    }).then((body) => {
      if(body.status !== 200){
        throw new Error('Error communicating with user server');
      }
      let result = JSON.parse(body.data);
      switch(result.denied){
        case 'WrongUserLevel':
          return false;
        case 'InvalidPassword':
          return false;
        case undefined:
          return result.token || false;
        default:
          throw new Error(result.denied);
      }
    });
  }
}
