import CarRepository from '../../usecase/ports/CarRepository';

export default class CarRepositoryFireStoreImpl implements CarRepository {
  firestore: any;

  constructor(firestore: any) {
    this.firestore = firestore;
  }

  getCars = async () => {
    const carsQuery = this.firestore.collection("cars");

    const carsResult = await carsQuery.get();

    const cars: {
      [key: string]: object;
    } = {};

    carsResult.forEach((doc: { id: string, data: () => object }) => {
      cars[doc.id] = doc.data();
    });

    return new Promise((resolve) => {
      resolve(cars)
    })
  };
}
