import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import {
  motorcycleInput,
  motorcycleOutput,
  motorcycleDomain,
} from '../../utils/MotorcycleMocks';

describe('Verifica o "Services" de "Motorcycle"', function () {
  it('Verifica se é possível cadastrar uma moto', async function () {
    sinon.stub(Model, 'create').resolves(motorcycleOutput);

    const motorcycleService = new MotorcycleService();
    const result = await motorcycleService.create(motorcycleInput);

    expect(result).to.be.deep.equal(motorcycleDomain);
  });

  afterEach(function () {
    sinon.restore();
  });
});