
import * as express from 'express';
import { User, UserMgr, Credential } from '../../halcyon/User';
import { MGM } from '../MGM';
import { UUIDString } from '../../halcyon/UUID';
import { JWT } from '../util/JWT';

export interface Halcyon {
  getUserByName(string): Promise<User>
  setUserPassword(string, Credential): Promise<void>
}

export function AuthHandler(): express.Router {
  let router: express.Router = express.Router();

  //resume session
  router.get('/', (req, res) => {
    if (req.cookies['uuid'] && req.cookies['uuid'] != '') {
      console.log('User ' + req.cookies['uuid'] + ' resuming session');

      res.send(JSON.stringify({
        Success: true,
        username: req.cookies['name'],
        accessLevel: req.cookies['userLevel'],
        email: req.cookies['email']
      }));
    } else {
      res.send(JSON.stringify({
        Success: false
      }));
    }
  });

  router.get('/logout', MGM.isUser, (req, res) => {
    console.log('User ' + req.cookies['uuid'] + ' logging out');

    res.clearCookie('name');
    res.clearCookie('uuid');
    res.clearCookie('userLevel');
    res.clearCookie('email');
    res.clearCookie('token');
    res.send(JSON.stringify({
      Success: true
    }));
  });

  router.post('/login', (req, res) => {
    let auth = req.body;
    let username: string = auth.username || '';
    let password: string = auth.password || '';
    // check if user exists, mgm should know
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
  });

  router.post('/changePassword', MGM.isUser, (req, res) => {
    let password: string = req.body.password || '';

    if (password === '') {
      return res.send(JSON.stringify({ Success: false, Message: 'Password cannot be blank' }));
    }

    let credential = Credential.fromPlaintext(password);

    UserMgr.instance().getUser(new UUIDString(req.cookies['uuid'])).then( (u: User) => {
      return u.setCredential(credential);
    }).then(() => {
      res.send(JSON.stringify({ Success: true }));
    }).catch((err: Error) => {
      console.log('Error updating user password: ' + err.message);
      res.send(JSON.stringify({ Success: false, Message: err.message }));
    });
  });

  return router;
}