import cars from './cars';

export default (server: Function, admin: Object, firestore: any) => {
  cars(server, admin, firestore);
};
