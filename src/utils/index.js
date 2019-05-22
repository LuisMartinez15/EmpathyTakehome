export default (name, separator) => {
  // eslint-disable-next-line
  const paramName = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp(`[\\${separator}&]${paramName}=([^&#]*)`);
  const results = regex.exec(separator === '#' ? window.location.hash : window.location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
