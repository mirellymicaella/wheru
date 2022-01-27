import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import {v4 as uuid} from "uuid";
import { Group } from "./Group";
import { UserGroup } from "./UserGroup";

@Entity("users")
class User{
    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    latitude:number;

    @Column()
    longitude:number;

    @Column()
    profileIcon: string;

    @Column()
    markerIcon: string;
    
    @Column()
    deviceName: string;

    @Column()
    token: string;

    @Column()
    status: string;

    @OneToMany(() => UserGroup, userGroup => userGroup.user)
    @JoinTable()
    userGroups: UserGroup[];

    @OneToMany(() => Group, group => group.users)
    @JoinTable()
    groups: Group[];

    @CreateDateColumn({type: "datetime"})
    createdAt: Date;

    @UpdateDateColumn({type: "datetime"})
    updatedAt: Date;

    constructor(){
        if(!this.id)
            this.id= uuid();
    }
}

export {User}