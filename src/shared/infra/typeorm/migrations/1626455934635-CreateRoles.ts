import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRoles1626455934635 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'roles',
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

    await queryRunner.query(`
      INSERT INTO roles (name, description) VALUES ('admin', 'Administrator');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM roles WHERE name='admin'`);
    await queryRunner.dropTable('roles');
  }
}
