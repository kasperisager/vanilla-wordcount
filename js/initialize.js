;(function ($, window, document, undefined) {
  'use strict';

  $(function () {
    var definitions   = $.parseJSON(gdn.definition('WordCount'))
      , maxCharacters = definitions.max;

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
          singular : 'character left'
        , plural   : 'characters left'
        }
      , counter : function (string) {
          return (maxCharacters - (string || '').length);
        }
      }, {
        labels  : {
          singular : 'word'
        , plural   : 'words'
        }
      , counter : function (string) {
          string = $(string).text();

          return (string !== '') ? (string || '').trim().split(' ').length : 0;
        }
      }]
    };

    $.extend(true, options, definitions);

    var attachTriggers = [
      'ready'
    , 'EditCommentFormLoaded'
    ];

    var wordCount = new WordCount(options);

    $(document)
      .on(attachTriggers.join(' '), wordCount.attachCountersHandler.bind(wordCount));
  });

})(jQuery, window, document);
