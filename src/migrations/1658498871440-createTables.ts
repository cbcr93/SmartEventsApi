import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1658498871440 implements MigrationInterface {
    name = 'createTables1658498871440'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isSeller" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_51b8b26ac168fbe7d6f5653e6cf" UNIQUE ("name"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tickts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "category" character varying NOT NULL, "description" character varying NOT NULL, "price" numeric(10,2) NOT NULL, "amounts" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "UQ_12f2137d4052e3b2fd16ed0b19a" UNIQUE ("title"), CONSTRAINT "PK_864c53efbaaa0ee568b276eb828" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tickts" ADD CONSTRAINT "FK_91d3dc1d1da71a48593eb53fb41" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tickts" DROP CONSTRAINT "FK_91d3dc1d1da71a48593eb53fb41"`);
        await queryRunner.query(`DROP TABLE "tickts"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
