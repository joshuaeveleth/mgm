
import { HALCYONDB, User } from '../mysql';

export class Auth {
  private static _instance: Auth = null;

  private db: HALCYONDB;

  constructor(db: HALCYONDB) {
    if (Auth._instance) {
      throw new Error('Auth singleton has already been initialized');
    }
    this.db = db;
    Auth._instance = this;
  }

  public static instance(): Auth {
    return Auth._instance;
  }

  public handleLogin(req, res) {
    let auth = req.body;
    let username: string = auth.username || '';
    let password: string = auth.password || '';
    let nameParts = username.split(' ');
    this.db.users.findOne({
      where: {
        username: nameParts[0],
        lastname: nameParts[1]
      }
    }).then((u: User) => {
      if (!u) throw new Error('Account does not exist');

      console.log(u);
    }).catch((err: Error) => {
      // An error blocked login somewhere, notify the client
      res.send(JSON.stringify({ Success: false, Message: err.message }));
    });
    /*
    let candidateUser: User = null;
    UserMgr.instance().getUserByName(username).then((u: User) => {
      candidateUser = u;
    }). then( () => {
      if( ! candidateUser.getCredential().compare(password) ){
        throw new Error('Invalid Credentials');
      }
    }). then( () => {
      let godLevel = candidateUser.getGodLevel()
      if(godLevel < 1){
        throw new Error('Account Suspended');
      }
      if(godLevel < 250){
        return '';
      }
      // we have already checked the credential and user level, this should only succeed
      return JWT.GetConsoleToken(username, password);
    }).then( (token) => {
      res.cookie('name', candidateUser.getUsername());
      res.cookie('uuid', candidateUser.getUUID().toString());
      res.cookie('userLevel', candidateUser.getGodLevel());
      res.cookie('email', candidateUser.getEmail());

      res.send(JSON.stringify({
        Success: true,
        username: candidateUser.getUsername(),
        accessLevel: candidateUser.getGodLevel(),
        email: candidateUser.getEmail(),
        token: token
      }));
    }).catch((err: Error) => {
      // An error blocked login somewhere, notify the client
      res.send(JSON.stringify({ Success: false, Message: err.message }));
    });
    */
  }
}