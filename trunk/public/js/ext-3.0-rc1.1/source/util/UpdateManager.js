/*
 * Ext JS Library 3.0 Pre-alpha
 * Copyright(c) 2006-2008, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

/**
 * @class Ext.Updater
 * @extends Ext.util.Observable
 * Provides AJAX-style update capabilities for Element objects.  Updater can be used to {@link #update}
 * an {@link Ext.Element} once, or you can use {@link #startAutoRefresh} to set up an auto-updating
 * {@link Ext.Element Element} on a specific interval.<br><br>
 * Usage:<br>
 * <pre><code>
 * var el = Ext.get("foo"); // Get Ext.Element object
 * var mgr = el.getUpdater();
 * mgr.update({
        url: "http://myserver.com/index.php",
        params: {
            param1: "foo",
            param2: "bar"
        }
 * });
 * ...
 * mgr.formUpdate("myFormId", "http://myserver.com/index.php");
 * <br>
 * // or directly (returns the same Updater instance)
 * var mgr = new Ext.Updater("myElementId");
 * mgr.startAutoRefresh(60, "http://myserver.com/index.php");
 * mgr.on("update", myFcnNeedsToKnow);
 * <br>
 * // short handed call directly from the element object
 * Ext.get("foo").load({
        url: "bar.php",
        scripts: true,
        params: "param1=foo&amp;param2=bar",
        text: "Loading Foo..."
 * });
 * </code></pre>
 * @constructor
 * Create new Updater directly.
 * @param {Mixed} el The element to update
 * @param {Boolean} forceNew (optional) By default the constructor checks to see if the passed element already
 * has an Updater and if it does it returns the same instance. This will skip that check (useful for extending this class).
 */
