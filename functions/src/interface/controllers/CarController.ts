import CarInteractor from '../../usecase/interactors/CarInteractor'

export default class CarController {
  carInteractor: CarInteractor;

  constructor(carInteractor: CarInteractor) {
    this.carInteractor = carInteractor;
  }

  getCars = async (req: any, res: any) => {
    try {
      // const { query } = req;
      const cars = await this.carInteractor.getCars()

      res.json(cars);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}
