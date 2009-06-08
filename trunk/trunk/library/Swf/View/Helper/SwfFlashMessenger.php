<?php
class Swf_View_Helper_SwfFlashMessenger extends Zend_View_Helper_FormElement
{
    private $_types = array( Swf_Controller_Action_Helper_SwfFlashMessenger::ERROR , 
        Swf_Controller_Action_Helper_SwfFlashMessenger::WARNING , 
        Swf_Controller_Action_Helper_SwfFlashMessenger::NOTICE , 
        Swf_Controller_Action_Helper_SwfFlashMessenger::SUCCESS);
    public function swfFlashMessenger ()
    {
        $flashMessenger = Zend_Controller_Action_HelperBroker::getStaticHelper('SwfFlashMessenger');
        $html = '';
        foreach ($this->_types as $type) {
            $messages = $flashMessenger->getMessages($type);
            if (! $messages) {
                $messages = $flashMessenger->getCurrentMessages($type);
            }
            if ($messages) {
                if (! $html) {
                    $html .= '<ul class="messages">';
                }
                $html .= '<li class="' . $type . '-msg">';
                $html .= '<ul>';
                foreach ($messages as $message) {
                    $html .= '<li>';
                    $html .= $message->message;
                    $html .= '</li>';
                }
                $html .= '</ul>';
                $html .= '</li>';
            }
        }
        if ( !empty($html)) {
            $html .= '</ul>';
        }
        return $html;
    }
}
