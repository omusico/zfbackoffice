/*
 * Ext JS Library 3.0 Pre-alpha
 * Copyright(c) 2006-2008, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

Ext.ns('App', 'App.user');
/**
 * @class App.user.FormPanel
 * A typical FormPanel extension
 */
App.user.Form = Ext.extend(Ext.form.FormPanel, {
	renderTo: 'user-form',
	iconCls: 'icon-user',
	frame: true,
	labelAlign: 'right',
	title: 'User',
	frame: true,
	defaultType: 'textfield',
	defaults: {
		anchor: '100%',
	},

	// private A pointer to the currently loaded record
	record : null,

	/**
	 * initComponent
	 * @protected
	 */
	initComponent : function() {
		// build the form-fields.  Always a good idea to defer form-building to a method so that this class can
		// be over-ridden to provide different form-fields
		this.items = this.buildForm();

		// build form-buttons
		this.buttons = this.buildUI();

		// add a create event for convenience in our application-code.
		this.addEvents({
			/**
			 * @event create
			 * Fires when user clicks [create] button
			 * @param {FormPanel} this
			 * @param {Object} values, the Form's values object
			 */
			create : true
		});

		// super
		App.user.Form.superclass.initComponent.call(this);
	},

	/**
	 * buildform
	 * @private
	 */
	buildForm : function() {
		return [
			{fieldLabel: 'Email', name: 'email'},
			{fieldLabel: 'First', name: 'first'},
			{fieldLabel: 'Last', name: 'last'}
		];
	},

	/**
	 * buildUI
	 * @private
	 */
	buildUI: function(){
		return [{
			text: 'Save',
			iconCls: 'icon-save',
			handler: this.onUpdate,
			scope: this
		}, {
			text: 'Create',
			iconCls: 'silk-user-add',
			handler: this.onCreate,
			scope: this
		}, {
			text: 'Reset',
			handler: function(btn, ev){
				this.getForm().reset();
			},
			scope: this
		}];
	},

	/**
	 * loadRecord
	 * @param {Record} rec
	 */
	loadRecord : function(rec) {
		this.record = rec;
		this.getForm().loadRecord(rec);
	},

	/**
	 * onUpdate
	 */
	onUpdate : function(btn, ev) {
		if (this.record == null) {
			return;
		}
		this.getForm().updateRecord(this.record);
	},

	/**
	 * onCreate
	 */
	onCreate : function(btn, ev) {
		this.fireEvent('create', this, this.getForm().getValues());
		this.getForm().reset();
	},

	/**
	 * onReset
	 */
	onReset : function(btn, ev) {
		this.fireEvent('update', this, this.getForm().getValues());
		this.getForm().reset();
	}
});
