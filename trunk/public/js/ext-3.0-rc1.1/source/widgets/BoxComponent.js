/*
 * Ext JS Library 3.0 Pre-alpha
 * Copyright(c) 2006-2008, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

/**
 * @class Ext.BoxComponent
 * @extends Ext.Component
 * <p>Base class for any {@link Ext.Component Component} that is to be sized as a box, using width and height.</p>
 * <p>BoxComponent provides automatic box model adjustments for sizing and positioning and will work correctly
 * within the Component rendering model.</p>
 * <p>A BoxComponent may be created as a custom Component which encapsulates any HTML element, either a pre-existing
 * element, or one that is created to your specifications at render time. Usually, to participate in layouts,
 * a Component will need to be a <b>Box</b>Component in order to have its width and height managed.</p>
 * <p>To use a pre-existing element as a BoxComponent, configure it so that you preset the <b>el</b> property to the
 * element to reference:<pre><code>
var pageHeader = new Ext.BoxComponent({
    el: 'my-header-div'
});</code></pre>
 * This may then be {@link Ext.Container#add added} to a {@link Ext.Container Container} as a child item.</p>
 * <p>To create a BoxComponent based around a HTML element to be created at render time, use the
 * {@link Ext.Component#autoEl autoEl} config option which takes the form of a
 * {@link Ext.DomHelper DomHelper} specification:<pre><code>
var myImage = new Ext.BoxComponent({
    autoEl: {
        tag: 'img',
        src: '/images/my-image.jpg'
    }
});</code></pre></p>
 * @constructor
 * @param {Ext.Element/String/Object} config The configuration options.
 * @xtype box
 */
