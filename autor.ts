import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAuthorsTable implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "authors",
                columns: [
                    { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
                    { name: "name", type: "varchar", isNullable: false },
                    { name: "birthdate", type: "date" },
                    { name: "biography", type: "text" },
                    { name: "nationality", type: "varchar", isNullable: false },
                    { name: "active", type: "boolean", default: true },
                    { name: "created_at", type: "timestamp", default: "CURRENT_TIMESTAMP" },
                    { name: "updated_at", type: "timestamp", default: "CURRENT_TIMESTAMP" },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("authors");
    }
}
