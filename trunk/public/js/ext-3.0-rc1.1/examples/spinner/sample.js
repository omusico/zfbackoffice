/*
 * Ext JS Library 3.0 Pre-alpha
 * Copyright(c) 2006-2008, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

Ext.onReady(function(){
    var simple = new Ext.FormPanel({
        labelWidth: 40, // label settings here cascade unless overridden
        frame: true,
        title: 'Simple Form',
        bodyStyle:'padding:5px 5px 0',
        width: 210,
        defaults: {width: 135},
        defaultType: 'textfield',

        items: [
            new Ext.form.SpinnerField({
                fieldLabel: 'Age',
                name: 'age',
            }),
            {
            	xtype: 'spinner',
            	fieldLabel: 'Test',
            	name: 'test',
            	minValue: 0,
            	maxValue: 100,
            	allowDecimals: true,
            	decimalPrecision: 1,
            	incrementValue: 0.4,
            	alternateIncrementValue: 2.1,
            	accelerate: true
            }
        ]
    });

    simple.render('form-ct');
});
