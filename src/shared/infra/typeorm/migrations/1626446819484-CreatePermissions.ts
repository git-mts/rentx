import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePermissions1626446819484 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.createTable(
      new Table({
        name: 'permissions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          { name: 'name', type: 'varchar', isUnique: true },
          { name: 'description', type: 'varchar' },
          { name: 'created_at', type: 'timestamp with time zone', default: 'now()' },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('permissions');
    await queryRunner.query('DROP EXTENSION IF EXISTS "uuid-ossp"');
  }
}
