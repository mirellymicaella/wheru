import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import {v4 as uuid} from "uuid";
import { User } from "./User";
import { UserGroup } from "./UserGroup";

@Entity("groups")
class Group{
    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    icon: string;

    @Column()
    ownerId: string;

    @Column()
    invitationCode: string;

    @OneToMany(() => UserGroup, userGroup => userGroup.group)
    @JoinTable()
    userGroups: UserGroup[];

    @OneToMany(() => User, user => user.groups)
    @JoinTable()
    users: User[];

    @CreateDateColumn({type: "datetime"})
    createdAt: Date;

    @UpdateDateColumn({type: "datetime"})
    updatedAt: Date;

    constructor(){
        if(!this.id)
            this.id= uuid();
    }
}

export {Group};