<?php if (!defined('APPLICATION')) exit();

$PluginInfo['WordCount'] = array(
   'Name'         => 'Word Count',
   'Description'  => 'Word Count provides you with accurate word and character counts when composing discussions and comments.',
   'Version'      => '1.1',
   'Author'       => 'Kasper K. Isager',
   'AuthorEmail'  => 'kasperisager@gmail.com',
   'AuthorUrl'    => 'http://github.com/kasperisager'
);

/**
 * WordCount plugin for Vanilla
 *
 * @package    Addons
 * @version    1.1
 * @author     Kasper Kronborg Isager <kasperisager@gmail.com>
 * @copyright  Copyright © 2013
 * @license    http://opensource.org/licenses/MIT MIT
 */
class WordCount extends Gdn_Plugin
{
   /**
    * Add WordCount to post pages
    * 
    * @param  Gdn_Controller $Sender
    * @since  1.0
    * @access public
    */
   public function PostController_Render_Before($Sender)
   {
      $this->_WordCounter($Sender);
   }

   /**
    * Add WordCount to discussion pages
    * 
    * @param  Gdn_Controller $Sender
    * @since  1.0
    * @access public
    */
   public function DiscussionController_Render_Before($Sender)
   {
      $this->_WordCounter($Sender);
   }

   /**
    * WordCount resources
    * 
    * @param  Gdn_Controller $Sender
    * @since  1.0
    * @access private
    */
   private function _WordCounter($Sender)
   {
      // Stylesheet
      $Sender->AddCssFile('jquery.wordcount.css', 'plugins/WordCount');

      // Javascript
      $Sender->AddJsFile('jquery.wordcount.js', 'plugins/WordCount');

      // Config definitions
      $Sender->AddDefinition('MaxCount', C('Vanilla.Comment.MaxLength'));

      // Translateable labels
      $Sender->AddDefinition('CharLabel', T('character left'));
      $Sender->AddDefinition('CharsLabel', T('characters left'));
      $Sender->AddDefinition('WordLabel', T('word'));
      $Sender->AddDefinition('WordsLabel', T('words'));
   }
}