<?php if (!defined('APPLICATION')) exit();

$PluginInfo['wordcount'] = array(
    'Name'        => 'Word Count',
    'Description' => 'Word Count provides you with accurate word and character counts when composing discussions and comments.',
    'Version'     => '1.1',
    'Author'      => 'Kasper K. Isager',
    'AuthorEmail' => 'kasperisager@gmail.com',
    'AuthorUrl'   => 'http://github.com/kasperisager'
);

/**
 * "Word Count" plugin for Vanilla
 *
 * @version   1.1
 * @author    Kasper Kronborg Isager <kasperisager@gmail.com>
 * @copyright Copyright © 2013
 * @license   http://opensource.org/licenses/MIT MIT
 */
class WordCount extends Gdn_Plugin
{
    /**
     * Add Word Count to post pages
     *
     * @since  1.0
     * @param  PostController $Sender
     * @access public
     */
    public function PostController_Render_Before($Sender)
    {
        $this->_WordCounter($Sender);
    }

    /**
     * Add Word Count to discussion pages
     *
     * @since  1.0
     * @param  DiscussionController $Sender
     * @access public
     */
    public function DiscussionController_Render_Before($Sender)
    {
        $this->_WordCounter($Sender);
    }

    /**
     * Word Count resources
     *
     * @since  1.0
     * @param  Gdn_Controller $Sender
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
