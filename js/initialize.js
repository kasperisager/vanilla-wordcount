;(function ($, window, document, undefined) {
  'use strict';

  $(function () {
    var options = $.parseJSON(gdn.definition('WordCount'));

    $.extend(true, options, {
      textarea : '.TextBox'
    , wrapper  : '.TextBoxWrapper'
    , classes  : {
        wrap  : 'Count-Wrap'
      , badge : 'Count'
      , label : 'Count-Label'
      }
    });

    var attachTriggers = [
      'ready'
    , 'EditCommentFormLoaded'
    ];

    var wordCount = new WordCount(options);

    $(document)
      .on(attachTriggers.join(' '), wordCount.attachCountersHandler.bind(wordCount));
  });

})(jQuery, window, document);
