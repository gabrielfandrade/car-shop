import {
  isValidObjectId,
  Model,
  model,
  models,
  Schema,
  UpdateQuery,
} from 'mongoose';

const INVALID_MONGO_ID = 'Invalid mongo id';

abstract class AbstractODM<T> {
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
    if (!isValidObjectId(_id)) throw new Error(INVALID_MONGO_ID);

    return this.model.findOne({ _id });
  }

  public async update(_id: string, vehicle: Partial<T>): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new Error(INVALID_MONGO_ID);

    return this.model.findByIdAndUpdate(
      { _id },
      { ...vehicle } as UpdateQuery<T>,
      { new: true },
    );
  }

  public async delete(_id: string) {
    if (!isValidObjectId(_id)) throw new Error(INVALID_MONGO_ID);

    const result = await this.model.findByIdAndDelete(_id);

    if (!result) throw new Error('Car not found');
  }
}

export default AbstractODM;