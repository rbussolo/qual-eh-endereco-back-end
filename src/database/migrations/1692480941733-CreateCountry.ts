import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateCountry1692480941733 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "countries",
                columns: [
                    {
                        name: "id",
                        type: "integer",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isUnique: true,
                        precision: 72
                    },
                    {
                        name: "short_name",
                        type: "varchar",
                        precision: 2,
                        isNullable: true
                    },
                    {
                        name: "name_in_english",
                        type: "varchar",
                        precision: 72,
                        isNullable: true
                    },
                    {
                        name: "short_in_english",
                        type: "varchar",
                        precision: 3,
                        isNullable: true
                    },
                    {
                        name: "name_in_french",
                        type: "varchar",
                        precision: 72,
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
        await queryRunner.dropTable("countries");
    }

}
