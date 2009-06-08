<?php

class UserController extends Swf_Controller_Action
{
    public function indexAction()
    {
    	
        $user = new Default_Model_User();
        $where = str_replace( 
        	"%s", 
        	$this->view->escape( $this->_request->getParam( 'key' )),
        	"username like '%%s%' OR email like '%%s%'"  	); 
        $data = $user->fetchAll( $where );
        $paginator = Swf_Paginator::factory( $data, $this->view );
        $paginator->setCurrentPageNumber( $this->_getParam('page') );
        $this->view->paginator = $paginator;
        $usernames = array();
    	$emails = array();
    	$ids = array();
    	foreach ($this->view->paginator as $entry){ 
    		$usernames[] = $entry->username ;
    		$emails[]= $entry->email ;
    		$ids[] = $entry->id ;
    	}
	$this->view->usernames = $usernames;
    }
    public function createAction()
    {
        $request = $this->getRequest();
        $form = new Default_Form_User();

        if ($this->getRequest()->isPost()) {
            if ($form->isValid($request->getPost())) {
                $model = new Default_Model_User( $form->getValues() );
                $model->save();
                return $this->_helper->redirector('index');
            }
        }
        $this->view->form = $form;
    }

    public function updateAction()
    {
        $request = $this->getRequest();
        $form = new Default_Form_User();
		$model = new Default_Model_User();
		$userData = $model->find( $request->id );
        if ($this->getRequest()->isPost()) {
            if ($form->isValid($request->getPost())) {
                $model = new Default_Model_User( $form->getValues() );
                $model->save();
                return $this->_helper->redirector('index');
            }
        } else {
        	//print_r( $userData->toArray());
        	$form->populate( $userData->toArray() );
        }
        $this->view->form = $form;
    }
    
}



