<?php
class Default_Form_User extends Zend_Form
{
    public function init()
    {
        // Set the method for the display form to POST
        $this->setMethod('post');

        $this->addElement('text', 'username', array(
            'label'      => 'Your username:',
            'required'   => true,
            'filters'    => array('StringTrim'),
            'validators' => array(
                'alpha',
            )
        ));
        
        $this->addElement('text', 'password', array(
            'label'      => 'Your password:',
            'required'   => true,
            'filters'    => array('StringTrim')
        ));        
        
        // Add an email element
        $this->addElement('text', 'email', array(
            'label'      => 'Your email address:',
            'required'   => true,
            'filters'    => array('StringTrim'),
            'validators' => array(
                'EmailAddress',
            )
        ));

        // Add the submit button
        $this->addElement('submit', 'submit', array(
            'ignore'   => true,
            'label'    => 'Save',
        ));

        // And finally add some CSRF protection
        /*$this->addElement('hash', 'csrf', array(
            'ignore' => true,
        ));*/
    }
}

