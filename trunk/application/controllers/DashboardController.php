<?php

class DashboardController extends Zend_Controller_Action
{
    public function indexAction()
    {
        $this->_redirect( '/user/' );
    }
}
