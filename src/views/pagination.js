define(['backbone', 'views/header', 'views/row'], function(Backbone, Header, Row) {

  var Paginator = Backbone.View.extend({
    className: 'pagination pagination-centered',

    events: {
      'click a': 'page'
    },

    initialize: function() {
      this.pager = this.options.pager;
    },

    render: function() {
      var $ul = $('<ul></ul>'), $li;

      $li = $('<li class="prev"><a href="#">«</a></li>');
      if (this.pager.get('currentPage') === 1) {
        $li.addClass('disabled');
      }
      $ul.append($li);

      for (var i = 1; i <= this.pager.get('totalPages'); i++) {
        $li = $('<li></li>');
        if (i === this.pager.get('currentPage')) {
          $li.addClass('active');
        }
        $li.append('<a href="#">' + i + '</a>');
        $ul.append($li);
      }

      $li = $('<li class="next"><a href="#">»</a></li>');
      if (this.pager.get('currentPage') === this.pager.get('totalPages')) {
        $li.addClass('disabled');
      }
      $ul.append($li);

      this.$el.append($ul);
      return this;
    },

    page: function(event) {
      var $target = $(event.target), page;
      if ($target.parent().hasClass('prev')) {
        this.pager.prev();
      } else if ($target.parent().hasClass('next')) {
        this.pager.next();
      }
      else {
        this.pager.page(parseInt($(event.target).html(), 10));
      }
    }
  });

  return Paginator;

});