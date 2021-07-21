import { Request, Response } from 'express';

import { ListOperatorsUseCase } from './ListOperatorsUseCase';

export abstract class ListOperatorsController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const listOperators = new ListOperatorsUseCase();

    const operators = (await listOperators.execute()).map(
      ({ password: _, ...operator }) => operator,
    );

    return response.json(operators);
  }
}
