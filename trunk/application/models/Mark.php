<?php
class Default_Model_Mark extends Zend_Db_Table_Abstract
{
    protected $_name = 'marks';
    /**
	 * 
	 * Busca una marca y si existe devuelve un table_row
	 * @param string Name
	 * @return mixed Row|false
     */
    public function getMarkId( $name )
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
    public function getActiveInArray()
    {
		$rowset = $this->fetchAll( 
    			$this->select()
    				->where( 'status = 1')
    	);
    	$result = array();
    
    	foreach( $rowset as $row ) {
    		$result[$row->id] = $row->name;
    	}
    	return $result;
    }
}