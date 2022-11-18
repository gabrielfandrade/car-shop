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

  public async readAll() {
    const motorcycleODM = new MotorcycleODM();

    const motorcycles = await motorcycleODM.readAll();

    const domain = this.MotorcycleDomainList(motorcycles);

    return domain;
  }

  public async readOne(id: string) {
    const motorcycleODM = new MotorcycleODM();

    const motorcycle = await motorcycleODM.readOne(id);

    const domain = this.createMotorcycleDomain(motorcycle);
    
    if (!domain) {
      throw new Error('Motorcycle not found');
    }

    return domain;
  }

  public async update(id: string, motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();

    const updatedMotorcycle = await motorcycleODM.update(id, motorcycle);

    const domain = this.createMotorcycleDomain(updatedMotorcycle);

    if (!domain) {
      throw new Error('Motorcycle not found');
    }

    return domain;
  }
}

export default MotorcycleService;