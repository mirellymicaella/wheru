import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1614911413047 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
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
                        name:"latitude",
                        type:"number",
                    },
                    {
                        name:"longitude",
                        type:"number",
                    },
                    {
                        name:"profileIcon",
                        type:"varchar",
                        isNullable:true
                    },
                    {
                        name:"markerIcon",
                        type:"varchar",
                        isNullable:true
                    },
                    {
                        name:"deviceName",
                        type:"varchar",
                    },
                    {
                        name:"token",
                        type:"varchar",
                        isUnique:true
                    },
                    {
                        name:"status",
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
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
