'use strict';
/**
 * @auther Yoosoo Won <shelling104@gmail.com>
 * @param global
 * @constructor
 * @description
 * todoList 뷰를 생성
 */
(function(global) {
  var TodoList = function() {
    return new View({
      tagName: 'ul',
      className: 'todo-list',
      init: function() {
        var self = this;
        this.itemView = [];
        this.type = 'all';
        //더미데이터 설정
        this.collection = new Collection([
          {
            date: '2018-01-02',
            todo: '장보기',
            day: 31,
            isSolved: false
          }, {
            date: '2018-01-02',
            todo: '쇼핑하기',
            day: 31,
            isSolved: false
          }, {
            date: '2018-01-02',
            todo: '공부하기',
            day: 31,
            isSolved: true
          }, {
            date: '2018-01-02',
            todo: '바이올린연습하기',
            day: 31,
            isSolved: true
          }, {
            date: '2018-01-02',
            todo: '친구랑 저녁먹기',
            day: 31,
            isSolved: true
          }, {
            date: '2018-01-02',
            todo: '서점가기',
            day: 31,
            isSolved: true
          }, {
            date: '2018-01-02',
            todo: '청소하기',
            day: 2,
            isSolved: false
          }, {
            date: '2018-01-03',
            todo: '장보기',
            day: 3,
            isSolved: false
          }, {
            date: '2018-01-04',
            todo: '커피사가기',
            day: 4,
            isSolved: false
          }, {
            date: '2018-01-05',
            todo: '클래식 음악 들으며 쉬기',
            day: 5,
            isSolved: false
          }, {
            date: '2018-01-06',
            todo: '바이올린 연습하기',
            day:6,
            isSolved: false
          }
        ]);

        this.collection.each(function(model) {
          var view = new TodoItem({
            model: model,
            parent: self
          });
          view.setListingCallback(function() {
            self.todoItemCallback();
          });
          self.itemView.push(view);

        });
      },
      addTodo: function(model) {
        var self = this;
        this.collection.add(model);
        var view = new TodoItem({
          model: this.collection.at(0),
          parent: self
        });

        view.setListingCallback(function() {
          self.todoItemCallback();
        });
        this.itemView.unshift(view);
        this.prepend(this.itemView[0].render().el);
        this.callback && this.callback();
      },
      setFilter: function(type) {
        var self = this;
        var collection;
        this.itemView = [];
        this.type = type;

        if (type !== 'all') {
          collection = this.collection.filter(function (model) {
            return model.get('isSolved') === (self.type === 'done');
          });
        } else {
          collection = this.collection;
        }

        this.renderFilter();
        collection.each(function (model) {
          var view = new TodoItem({
            model: model,
            parent: self
          });
          view.setListingCallback(function () {
            self.todoItemCallback();
          });
          self.itemView.push(view);
        });

      },
      todoItemCallback: function() {
        this.setFilter(this.type);
        this.callback && this.callback();
      },
      setListingCallback: function(callback) {
        this.callback = callback;
      },
      renderFilter: function() {
        this.remove();
      },
      render: function() {
        var i = 0;
        var len = this.itemView.length;

        for (; i < len; i++) {
          this.append(this.itemView[i].render().el);
        }
        return this;
      }
    });
  };
  global.TodoList = TodoList;
})(window || {});
