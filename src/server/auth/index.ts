
import { HALCYONDB, User } from '../mysql';
import { Credential } from './Credential';
import { HalcyonToken } from './HalcyonToken';

import * as jwt from 'jsonwebtoken';

export interface Detail {
  uuid: string
  godLevel: number
  consoleToken: string
}

export class Auth {
  private static _instance: Auth = null;

  private db: HALCYONDB;
  private tokenKey: string;
  private userServerURI: string;

  constructor(db: HALCYONDB, tokenKey: string, userServerURI: string) {
    if (Auth._instance) {
      throw new Error('Auth singleton has already been initialized');
    }
    this.db = db;
    this.tokenKey = tokenKey;
    this.userServerURI = userServerURI;
    Auth._instance = this;
  }

  public static instance(): Auth {
    return Auth._instance;
  }

  public handleLogin(req, res) {
    let auth = JSON.parse(req.body.payload);
    let username: string = auth.username || '';
    let password: string = auth.password || '';
    let nameParts = username.split(' ');
    let candidateUser: User = null;
    //check if user exists
    this.db.users.findOne({
      where: {
        username: nameParts[0],
        lastname: nameParts[1]
      }
    }).then((u: User) => {
      if (!u) throw new Error('Account does not exist');
      candidateUser = u;
    }).then(() => {
      //user located, test credentials
      let cred = Credential.fromHalcyon(candidateUser.passwordHash);
      if (!cred.compare(password)) {
        throw new Error('Invalid Credentials.  MGM is case-sensitive');
      }
    }).then(() => {
      //test user levels for suspended/God mode
      if (candidateUser.godLevel < 1) {
        throw new Error('Account currently suspended');
      }
      if (candidateUser.godLevel < 250) {
        return '';
      }
      return HalcyonToken.GetConsoleToken(this.userServerURI, username, password);
    }).then((token: string) => {
      let detail: Detail = {
        uuid: candidateUser.UUID,
        godLevel: candidateUser.godLevel,
        consoleToken: token
      }
      return jwt.sign(
        detail,
        this.tokenKey,
        {
          expiresIn: '1d'
        }
      );
    }).then((token) => {
      res.send(JSON.stringify({
        Success: true,
        uuid: candidateUser.UUID,
        username: candidateUser.username + ' ' + candidateUser.lastname,
        accessLevel: candidateUser.godLevel,
        email: candidateUser.email,
        token: token
      }));
    }).catch((err: Error) => {
      // An error blocked login somewhere, notify the client
      res.send(JSON.stringify({ Success: false, Message: err.message }));
    });
  }
}