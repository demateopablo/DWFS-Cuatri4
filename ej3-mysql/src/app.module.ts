import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';

const env = process.env;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: env.DB_HOST || 'localhost',
      port: parseInt(env.DB_PORT ?? '3306', 10),
      username: env.DB_USER || 'root',
      password: env.DB_PASSWORD || 'root',
      database: env.DB_NAME || 'ej3_db',
      entities: [User],
      synchronize: true,
    }),
    UsersModule,
  ],
})
export class AppModule {}
