export default class Format {

  static do(statuses) {
    let data = {
      health: true,
      success: 0,
      error: 0,
      details: []
    };
    statuses.forEach(status => {
      const isHealthGood = (status.error === null);

      data.details.push({
        name: `${status.configuration.host}:${status.configuration.port}`,
        health: isHealthGood,
        message: isHealthGood ? '' : status.error.message
      });

      data.health &= isHealthGood;
      if (isHealthGood) {
        data.success++;
      } else {
        data.error++;
      }
    });

    data.health = Boolean(data.health);

    return data;
  }
}
