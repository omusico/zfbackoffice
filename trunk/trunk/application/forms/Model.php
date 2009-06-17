<?php
class Default_Form_Model extends Zend_Form
{
    public function init()
    {
        $this->setMethod('post');
    	$this->setAttrib('enctype', 'multipart/form-data');
        
        $this->addElement('select', 'mark_id', array(
            'label'      => 'Marca:',
            'required'   => true,
            'filters'    => array(),
            'validators' => array()
        ));
        $markModel = new Default_Model_Mark();
        $this->mark_id->setMultiOptions(
        	$markModel->getActiveInArray()
        );
        
        $this->addElement('text', 'name', array(
            'label'      => 'Nombre:',
            'required'   => true,
            'filters'    => array(),
            'validators' => array(
                'alpha',
            )
        ));
        
        $this->addElement('file', 'filename', array(
            'label'      => 'Imagen:',
            'required'   => true,
            'filters'    => array(),
            'validators' => array()
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

