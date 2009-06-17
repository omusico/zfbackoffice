<?php
class ModelController extends Swf_Controller_Action
{
    public function indexAction()
	{
       	$model = new Default_Model_Model();
        $data = $model->select();
        $paginator = Swf_Paginator::factory( $data, $this->view );
        $paginator->setCurrentPageNumber( $this->_getParam('page') );
        $this->view->paginator = $paginator;
    }
    public function createAction()
    {
        $request = $this->getRequest();
        $form = new Default_Form_Model();
        if ($this->getRequest()->isPost()) {
            if ($form->isValid($request->getPost())) {
                $model = new Default_Model_Model();
                if( $model->getModelId( $form->getValue('name' )) === false ){
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
        $form = new Default_Form_Model();
		$model = new Default_Model_Model();
		$modelRow = $model->find( $request->id )->current();
        if ($this->getRequest()->isPost()) {
            if ($form->isValid($request->getPost())) {
                $modelRow->name = $form->getValue('name');
                $modelRow->save();
                return $this->_helper->redirector('index');
            }
        } else {
        	$form->populate( $modelRow->toArray() );
        }
        $this->view->form = $form;
    }
    public function deleteAction()
    {	
			
    }
}