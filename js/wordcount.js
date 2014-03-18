;(function ($, window, document, undefined) {
  'use strict';

  window.WordCount = window.WordCount || function (options) {
    this.options = {
      textarea : '.js-text-box'
    , wrapper  : '.js-text-box-wrapper'
    , max      : 8000
    , labels   : {
        character  : 'character left'
      , characters : 'characters left'
      , word       : 'word'
      , words      : 'words'
      }
    , classes  : {
        wrap  : 'badge-wrap'
      , badge : 'badge'
      , label : 'badge-label'
      }
    };

    if (options) {
      $.extend(true, this.options, options);
    }
  };

  WordCount.prototype.countCharacters = function (string) {
    return (string || '').length;
  };

  WordCount.prototype.countWords = function (string) {
    return (string !== '') ? (string || '').trim().split(' ').length : 0;
  };

  WordCount.prototype.pluralLabel = function (number, singular) {
    return (this.options.labels[singular + ((parseInt(number) === 1) ? '' : 's')]);
  };

  WordCount.prototype.attachCounters = function ($textarea, $wrapper) {
    // Bail out if counters are already attached
    if ($textarea.data('counters')) return;

    var self       = this
      , options    = self.options
      , $wrap      = $('<p>').addClass(options.classes.wrap)
      , $badge     = $('<span>').addClass(options.classes.badge)
      , $label     = $('<span>').addClass(options.classes.label)
        // Character counter
      , $charBadge = $badge.clone()
      , $charLabel = $label.clone()
      , $charCount = $wrap.clone().html($charBadge.add($charLabel))
        // Word counter
      , $wordBadge = $badge.clone()
      , $wordLabel = $label.clone()
      , $wordCount = $wrap.clone().html($wordBadge.add($wordLabel));

    var updateHandler = function () {
      var string    = $textarea.val()
          // Count number of characters, incl. eventual HTML, Markdown, etc.
        , charsLeft = (options.max - self.countCharacters(string))
          // When counting words, we're only interested in the actual text
        , words     = self.countWords($(string).text());

      // Update word and character counts
      $charBadge.text(charsLeft);
      $charLabel.text(self.pluralLabel(charsLeft, 'character'));
      $wordBadge.text(words);
      $wordLabel.text(self.pluralLabel(words, 'word'));
    };

    // Calculate word and character count when stuff is typed into the
    // textarea
    $textarea.on('input', updateHandler).trigger('input');

    var currentVal = $textarea.val();

    // In addition to updating the word and character counts on input, we also
    // poll the textarea for changes every 100ms to account for programmatic
    // changes
    setInterval(function () {
      // Bail out if nothing has changed
      if ($textarea.val() === currentVal) {
        return;
      }

      $textarea.trigger('input');

      // Set a new value to test against 100ms from now
      currentVal = $textarea.val();
    }, 100);

    // Add the word and characters count after the textarea wrapper
    $wrapper.after($wordCount).after($charCount);

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
