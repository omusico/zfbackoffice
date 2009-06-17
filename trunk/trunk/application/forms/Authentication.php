<?php
class Default_Form_Authentication extends Zend_Form
{
    public function init()
    {
        $this->setMethod('post');

        $this->addElement('text', 'username', array(
            'label'      => 'username:',
            'required'   => true,
            'filters'    => array('StringTrim'),
            'validators' => array(
                'alpha',
            )
        ));
        
        $this->addElement('password', 'password', array(
            'label'      => 'password:',
            'required'   => true,
            'filters'    => array('StringTrim')
        ));        
        // Add the submit button
        $this->addElement('submit', 'submit', array(
            'ignore'   => true,
            'label'    => 'Save',
        ));
    }
}

