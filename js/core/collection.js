'use strict';
/**
 * @auther Yoosoo Won <shelling104@gmail.com>
 * @param global
 * @constructor
 * @description
 * Collection
 */

(function(global) {
  function Collection(models, options) {
    this.init(models, options);
  }
  Collection.prototype.init = function(models, options) {
    var i = 0;
    var len = models.length;
    this.models = [];

    for (; i < len; i++) {
      if (!models[i].attributes) {
        this.models.push(new Model(models[i]));
      } else {
        this.models.push(models[i]);
      }
    }
    this.initAttr();
    options && options.init && options.init.apply(this, arguments);
  };
  Collection.prototype.initAttr = function(options) {
    for(var key in options) {
      this[key] = options.hasOwnProperty(key) && options[key];
    }
  };
  Collection.prototype.add = function(model) {
    this.models.unshift(model);
  };
  Collection.prototype.at = function(index) {
    return this.models[index];
  };
  Collection.prototype.each = function(callback) {
    var i = 0;
    var len = this.models.length;

    for (; i < len; i++) {
      callback && callback(this.models[i], i);
    }
  };
  Collection.prototype.filter = function(callback) {
    return new Collection(this.models.filter(callback));
  };
  Collection.prototype.getCount = function(prop, value) {
    var count = 0;

    this.each(function(model) {
      if (model.has(prop, value)) {
        count++;
      }
    });

    return count;
  };
  Collection.prototype.delete = function(targetModel) {
    var self = this;

    this.each(function(model, index) {
      if (targetModel === model) {
        self.models.splice(index, 1);
      }
    });
  };

  global.Collection = Collection;
})(window || {});
