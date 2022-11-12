import log from 'loglevel';

log.setLevel(process.env.LOG_LEVEL || 'debug');

export default ({ app }, inject) => {
  inject('log', log);
  log.debug('logger set up')
}
