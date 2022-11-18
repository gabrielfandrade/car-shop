import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import MotorcycleODM from '../../../src/Models/MotorcycleODM';
import { 
  motorcycleInput,
  motorcycleInputUpdate,
  motorcycleOutput,
  motorcycleOutputUpdated,
  motorcyclesOutput,
} from '../../utils/MotorcycleMocks';

const RESULT_ERROR = 'Invalid mongo id';
const ID = '6348513f34c397abcad040b2';

describe('Verifica a "Model" de "Motorcycle"', function () {
  it('Verifica se é possível cadastrar uma moto', async function () {
    sinon.stub(Model, 'create').resolves(motorcycleOutput);

    const motorcycleODM = new MotorcycleODM();
    const result = await motorcycleODM.create(motorcycleInput);

    expect(result).to.be.deep.equal(motorcycleOutput);
  });

  it('Verifica se é possível listar as motos', async function () {
    sinon.stub(Model, 'find').resolves(motorcyclesOutput);

    const motorcycleODM = new MotorcycleODM();
    const result = await motorcycleODM.readAll();

    expect(result).to.be.deep.equal(motorcyclesOutput);
  });

  it('Verifica se é possível lista uma moto pelo id', async function () {
    sinon.stub(Model, 'findOne').resolves(motorcycleOutput);

    const motorcycleODM = new MotorcycleODM();
    const result = await motorcycleODM.readOne(ID);

    expect(result).to.be.deep.equal(motorcycleOutput);
  });

  it('Verifica se é gerado um erro ao utilizar um id invalido', async function () {
    const wrongId = '1';

    try {
      const motorcycleODM = new MotorcycleODM();
      await motorcycleODM.readOne(wrongId);
    } catch (error) {
      expect((error as Error).message).to.be.equal(RESULT_ERROR);
    }
  });

  it('Verifica se é possível atualizar uma moto', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleOutputUpdated);

    const motorcycleODM = new MotorcycleODM();
    const result = await motorcycleODM.update(ID, motorcycleInputUpdate);
    
    expect(result).to.be.deep.equal(motorcycleOutputUpdated);
  });

  it('Verifica se é gerado um erro ao atualizar com um id invalido', async function () {  
    const wrongId = '1';

    try {
      const motorcycleODM = new MotorcycleODM();
      await motorcycleODM.update(wrongId, motorcycleInputUpdate);
    } catch (error) {
      expect((error as Error).message).to.be.equal(RESULT_ERROR);
    }
  });

  afterEach(function () {
    sinon.restore();
  });
});