import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { Model } from 'mongoose';

import app from '../../../src/app';
import { 
  carDomain,
  carDomainList,
  carDomainUpdated,
  carInput,
  carInputUpdate,
  carOutput,
  carOutputUpdated,
  carsOutput,
} from '../../utils/CarMocks';

chai.use(chaiHttp);

const { expect } = chai;

const RESULT_ERROR = 'Car not found';
const ID = '634852326b35b59438fbea2f';

describe('Verifica o "Controller" de "Car"', function () {
  it('Verifica a resposta ao cadastrar um novo carro', async function () {
    sinon.stub(Model, 'create').resolves(carOutput);

    const httpResponse = await chai
      .request(app)
      .post('/cars')
      .send(carInput);

    expect(httpResponse.status).to.equal(201);
    expect(httpResponse.body).to.be.deep.equal(carDomain);
  });

  it('Verifica a resposta ao cadastrar um novo carro sem um "Status"', async function () {
    sinon.stub(Model, 'create').resolves(carOutput);

    const httpResponse = await chai
      .request(app)
      .post('/cars')
      .send({
        model: 'Marea',
        year: 2002,
        color: 'Black',
        buyValue: 15.990,
        doorsQty: 4,
        seatsQty: 5,
      });

    expect(httpResponse.status).to.equal(201);
    expect(httpResponse.body).to.be.deep.equal(carDomain);
  });

  it('Verifica a resposta ao listar carros', async function () {
    sinon.stub(Model, 'find').resolves(carsOutput);

    const httpResponse = await chai
      .request(app)
      .get('/cars')
      .send();

    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.be.deep.equal(carDomainList);
  });

  it('Verifica a resposta ao listar um carro pelo id', async function () {
    sinon.stub(Model, 'findOne').resolves(carOutput);

    const httpResponse = await chai
      .request(app)
      .get(`/cars/${ID}`)
      .send();

    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.be.deep.equal(carDomain);
  });

  it('Verifica a resposta quando não encontrado um carro', async function () {
    sinon.stub(Model, 'findOne').resolves();

    const httpResponse = await chai
      .request(app)
      .get(`/cars/${ID}`)
      .send();
    
    expect(httpResponse.status).to.equal(404);
    expect(httpResponse.body).to.be.deep.equal({ message: RESULT_ERROR });
  });

  it('Verifica a resposta ao atualizar um carro', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carOutputUpdated);

    const httpResponse = await chai
      .request(app)
      .put(`/cars/${ID}`)
      .send(carInputUpdate);

    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.be.deep.equal(carDomainUpdated);
  });

  it('Verifica a resposta ao atualizar um carro com um ID invalido', async function () {
    const httpResponse = await chai
      .request(app)
      .put('/cars/1')
      .send(carInputUpdate);
    
    expect(httpResponse.status).to.equal(422);
    expect(httpResponse.body).to.be.deep.equal({ message: 'Invalid mongo id' });
  });

  it('Verifica a resposta ao excluir um carro', async function () {
    sinon.stub(Model, 'findByIdAndDelete').resolves(carOutput);

    const httpResponse = await chai
      .request(app)
      .delete(`/cars/${ID}`)
      .send();

    expect(httpResponse.status).to.equal(204);
    expect(httpResponse.body).to.be.deep.equal({});
  });

  it('Verifica a resposta ao excluir um carro não existente', async function () {
    sinon.stub(Model, 'findByIdAndDelete').resolves();

    const httpResponse = await chai
      .request(app)
      .delete(`/cars/${ID}`)
      .send();

    expect(httpResponse.status).to.equal(404);
    expect(httpResponse.body).to.be.deep.equal({ message: RESULT_ERROR });
  });

  afterEach(function () {
    sinon.restore();
  });
});