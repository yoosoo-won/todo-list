'use strict';
/**
 * @auther Yoosoo Won <shelling104@gmail.com>
 * @param global
 * @constructor
 * @description
 * View
 */

(function(global) {
  function View(options) {
    this.init(options);
  }
  View.prototype.init = function(options) {
    this.initAttr(options);
    this.initEl();
    options.init.apply(this, arguments);
    this.initTemplate();
    this.registerHandlers();
  };
  View.prototype.initAttr = function(options) {
    for (var key in options) {
      this[key] = options.hasOwnProperty(key) && options[key];
    }
  };
  View.prototype.initEl = function() {
    if (this.tagName) {
      this.el = document.createElement(this.tagName);
      this.el.className = this.className;
    } else {
      this.el = this.getSelectorElement(this.el);
    }
  };
  View.prototype.initTemplate = function() {
    if (typeof this.template === 'function' && this.model) {
      this.html(this.template(this.model.toJSON()));
    }
  };
  View.prototype.registerHandlers = function() {
    var handlers = this.handlers || [];
    var len = handlers.length;
    var selector;
    var event;
    var fn;

    for (var i = 0; i < len; i++) {
      selector = this.getSelectorElement(this.el, handlers[i][0]);
      event = handlers[i][1];
      fn = handlers[i][2];

      if (selector.length > 0 && event && this[fn]) {
        this.bindEvents(selector, event, this[fn].bind(this));
      }
    }
  };
  View.prototype.unregisterHandlers = function() {
    var handlers = this.handlers || [];
    var len = handlers.length;
    var selector;
    var event;
    var fn;

    for (var i = 0; i < len; i++) {
      selector = this.getSelectorElement(this.el, handlers[i][0]);
      event = handlers[i][1];
      fn = handlers[i][2];

      if (selector.length > 0 && event && this[fn]) {
        this.unbindEvents(selector, event, this[fn].bind(this));
      }
    }
  };
  View.prototype.bindEvents = function(selector, event, fn) {
    var len = selector.length;

    this.unbindEvents(selector, event, fn);

    if (len) {
      for (var i = 0; i < len; i++) {
        selector[i].addEventListener(event, fn);
      }
    } else {
      selector.addEventListener(event, fn);
    }
  };
  View.prototype.unbindEvents = function(selector, event, fn) {
    var len = selector.length;

    if (len) {
      for (var i = 0; i < len; i++) {
        selector[i].removeEventListener(event, fn);
      }
    } else {
      selector.removeEventListener(event, fn);
    }
  };
  View.prototype.getSelectorElement = function(selector, targetSelector) {
    if (typeof this.el === 'string') {
      if (selector.indexOf('#') === 0) {
        //li -> getElementsByTagName
        return document.getElementById(selector.split('#')[1]);
      } else if (selector.indexOf('.') === 0) {
        //. -> getElementsByClassName
        return document.getElementsByClassName(selector.split('.')[1]);
      }
    }
    if (typeof selector === "string") {
      if (selector.indexOf('#') === 0) {
        //li -> getElementsByTagName
        return this.el.getElementById && this.el.getElementById(selector.split('#')[1])
          || document.getElementById && document.getElementById(selector.split('#')[1]);
      } else if (selector.indexOf('.') === 0) {
        //. -> getElementsByClassName
        return this.el.getElementsByClassName(selector.split('.')[1]);
      }
    } else {
      if (targetSelector.indexOf('#') === 0) {
        //li -> getElementsByTagName
        return selector.getElementById(targetSelector.split('#')[1]);
      } else if (targetSelector.indexOf('.') === 0) {
        //. -> getElementsByClassName
        return selector.getElementsByClassName(targetSelector.split('.')[1]);
      }
    }
    return this.el;
  };

  View.prototype.append = function(targetSelector, selector) {
    if (typeof selector === "string") {
      this.each(this.getSelectorElement(selector), function(element) {
        element.appendChild(targetSelector);
      });
    } else if (selector === undefined) {
      if (typeof targetSelector === 'string') {
        this.el.innerHTML = targetSelector;
      } else {
        this.el.appendChild(targetSelector);
      }

    }
  };
  View.prototype.prepend = function(targetSelector, selector) {
    if (typeof selector === "string") {
      this.each(this.getSelectorElement(selector), function(element) {
        element.insertBefore(targetSelector, this.el.firstChild);
      });
    } else if (selector === undefined) {
      if (typeof targetSelector === 'string') {
        this.el.innerHTML = targetSelector;
      } else {
        this.el.insertBefore(targetSelector, this.el.firstChild);
      }
    }
  };
  View.prototype.html = function(targetSelector, selector) {
    if (typeof selector === "string") {
      this.each(this.getSelectorElement(selector), function(element) {
        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }
        if (typeof targetSelector === "object") {
          element.appendChild(targetSelector);
        } else {
          element.innerHTML = targetSelector;
        }
      });
    } else if (selector === undefined) {
      if (typeof targetSelector === 'string') {
        this.el.innerHTML = targetSelector;
      } else {
        while (this.el.firstChild) {
          this.el.removeChild(this.el.firstChild);
        }
        this.el.appendChild(targetSelector);
      }

    }
  };
  View.prototype.remove = function() {
    this.unregisterHandlers();

    while (this.el.firstChild) {
      this.el.removeChild(this.el.firstChild);
    }
  };
  View.prototype.each = function(selectors, callback) {
    var i = 0;
    var len = selectors.length;

    for (; i < len; i++) {
      callback && callback(selectors[i]);
    }
  };

  global.View = View;
})(window || {});