Ext.BoxComponent = Ext.extend(Ext.Component, {

	// Configs below are used for all Components when rendered by BorderLayout.
    /**
     * @cfg {String} region <p><b>Note</b>: this config is only used when this BoxComponent is rendered
     * by a Container which has been configured to use the <b>{@link Ext.layout.BorderLayout BorderLayout}</b>
     * layout manager (eg. specifying <tt>layout:'border'</tt>).</p><br>
     * <p>See {@link Ext.layout.BorderLayout} also.</p>
     */

    /**
     * @cfg {Number} x
     * The local x (left) coordinate for this component if contained within a positioning container.
     */
    /**
     * @cfg {Number} y
     * The local y (top) coordinate for this component if contained within a positioning container.
     */
    /**
     * @cfg {Number} pageX
     * The page level x coordinate for this component if contained within a positioning container.
     */
    /**
     * @cfg {Number} pageY
     * The page level y coordinate for this component if contained within a positioning container.
     */
    /**
     * @cfg {Number} height
     * The height of this component in pixels (defaults to auto).
     */
    /**
     * @cfg {Number} width
     * The width of this component in pixels (defaults to auto).
     */
    /**
     * @cfg {Boolean} autoHeight
     * True to use height:'auto', false to use fixed height (defaults to false). <b>Note</b>: Although many components 
     * inherit this config option, not all will function as expected with a height of 'auto'. Setting autoHeight:true 
     * means that the browser will manage height based on the element's contents, and that Ext will not manage it at all.
     */
    /**
     * @cfg {Boolean} autoWidth
     * True to use width:'auto', false to use fixed width (defaults to false). <b>Note</b>: Although many components 
     * inherit this config option, not all will function as expected with a width of 'auto'. Setting autoWidth:true 
     * means that the browser will manage width based on the element's contents, and that Ext will not manage it at all.
     */

    /* // private internal config
     * {Boolean} deferHeight
     * True to defer height calculations to an external component, false to allow this component to set its own
     * height (defaults to false).
     */

	// private
    initComponent : function(){
        Ext.BoxComponent.superclass.initComponent.call(this);
        this.addEvents(
            /**
             * @event resize
             * Fires after the component is resized.
             * @param {Ext.Component} this
             * @param {Number} adjWidth The box-adjusted width that was set
             * @param {Number} adjHeight The box-adjusted height that was set
             * @param {Number} rawWidth The width that was originally specified
             * @param {Number} rawHeight The height that was originally specified
             */
            'resize',
            /**
             * @event move
             * Fires after the component is moved.
             * @param {Ext.Component} this
             * @param {Number} x The new x position
             * @param {Number} y The new y position
             */
            'move'
        );
    },

    // private, set in afterRender to signify that the component has been rendered
    boxReady : false,
    // private, used to defer height settings to subclasses
    deferHeight: false,

    /**
     * Sets the width and height of this BoxComponent. This method fires the {@link #resize} event. This method can accept
     * either width and height as separate arguments, or you can pass a size object like <code>{width:10, height:20}</code>.
     * @param {Mixed} width The new width to set. This may be one of:<div class="mdetail-params"><ul>
     * <li>A Number specifying the new width in the {@link #getEl Element}'s {@link Ext.Element#defaultUnit}s (by default, pixels).</li>
     * <li>A String used to set the CSS width style.</li>
     * <li>A size object in the format <code>{width: widthValue, height: heightValue}</code>.</li>
     * <li><code>undefined</code> to leave the width unchanged.</li>
     * </ul></div>
     * @param {Mixed} height The new height to set (not required if a size object is passed as the first arg).
     * This may be one of:<div class="mdetail-params"><ul>
     * <li>A Number specifying the new height in the {@link #getEl Element}'s {@link Ext.Element#defaultUnit}s (by default, pixels).</li>
     * <li>A String used to set the CSS height style. Animation may <b>not</b> be used.</li>
     * <li><code>undefined</code> to leave the height unchanged.</li>
     * </ul></div>
     * @return {Ext.BoxComponent} this
     */
    setSize : function(w, h){
        // support for standard size objects
        if(typeof w == 'object'){
            h = w.height;
            w = w.width;
        }
        // not rendered
        if(!this.boxReady){
            this.width = w;
            this.height = h;
            return this;
        }

        // prevent recalcs when not needed
        if(this.cacheSizes !== false && this.lastSize && this.lastSize.width == w && this.lastSize.height == h){
            return this;
        }
        this.lastSize = {width: w, height: h};
        var adj = this.adjustSize(w, h);
        var aw = adj.width, ah = adj.height;
        if(aw !== undefined || ah !== undefined){ // this code is nasty but performs better with floaters
            var rz = this.getResizeEl();
            if(!this.deferHeight && aw !== undefined && ah !== undefined){
                rz.setSize(aw, ah);
            }else if(!this.deferHeight && ah !== undefined){
                rz.setHeight(ah);
            }else if(aw !== undefined){
                rz.setWidth(aw);
            }
            this.onResize(aw, ah, w, h);
            this.fireEvent('resize', this, aw, ah, w, h);
        }
        return this;
    },

    /**
     * Sets the width of the component.  This method fires the {@link #resize} event.
     * @param {Number} width The new width to setThis may be one of:<div class="mdetail-params"><ul>
     * <li>A Number specifying the new width in the {@link #getEl Element}'s {@link Ext.Element#defaultUnit}s (by default, pixels).</li>
     * <li>A String used to set the CSS width style.</li>
     * </ul></div>
     * @return {Ext.BoxComponent} this
     */
    setWidth : function(width){
        return this.setSize(width);
    },

    /**
     * Sets the height of the component.  This method fires the {@link #resize} event.
     * @param {Number} height The new height to set. This may be one of:<div class="mdetail-params"><ul>
     * <li>A Number specifying the new height in the {@link #getEl Element}'s {@link Ext.Element#defaultUnit}s (by default, pixels).</li>
     * <li>A String used to set the CSS height style.</li>
     * <li><i>undefined</i> to leave the height unchanged.</li>
     * </ul></div>
     * @return {Ext.BoxComponent} this
     */
    setHeight : function(height){
        return this.setSize(undefined, height);
    },

    /**
     * Gets the current size of the component's underlying element.
     * @return {Object} An object containing the element's size {width: (element width), height: (element height)}
     */
    getSize : function(){
        return this.getResizeEl().getSize();
    },

    /**
     * Gets the current width of the component's underlying element.
     * @return {Number}
     */
    getWidth : function(){
        return this.getResizeEl().getWidth();
    },

    /**
     * Gets the current height of the component's underlying element.
     * @return {Number}
     */
    getHeight : function(){
        return this.getResizeEl().getHeight();
    },

    /**
     * Gets the current size of the component's underlying element, including space taken by its margins.
     * @return {Object} An object containing the element's size {width: (element width + left/right margins), height: (element height + top/bottom margins)}
     */
    getOuterSize : function(){
        var el = this.getResizeEl();
        return {width: el.getWidth() + el.getMargins('lr'),
                height: el.getHeight() + el.getMargins('tb')};
    },

    /**
     * Gets the current XY position of the component's underlying element.
     * @param {Boolean} local (optional) If true the element's left and top are returned instead of page XY (defaults to false)
     * @return {Array} The XY position of the element (e.g., [100, 200])
     */
    getPosition : function(local){
        var el = this.getPositionEl();
        if(local === true){
            return [el.getLeft(true), el.getTop(true)];
        }
        return this.xy || el.getXY();
    },

    /**
     * Gets the current box measurements of the component's underlying element.
     * @param {Boolean} local (optional) If true the element's left and top are returned instead of page XY (defaults to false)
     * @return {Object} box An object in the format {x, y, width, height}
     */
    getBox : function(local){
        var pos = this.getPosition(local);
        var s = this.getSize();
        s.x = pos[0];
        s.y = pos[1];
        return s;
    },

    /**
     * Sets the current box measurements of the component's underlying element.
     * @param {Object} box An object in the format {x, y, width, height}
     * @return {Ext.BoxComponent} this
     */
    updateBox : function(box){
        this.setSize(box.width, box.height);
        this.setPagePosition(box.x, box.y);
        return this;
    },

    // protected
    getResizeEl : function(){
        return this.resizeEl || this.el;
    },

    // protected
    getPositionEl : function(){
        return this.positionEl || this.el;
    },

    /**
     * Sets the left and top of the component.  To set the page XY position instead, use {@link #setPagePosition}.
     * This method fires the {@link #move} event.
     * @param {Number} left The new left
     * @param {Number} top The new top
     * @return {Ext.BoxComponent} this
     */
    setPosition : function(x, y){
        if(x && typeof x[1] == 'number'){
            y = x[1];
            x = x[0];
        }
        this.x = x;
        this.y = y;
        if(!this.boxReady){
            return this;
        }
        var adj = this.adjustPosition(x, y);
        var ax = adj.x, ay = adj.y;

        var el = this.getPositionEl();
        if(ax !== undefined || ay !== undefined){
            if(ax !== undefined && ay !== undefined){
                el.setLeftTop(ax, ay);
            }else if(ax !== undefined){
                el.setLeft(ax);
            }else if(ay !== undefined){
                el.setTop(ay);
            }
            this.onPosition(ax, ay);
            this.fireEvent('move', this, ax, ay);
        }
        return this;
    },

    /**
     * Sets the page XY position of the component.  To set the left and top instead, use {@link #setPosition}.
     * This method fires the {@link #move} event.
     * @param {Number} x The new x position
     * @param {Number} y The new y position
     * @return {Ext.BoxComponent} this
     */
    setPagePosition : function(x, y){
        if(x && typeof x[1] == 'number'){
            y = x[1];
            x = x[0];
        }
        this.pageX = x;
        this.pageY = y;
        if(!this.boxReady){
            return;
        }
        if(x === undefined || y === undefined){ // cannot translate undefined points
            return;
        }
        var p = this.getPositionEl().translatePoints(x, y);
        this.setPosition(p.left, p.top);
        return this;
    },

    // private
    onRender : function(ct, position){
        Ext.BoxComponent.superclass.onRender.call(this, ct, position);
        if(this.resizeEl){
            this.resizeEl = Ext.get(this.resizeEl);
        }
        if(this.positionEl){
            this.positionEl = Ext.get(this.positionEl);
        }
    },

    // private
    afterRender : function(){
        Ext.BoxComponent.superclass.afterRender.call(this);
        this.boxReady = true;
        this.setSize(this.width, this.height);
        if(this.x || this.y){
            this.setPosition(this.x, this.y);
        }else if(this.pageX || this.pageY){
            this.setPagePosition(this.pageX, this.pageY);
        }
    },

    /**
     * Force the component's size to recalculate based on the underlying element's current height and width.
     * @return {Ext.BoxComponent} this
     */
    syncSize : function(){
        delete this.lastSize;
        this.setSize(this.autoWidth ? undefined : this.getResizeEl().getWidth(), this.autoHeight ? undefined : this.getResizeEl().getHeight());
        return this;
    },

    /* // protected
     * Called after the component is resized, this method is empty by default but can be implemented by any
     * subclass that needs to perform custom logic after a resize occurs.
     * @param {Number} adjWidth The box-adjusted width that was set
     * @param {Number} adjHeight The box-adjusted height that was set
     * @param {Number} rawWidth The width that was originally specified
     * @param {Number} rawHeight The height that was originally specified
     */
    onResize : function(adjWidth, adjHeight, rawWidth, rawHeight){

    },

    /* // protected
     * Called after the component is moved, this method is empty by default but can be implemented by any
     * subclass that needs to perform custom logic after a move occurs.
     * @param {Number} x The new x position
     * @param {Number} y The new y position
     */
    onPosition : function(x, y){

    },

    // private
    adjustSize : function(w, h){
        if(this.autoWidth){
            w = 'auto';
        }
        if(this.autoHeight){
            h = 'auto';
        }
        return {width : w, height: h};
    },

    // private
    adjustPosition : function(x, y){
        return {x : x, y: y};
    }
});
Ext.reg('box', Ext.BoxComponent);


/**
 * @class Ext.Spacer
 * @extends Ext.BoxComponent
 * <p>Used to provide a sizable space in a layout.</p>
 * @constructor
 * @param {Object} config
 */
Ext.Spacer = Ext.extend(Ext.BoxComponent, {
    autoEl:'div'
});
Ext.reg('spacer', Ext.Spacer);