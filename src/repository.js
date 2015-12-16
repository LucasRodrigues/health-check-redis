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
        resolve();
      }).on('error', error => {
        resolve(error);
      });
    });
  }
}
