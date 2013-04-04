/**
 *  Copyright 2013 Kasper Kronborg Isager
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *  
 *      http://www.apache.org/licenses/LICENSE-2.0
 *  
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

jQuery(function() {

    var forms = $(".DiscussionForm, .CommentForm, .EditCommentForm");

    $(forms).livequery(function() {

        $(this).find(".TextBox").each(function() {

            var $this = $(this);

            var maxCount = gdn.definition("MaxCount"),
                countMsg = $("<div class='WordCount'><ul></ul></div>"),
                charLabel = gdn.definition("CharLabel"),
                charsLabel = gdn.definition("CharsLabel"),
                wordLabel = gdn.definition("WordLabel"),
                wordsLabel = gdn.definition("WordsLabel");

            countMsg.find("ul")
                .append("<li class='Characters'>" 
                    + "<span class='Count'></span> "
                    + "<span class='Label'></span>"
                    + "</li>"
                )
                .append("<li class='Words'>" 
                    + "<span class='Count'></span> "
                    + "<span class='Label'></span>"
                    + "</li>"
                );

            $this.after(countMsg);

            charCount();
            wordCount();

            var initialVal = $this.val();
      
            $this.change(function(e){

                charCount();
                wordCount();

            });
      
            setInterval(function () {
        
                if ($this.val() != initialVal) {
                    $this.change();
                    initialVal = $this.val();
                }
        
            }, 100);

            function charCount() {

                var count = (maxCount - $this.val().length);

                countMsg.find(".Characters .Count").html(count);

                if (parseInt(count) <= 400 && parseInt(count) > 0) {
                    $this.closest(forms).addClass("NearlyExceeded").removeClass("Exceeded");
                } else if (0 >= parseInt(count)) {
                    $this.closest(forms).addClass("Exceeded").removeClass("NearlyExceeded");
                } else {
                    $this.closest(forms).removeClass("Exceeded NearlyExceeded");
                }

                if (parseInt(count) != 1) {
                    countMsg.find(".Characters .Label").html(charsLabel);
                } else {
                    countMsg.find(".Characters .Label").html(charLabel);
                }

            }

            function wordCount() {

                var count = $this.val();

                if (count === "") {
                    count = 0;
                } else {
                    count = $.trim(count).split(" ").length;
                }

                countMsg.find(".Words .Count").html(count);

                if (parseInt(count) != 1) {
                    countMsg.find(".Words .Label").html(wordsLabel);
                } else {
                    countMsg.find(".Words .Label").html(wordLabel);
                }

            }

        });
  
    });

});