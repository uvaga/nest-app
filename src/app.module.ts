import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { LoggerMiddleware } from './common/middlewares/logger/logger.middleware';
import { ProductsController } from './products/products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.2',
      port: 32001,
      username: 'root',
      password: 'root_password',
      database: 'geonet_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly dataSource: DataSource) {
    console.log('connection status ', dataSource.isInitialized);
  }

  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes(ProductsController);
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes({ path: 'products', method: RequestMethod.GET });
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'products', method: RequestMethod.GET },
        { path: 'products/:id', method: RequestMethod.GET },
      )
      .forRoutes(ProductsController);
  }
}
