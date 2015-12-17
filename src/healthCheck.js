import Repository from './repository';
import HealthCheckMessageFormat from 'health-check-message-format';

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

          const configuration = {
            fnIsHealthGood: status => {
              return (status.error === null);
            },
            fnName: status => {
              return `${status.configuration.host}:
              ${status.configuration.port}`;
            },
            fnErrorMessage: status => {
              return status.error.message;
            }
          };

          resolve(HealthCheckMessageFormat.do(statuses,configuration));
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

HealthCheck.do([
    {
      host: '127.0.0.1',
      port: 6379
    },
    {
      host: 'wrong host',
      port: 6379
    }])
  .then(function(result){
    console.log(result);
  })
  .catch(function(error){
    console.log(error);
  });
