import Repository from './repository';
import Format from './format';

export default class HealthCheck {

  static _resolveParameter (configurations){
    if(!Array.isArray(configurations)){
      configurations = [configurations];
    }

    return configurations
  }

  static do(configurations) {
    configurations = this._resolveParameter(configurations);
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
