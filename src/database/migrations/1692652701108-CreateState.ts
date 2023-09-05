import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateState1692652701108 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "states",
                columns: [
                    {
                        name: "id",
                        type: "integer",
                        isPrimary: true
                    },
                    {
                        name: "code_dne",
                        type: "integer",
                        isNullable: true
                    },
                    {
                        name: "name",
                        type: "varchar",
                        precision: 72,
                        isNullable: true
                    },
                    {
                        name: "short_name",
                        type: "varchar",
                        precision: 2,
                        isNullable: true
                    },
                    {
                        name: "short_country",
                        type: "varchar",
                        precision: 2,
                        isNullable: true
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                        isNullable: true
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("states");
    }

}
