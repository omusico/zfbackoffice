<?php
class Default_Model_User extends Zend_Db_Table_Abstract
{
    protected $_name = 'users';
    /**
	 * 
	 * Busca un usuario y si existe devuelve un table_row
	 * @param string Username
	 * @return mixed Row|false
     */
    public function getUserId( $username )
    {
   		$rowset = $this->fetchAll( 
   			$this->select()->where('username = ?', $username )->where( 'status = 1')
   		);
   		if( count( $rowset )){
   			return $rowset[0];
   		} else {
   			return false;
   		}
    }
    /**
	 * 
	 * Encodea el password y retorna el password encodeado
	 * @param String PasswordPlain
	 * @return String PasswordEncode
     */
    public function encodePassword( $password )
    {
    	return md5( $password );
    }
}

