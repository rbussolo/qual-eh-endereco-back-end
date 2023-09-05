import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateAddress1693146679344 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "addresses",
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
                        name: "neighborhood_id",
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
                        name: "fk_address_neighborhood",
                        columnNames: ["neighborhood_id"],
                        referencedTableName: "neighborhoods",
                        referencedColumnNames: ["id"],
                        onDelete: 'CASCADE'
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("addresses");
    }

}
