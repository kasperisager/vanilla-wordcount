<?php if (!defined('APPLICATION')) exit;

$PluginInfo['wordcount'] = array(
    'Name'        => "WordCount",
    'Description' => "Word Count provides you with accurate word and character counts when composing discussions and comments",
    'Version'     => '2.0.0',
    'PluginUrl'   => 'https://github.com/kasperisager/vanilla-wordcount',
    'Author'      => "Kasper Kronborg Isager",
    'AuthorEmail' => 'kasperisager@gmail.com',
    'AuthorUrl'   => 'https://github.com/kasperisager',
    'License'     => 'MIT',
    'RequiredApplications' => array('Vanilla' => '2.1.x')
);

/**
 * WordCount Plugin
 *
 * @author    Kasper Kronborg Isager <kasperisager@gmail.com>
 * @copyright 2014 (c) Kasper Kronborg Isager
 * @license   Proprietary
 * @package   WordCount
 * @since     2.0.0
 */
class WordCountPlugin extends Gdn_Plugin
{
    /**
     * Initialize WordCount
     *
     * @since  2.0.0
     * @access public
     * @param  Gdn_Form $sender
     */
    public function Gdn_Form_beforeBodyBox_handler($sender)
    {
        $controller = Gdn::controller();

        // Plugin definitions for use in Javascript
        $definitions = array(
            'max'    => c('Vanilla.Comment.MaxLength'),
            'labels' => array(
                'character'  => t('character left'),
                'characters' => t('characters left'),
                'word'       => t('word'),
                'words'      => t('words')
            )
        );

        $controller->addDefinition('WordCount', json_encode($definitions));

        // Add required assets
        $controller->addJsFile('wordcount.min.js', 'plugins/wordcount');
        $controller->addCssFile('wordcount.css', 'plugins/wordcount');
    }
}
