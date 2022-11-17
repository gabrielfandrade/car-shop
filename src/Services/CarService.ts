import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

class CarService {
  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  private CarDomainList(cars: ICar[] | null): Car[] | null {
    if (cars) {
      const carsList: Car[] = [];
      cars.forEach((car) => {
        const carDomain = this.createCarDomain(car);
        carsList.push(carDomain as Car);
      });
      return carsList;
    }
    return null;
  }

  public async create(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(car);
    return this.createCarDomain(newCar);
  }

  public async getAll() {
    const carODM = new CarODM();

    const cars = await carODM.getAll();

    if (cars.length === 0) {
      throw new Error('Car not found');
    }

    return this.CarDomainList(cars);
  }

  public async get(id: string) {
    const carODM = new CarODM();

    const car = await carODM.get(id);

    if (!car) {
      throw new Error('Car not found');
    }

    return this.createCarDomain(car);  
  }
}

export default CarService;