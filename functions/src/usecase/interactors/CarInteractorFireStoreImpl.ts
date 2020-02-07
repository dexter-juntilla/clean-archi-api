import CarInteractor from './CarInteractor';
import CarRepository from '../../usecase/ports/CarRepository';

export default class CarInteractorFireStoreImpl implements CarInteractor {
  carRepo: CarRepository;

  constructor(carRepo: CarRepository) {
    this.carRepo = carRepo;
  }

  getCars = async () => {
    return new Promise(async (resolve, reject) => {
      const cars = await this.carRepo.getCars();
      const keys: string[] = Object.keys(cars);
      const array: object[] = keys.reduce((acc: object[], nextId: string) => {
        return [...acc, { ...cars[nextId], id: nextId }]
      }, []);

      resolve(array);
    });
  };
}
