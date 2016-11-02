
import * as Sequelize from 'sequelize';
import { UserInstance, UserAttribute } from './mysql';
import { IUser } from '../../common/messages';
import { Credential } from '../auth/Credential';

export class Users {
  private db: Sequelize.Model<UserInstance, UserAttribute>

  constructor(ui: Sequelize.Model<UserInstance, UserAttribute>) {
    this.db = ui;
  }

  getAll(): Promise<IUser[]> {
    return this.db.findAll().then((users: UserInstance[]) => {
      //send users, mapped to hide extra data from sim
      return users.map((u: UserInstance) => {
        let user: IUser = {
          uuid: u.UUID,
          name: u.username + ' ' + u.lastname,
          email: u.email,
          godLevel: u.godLevel
        }
        return user;
      });
    });
  }

  getByName(name: string): Promise<UserInstance> {
    let nameParts = name.split(' ');
    return this.db.findOne({
      where: {
        username: nameParts[0],
        lastname: nameParts[1]
      }
    })
  }

  setPassword(user: string, plaintext: string): Promise<void> {
    return this.db.find({
      where: {
        uuid: user
      }
    }).then((u: UserInstance) => {
      if (u) {
        return u.updateAttributes({
          passwordHash: Credential.fromPlaintext(plaintext)
        })
      }
    }).then(() => { });
  }
}