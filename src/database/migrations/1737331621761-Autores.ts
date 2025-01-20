import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Autores1737331621761 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "authors",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: "name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "birthdate",
            type: "date",
            isNullable: true,
          },
          {
            name: "biography",
            type: "text",
            isNullable: true,
          },
          {
            name: "nationality",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "active",
            type: "boolean",
            default: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("authors");
  }
}
