<?php
class Default_Form_Search extends Zend_Form
{
    public function init()
    {
        // Set the method for the display form to POST
        $this->setMethod('post');

        $this->addElement('text', 'key', array(
            'label'      => '',
            'required'   => true,
            'filters'    => array('StringTrim'),
            'validators' => array(
            	'alpha','stripTags','htmlentities'
            )
        ));
        
         // Add the submit button
        $this->addElement('submit', 'submit', array(
            'ignore'   => true,
            'label'    => 'Search',
        ));
    }
}

