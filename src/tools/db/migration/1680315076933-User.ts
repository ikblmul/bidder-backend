import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class User1680315076933 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "uuid",
            generationStrategy: "uuid",
            isPrimary: true,
          },

          {
            name: "username",
            type: "varchar",
            length: "90",
            isUnique: true,
          },
          {
            name: "password",
            type: "varchar",
            length: "120",
          },
          {
            name: "email",
            type: "varchar",
            length: "90",
            isUnique: true,
          },

          // timestamps
          {
            name: "createdAt",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updatedAt",
            type: "timestamp",
            default: "now()",
            onUpdate: "now()",
          },
        ],
      })
    );

    // await queryRunner.release();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user");
    // await queryRunner.release()
  }
}
