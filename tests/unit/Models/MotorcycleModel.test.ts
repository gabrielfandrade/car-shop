import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import MotorcycleODM from '../../../src/Models/MotorcycleODM';
import { 
  motorcycleInput,
  motorcycleOutput,
} from '../../utils/MotorcycleMocks';

// const RESULT_ERROR = 'Invalid mongo id';

describe('Verifica a "Model" de "Motorcycle"', function () {
  it('Verifica se é possível cadastrar uma moto', async function () {
    sinon.stub(Model, 'create').resolves(motorcycleOutput);

    const motorcycleODM = new MotorcycleODM();
    const result = await motorcycleODM.create(motorcycleInput);

    expect(result).to.be.deep.equal(motorcycleOutput);
  });

  afterEach(function () {
    sinon.restore();
  });
});