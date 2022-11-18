import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import {
  motorcycleInput,
  motorcycleOutput,
  motorcycleDomain,
  motorcyclesOutput,
  motorcycleDomainList,
  motorcycleOutputUpdated,
  motorcycleInputUpdate,
  motorcycleDomainUpdated,
} from '../../utils/MotorcycleMocks';

const RESULT_ERROR = 'Motorcycle not found';
const ID = '634852326b35b59438fbea2f';

describe('Verifica o "Services" de "Motorcycle"', function () {
  it('Verifica se é possível cadastrar uma moto', async function () {
    sinon.stub(Model, 'create').resolves(motorcycleOutput);

    const motorcycleService = new MotorcycleService();
    const result = await motorcycleService.create(motorcycleInput);

    expect(result).to.be.deep.equal(motorcycleDomain);
  });

  it('Verifica se é possível listar as motos', async function () {
    sinon.stub(Model, 'find').resolves(motorcyclesOutput);

    const motorcycleService = new MotorcycleService();
    const result = await motorcycleService.readAll();

    expect(result).to.be.deep.equal(motorcycleDomainList);
  });

  it('Verifica se é gerado uma lista vazia quando não possuir motos', async function () {
    sinon.stub(Model, 'find').resolves();

    const motorcycleService = new MotorcycleService();
    const result = await motorcycleService.readAll();

    expect(result).to.be.deep.equal([]);
  });

  it('Verifica se é possível listar uma moto pelo id', async function () {
    sinon.stub(Model, 'findOne').resolves(motorcycleOutput);

    const motorcycleService = new MotorcycleService();
    const result = await motorcycleService.readOne(ID);

    expect(result).to.be.deep.equal(motorcycleDomain);
  });

  it('Verifica se é gerado um erro quando não encontrado uma moto', async function () {
    sinon.stub(Model, 'findOne').resolves();

    try {
      const motorcycleService = new MotorcycleService();
      await motorcycleService.readOne(ID);
    } catch (error) {
      expect((error as Error).message).to.be.equal(RESULT_ERROR);
    }
  });

  it('Verifica se é possível atualizar uma moto', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleOutputUpdated);

    const motorcycleService = new MotorcycleService();
    const result = await motorcycleService.update(ID, motorcycleInputUpdate);
    
    expect(result).to.be.deep.equal(motorcycleDomainUpdated);
  });

  it(
    'Verifica se é gerado um erro quando não encontrado uma moto para atualizar',
    async function () {
      sinon.stub(Model, 'findByIdAndUpdate').resolves();

      try {
        const motorcycleService = new MotorcycleService();
        await motorcycleService.update(ID, motorcycleInputUpdate);
      } catch (error) {
        expect((error as Error).message).to.be.equal(RESULT_ERROR);
      }
    },
  );

  afterEach(function () {
    sinon.restore();
  });
});