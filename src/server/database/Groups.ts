
import * as Sequelize from 'sequelize';
import {
  GroupInstance, GroupAttribute,
  RoleInstance, RoleAttribute,
  MembershipInstance, MembershipAttribute
} from './mysql';
import { IGroup, IRole, IMembership } from '../../common/messages';



export class Groups {
  private groups: Sequelize.Model<GroupInstance, GroupAttribute>
  private roles: Sequelize.Model<RoleInstance, RoleAttribute>
  private membership: Sequelize.Model<MembershipInstance, MembershipAttribute>

  constructor(
    groups: Sequelize.Model<GroupInstance, GroupAttribute>,
    roles: Sequelize.Model<RoleInstance, RoleAttribute>,
    membership: Sequelize.Model<MembershipInstance, MembershipAttribute>
  ) {
    this.groups = groups;
    this.roles = roles;
    this.membership = membership;
  }

  getAll(): Promise<IGroup[]> {
    return this.groups.findAll().then((groups: GroupInstance[]) => {
      return groups.map((g: GroupInstance) => {
        let group: IGroup = {
          GroupID: g.GroupID,
          Name: g.Name,
          FounderID: g.FounderID,
          OwnerRoleID: g.OwnerRoleID
        }
        return group;
      });
    });
  }

  getRoles(): Promise<IRole[]> {
    return this.roles.findAll().then((roles: RoleInstance[]) => {
      return roles.map((r: IRole) => {
        let role: IRole = {
          Name: r.Name,
          Description: r.Description,
          Title: r.Title,
          GroupID: r.GroupID,
          RoleID: r.RoleID,
          Powers: r.Powers
        }
        return role;
      })
    })
  }

  getMembers(): Promise<IMembership[]> {
    return this.membership.findAll().then((members: MembershipInstance[]) => {
      return members.map((member: MembershipInstance) => {
        let mi: IMembership = {
          GroupID: member.GroupID,
          AgentID: member.AgentID,
          SelectedRoleID: member.SelectedRoleID
        }
        return mi;
      });
    });
  }

}
