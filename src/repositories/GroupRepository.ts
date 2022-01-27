import { EntityRepository, Repository } from "typeorm";
import { Group } from "../models/Group";

@EntityRepository(Group)
class GroupRepository extends Repository<Group> {}

export {GroupRepository};