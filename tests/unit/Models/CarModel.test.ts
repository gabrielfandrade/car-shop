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
const ID = '634852326b35b59438fbea2f';
const INVALID_ID = '1';

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
    sinon.stub(Model, 'findOne').resolves(carOutput);

    const carODM = new CarODM();
    const result = await carODM.readOne(ID);

    expect(result).to.be.deep.equal(carOutput);
  });

  it('Verifica se é gerado um erro ao utilizar um id invalido', async function () {
    try {
      const carODM = new CarODM();
      await carODM.readOne(INVALID_ID);
    } catch (error) {
      expect((error as Error).message).to.be.equal(RESULT_ERROR);
    }
  });

  it('Verifica se é possível atualizar um carro', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carOutputUpdated);

    const carODM = new CarODM();
    const result = await carODM.update(ID, carInputUpdate);
    
    expect(result).to.be.deep.equal(carOutputUpdated);
  });

  it('Verifica se é possível excluir um carro', async function () {
    sinon.stub(Model, 'findByIdAndDelete').resolves(carOutput);

    const carODM = new CarODM();
    const result = await carODM.delete(ID);

    expect(result).to.be.deep.equal(carOutput);
  });

  it('Verifica se é gerado um erro ao excluir um carro com ID invalido', async function () {
    try {
      const carODM = new CarODM();
      await carODM.delete(INVALID_ID);
    } catch (error) {
      expect((error as Error).message).to.be.equal(RESULT_ERROR);
    }
  });

  afterEach(function () {
    sinon.restore();
  });
});