import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Profile1687615330780 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "profiles",
        columns: [
          {
            name: "id",
            type: "int",

            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
            // generationStrategy: "increment",
          },
          {
            name: "fullname",
            type: "varchar",
            length: "220",
            isNullable: true,
          },
          {
            name: "address",
            type: "text",
            isNullable: true,
          },
          {
            name: "phoneNumber",
            type: "varchar",
            length: "20",
            isNullable: true,
          },
          {
            name: "userId",
            type: "uuid",
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

    await queryRunner.createForeignKey(
      "profiles",
      new TableForeignKey({
        columnNames: ["userId"],
        referencedTableName: "users",
        referencedColumnNames: ["id"],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.dropTable("profile");
  }
}
