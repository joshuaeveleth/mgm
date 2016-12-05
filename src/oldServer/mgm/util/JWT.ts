
var urllib = require('urllib');
var jwt = require('jsonwebtoken');

import { UUIDString } from '../../halcyon/UUID';

export class JWT {
  private static _instance: JWT = null;
  private static userServerURL: string = '';

  constructor(userServerURL: string) {
    if (JWT._instance) {
      throw new Error('JWT singleton has already been initialized');
    }
    JWT.userServerURL = userServerURL;
    JWT._instance = this;
  }

  public static instance(): JWT {
    return JWT._instance;
  }

  static IssueToken(uuid: UUIDString, token?: string): Promise<string>{
    return jwt.sign({
      uuid: uuid,
      token: token
    },
    '123456789012345678908765544332',
    {
      expiresIn: '1d'
    })
  }
  
  static GetConsoleToken(username: string, password: string): Promise<string>{
    let url = this.userServerURL + '/auth/jwt/remote-console';
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
