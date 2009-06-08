<?php
class Swf_Controller_Action extends Zend_Controller_Action 
{
	protected $flashMessenger;
	public function init()
	{
        $this->_flashMessenger = $this->_helper->getHelper('SwfFlashMessenger');
        //Zend_Debug::dump( $this->_request->getParam( 'key' ));exit;
        /**
         * Search form
         */
        $this->view->searchForm = new Default_Form_Search();
        $this->view->searchForm->populate( 
        	array( 'key' => $this->_request->getParam( 'key' ) ) );
	}	
}
