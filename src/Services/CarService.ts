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
    return [];
  }

  public async create(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(car);
    const domain = this.createCarDomain(newCar);
    return domain;
  }

  public async getAll() {
    const carODM = new CarODM();

    const cars = await carODM.getAll();

    const domain = this.CarDomainList(cars);

    return domain;
  }

  public async get(id: string) {
    const carODM = new CarODM();

    const car = await carODM.get(id);

    const domain = this.createCarDomain(car);

    if (!domain) {
      throw new Error('Car not found');
    }

    return domain;  
  }
}

export default CarService;