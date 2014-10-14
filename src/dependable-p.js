Promise = require("promise");
module.exports = function(container) {

  /*taken from dependable.js */
  var argList = function(func) {
    var notEmpty = function(a) {
      return a;
    };
    var match, required;
    match = func.toString().match(/function.*?\(([\s\S]*?)\)/);
    if (!(match != null)) {
      throw new Error("could not parse function arguments: " + (func != null ? func.toString() : void 0));
    }
    required = match[1].split(",").filter(notEmpty).map(function(str) {
      return str.trim();
    });
    return required;
  };

  /* FIXME: this tries to work around a limitation(?) of dependable.js,
   * refer to: https://github.com/idottv/dependable/issues/27
   */
  var forgeArgList = function(func, argList) {
    var orig = func.toString();
    var forged = orig.replace(/(function.*?\()([\s\S]*?)(\).*)/, "$1" + argList.join(", ") + "$3");
    func.toString = function() {
      return forged;
    };
  };

  /* Used to demux result of Promise.all() */
  var demux = function(func) {
    return function(args) {
      return func.apply(this, args);
    }
  };

  /* create a wrapper that transparently deals with promises */
  var wrap = function(body) {
    var wrapper = function() {
      var args = Array.prototype.slice.call(arguments);
      return Promise.all(args).then(demux(body), function(err) {
        console.error("error during dependency resolution", err.stack || err);
        throw err;
      });
    };
    forgeArgList(wrapper, argList(body));
    return wrapper;
  };

  /* build our own container using the given container as prototype */
  var newContainer = Object.create(container);

  newContainer.registerP = function(name, body) {
    return container.register(name, wrap(body));
  };

  newContainer.resolveP = function(body) {
    return container.resolve(wrap(body));
  };

  return newContainer;


};
