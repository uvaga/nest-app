import { Controller, Post, Body, Get } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { Category } from './interfaces/category.interface';
import { CreateQuestionDTO } from './dto/create-question.dto';
import { Question } from './interfaces/question.interface';

@Controller('quiz')
export class QuizController {
  constructor(private quizService: QuizService) {}

  @Post('categories')
  async createCategories(
    @Body() categories: CreateCategoryDTO,
  ): Promise<Category[]> {
    return await this.quizService.createCategories(categories);
  }

  @Post('questions')
  async createQuestions(
    @Body() questions: CreateQuestionDTO,
  ): Promise<Question> {
    return await this.quizService.createQuestion(questions);
  }

  @Get('questions')
  async getQuestions(): Promise<Question[]> {
    return this.quizService.getQuestions();
  }
}