Ext.UpdateManager = Ext.Updater = Ext.extend(Ext.util.Observable, 
function() {
	var BEFOREUPDATE = "beforeupdate",
		UPDATE = "update",
		FAILURE = "failure";
		
	// private
    function processSuccess(response){	    
	    var me = this;
        me.transaction = null;
        if (response.argument.form && response.argument.reset) {
            try { // put in try/catch since some older FF releases had problems with this
                response.argument.form.reset();
            } catch(e){}
        }
        if (me.loadScripts) {
            me.renderer.render(me.el, response, me,
               updateComplete.createDelegate(me, [response]));
        } else {
            me.renderer.render(me.el, response, me);
            updateComplete.call(me, response);
        }
    }
    
    // private
    function updateComplete(response, type, success){
        this.fireEvent(type || UPDATE, this.el, response);
        if(Ext.isFunction(response.argument.callback)){
            response.argument.callback.call(response.argument.scope, this.el, Ext.isEmpty(success) ? true : false, response, response.argument.options);
        }
    }

    // private
    function processFailure(response){	            
        updateComplete.call(this, response, FAILURE, !!(this.transaction = null));
    }
	    
	return {
	    constructor: function(el, forceNew){
		    var me = this;
	        el = Ext.get(el);
	        if(!forceNew && el.updateManager){
	            return el.updateManager;
	        }
	        /**
	         * The Element object
	         * @type Ext.Element
	         */
	        me.el = el;
	        /**
	         * Cached url to use for refreshes. Overwritten every time update() is called unless "discardUrl" param is set to true.
	         * @type String
	         */
	        me.defaultUrl = null;
	
	        me.addEvents(
	            /**
	             * @event beforeupdate
	             * Fired before an update is made, return false from your handler and the update is cancelled.
	             * @param {Ext.Element} el
	             * @param {String/Object/Function} url
	             * @param {String/Object} params
	             */
	            BEFOREUPDATE,
	            /**
	             * @event update
	             * Fired after successful update is made.
	             * @param {Ext.Element} el
	             * @param {Object} oResponseObject The response Object
	             */
	            UPDATE,
	            /**
	             * @event failure
	             * Fired on update failure.
	             * @param {Ext.Element} el
	             * @param {Object} oResponseObject The response Object
	             */
	            FAILURE
	        );
	
	        Ext.apply(me, Ext.Updater.defaults);
	        /**
	         * Blank page URL to use with SSL file uploads (defaults to {@link Ext.Updater.defaults#sslBlankUrl}).
	         * @property sslBlankUrl
	         * @type String
	         */
	        /**
	         * Whether to append unique parameter on get request to disable caching (defaults to {@link Ext.Updater.defaults#disableCaching}).
	         * @property disableCaching
	         * @type Boolean
	         */
	        /**
	         * Text for loading indicator (defaults to {@link Ext.Updater.defaults#indicatorText}).
	         * @property indicatorText
	         * @type String
	         */
	        /**
	         * Whether to show indicatorText when loading (defaults to {@link Ext.Updater.defaults#showLoadIndicator}).
	         * @property showLoadIndicator
	         * @type String
	         */
	        /**
	         * Timeout for requests or form posts in seconds (defaults to {@link Ext.Updater.defaults#timeout}).
	         * @property timeout
	         * @type Number
	         */
	        /**
	         * True to process scripts in the output (defaults to {@link Ext.Updater.defaults#loadScripts}).
	         * @property loadScripts
	         * @type Boolean
	         */
	
	        /**
	         * Transaction object of the current executing transaction, or null if there is no active transaction.
	         */
	        me.transaction = null;
	        /**
	         * Delegate for refresh() prebound to "this", use myUpdater.refreshDelegate.createCallback(arg1, arg2) to bind arguments
	         * @type Function
	         */
	        me.refreshDelegate = me.refresh.createDelegate(me);
	        /**
	         * Delegate for update() prebound to "this", use myUpdater.updateDelegate.createCallback(arg1, arg2) to bind arguments
	         * @type Function
	         */
	        me.updateDelegate = me.update.createDelegate(me);
	        /**
	         * Delegate for formUpdate() prebound to "this", use myUpdater.formUpdateDelegate.createCallback(arg1, arg2) to bind arguments
	         * @type Function
	         */
	        me.formUpdateDelegate = (me.formUpdate || function(){}).createDelegate(me);	
	        
			/**
			 * The renderer for this Updater (defaults to {@link Ext.Updater.BasicRenderer}).
			 */
	        me.renderer = me.renderer || me.getDefaultRenderer();
	        
	        Ext.Updater.superclass.constructor.call(me);
	    },
        
		/**
	     * Sets the content renderer for this Updater. See {@link Ext.Updater.BasicRenderer#render} for more details.
	     * @param {Object} renderer The object implementing the render() method
	     */
	    setRenderer : function(renderer){
	        this.renderer = renderer;
	    },	
        
	    /**
	     * Returns the current content renderer for this Updater. See {@link Ext.Updater.BasicRenderer#render} for more details.
	     * @return {Object}
	     */
	    getRenderer : function(){
	       return this.renderer;
	    },

	    /**
	     * This is an overrideable method which returns a reference to a default
	     * renderer class if none is specified when creating the Ext.Updater.
	     * Defaults to {@link Ext.Updater.BasicRenderer}
	     */
	    getDefaultRenderer: function() {
	        return new Ext.Updater.BasicRenderer();
	    },
                
	    /**
	     * Sets the default URL used for updates.
	     * @param {String/Function} defaultUrl The url or a function to call to get the url
	     */
	    setDefaultUrl : function(defaultUrl){
	        this.defaultUrl = defaultUrl;
	    },
        
	    /**
	     * Get the Element this Updater is bound to
	     * @return {Ext.Element} The element
	     */
	    getEl : function(){
	        return this.el;
	    },
	
		/**
	     * Performs an <b>asynchronous</b> request, updating this element with the response.
	     * If params are specified it uses POST, otherwise it uses GET.<br><br>
	     * <b>Note:</b> Due to the asynchronous nature of remote server requests, the Element
	     * will not have been fully updated when the function returns. To post-process the returned
	     * data, use the callback option, or an <b><tt>update</tt></b> event handler.
	     * @param {Object} options A config object containing any of the following options:<ul>
	     * <li>url : <b>String/Function</b><p class="sub-desc">The URL to request or a function which
	     * <i>returns</i> the URL (defaults to the value of {@link Ext.Ajax#url} if not specified).</p></li>
	     * <li>method : <b>String</b><p class="sub-desc">The HTTP method to
	     * use. Defaults to POST if the <tt>params</tt> argument is present, otherwise GET.</p></li>
	     * <li>params : <b>String/Object/Function</b><p class="sub-desc">The
	     * parameters to pass to the server (defaults to none). These may be specified as a url-encoded
	     * string, or as an object containing properties which represent parameters,
	     * or as a function, which returns such an object.</p></li>
	     * <li>scripts : <b>Boolean</b><p class="sub-desc">If <tt>true</tt>
	     * any &lt;script&gt; tags embedded in the response text will be extracted
	     * and executed (defaults to {@link Ext.Updater.defaults#loadScripts}). If this option is specified,
	     * the callback will be called <i>after</i> the execution of the scripts.</p></li>
	     * <li>callback : <b>Function</b><p class="sub-desc">A function to
	     * be called when the response from the server arrives. The following
	     * parameters are passed:<ul>
	     * <li><b>el</b> : Ext.Element<p class="sub-desc">The Element being updated.</p></li>
	     * <li><b>success</b> : Boolean<p class="sub-desc">True for success, false for failure.</p></li>
	     * <li><b>response</b> : XMLHttpRequest<p class="sub-desc">The XMLHttpRequest which processed the update.</p></li>
	     * <li><b>options</b> : Object<p class="sub-desc">The config object passed to the update call.</p></li></ul>
	     * </p></li>
	     * <li>scope : <b>Object</b><p class="sub-desc">The scope in which
	     * to execute the callback (The callback's <tt>this</tt> reference.) If the
	     * <tt>params</tt> argument is a function, this scope is used for that function also.</p></li>
	     * <li>discardUrl : <b>Boolean</b><p class="sub-desc">By default, the URL of this request becomes
	     * the default URL for this Updater object, and will be subsequently used in {@link #refresh}
	     * calls.  To bypass this behavior, pass <tt>discardUrl:true</tt> (defaults to false).</p></li>
	     * <li>timeout : <b>Number</b><p class="sub-desc">The number of seconds to wait for a response before
	     * timing out (defaults to {@link Ext.Updater.defaults#timeout}).</p></li>
	     * <li>text : <b>String</b><p class="sub-desc">The text to use as the innerHTML of the
	     * {@link Ext.Updater.defaults#indicatorText} div (defaults to 'Loading...').  To replace the entire div, not
	     * just the text, override {@link Ext.Updater.defaults#indicatorText} directly.</p></li>
	     * <li>nocache : <b>Boolean</b><p class="sub-desc">Only needed for GET
	     * requests, this option causes an extra, auto-generated parameter to be appended to the request
	     * to defeat caching (defaults to {@link Ext.Updater.defaults#disableCaching}).</p></li></ul>
	     * <p>
	     * For example:
	<pre><code>
	um.update({
	    url: "your-url.php",
	    params: {param1: "foo", param2: "bar"}, // or a URL encoded string
	    callback: yourFunction,
	    scope: yourObject, //(optional scope)
	    discardUrl: true,
	    nocache: true,
	    text: "Loading...",
	    timeout: 60,
	    scripts: false // Save time by avoiding RegExp execution.
	});
	</code></pre>
	     */
	    update : function(url, params, callback, discardUrl){
		    var me = this,
		    	cfg, 
		    	callerScope;
		    	
	        if(me.fireEvent(BEFOREUPDATE, me.el, url, params) !== false){	            
	            if(Ext.isObject(url)){ // must be config object
	                cfg = url;
	                url = cfg.url;
	                params = params || cfg.params;
	                callback = callback || cfg.callback;
	                discardUrl = discardUrl || cfg.discardUrl;
	                callerScope = cfg.scope;	                
	                if(!Ext.isEmpty(cfg.nocache)){me.disableCaching = cfg.nocache;};
	                if(!Ext.isEmpty(cfg.text)){me.indicatorText = '<div class="loading-indicator">'+cfg.text+"</div>";};
	                if(!Ext.isEmpty(cfg.scripts)){me.loadScripts = cfg.scripts;};
	                if(!Ext.isEmpty(cfg.timeout)){me.timeout = cfg.timeout;};
	            }
	            me.showLoading();
	
	            if(!discardUrl){
	                me.defaultUrl = url;
	            }
	            if(Ext.isFunction(url)){
	                url = url.call(me);
	            }
	
	            var o = Ext.apply({}, {
	                url : url,
	                params: (Ext.isFunction(params) && callerScope) ? params.createDelegate(callerScope) : params,
	                success: processSuccess,
	                failure: processFailure,
	                scope: me,
	                callback: undefined,
	                timeout: (me.timeout*1000),
	                disableCaching: me.disableCaching,
	                argument: {
	                    "options": cfg,
	                    "url": url,
	                    "form": null,
	                    "callback": callback,
	                    "scope": callerScope || window,
	                    "params": params
	                }
	            }, cfg);
	
	            me.transaction = Ext.Ajax.request(o);
	        }
	    },	    	

		/**
	     * <p>Performs an async form post, updating this element with the response. If the form has the attribute
	     * enctype="<a href="http://www.faqs.org/rfcs/rfc2388.html">multipart/form-data</a>", it assumes it's a file upload.
	     * Uses this.sslBlankUrl for SSL file uploads to prevent IE security warning.</p>
	     * <p>File uploads are not performed using normal "Ajax" techniques, that is they are <b>not</b>
	     * performed using XMLHttpRequests. Instead the form is submitted in the standard manner with the
	     * DOM <tt>&lt;form></tt> element temporarily modified to have its
	     * <a href="http://www.w3.org/TR/REC-html40/present/frames.html#adef-target">target</a> set to refer
	     * to a dynamically generated, hidden <tt>&lt;iframe></tt> which is inserted into the document
	     * but removed after the return data has been gathered.</p>
	     * <p>Be aware that file upload packets, sent with the content type <a href="http://www.faqs.org/rfcs/rfc2388.html">multipart/form-data</a>
	     * and some server technologies (notably JEE) may require some custom processing in order to
	     * retrieve parameter names and parameter values from the packet content.</p>
	     * @param {String/HTMLElement} form The form Id or form element
	     * @param {String} url (optional) The url to pass the form to. If omitted the action attribute on the form will be used.
	     * @param {Boolean} reset (optional) Whether to try to reset the form after the update
	     * @param {Function} callback (optional) Callback when transaction is complete. The following
	     * parameters are passed:<ul>
	     * <li><b>el</b> : Ext.Element<p class="sub-desc">The Element being updated.</p></li>
	     * <li><b>success</b> : Boolean<p class="sub-desc">True for success, false for failure.</p></li>
	     * <li><b>response</b> : XMLHttpRequest<p class="sub-desc">The XMLHttpRequest which processed the update.</p></li></ul>
	     */
	    formUpdate : function(form, url, reset, callback){
		    var me = this;
	        if(me.fireEvent(BEFOREUPDATE, me.el, form, url) !== false){
	            if(Ext.isFunction(url)){
	                url = url.call(me);
	            }
	            form = Ext.getDom(form)
	            me.transaction = Ext.Ajax.request({
	                form: form,
	                url:url,
	                success: processSuccess,
	                failure: processFailure,
	                scope: me,
	                timeout: (me.timeout*1000),
	                argument: {
	                    "url": url,
	                    "form": form,
	                    "callback": callback,
	                    "reset": reset
	                }
	            });
	            me.showLoading.defer(1, me);
	        }
	    },
                	
	    /**
	     * Set this element to auto refresh.  Can be canceled by calling {@link #stopAutoRefresh}.
	     * @param {Number} interval How often to update (in seconds).
	     * @param {String/Object/Function} url (optional) The url for this request, a config object in the same format
	     * supported by {@link #load}, or a function to call to get the url (defaults to the last used url).  Note that while
	     * the url used in a load call can be reused by this method, other load config options will not be reused and must be
	     * sepcified as part of a config object passed as this paramter if needed.
	     * @param {String/Object} params (optional) The parameters to pass as either a url encoded string
	     * "&param1=1&param2=2" or as an object {param1: 1, param2: 2}
	     * @param {Function} callback (optional) Callback when transaction is complete - called with signature (oElement, bSuccess)
	     * @param {Boolean} refreshNow (optional) Whether to execute the refresh now, or wait the interval
	     */
	    startAutoRefresh : function(interval, url, params, callback, refreshNow){
		    var me = this;
	        if(refreshNow){
	            me.update(url || me.defaultUrl, params, callback, true);
	        }
	        if(me.autoRefreshProcId){
	            clearInterval(me.autoRefreshProcId);
	        }
	        me.autoRefreshProcId = setInterval(me.update.createDelegate(me, [url || me.defaultUrl, params, callback, true]), interval * 1000);
	    },
	
	    /**
	     * Stop auto refresh on this element.
	     */
	    stopAutoRefresh : function(){
	        if(this.autoRefreshProcId){
	            clearInterval(this.autoRefreshProcId);
	            delete this.autoRefreshProcId;
	        }
	    },
	
	    /**
	     * Returns true if the Updater is currently set to auto refresh its content (see {@link #startAutoRefresh}), otherwise false.
	     */
	    isAutoRefreshing : function(){
	       return !!this.autoRefreshProcId;
	    },
	
	    /**
	     * Display the element's "loading" state. By default, the element is updated with {@link #indicatorText}. This
	     * method may be overridden to perform a custom action while this Updater is actively updating its contents.
	     */
	    showLoading : function(){
	        if(this.showLoadIndicator){
            	this.el.dom.innerHTML = this.indicatorText;
	        }
	    },
	
	    /**
	     * Aborts the currently executing transaction, if any.
	     */
	    abort : function(){
	        if(this.transaction){
	            Ext.Ajax.abort(this.transaction);
	        }
	    },
	
	    /**
	     * Returns true if an update is in progress, otherwise false.
	     * @return {Boolean}
	     */
	    isUpdating : function(){        
	    	return this.transaction ? Ext.Ajax.isLoading(this.transaction) : false;        
	    },
	    
	    /**
	     * Refresh the element with the last used url or defaultUrl. If there is no url, it returns immediately
	     * @param {Function} callback (optional) Callback when transaction is complete - called with signature (oElement, bSuccess)
	     */
	    refresh : function(callback){
	        if(this.defaultUrl){
	        	this.update(this.defaultUrl, null, callback, true);
	    	}
	    }
    }
}());

