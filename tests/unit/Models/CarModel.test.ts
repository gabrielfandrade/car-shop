import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import CarODM from '../../../src/Models/CarODM';
import { 
  carInput,
  carOutput,
  carsOutput,
  carInputUpdate,
  carOutputUpdated,
} from '../../utils/CarMocks';

const RESULT_ERROR = 'Invalid mongo id';

describe('Verifica a "Model" de "Car"', function () {
  it('Verifica se é possível cadastrar um carro', async function () {
    sinon.stub(Model, 'create').resolves(carOutput);

    const carODM = new CarODM();
    const result = await carODM.create(carInput);

    expect(result).to.be.deep.equal(carOutput);
  });

  it('Verifica se é possível listar os carros', async function () {
    sinon.stub(Model, 'find').resolves(carsOutput);

    const carODM = new CarODM();
    const result = await carODM.readAll();

    expect(result).to.be.deep.equal(carsOutput);
  });

  it('Verifica se é possível lista um carro pelo id', async function () {
    const id = '634852326b35b59438fbea2f';
    sinon.stub(Model, 'findOne').resolves(carOutput);

    const carODM = new CarODM();
    const result = await carODM.readOne(id);

    expect(result).to.be.deep.equal(carOutput);
  });

  it('Verifica se é gerado um erro ao utilizar um id invalido', async function () {
    const id = '1';

    try {
      const carODM = new CarODM();
      await carODM.readOne(id);
    } catch (error) {
      expect((error as Error).message).to.be.equal(RESULT_ERROR);
    }
  });

  it('Verifica se é possível atualizar um carro', async function () {
    const id = '634852326b35b59438fbea2f';
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carOutputUpdated);

    const carODM = new CarODM();
    const result = await carODM.update(id, carInputUpdate);
    
    expect(result).to.be.deep.equal(carOutputUpdated);
  });

  afterEach(function () {
    sinon.restore();
  });
});