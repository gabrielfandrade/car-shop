import Motorcycle from '../../src/Domains/Motorcycle';
import IMotorcycle from '../../src/Interfaces/IMotorcycle';

export const motorcycleInput: IMotorcycle = {
  model: 'Honda Cb 600f Hornet',
  year: 2005,
  color: 'Yellow',
  status: false,
  buyValue: 30.000,
  category: 'Street',
  engineCapacity: 600,
};

export const motorcycleOutput: IMotorcycle = {
  id: '6348513f34c397abcad040b2',
  model: 'Honda Cb 600f Hornet',
  year: 2005,
  color: 'Yellow',
  status: false,
  buyValue: 30.000,
  category: 'Street',
  engineCapacity: 600,
};

export const motorcyclesOutput: IMotorcycle[] = [
  motorcycleOutput,
  {
    id: '634852326b35b59438fbea31',
    model: 'Honda Cbr 1000rr',
    year: 2011,
    color: 'Orange',
    status: true,
    buyValue: 59.900,
    category: 'Street',
    engineCapacity: 1000,
  },
];

export const motorcycleDomain: Motorcycle = new Motorcycle(motorcycleOutput);

export const otherMotorcycleDomain: Motorcycle = new Motorcycle(motorcyclesOutput[1]);

export const motorcycleDomainList: Motorcycle[] = [
  motorcycleDomain,
  otherMotorcycleDomain,
];

export const motorcycleInputUpdate: IMotorcycle = {
  model: 'Honda Cb 600f',
  year: 2014,
  color: 'Red',
  status: false,
  buyValue: 45.000,
  category: 'Street',
  engineCapacity: 600,
};

export const motorcycleOutputUpdated: IMotorcycle = {
  id: '634852326b35b59438fbea2f',
  model: 'Honda Cb 600f',
  year: 2014,
  color: 'Red',
  status: false,
  buyValue: 45.000,
  category: 'Street',
  engineCapacity: 600,
};

export const motorcycleDomainUpdated: Motorcycle = new Motorcycle(motorcycleOutputUpdated);