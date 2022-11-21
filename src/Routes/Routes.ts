import { Router } from 'express';
import CarController from '../Controllers/CarController';
import MotorcycleController from '../Controllers/MotorcycleController';

const routes = Router();

const CAR_ROUTE_ID = '/cars/:id';
const MOTO_ROUTE_ID = '/motorcycles/:id';

routes.post(
  '/cars',
  (req, res, next) => new CarController(req, res, next).create(),
);

routes.get(
  '/cars',
  (req, res, next) => new CarController(req, res, next).readAll(),
);

routes.get(
  CAR_ROUTE_ID,
  (req, res, next) => new CarController(req, res, next).readOne(),
);

routes.put(
  CAR_ROUTE_ID,
  (req, res, next) => new CarController(req, res, next).update(),
);

routes.delete(
  CAR_ROUTE_ID,
  (req, res, next) => new CarController(req, res, next).delete(),
);

routes.post(
  '/motorcycles',
  (req, res, next) => new MotorcycleController(req, res, next).create(),
);

routes.get(
  '/motorcycles',
  (req, res, next) => new MotorcycleController(req, res, next).readAll(),
);

routes.get(
  MOTO_ROUTE_ID,
  (req, res, next) => new MotorcycleController(req, res, next).readOne(),
);

routes.put(
  MOTO_ROUTE_ID,
  (req, res, next) => new MotorcycleController(req, res, next).update(),
);

routes.delete(
  MOTO_ROUTE_ID,
  (req, res, next) => new MotorcycleController(req, res, next).delete(),
);

export default routes;