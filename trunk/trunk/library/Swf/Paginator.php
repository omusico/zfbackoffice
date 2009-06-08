<?php 
class Swf_Paginator extends Zend_Paginator
{
	private $_paginatorInstance;
    /**
     * Basic Configuration from own paginator
     *
     * @param mixed $view
     */
    public static function factory( $data, $view ) 
    {
		Zend_Paginator::setDefaultScrollingStyle('Sliding');
		Zend_View_Helper_PaginationControl::setDefaultViewPartial( 'paginator/sliding.phtml' );
		$instance = Zend_Paginator::factory( $data );
		$instance->setView( $view );    	
		return $instance;
    }
}
