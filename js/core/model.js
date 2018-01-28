'use strict';
/**
 * @auther Yoosoo Won <shelling104@gmail.com>
 * @param global
 * @constructor
 * @description
 * Model
 */

(function(global) {
  function Model(attributes, options) {
    this.attributes = attributes || {};
    this.init(options);
  }
  Model.prototype.init = function(options) {
    this.initAttr(options);
  };
  Model.prototype.initAttr = function(options) {
    for(var key in options) {
      this[key] = options.hasOwnProperty(key) && options[key];
    }
  };
  Model.prototype.get = function(attr) {
    if (this.attributes[attr] === undefined) {
      this.attributes[attr] = null;
    }
    return this.attributes[attr];
  };
  Model.prototype.has = function(attr, value) {
    return this.attributes[attr] === value;
  };
  Model.prototype.set = function(attr, value) {
    this.attributes[attr] = value;
  };
  Model.prototype.toJSON = function() {
    return this.attributes;
  };

  global.Model = Model;
})(window || {});
