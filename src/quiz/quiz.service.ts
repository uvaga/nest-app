import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionEntity } from './question.entity';
import { Repository, DataSource } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { Category } from './interfaces/category.interface';
import { CreateQuestionDTO } from './dto/create-question.dto';
import { Question } from './interfaces/question.interface';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly questionsRepository: Repository<QuestionEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async createCategories(category: CreateCategoryDTO): Promise<Category[]> {
    return await this.categoryRepository.save(category.categories);
  }

  async createQuestion(question: CreateQuestionDTO): Promise<Question> {
    return await this.dataSource.transaction(async (manager) => {
      // Step 1: Find or create categories
      const categoryEntities: CategoryEntity[] = [];

      for (const categoryDto of question.categories) {
        let category = await manager.findOne(CategoryEntity, {
          where: { name: categoryDto.name },
        });

        if (!category) {
          category = manager.create(CategoryEntity, {
            name: categoryDto.name,
          });
          category = await manager.save(category);
        }

        categoryEntities.push(category);
      }

      // Step 2: Create question with categories
      const questionEntity = manager.create(QuestionEntity, {
        title: question.title,
        text: question.text,
        categories: categoryEntities,
      });

      return await manager.save(questionEntity);
    });
  }

  async getQuestions(): Promise<Question[]> {
    return await this.questionsRepository.find({
      relations: ['categories'],
    });
  }
}
