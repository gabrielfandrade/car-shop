import {
  isValidObjectId,
  Model,
  model,
  models,
  Schema,
  UpdateQuery,
} from 'mongoose';

abstract class VehicleODM<T> {
  protected model: Model<T>;
  protected schema: Schema;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(this.modelName, this.schema);
  }

  public async create(vehicle: T): Promise<T> {
    return this.model.create({ ...vehicle });
  }

  public async readAll(): Promise<T[] | null> {
    return this.model.find({});
  }

  public async readOne(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new Error('Invalid mongo id');

    return this.model.findOne({ _id });
  }

  public async update(_id: string, vehicle: Partial<T>): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new Error('Invalid mongo id');

    return this.model.findByIdAndUpdate(
      { _id },
      { ...vehicle } as UpdateQuery<T>,
      { new: true },
    );
  }
}

export default VehicleODM;