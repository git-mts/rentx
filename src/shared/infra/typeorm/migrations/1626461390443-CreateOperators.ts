import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOperators1626461390443 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'operators',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          { name: 'username', type: 'varchar', isUnique: true },
          { name: 'email', type: 'varchar', isUnique: true, isNullable: true },
          { name: 'password', type: 'varchar' },
          { name: 'role_id', type: 'uuid', isNullable: true },
          { name: 'created_at', type: 'timestamp with time zone', default: 'now()' },
        ],
        foreignKeys: [
          {
            name: 'operators_roles',
            referencedTableName: 'roles',
            referencedColumnNames: ['id'],
            columnNames: ['role_id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('operators');
  }
}
