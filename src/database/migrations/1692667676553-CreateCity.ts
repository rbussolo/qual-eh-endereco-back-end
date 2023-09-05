import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateCity1692667676553 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "cities",
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
                        precision: 36,
                        isNullable: true
                    },
                    {
                        name: "zip_code",
                        type: "varchar",
                        precision: 8,
                        isNullable: true
                    },
                    {
                        name: "short_country",
                        type: "varchar",
                        precision: 2,
                        isNullable: true
                    },
                    {
                        name: "short_state",
                        type: "varchar",
                        precision: 2,
                        isNullable: true
                    },
                    {
                        name: "state_id",
                        type: "integer",
                        isNullable: true
                    },
                    {
                        name: "code_ibge",
                        type: "integer",
                        isNullable: true
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                        isNullable: true
                    }
                ],
                foreignKeys: [
                    {
                        name: "fk_city_state",
                        columnNames: ["state_id"],
                        referencedTableName: "states",
                        referencedColumnNames: ["id"]
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("cities");
    }

}
