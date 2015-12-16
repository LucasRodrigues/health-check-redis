export default class Format {

  static do(statuses) {
    let formatted = [];

    statuses.forEach(status => {
      formatted.push({
        name: `${status.configuration.host}:${status.configuration.port}`,
        status: status.error === null,
        message: status.error === null ? '' : status.error.message
      });
    });

    return formatted;
  }
}
