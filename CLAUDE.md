# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development
npm run start:dev          # Run in watch mode (recommended for development)
npm run start:debug        # Run in debug mode with watch

# Building
npm run build              # Build the application

# Testing
npm run test               # Run unit tests
npm run test:watch         # Run tests in watch mode
npm run test:e2e           # Run end-to-end tests
npm run test:cov           # Run tests with coverage report
npm run test:debug         # Run tests in debug mode

# Code Quality
npm run lint               # Lint and auto-fix code
npm run format             # Format code with Prettier
```

## Environment Configuration

This application uses `@nestjs/config` for environment variable management following NestJS best practices.

**Setup:**
1. Copy `.env.example` to `.env` and configure your environment variables
2. Configuration files are in `src/config/`:
   - `app.config.ts` - Application settings (port, environment)
   - `database.config.ts` - Database connection settings
3. ConfigModule is registered globally in AppModule

**Required Environment Variables:**
```bash
NODE_ENV=development
PORT=3000
DB_TYPE=mysql
DB_HOST=127.0.0.2
DB_PORT=32001
DB_USERNAME=root
DB_PASSWORD=root_password
DB_DATABASE=geonet_db
DB_SYNCHRONIZE=true  # Set to false in production
```

## Architecture Overview

### Module Structure

This is a NestJS application using a hierarchical module architecture:

```
AppModule (Root)
  ├── ConfigModule.forRoot() - Global configuration management
  ├── TypeOrmModule.forRootAsync() - Database configuration using ConfigService
  └── ProductsModule (Feature Module)
       ├── ProductsController
       ├── ProductsService
       └── TypeOrmModule.forFeature([ProductEntity, ProductDetailsEntity])
```

**Key Patterns:**
- Feature modules are self-contained with their own controllers, services, and entities
- Database repositories are injected using `@InjectRepository()` decorator
- Services use constructor-based dependency injection
- Configuration is injected via ConfigService

### Database Configuration

**TypeORM Setup:**
- Uses `TypeOrmModule.forRootAsync()` for async configuration injection
- ConfigService provides database credentials from environment variables
- Entity discovery: Pattern-based glob (`__dirname + '/**/*.entity{.ts,.js}'`)
- **IMPORTANT:** `synchronize` is controlled by `DB_SYNCHRONIZE` env var (disable in production)

**Entity Relationships:**
- ProductEntity → ProductDetailsEntity: OneToOne relationship with CASCADE delete
- ProductDetailsEntity is EAGER loaded when querying products
- Foreign key is on ProductEntity side via `@JoinColumn()`

### Request Flow & Cross-Cutting Concerns

Incoming requests follow this execution order:

```
Request
  → LoggerMiddleware (logs to console, applied to most ProductsController routes)
    → Guards (none currently configured)
      → TransformInterceptor (wraps responses in { data: <response> } format)
        → ValidationPipe (global, validates DTOs using class-validator)
          → Route Handler
            → Service → Repository → Database
          ← Response
        ← TransformInterceptor (wraps response)
      ← HttpExceptionFilter (formats exceptions as { statusCode, timestamp, path, message })
```

**Middleware Configuration:**
- `LoggerMiddleware`: Applied to ProductsController, excludes GET routes
- Configured in AppModule's `configure()` method using `.exclude()` and `.forRoutes()`

**Interceptors:**
- `TransformInterceptor`: Applied at controller level on ProductsController
- Transforms all responses to `{ data: <original_response> }` format

**Exception Filters:**
- `HttpExceptionFilter`: Applied at controller level on ProductsController
- Catches HttpException instances and formats them consistently

**Global Pipes:**
- `ValidationPipe`: Applied globally in main.ts
- Automatically validates all DTOs decorated with class-validator decorators

### Common Utilities Location

Cross-cutting concerns are organized in `src/common/`:
- `filters/`: Exception filters
- `interceptors/`: Response transformers
- `middlewares/`: Request logging and processing

## Creating New Features

When adding a new feature module:

1. Generate module: `nest g module <name>`
2. Generate controller: `nest g controller <name>`
3. Generate service: `nest g service <name>`
4. Create entities in `src/<name>/entities/` folder
5. Create DTOs in `src/<name>/dto/` folder
6. Register entities with TypeORM in the module:
   ```typescript
   @Module({
     imports: [TypeOrmModule.forFeature([YourEntity])],
     controllers: [YourController],
     providers: [YourService],
   })
   ```

## DTOs and Validation

DTOs are validated using class-validator decorators:
- `@IsNotEmpty()`: Required field
- `@IsString()`, `@IsInt()`, `@IsNumber()`: Type validation
- `@Min()`: Minimum value constraints
- `@IsOptional()`: Optional field (used in update DTOs)

The global ValidationPipe automatically validates all incoming requests against their corresponding DTOs.

## Database Patterns

**Repository Pattern:**
```typescript
constructor(
  @InjectRepository(YourEntity)
  private readonly yourRepository: Repository<YourEntity>,
) {}
```

**Update Pattern:**
```typescript
const entity = await this.repository.findOneBy({ id });
this.repository.merge(entity, updateDto);
return await this.repository.save(entity);
```

## Configuration Best Practices

**Using ConfigService in Services:**
```typescript
import { ConfigService } from '@nestjs/config';

constructor(private configService: ConfigService) {}

const dbHost = this.configService.get<string>('database.host');
const port = this.configService.get<number>('app.port');
```

**Accessing Namespaced Configuration:**
- App config: `configService.get('app.port')`
- Database config: `configService.get('database.host')`

## Important Notes

- All sensitive configuration is stored in `.env` file (not committed to git)
- `.env.example` provides a template for required environment variables
- `synchronize: true` in TypeORM config will auto-migrate database schema (disable in production)
- Type conversion pattern: Use unary `+` to convert route params to numbers (e.g., `+id`)
- All decorators require `experimentalDecorators` and `emitDecoratorMetadata` in tsconfig.json
