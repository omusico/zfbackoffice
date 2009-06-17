<?php
class Default_Form_User extends Zend_Form
{
    public function init()
    {
        $this->setMethod('post');

        $this->addElement('text', 'username', array(
            'label'      => 'Your username:',
            'required'   => true,
            'filters'    => array('StringTrim'),
            'validators' => array(
                'alpha',
            )
        ));
        
        $this->addElement('password', 'password', array(
            'label'      => 'Your password:',
            'required'   => true,
            'filters'    => array('StringTrim')
        ));

        $this->addElement('hidden', 'status', array(
        	'value'		 => 1,
            'filters'    => array('StringTrim')
        ));
        
        // Add the submit button
        $this->addElement('submit', 'submit', array(
            'ignore'   => true,
            'label'    => 'Save',
        ));

    }
}