/**
 * @class Ext.Updater.defaults
 * The defaults collection enables customizing the default properties of Updater
 */
Ext.Updater.defaults = {
   /**
     * Timeout for requests or form posts in seconds (defaults to 30 seconds).
     * @type Number
     */
    timeout : 30,    
    /**
     * True to append a unique parameter to GET requests to disable caching (defaults to false).
     * @type Boolean
     */
    disableCaching : false,
    /**
     * Whether or not to show {@link #indicatorText} during loading (defaults to true).
     * @type Boolean
     */
    showLoadIndicator : true,
    /**
     * Text for loading indicator (defaults to '&lt;div class="loading-indicator"&gt;Loading...&lt;/div&gt;').
     * @type String
     */
    indicatorText : '<div class="loading-indicator">Loading...</div>',
     /**
     * True to process scripts by default (defaults to false).
     * @type Boolean
     */
    loadScripts : false,
    /**
    * Blank page URL to use with SSL file uploads (defaults to {@link Ext#SSL_SECURE_URL} if set, or "javascript:false").
    * @type String
    */
    sslBlankUrl : (Ext.SSL_SECURE_URL || "javascript:false")      
};


/**
 * Static convenience method. <b>This method is deprecated in favor of el.load({url:'foo.php', ...})</b>.
 * Usage:
 * <pre><code>Ext.Updater.updateElement("my-div", "stuff.php");</code></pre>
 * @param {Mixed} el The element to update
 * @param {String} url The url
 * @param {String/Object} params (optional) Url encoded param string or an object of name/value pairs
 * @param {Object} options (optional) A config object with any of the Updater properties you want to set - for
 * example: {disableCaching:true, indicatorText: "Loading data..."}
 * @static
 * @deprecated
 * @member Ext.Updater
 */
Ext.Updater.updateElement = function(el, url, params, options){
    var um = Ext.get(el).getUpdater();
    Ext.apply(um, options);
    um.update(url, params, options ? options.callback : null);
};

/**
 * @class Ext.Updater.BasicRenderer
 * Default Content renderer. Updates the elements innerHTML with the responseText.
 */
Ext.Updater.BasicRenderer = function(){};

Ext.Updater.BasicRenderer.prototype = {
    /**
     * This is called when the transaction is completed and it's time to update the element - The BasicRenderer
     * updates the elements innerHTML with the responseText - To perform a custom render (i.e. XML or JSON processing),
     * create an object with a "render(el, response)" method and pass it to setRenderer on the Updater.
     * @param {Ext.Element} el The element being rendered
     * @param {Object} response The XMLHttpRequest object
     * @param {Updater} updateManager The calling update manager
     * @param {Function} callback A callback that will need to be called if loadScripts is true on the Updater
     */
     render : function(el, response, updateManager, callback){	     
        el.update(response.responseText, updateManager.loadScripts, callback);
    }
};