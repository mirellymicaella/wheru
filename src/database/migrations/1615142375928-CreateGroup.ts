import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateGroup1615142375928 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"groups",
                columns:[
                    {
                        name:"id",
                        type:"uuid",
                        isPrimary:true
                    },
                    {
                        name:"name",
                        type:"varchar",
                    },
                    {
                        name:"icon",
                        type:"varchar",
                        isNullable:true
                    },
                    {
                        name:"ownerId",
                        type:"uuid",
                        isNullable:true
                    },
                    {
                        name:"invitationCode",
                        type:"varchar",
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
                        columnNames:["ownerId"],
                        onDelete:"SET NULL",
                        onUpdate:"CASCADE"
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("groups");
    }

}
