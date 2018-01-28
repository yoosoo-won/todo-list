'use strict';
/**
 * @auther Yoosoo Won <shelling104@gmail.com>
 * @param global
 * @constructor
 * @description
 * todo 뷰를 생성을 담당
 */
(function(global) {
  var TodoItem = function(options) {
    return new View({
      tagName: 'li',
      className: 'todo-item-container',
      template: function(model) {
        return [
          '<div class="item">',
            '<img src="http://placehold.it/100?text=' + model.day + '">',
            '<div class="info">',
              '<span class="regi-date">',
                model.date,
              '</span>',
              '<span class="do-txt">',
                model.todo,
              '</span>',
              '<div class="btn-group">',
                model.isSolved === false ? '<button class="done-btn">확인</button>' : '',
                '<button class="delete-btn">삭제</button>',
              '</div>',
            '</div>',
          '</div>'
        ].join('');
      },
      handlers: [
        ['.delete-btn', 'click', 'delete'],
        ['.done-btn', 'click', 'done']
      ],
      init: function() {
        this.model = options.model;
        this.parentView = options.parent;
      },
      setListingCallback: function(callback) {
        this.listingCallback = callback;
      },
      done: function() {
        this.model.set('isSolved', true);
        this.listingCallback && this.listingCallback();
      },
      delete: function() {
        this.parentView.collection.delete(this.model);
        this.parentView.setFilter(this.parentView.type);
        this.parentView.callback && this.parentView.callback();
      },
      render: function() {
        return this;
      }
    });
  };
  global.TodoItem = TodoItem;
})(window || {});
