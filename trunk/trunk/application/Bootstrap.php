<?php

class Bootstrap extends Zend_Application_Bootstrap_Bootstrap
{
    protected function _initDoctype()
    {
        $this->bootstrap('view');
        $view = $this->getResource('view');
        $view->doctype('XHTML1_STRICT');
        $view->headTitle()->append('Panel de administracion');
        $view->headLink()->appendStylesheet( 'http://www.sekuritveicom.dev/css/layout.css' );
        $view->menu = true;
        //$view->headScript()->appendFile( '/js/mootools.js' );
    }
    protected function _initAutoload()
    {
        $autoloader = new Zend_Application_Module_Autoloader(array(
            'namespace' => 'Default_',
            'basePath'  => dirname(__FILE__),
        ));
        /**
         * Agregamos los demas namespaces
         */
        Zend_Loader_Autoloader::getInstance()->registerNamespace( array( 'Swf_'));
        return $autoloader;
    }
    protected function _initMessage()
    {
	    $this->getResource('view')
	    	->addHelperPath('Swf/View/Helper', 'Swf_View_Helper_' );
        Zend_Controller_Action_HelperBroker::addHelper(
            new Swf_Controller_Action_Helper_SwfFlashMessenger());
    }
}

