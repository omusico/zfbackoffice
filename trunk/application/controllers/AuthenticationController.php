<?php
class AuthenticationController extends Swf_Controller_Action
{
    public function indexAction()
	{
		$request = $this->getRequest();
		$this->view->menu = false;
		$form = new Default_Form_Authentication();
		if ( $this->getRequest()->isPost() ) {
			if ($form->isValid($request->getPost())) {
				$dbAdapter = new Zend_Db_Adapter_Pdo_Mysql(
					array(
						'dbname' => 'sekuritveicom',
						'username' => 'root',
						'password' => 'wtpmjgda',
						'host' => 'localhost',
					));
				$authAdapter = new Zend_Auth_Adapter_DbTable(
	            	$dbAdapter ,
	            	'users','username','password', 'MD5(?) AND status=1 ');	
				$authAdapter->setIdentity(  $form->getValue( 'username' ) );
	            $authAdapter->setCredential( $form->getValue( 'password' ) );
				//$result = $authAdapter->authenticate();
				$result = Zend_Auth::getInstance()->authenticate( $authAdapter );
				if ($result->isValid()) {					
	            	$this->_redirect('/dashboard/');
	            }
	            $this->_flashMessenger->addError('usuario incorrecto');
	            $form->populate( $form->getValues() );
			} else {
				$form->populate( $form->getValues() );
			}
		} else {
        	$this->_flashMessenger->addError('Hay datos invalidos o vacios');
            $form->populate( $form->getValues() );
		}
		$this->view->form = $form;
    }
    public function logoutAction()
    {
    	Zend_Auth::getInstance()->clearIdentity();
		$this->_redirect('/authentication/');
    }
}