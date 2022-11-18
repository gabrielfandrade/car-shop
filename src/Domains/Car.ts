import ICar from '../Interfaces/ICar';
import Vehicle from './Vehicle';

class Car extends Vehicle {
  private doorsQty: number;
  private seatsQty: number;

  constructor(car: ICar) {
    super(car.id, car.model, car.year, car.color, car.status || false, car.buyValue);
    this.doorsQty = car.doorsQty;
    this.seatsQty = car.seatsQty;
  }
}

export default Car;