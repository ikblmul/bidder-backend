import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class User1680315076933 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user",
        columns: [
          {
            name: "id",
            type: "int",
            isGenerated: true,
            isPrimary: true,
          },
          {
            name: "email",
            type: "varchar",
            length: "90",
            isUnique: true,
          },
          {
            name: "fullname",
            type: "varchar",
            length: "90",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable("user");
  }
}
