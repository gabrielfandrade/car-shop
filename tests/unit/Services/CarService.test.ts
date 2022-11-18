import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import CarService from '../../../src/Services/CarService';
import { 
  carInput,
  carOutput,
  carsOutput,
  carDomain,
  carDomainList,
  carOutputUpdated,
  carInputUpdate,
  carDomainUpdated,
} from '../../utils/CarMocks';

const RESULT_ERROR = 'Car not found';
const ID = '634852326b35b59438fbea2f';

describe('Verifica o "Service" de "Car"', function () {
  it('Verifica se é possível cadastrar um carro', async function () {
    sinon.stub(Model, 'create').resolves(carOutput);

    const carService = new CarService();
    const result = await carService.create(carInput);

    expect(result).to.be.deep.equal(carDomain);
  });

  it('Verifica se é possível listar os carros', async function () {
    sinon.stub(Model, 'find').resolves(carsOutput);

    const carService = new CarService();
    const result = await carService.readAll();

    expect(result).to.be.deep.equal(carDomainList);
  });

  it('Verifica se é gerado uma lista vazia quando não possuir carros ', async function () {
    sinon.stub(Model, 'find').resolves();

    const carService = new CarService();
    const result = await carService.readAll();

    expect(result).to.be.deep.equal([]);
  });

  it('Verifica se é possível listar um carro pelo id', async function () {
    sinon.stub(Model, 'findOne').resolves(carOutput);

    const carService = new CarService();
    const result = await carService.readOne(ID);

    expect(result).to.be.deep.equal(carDomain);
  });

  it('Verifica se é gerado um erro quando não encontrado um carro', async function () {
    sinon.stub(Model, 'findOne').resolves();

    try {
      const carService = new CarService();
      await carService.readOne(ID);
    } catch (error) {
      expect((error as Error).message).to.be.equal(RESULT_ERROR);
    }
  });

  it('Verifica se é possível atualizar um carro', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carOutputUpdated);

    const carService = new CarService();
    const result = await carService.update(ID, carInputUpdate);
    
    expect(result).to.be.deep.equal(carDomainUpdated);
  });

  it(
    'Verifica se é gerado um erro quando não encontrado um carro para atualizar',
    async function () {
      sinon.stub(Model, 'findByIdAndUpdate').resolves();

      try {
        const carService = new CarService();
        await carService.update(ID, carInputUpdate);
      } catch (error) {
        expect((error as Error).message).to.be.equal(RESULT_ERROR);
      }
    },
  );

  afterEach(function () {
    sinon.restore();
  });
});