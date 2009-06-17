<?php
class Default_Form_Mark extends Zend_Form
{
    public function init()
    {
        $this->setMethod('post');

        $this->addElement('text', 'name', array(
            'label'      => 'Marca:',
            'required'   => true,
            'filters'    => array(),
            'validators' => array(
                'alpha',
            )
        ));
        
        $this->addElement('hidden', 'status', array(
        	'value'		 => 1,
            'filters'    => array('StringTrim')
        ));
        
        $this->addElement('submit', 'submit', array(
            'ignore'   => true,
            'label'    => 'Save',
        ));

    }
}

