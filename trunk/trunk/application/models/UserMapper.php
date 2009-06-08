<?php
class Default_Model_UserMapper
{
    protected $_dbTable;

    public function setDbTable($dbTable)
    {
        if (is_string($dbTable)) {
            $dbTable = new $dbTable();
        }
        if (!$dbTable instanceof Zend_Db_Table_Abstract) {
            throw new Exception('Invalid table data gateway provided');
        }
        $this->_dbTable = $dbTable;
        return $this;
    }

    public function getDbTable()
    {
        if (null === $this->_dbTable) {
            $this->setDbTable('Default_Model_DbTable_User');
        }
        return $this->_dbTable;
    }

    public function save(Default_Model_User $user )
    {
        $data = array(
            'email'   => $user->getEmail(),
            'username' => $user->getUsername(),
        	'password' => $user->getPassword(),
            'created' => date('Y-m-d H:i:s'),
        );

        if (null === ($id = $user->getId())) {
            unset($data['id']);
            $this->getDbTable()->insert($data);
        } else {
            $this->getDbTable()->update($data, array('id = ?' => $id));
        }
    }
	public function delete( $id,  Default_Model_User $user)
	{
		$this->getDbTable()->delete( 'id = ' . $id );
	}
    public function find($id, Default_Model_User $user)
    {
        $result = $this->getDbTable()->find($id);
        if (0 == count($result)) {
            return;
        }
        $row = $result->current();
        $user->setId($row->id)
                  ->setEmail($row->email)
                  ->setUsername($row->username)
                  ->setPassword($row->password)
                  ->setCreated($row->created);
    }

    public function fetchAll( $where = null)
    {
        $resultSet = $this->getDbTable()->fetchAll( $where );
        $entries   = array();
        foreach ($resultSet as $row) {
            $entry = new Default_Model_User();
            $entry->setId($row->id)
                  ->setEmail($row->email)
                  ->setUsername($row->username)
                  ->setPassword($row->password)
                  ->setCreated($row->created)
                  ->setMapper($this);
            $entries[] = $entry;
        }
        return $entries;
    }
}