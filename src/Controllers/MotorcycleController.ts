import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async create() {
    const motorcycle: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status || false, 
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };

    const newMotorcycle = await this.service.create(motorcycle);
    return this.res.status(201).json(newMotorcycle);
  }

  public async readAll() {
    const motorcycles = await this.service.readAll();
    return this.res.status(200).json(motorcycles);
  }

  public async readOne() {
    const { id } = this.req.params;

    try {
      const motorcycle = await this.service.readOne(id);
      return this.res.status(200).json(motorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async update() {
    const { id } = this.req.params;
    const motorcycle: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status || false, 
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };

    try {
      const updatedMotorcycle = await this.service.update(id, motorcycle);
      return this.res.status(200).json(updatedMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async delete() {
    const { id } = this.req.params;

    try {
      await this.service.delete(id);
      return this.res.status(204).send();
    } catch (error) {
      this.next(error);
    }
  }
}

export default MotorcycleController;