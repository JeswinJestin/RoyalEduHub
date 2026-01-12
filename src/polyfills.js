// Polyfill for Array.prototype.at (needed for older browsers and react-snap Puppeteer)
if (!Array.prototype.at) {
  // eslint-disable-next-line no-extend-native
  Array.prototype.at = function(n) {
    n = Math.trunc(n) || 0;
    if (n < 0) n += this.length;
    if (n < 0 || n >= this.length) return undefined;
    return this[n];
  };
}

// Polyfill for String.prototype.at
if (!String.prototype.at) {
  // eslint-disable-next-line no-extend-native
  String.prototype.at = function(n) {
    n = Math.trunc(n) || 0;
    if (n < 0) n += this.length;
    if (n < 0 || n >= this.length) return undefined;
    return String(this).charAt(n);
  };
}
