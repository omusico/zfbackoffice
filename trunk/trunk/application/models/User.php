<?php 
class Default_Model_User
{
    protected $_username;
    protected $_password;
    protected $_created;
    protected $_email;
    protected $_id;
    protected $_mapper;

    public function __construct(array $options = null)
    {
        if (is_array($options)) {
            $this->setOptions($options);
        }
    }

    public function __set($name, $value)
    {
        $method = 'set' . $name;
        if (('mapper' == $name) || !method_exists($this, $method)) {
            throw new Exception('Invalid guestbook property');
        }
        $this->$method($value);
    }

    public function __get($name)
    {
        $method = 'get' . $name;
        if (('mapper' == $name) || !method_exists($this, $method)) {
            throw new Exception('Invalid guestbook property');
        }
        return $this->$method();
    }

    public function setOptions(array $options)
    {
        $methods = get_class_methods($this);
        foreach ($options as $key => $value) {
            $method = 'set' . ucfirst($key);
            if (in_array($method, $methods)) {
                $this->$method($value);
            }
        }
        return $this;
    }

    public function setUsername($text)
    {
        $this->_username = (string) $text;
        return $this;
    }

    public function getUsername()
    {
        return $this->_username;
    }

    public function setPassword($text)
    {
        $this->_password = (string) $text;
        return $this;
    }

    public function getPassword()
    {
        return $this->_password;
    }
    
    
    public function setEmail($email)
    {
        $this->_email = (string) $email;
        return $this;
    }

    public function getEmail()
    {
        return $this->_email;
    }

    public function setCreated($ts)
    {
        $this->_created = $ts;
        return $this;
    }

    public function getCreated()
    {
        return $this->_created;
    }

    public function setId($id)
    {
        $this->_id = (int) $id;
        return $this;
    }

    public function getId()
    {
        return $this->_id;
    }

    public function setMapper($mapper)
    {
        $this->_mapper = $mapper;
        return $this;
    }

    public function getMapper()
    {
        if (null === $this->_mapper) {
            $this->setMapper(new Default_Model_UserMapper());
        }
        return $this->_mapper;
    }

    public function save()
    {
        $this->getMapper()->save($this);
    }

    public function find($id)
    {
        $this->getMapper()->find($id, $this);
        return $this;
    }

    public function fetchAll( $where = null )
    {
        return $this->getMapper()->fetchAll( $where );
    }
    public function toArray()
    {
		return array(
			'id' => $this->getId(),
			'username' => $this->getUsername(),
			'password' => $this->getPassword(),
			'email' => $this->getEmail(),
			'created' => $this->getCreated()
		);    	
    	
    }
}

