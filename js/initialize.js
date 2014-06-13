;(function ($, window, document, undefined) {
  'use strict';

  $(function () {
    var definitions = $.parseJSON(gdn.definition('WordCount'));

    var options = {
      textarea : '.TextBox'
    , wrapper  : '.TextBoxWrapper'
    , classes  : {
        wrap  : 'Count-Wrap'
      , badge : 'Count'
      , label : 'Count-Label'
      }
    , counters : [{
        labels  : {
          singular : definitions.labels.character
        , plural   : definitions.labels.characters
        }
      , counter : function (counter) {
          return (definitions.max - counter.characters);
        }
      }, {
        labels  : {
          singular : definitions.labels.word
        , plural   : definitions.labels.words
        }
      , counter : function (counter) {
          return counter.words;
        }
      }]
    };

    var attachTriggers = [
      'ready'
    , 'EditCommentFormLoaded'
    ];

    var wordCount = new WordCount(options);

    $(document)
      .on(attachTriggers.join(' '), wordCount.attachCountersHandler.bind(wordCount));
  });

})(jQuery, window, document);
