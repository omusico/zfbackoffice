/*
 * Ext JS Library 3.0 Pre-alpha
 * Copyright(c) 2006-2008, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

/**
 * @class Ext.ComponentMgr
 * <p>Provides a registry of all Components (instances of {@link Ext.Component} or any subclass
 * thereof) on a page so that they can be easily accessed by {@link Ext.Component component}
 * {@link Ext.Component#id id} (see {@link #get}, or the convenience method {@link Ext#getCmp Ext.getCmp}).</p>
 * <p>This object also provides a registry of available Component <i>classes</i>
 * indexed by a mnemonic code known as the Component's {@link Ext.Component#xtype xtype}.
 * The <tt>{@link Ext.Component#xtype xtype}</tt> provides a way to avoid instantiating child Components
 * when creating a full, nested config object for a complete Ext page.</p>
 * <p>A child Component may be specified simply as a <i>config object</i>
 * as long as the correct <tt>{@link Ext.Component#xtype xtype}</tt> is specified so that if and when the Component
 * needs rendering, the correct type can be looked up for lazy instantiation.</p>
 * <p>For a list of all available <tt>{@link Ext.Component#xtype xtypes}</tt>, see {@link Ext.Component}.</p>
 * @singleton
 */
Ext.ComponentMgr = function(){
    var all = new Ext.util.MixedCollection();
    var types = {};
    var ptypes = {};

    return {
        /**
         * Registers a component.
         * @param {Ext.Component} c The component
         */
        register : function(c){
            all.add(c);
        },

        /**
         * Unregisters a component.
         * @param {Ext.Component} c The component
         */
        unregister : function(c){
            all.remove(c);
        },

        /**
         * Returns a component by {@link Ext.Component#id id}
         * @param {String} id The component {@link Ext.Component#id id}
         * @return Ext.Component
         */
        get : function(id){
            return all.get(id);
        },

        /**
         * Registers a function that will be called when a specified component is added to ComponentMgr
         * @param {String} id The component {@link Ext.Component#id id}
         * @param {Function} fn The callback function
         * @param {Object} scope The scope of the callback
         */
        onAvailable : function(id, fn, scope){
            all.on("add", function(index, o){
                if(o.id == id){
                    fn.call(scope || o, o);
                    all.un("add", fn, scope);
                }
            });
        },

        /**
         * The MixedCollection used internally for the component cache. An example usage may be subscribing to
         * events on the MixedCollection to monitor addition or removal.  Read-only.
         * @type {MixedCollection}
         */
        all : all,

        /**
         * <p>Registers a new Component constructor, keyed by a new
         * {@link Ext.Component#xtype}.</p>
         * <p>Use this method (or its alias {@link Ext#reg Ext.reg}) to register new
         * subclasses of {@link Ext.Component} so that lazy instantiation may be used when specifying
         * child Components.
         * see {@link Ext.Container#items}</p>
         * @param {String} xtype The mnemonic string by which the Component class may be looked up.
         * @param {Constructor} cls The new Component class.
         */
        registerType : function(xtype, cls){
            types[xtype] = cls;
            cls.xtype = xtype;
        },

        /**
         * Creates a new Component from the specified config object using the
         * config object's {@link Ext.component#xtype xtype} to determine the class to instantiate.
         * @param {Object} config A configuration object for the Component you wish to create.
         * @param {Constructor} defaultType The constructor to provide the default Component type if
         * the config object does not contain a <tt>xtype</tt>. (Optional if the config contains a <tt>xtype</tt>).
         * @return {Ext.Component} The newly instantiated Component.
         */
        create : function(config, defaultType){
            return config.render ? config : new types[config.xtype || defaultType](config);
        },

        /**
         * <p>Registers a new Plugin constructor, keyed by a new
         * {@link Ext.Component#ptype}.</p>
         * <p>Use this method (or its alias {@link Ext#preg Ext.preg}) to register new
         * plugins for {@link Ext.Component}s so that lazy instantiation may be used when specifying
         * Plugins.</p>
         * @param {String} ptype The mnemonic string by which the Plugin class may be looked up.
         * @param {Constructor} cls The new Plugin class.
         */
        registerPlugin : function(ptype, cls){
            ptypes[ptype] = cls;
            cls.ptype = ptype;
        },

        /**
         * Creates a new Plugin from the specified config object using the
         * config object's {@link Ext.component#ptype ptype} to determine the class to instantiate.
         * @param {Object} config A configuration object for the Plugin you wish to create.
         * @param {Constructor} defaultType The constructor to provide the default Plugin type if
         * the config object does not contain a <tt>ptype</tt>. (Optional if the config contains a <tt>ptype</tt>).
         * @return {Ext.Component} The newly instantiated Plugin.
         */
        createPlugin : function(config, defaultType){
            return new ptypes[config.ptype || defaultType](config);
        }
    };
}();

/**
 * Shorthand for {@link Ext.ComponentMgr#registerType}
 * @param {String} xtype The {@link Ext.component#xtype mnemonic string} by which the Component class
 * may be looked up.
 * @param {Constructor} cls The new Component class.
 * @member Ext
 * @method reg
 */
Ext.reg = Ext.ComponentMgr.registerType; // this will be called a lot internally, shorthand to keep the bytes down
/**
 * Shorthand for {@link Ext.ComponentMgr#registerPlugin}
 * @param {String} ptype The {@link Ext.component#ptype mnemonic string} by which the Plugin class
 * may be looked up.
 * @param {Constructor} cls The new Plugin class.
 * @member Ext
 * @method reg
 */
Ext.preg = Ext.ComponentMgr.registerPlugin;
Ext.create = Ext.ComponentMgr.create;
