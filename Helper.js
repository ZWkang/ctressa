var util = require('util');

var Helper = {
    isArray: function (arr){
        return Array.isArray(arr)
    },
    isBoolean: function (arg) {
        return typeof arg === 'boolean'
    },
    isNull: function (arg) {
        return arg === null
    },
    isNullOrUndefined: function (arg) {
        return arg == null
    },
    isNumber: function (arg) {
        return typeof arg === 'number'
    },
    isString: function (arg) {
        return typeof arg === 'string'
    },
    isSymbol: function (arg) {
        return typeof arg === 'symbol'
    },
    isUndefined: function (arg){
        return arg === void 'zwkang'
    },
    isFunction: function (arg) {
        return typeof arg === 'function'
    },
    isPrimitive: function(arg) {
        return arg === null ||
          typeof arg === 'boolean' ||
          typeof arg === 'number' ||
          typeof arg === 'string' ||
          typeof arg === 'symbol' ||  // ES6 symbol
          typeof arg === 'undefined';
    },
    objectToString: function(obj) {
        return Object.prototype.toString.call(obj)
    },
    isError: function (e) {
        return Helper.isObject(e) && (Helper.objectToString(e) === '[object Error]' || e instanceof Error);
    },
    isDate: function (date){
        return util.types.isDate(date)
    },
    isPromise: function (promise) {
        return util.types.isPromise(promise)
    },
    isRegExp: function (regexp) {
        return util.types.isRegExp(regexp)
    },
    isObject: function(arg) {
        return typeof arg === 'object' && arg !== null;
    },
}

module.exports = Helper