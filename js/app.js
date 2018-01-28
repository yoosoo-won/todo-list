'use strict';
/**
 * @auther Yoosoo Won <shelling104@gmail.com>
 * @param global
 * @constructor
 * @description
 * todoList todo-list 전체 뷰 생성
 */
(function(global) {
  var App = function() {
    return new View({
      el: '#app',
      handlers: [
        ['.add-todo-btn', 'click', 'addTodo'],
        ['.filter-todo-btn', 'click', 'filterTodo'],
        ['.filter-done-btn', 'click', 'filterDone']
      ],
      init: function() {
        var self = this;
        this.count = {
          todo: 0,
          done: 0
        };
        this.todoListView = new TodoList();
        this.todoListView.setListingCallback(function() {
          self.render();
        });
      },
      getRegisterDate: function() {
        var d = new Date();
        return d.getFullYear() + '-' + d.getMonth() + 1 + '-' + d.getDate();
      },
      addTodo: function() {
        var todo = this.getSelectorElement('#input-todo').value;

        if (todo) {
          var d = new Date();
          var registerDate = this.getRegisterDate()
          var model = new Model({
            date: registerDate,
            todo: todo,
            day: d.getDate(),
            isSolved: false
          });

          this.todoListView.addTodo(model);
          this.getSelectorElement('#input-todo').value = '';
        }
      },
      filterTodo: function() {
        this.todoListView.setFilter('todo');
        this.renderFilter();
      },
      filterDone: function() {
        this.todoListView.setFilter('done');
        this.renderFilter();
      },
      renderFilter: function() {
        this.todoListView.render();
      },
      render: function() {
        var view = this.todoListView;
        var todoCount = view.collection.getCount('isSolved', false);
        var doneCount = view.collection.getCount('isSolved', true);
        var percent = doneCount / (todoCount+doneCount) * 100;

        this.html(view.render().el, '.todo-list-section');
        this.getSelectorElement('#process').style.width = percent + '%';
        this.html(todoCount, '.todo-count');
        this.html(doneCount, '.done-count');
      }
    });
  };
  global.App = App;
})(window || {});
