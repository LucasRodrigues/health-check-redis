import redis from 'redis';

export default class Repository {

  static test(configuration) {
    return new Promise(resolve => {
      const client = redis.createClient(
        configuration.port,
        configuration.host,
        configuration.options
      );

      client.on('ready', () => {
        resolve({
          configuration: configuration,
          error: null
        });
      }).on('error', error => {
        resolve({
          configuration: configuration,
          error: error
        });
      });
    });
  }
}
