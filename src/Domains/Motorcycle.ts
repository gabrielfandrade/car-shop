import IMotorcycle from '../Interfaces/IMotorcycle';
import Vehicle from './Vehicle';

class Motorcycle extends Vehicle {
  private category: string;
  private engineCapacity: number;

  constructor(motorcycle: IMotorcycle) {
    super(
      motorcycle.id,
      motorcycle.model,
      motorcycle.year,
      motorcycle.color,
      motorcycle.status || false,
      motorcycle.buyValue,
    );
    this.category = motorcycle.category;
    this.engineCapacity = motorcycle.engineCapacity;
  }
}

export default Motorcycle;