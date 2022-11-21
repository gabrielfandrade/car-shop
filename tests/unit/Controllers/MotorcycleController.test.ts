import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { Model } from 'mongoose';

import app from '../../../src/app';
import { 
  motorcycleDomain,
  motorcycleDomainList,
  motorcycleDomainUpdated,
  motorcycleInput,
  motorcycleInputUpdate,
  motorcycleOutput,
  motorcycleOutputUpdated,
  motorcyclesOutput,
} from '../../utils/MotorcycleMocks';

chai.use(chaiHttp);

const { expect } = chai;

const RESULT_ERROR = 'Motorcycle not found';
const ID = '634852326b35b59438fbea2f';
const MOTORCYCLES = '/motorcycles';

describe('Verifica o "Controller" de "Motorcycle"', function () {
  it('Verifica a resposta ao cadastrar uma nova moto', async function () {
    sinon.stub(Model, 'create').resolves(motorcycleOutput);

    const httpResponse = await chai
      .request(app)
      .post(MOTORCYCLES)
      .send(motorcycleInput);

    expect(httpResponse.status).to.equal(201);
    expect(httpResponse.body).to.be.deep.equal(motorcycleDomain);
  });

  it('Verifica a resposta ao cadastrar uma nova moto sem um "Status"', async function () {
    sinon.stub(Model, 'create').resolves(motorcycleOutput);

    const httpResponse = await chai
      .request(app)
      .post(MOTORCYCLES)
      .send({
        model: 'Honda Cb 600f Hornet',
        year: 2005,
        color: 'Yellow',
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      });

    expect(httpResponse.status).to.equal(201);
    expect(httpResponse.body).to.be.deep.equal(motorcycleDomain);
  });

  it('Verifica a resposta ao listar motos', async function () {
    sinon.stub(Model, 'find').resolves(motorcyclesOutput);

    const httpResponse = await chai
      .request(app)
      .get(MOTORCYCLES)
      .send();

    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.be.deep.equal(motorcycleDomainList);
  });

  it('Verifica a resposta ao listar uma moto pelo id', async function () {
    sinon.stub(Model, 'findOne').resolves(motorcycleOutput);

    const httpResponse = await chai
      .request(app)
      .get(`${MOTORCYCLES}/${ID}`)
      .send();

    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.be.deep.equal(motorcycleDomain);
  });

  it('Verifica a resposta quando não encontrado uma moto', async function () {
    sinon.stub(Model, 'findOne').resolves();

    const httpResponse = await chai
      .request(app)
      .get(`${MOTORCYCLES}/${ID}`)
      .send();
    
    expect(httpResponse.status).to.equal(404);
    expect(httpResponse.body).to.be.deep.equal({ message: RESULT_ERROR });
  });

  it('Verifica a resposta ao atualizar uma moto', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleOutputUpdated);

    const httpResponse = await chai
      .request(app)
      .put(`${MOTORCYCLES}/${ID}`)
      .send(motorcycleInputUpdate);

    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.be.deep.equal(motorcycleDomainUpdated);
  });

  it('Verifica a resposta ao atualizar uma moto com um ID invalido', async function () {
    const httpResponse = await chai
      .request(app)
      .put(`${MOTORCYCLES}/${1}`)
      .send(motorcycleInputUpdate);
    
    expect(httpResponse.status).to.equal(422);
    expect(httpResponse.body).to.be.deep.equal({ message: 'Invalid mongo id' });
  });

  it('Verifica a resposta ao excluir um carro', async function () {
    sinon.stub(Model, 'findByIdAndDelete').resolves(motorcycleOutput);

    const httpResponse = await chai
      .request(app)
      .delete(`${MOTORCYCLES}/${ID}`)
      .send();

    expect(httpResponse.status).to.equal(204);
    expect(httpResponse.body).to.be.deep.equal({});
  });

  it('Verifica a resposta ao excluir uma moto não existente', async function () {
    sinon.stub(Model, 'findByIdAndDelete').resolves();

    const httpResponse = await chai
      .request(app)
      .delete(`${MOTORCYCLES}/${ID}`)
      .send();

    expect(httpResponse.status).to.equal(404);
    expect(httpResponse.body).to.be.deep.equal({ message: RESULT_ERROR });
  });

  afterEach(function () {
    sinon.restore();
  });
});