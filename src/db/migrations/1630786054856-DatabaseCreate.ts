import { MigrationInterface, QueryRunner } from 'typeorm';

export class DatabaseCreate1630786054856 implements MigrationInterface {
  name = 'DatabaseCreate1630786054856';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" int NOT NULL IDENTITY(1,1), "name" varchar(100) NOT NULL, "email" varchar(150) NOT NULL, "password" varchar(60) NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "todos" ("id" int NOT NULL IDENTITY(1,1), "description" text NOT NULL, "is_completed" bit NOT NULL CONSTRAINT "DF_ad2c5b4967dd89e27c96945c41c" DEFAULT 0, "users_id" int NOT NULL, CONSTRAINT "PK_ca8cafd59ca6faaf67995344225" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tokens" ("id" int NOT NULL IDENTITY(1,1), "token" varchar(255) NOT NULL, "email" varchar(150) NOT NULL, CONSTRAINT "UQ_d60a53f7fd2e12866a82a02a9f4" UNIQUE ("email"), CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "todos" ADD CONSTRAINT "FK_cda44177299ed22dbad9674a21c" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "todos" DROP CONSTRAINT "FK_cda44177299ed22dbad9674a21c"`,
    );
    await queryRunner.query(`DROP TABLE "tokens"`);
    await queryRunner.query(`DROP TABLE "todos"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
