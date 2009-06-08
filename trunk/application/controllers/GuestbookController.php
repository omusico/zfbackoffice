<?php

class GuestbookController extends Swf_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        $guestbook = new Default_Model_Guestbook();
        $data = $guestbook->fetchAll();
        $paginator = Swf_Paginator::factory($data, $this->_view);
        $paginator->setCurrentPageNumber( $this->_getParam('page') );
        $this->view->entries =  $paginator;
        $this->view->paginator = $paginator;
    }

    public function signAction()
    {
        $request = $this->getRequest();
        $form    = new Default_Form_Guestbook();

        if ($this->getRequest()->isPost()) {
            if ($form->isValid($request->getPost())) {
                $model = new Default_Model_Guestbook($form->getValues());
                $model->save();
                return $this->_helper->redirector('index');
            }
        }
        
        $this->view->form = $form;
    }

}



