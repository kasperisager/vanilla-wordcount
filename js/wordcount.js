;(function ($, window, document, undefined) {
  'use strict';

  window.WordCount = window.WordCount || function (options) {
    this.options = {
      textarea : '.js-text-box'
    , wrapper  : '.js-text-box-wrapper'
    , classes  : {
        wrap  : 'badge-wrap'
      , badge : 'badge'
      , label : 'badge-label'
      }
    };

    if (options) {
      options.counters = options.counters || [];

      $.extend(true, this.options, options);
    }
  };

  WordCount.prototype.buildCounter = function ($textarea, options) {
    var classes  = this.options.classes
      , labels   = options.labels
        // Build the counter element
      , $counter = $('<p>').addClass(classes.wrap);

    // Construct the counter badge and label
    $counter.$badge = $('<span>').addClass(classes.badge);
    $counter.$label = $('<span>').addClass(classes.label);

    // Add the badge and label to the counter
    $counter.html($counter.$badge.add($counter.$label));

    $textarea.on('input', function () {
      // Calculate the count from the passed function
      var count = options.counter($textarea.val());

      // Update the counter badge
      $counter.$badge.text(count);

      // Update the counter label. If the count equals 1, use the singular
      // labels. Otherwise, use the plural label
      $counter.$label.text(labels[(count === 1) ? 'singular' : 'plural' ]);
    }).trigger('input');

    return $counter;
  };

  WordCount.prototype.attachCounters = function ($textarea, $wrapper) {
    // Bail out if counters are already attached
    if ($textarea.data('counters')) return;

    var currentVal = $textarea.val();

    // In addition to updating the word and character counts on input, we also
    // poll the textarea for changes every 100ms to account for programmatic
    // changes
    setInterval(function () {
      // Bail out if nothing has changed
      if ($textarea.val() === currentVal) {
        return;
      }

      // Simulate onInput
      $textarea.trigger('input');

      // Set a new value to test against 100ms from now
      currentVal = $textarea.val();
    }, 100);

    // Add the word and characters count after the textarea wrapper
    for (var i = this.options.counters.length - 1; i >= 0; i--) {
      $wrapper.after(this.buildCounter($textarea, this.options.counters[i]));
    }

    // Remember that we've attached counters to this textarea
    $textarea.data('counters', true);
  };

  WordCount.prototype.attachCountersHandler = function (e) {
    var self      = this
      , $wrappers = $(this.options.wrapper);

    $wrappers.each(function () {
      var $wrapper  = $(this)
        , $textarea = $(self.options.textarea, $wrapper);

      self.attachCounters($textarea, $wrapper);
    });
  };

})(jQuery, window, document);
