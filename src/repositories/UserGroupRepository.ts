import { EntityRepository, Repository } from "typeorm";
import { UserGroup } from "../models/UserGroup";

@EntityRepository(UserGroup)
class UserGroupRepository extends Repository<UserGroup> {}

export {UserGroupRepository};