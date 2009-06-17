<?php
class Swf_Controller_Action extends Zend_Controller_Action 
{
	protected $flashMessenger;
	public function init()
	{
        $this->_flashMessenger = $this->_helper->getHelper('SwfFlashMessenger');
        /**
         * Search form
         */
        $this->view->searchForm = new Default_Form_Search();
        $this->view->searchForm->populate( 
        	array( 'key' => $this->_request->getParam( 'key' ) ) );
        
        $auth = Zend_Auth::getInstance();
		if( !$auth->hasIdentity() && $this->_request->getControllerName() != 'authentication' ) {
			header('Location: /authentication/');
		} 
        	
	}	
}
