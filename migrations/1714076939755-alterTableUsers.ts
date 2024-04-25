import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableUsers1714076939755 implements MigrationInterface {
  name = 'AlterTableUsers1714076939755';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`active\` tinyint NOT NULL DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`active\``);
  }
}
