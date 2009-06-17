<?php
class MarkController extends Swf_Controller_Action
{
    public function indexAction()
	{
       	$mark = new Default_Model_Mark();
        $data = $mark->select();
        $paginator = Swf_Paginator::factory( $data, $this->view );
        $paginator->setCurrentPageNumber( $this->_getParam('page') );
        $this->view->paginator = $paginator;
    }
    public function createAction()
    {
        $request = $this->getRequest();
        $form = new Default_Form_Mark();
        if ($this->getRequest()->isPost()) {
            if ($form->isValid($request->getPost())) {
                $model = new Default_Model_Mark();
                if( $model->getMarkId( $form->getValue('name' )) === false ){
	                $row = $model->createRow( $form->getValues() );
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
        $form = new Default_Form_Mark();
		$model = new Default_Model_Mark();
		$markRow = $model->find( $request->id )->current();
        if ($this->getRequest()->isPost()) {
            if ($form->isValid($request->getPost())) {
                $markRow->name = $form->getValue('name');
                $markRow->save();
                return $this->_helper->redirector('index');
            }
        } else {
        	$form->populate( $markRow->toArray() );
        }
        $this->view->form = $form;
    }
    public function deleteAction()
    {	
			
    }
}