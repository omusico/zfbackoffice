<?php
class Default_Model_Model extends Zend_Db_Table_Abstract
{
    protected $_name = 'models';
    /**
	 * 
	 * Busca un modelo y si existe devuelve un table_row
	 * @param string Name
	 * @return mixed Row|false
     */
    public function getModelId( $name )
    {
   		$rowset = $this->fetchAll( 
   			$this->select()->where('name = ?', $name )->where( 'status = 1')
   		);
   		if( count( $rowset )){
   			return $rowset[0];
   		} else {
   			return false;
   		}
    }
}