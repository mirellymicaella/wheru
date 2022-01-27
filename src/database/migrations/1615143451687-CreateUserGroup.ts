import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUserGroup1615143451687 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"userGroup",
                columns:[
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary:true
                    },
                    {
                        name: "userId",
                        type: "uuid",
                    },
                    {
                        name: "groupId",
                        type: "uuid",
                    },
                    {
                        name: "visibility",
                        type: "boolean",
                        isNullable:true
                    },
                    {
                        name:"createdAt",
                        type:"datetime",
                        isNullable:true
                    },
                    {
                        name:"updatedAt",
                        type:"datetime",
                        isNullable:true
                    },
                ],
                foreignKeys:[
                    {
                        name:"FKUser",
                        referencedTableName:"users",
                        referencedColumnNames: ["id"],
                        columnNames:["userId"],
                        onDelete:"CASCADE",
                        onUpdate:"CASCADE"
                    },
                    {
                        name:"FKGroup",
                        referencedTableName:"groups",
                        referencedColumnNames: ["id"],
                        columnNames:["groupId"],
                        onDelete:"CASCADE",
                        onUpdate:"CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("userGroup");
    }

}
