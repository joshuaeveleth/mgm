
var urllib = require('urllib');

export class ConsoleToken {
  
  static getToken(userServerURL: string, username: string, password: string): Promise<string>{
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
