import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1688291005889 implements MigrationInterface {
    name = 'Init1688291005889'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`option\` (
                \`trading_symbol\` varchar(255) NOT NULL,
                \`type\` varchar(255) NOT NULL,
                \`expiry_date\` int NOT NULL,
                \`strike\` int NULL,
                \`companyName\` varchar(255) NULL,
                PRIMARY KEY (\`trading_symbol\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`market_data\` (
                \`timestamp\` int NOT NULL,
                \`ltq\` int NOT NULL,
                \`ltp\` int NOT NULL,
                \`vol\` int NOT NULL,
                \`bid\` int NOT NULL,
                \`ask\` int NOT NULL,
                \`bid_qty\` int NOT NULL,
                \`ask_qty\` int NOT NULL,
                \`oi\` int NOT NULL,
                \`prev_oi\` int NOT NULL,
                \`prev_close_price\` int NOT NULL,
                \`companyName\` varchar(255) NULL,
                \`optionTradingSymbol\` varchar(255) NULL,
                PRIMARY KEY (\`timestamp\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`company\` (
                \`name\` varchar(255) NOT NULL,
                PRIMARY KEY (\`name\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`option\`
            ADD CONSTRAINT \`FK_52f4ddbbd954b9a267829b12600\` FOREIGN KEY (\`companyName\`) REFERENCES \`company\`(\`name\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`market_data\`
            ADD CONSTRAINT \`FK_09db669245449778cdf7dae9e07\` FOREIGN KEY (\`companyName\`) REFERENCES \`company\`(\`name\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`market_data\`
            ADD CONSTRAINT \`FK_e24a250b8a9353e8b253afafad3\` FOREIGN KEY (\`optionTradingSymbol\`) REFERENCES \`option\`(\`trading_symbol\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`market_data\` DROP FOREIGN KEY \`FK_e24a250b8a9353e8b253afafad3\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`market_data\` DROP FOREIGN KEY \`FK_09db669245449778cdf7dae9e07\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`option\` DROP FOREIGN KEY \`FK_52f4ddbbd954b9a267829b12600\`
        `);
        await queryRunner.query(`
            DROP TABLE \`company\`
        `);
        await queryRunner.query(`
            DROP TABLE \`market_data\`
        `);
        await queryRunner.query(`
            DROP TABLE \`option\`
        `);
    }

}
