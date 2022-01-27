import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import {v4 as uuid} from "uuid";
import { Group } from "./Group";
import { User } from "./User";

@Entity("userGroup")
class UserGroup{
    @PrimaryColumn()
    readonly id: string;

    @Column()
    userId: string;

    @ManyToOne(()=>User, user => user.userGroups)
    @JoinColumn({name:"userId"})
    user: User;

    @Column()
    groupId: string;

    @ManyToOne(()=>Group, group => group.userGroups)
    @JoinColumn({name:"groupId"})
    group:Group;

    @Column({
        type: Boolean,
        default: false,
     })
    visibility:boolean;

    @CreateDateColumn({type: "datetime"})
    createdAt: Date;

    @UpdateDateColumn({type: "datetime"})
    updatedAt: Date;

    constructor(){
        if(!this.id)
            this.id= uuid();
    }
}

export {UserGroup};