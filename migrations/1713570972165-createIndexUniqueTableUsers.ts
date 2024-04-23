import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateIndexUniqueTableUsers1713570972165
  implements MigrationInterface
{
  name = 'CreateIndexUniqueTableUsers1713570972165'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`)`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\``
    )
  }
}
