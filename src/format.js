export default class Format {

  static do(statuses) {
    let formatted = [];

    statuses.forEach(status => {
      formatted.push({
        name: `{$status.configuration.host}:{$status.configuration.post}`,
        status: status.err === null,
        message: status.err === null ? '' : status.err
      });
    });

    return formatted;
  }
}
