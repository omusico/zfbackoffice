<?php

class UserController extends Swf_Controller_Action
{
    public function indexAction()
	{
       	$user = new Default_Model_User();
        $data = $user->select();
        $paginator = Swf_Paginator::factory( $data, $this->view );
        $paginator->setCurrentPageNumber( $this->_getParam('page') );
        $this->view->paginator = $paginator;
    }
    public function createAction()
    {
        $request = $this->getRequest();
        $form = new Default_Form_User();
        if ($this->getRequest()->isPost()) {
            if ($form->isValid($request->getPost())) {
                $model = new Default_Model_User();
                if( $model->getUserId( $form->getValue('username' )) === false ){
	                $row = $model->createRow( $form->getValues() );
	                $row->password = $model->encodePassword( $form->getValue('password') );
	                $row->save();
	                return $this->_helper->redirector('index');
                } else {
                	echo "el usuario ya existe";
                }
            }
        }
        $this->view->form = $form;
    }
    public function updateAction()
    {
        $request = $this->getRequest();
        $form = new Default_Form_User();
		$model = new Default_Model_User();
		$userRow = $model->find( $request->id )->current();
        if ($this->getRequest()->isPost()) {
            if ($form->isValid($request->getPost())) {
                $userRow->password = $model->encodePassword( $form->getValue('password') );
                $userRow->save();
                return $this->_helper->redirector('index');
            }
        } else {
        	$form->populate( $userRow->toArray() );
        }
        $this->view->form = $form;
    }
    public function deleteAction()
    {	
			
    }
}
