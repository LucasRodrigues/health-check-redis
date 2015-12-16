import Repository from './repository';
import Format from './format';

export default class HealthCheck {

  static do(configurations) {
    return new Promise((resolve, reject) => {
      let promises = [];

      configurations.forEach(configuration => {
        promises.push(Repository.test(configuration));
      });

      Promise.all(promises)
        .then(statuses => {
          resolve(Format.do(statuses));
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}