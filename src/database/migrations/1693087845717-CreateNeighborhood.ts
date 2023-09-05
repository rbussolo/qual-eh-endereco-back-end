import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateNeighborhood1693087845717 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "neighborhoods",
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
                        name: "city_id",
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
                        name: "fk_neighborhood_city",
                        columnNames: ["city_id"],
                        referencedTableName: "cities",
                        referencedColumnNames: ["id"],
                        onDelete: 'CASCADE'
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("neighborhoods");
    }

}
