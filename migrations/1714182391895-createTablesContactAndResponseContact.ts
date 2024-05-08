import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTablesContactAndResponseContact1714182391895 implements MigrationInterface {
    name = 'CreateTablesContactAndResponseContact1714182391895'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`contact\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`tags\` text NOT NULL, \`message\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`active\` tinyint NOT NULL, \`createdAt\` datetime NOT NULL, \`updatedAt\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`response_contact\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`message\` varchar(255) NOT NULL, \`createdAt\` datetime NOT NULL, \`updatedAt\` datetime NOT NULL, \`contactId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`response_contact\` ADD CONSTRAINT \`FK_012ce7c15b86cdc42e1cb6e9571\` FOREIGN KEY (\`contactId\`) REFERENCES \`contact\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`response_contact\` DROP FOREIGN KEY \`FK_012ce7c15b86cdc42e1cb6e9571\``);
        await queryRunner.query(`DROP TABLE \`response_contact\``);
        await queryRunner.query(`DROP TABLE \`contact\``);
    }

}
