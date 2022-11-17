import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import CarService from '../../../src/Services/CarService';
import { carInput, carOutput, carsOutput, carDomain, carDomainList } from '../../utils/CarMocks';

const RESULT_ERROR = 'Car not found';

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
    const result = await carService.getAll();

    expect(result).to.be.deep.equal(carDomainList);
  });

  it('Verifica se é gerado uma lista vazia quando não possuir carros ', async function () {
    sinon.stub(Model, 'find').resolves();

    const carService = new CarService();
    const result = await carService.getAll();

    expect(result).to.be.deep.equal([]);
  });

  it('Verifica se é possível listar um carro pelo id', async function () {
    const id = '634852326b35b59438fbea2f';
    sinon.stub(Model, 'findOne').resolves(carOutput);

    const carService = new CarService();
    const result = await carService.get(id);

    expect(result).to.be.deep.equal(carDomain);
  });

  it('Verifica se é gerado um erro quando não encontrado um carro', async function () {
    const id = '634852326b35b59438fbea2f';
    sinon.stub(Model, 'findOne').resolves();

    try {
      const carService = new CarService();
      await carService.get(id);
    } catch (error) {
      expect((error as Error).message).to.be.equal(RESULT_ERROR);
    }
  });

  afterEach(function () {
    sinon.restore();
  });
});