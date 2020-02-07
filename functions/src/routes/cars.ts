import CarInteractorFireStoreImpl from '../usecase/interactors/CarInteractorFireStoreImpl';
import CarRepositoryFireStoreImpl from '../interface/repositories/CarRepositoryFireStoreImpl';
import CarController from '../interface/controllers/CarController';

export default (server: any, admin: Object, db: any) => {

  const carRepository = new CarRepositoryFireStoreImpl(db);
  const carInteractor = new CarInteractorFireStoreImpl(carRepository);
  const carController = new CarController(carInteractor);

  server.get('/cars', carController.getCars);
};
