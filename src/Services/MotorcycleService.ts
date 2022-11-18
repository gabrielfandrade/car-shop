import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

class MotorcycleService {
  private createMotorcycleDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }

  private MotorcycleDomainList(motorcycles: IMotorcycle[] | null): Motorcycle[] | null {
    if (motorcycles) {
      const motorcycleList: Motorcycle[] = [];
      motorcycles.forEach((motorcycle) => {
        const motorcycleDomain = this.createMotorcycleDomain(motorcycle);
        motorcycleList.push(motorcycleDomain as Motorcycle);
      });
      return motorcycleList;
    }
    return [];
  }

  public async create(motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();

    const newMotorcycle = await motorcycleODM.create(motorcycle);

    const domain = this.createMotorcycleDomain(newMotorcycle);

    return domain;
  }
}

export default MotorcycleService;