/*
 * Ext JS Library 3.0 Pre-alpha
 * Copyright(c) 2006-2008, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

/**
 * @class Ext.form.Hidden
 * @extends Ext.form.Field
 * A basic hidden field for storing hidden values in forms that need to be passed in the form submit.
 * @constructor
 * Create a new Hidden field.
 * @param {Object} config Configuration options
 * @xtype hidden
 */
Ext.form.Hidden = Ext.extend(Ext.form.Field, {
    // private
    inputType : 'hidden',

    // private
    onRender : function(){
        Ext.form.Hidden.superclass.onRender.apply(this, arguments);
    },

    // private
    initEvents : function(){
        this.originalValue = this.getValue();
    },

    // These are all private overrides
    setSize : Ext.emptyFn,
    setWidth : Ext.emptyFn,
    setHeight : Ext.emptyFn,
    setPosition : Ext.emptyFn,
    setPagePosition : Ext.emptyFn,
    markInvalid : Ext.emptyFn,
    clearInvalid : Ext.emptyFn
});
Ext.reg('hidden', Ext.form.Hidden);