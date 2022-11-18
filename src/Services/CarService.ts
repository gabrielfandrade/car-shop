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

  public async readAll() {
    const carODM = new CarODM();

    const cars = await carODM.readAll();

    const domain = this.CarDomainList(cars);

    return domain;
  }

  public async readOne(id: string) {
    const carODM = new CarODM();

    const car = await carODM.readOne(id);

    const domain = this.createCarDomain(car);

    if (!domain) {
      throw new Error('Car not found');
    }

    return domain;  
  }

  public async update(id: string, car: ICar) {
    const carODM = new CarODM();

    const updatedCar = await carODM.update(id, car);

    const domain = this.createCarDomain(updatedCar);

    if (!domain) {
      throw new Error('Car not found');
    }

    return domain;
  }
}

export default CarService;