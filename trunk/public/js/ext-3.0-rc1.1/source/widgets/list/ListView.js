/*
 * Ext JS Library 3.0 Pre-alpha
 * Copyright(c) 2006-2008, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

/**
 * @class Ext.ListView
 * @extends Ext.DataView
 * <p>Built using the {@link Ext.XTemplate} Class, Ext.ListView offers a fast and light-weight implentation
 * of a {@link Ext.grid.GridPanel Grid} like view with resizable columns. This view has no horizontal scrolling
 * as column widths are initially proportioned by percentage based on the container width and number of columns.</p>
 * <p>Example usage:</p>
 * <pre><code>
// consume JSON of this form:
{
   "images":[
      {
         "name":"dance_fever.jpg",
         "size":2067,
         "lastmod":1236974993000,
         "url":"images\/thumbs\/dance_fever.jpg"
      },
      {
         "name":"zack_sink.jpg",
         "size":2303,
         "lastmod":1236974993000,
         "url":"images\/thumbs\/zack_sink.jpg"
      }
   ]
} 
var store = new Ext.data.JsonStore({
    url: 'get-images.php',
    root: 'images',
    fields: [
        'name', 'url',
        {name:'size', type: 'float'},
        {name:'lastmod', type:'date', dateFormat:'timestamp'}
    ]
});
store.load();

var listView = new Ext.ListView({
    store: store,
    multiSelect: true,
    emptyText: 'No images to display',
    reserveScrollOffset: true,
    columns: [{
        header: 'File',
        width: .5,
        dataIndex: 'name'
    },{
        header: 'Last Modified',
        width: .35, 
        dataIndex: 'lastmod',
        tpl: '{lastmod:date("m-d h:i a")}'
    },{
        header: 'Size',
        dataIndex: 'size',
        tpl: '{size:fileSize}', // format using Ext.util.Format.fileSize()
        align: 'right'
    }]
});

// put it in a Panel so it looks pretty
var panel = new Ext.Panel({
    id:'images-view',
    width:425,
    height:250,
    collapsible:true,
    layout:'fit',
    title:'Simple ListView <i>(0 items selected)</i>',
    items: listView
});
panel.render(document.body);

// little bit of feedback
listView.on('selectionchange', function(view, nodes){
    var l = nodes.length;
    var s = l != 1 ? 's' : '';
    panel.setTitle('Simple ListView <i>('+l+' item'+s+' selected)</i>');
});
 * </code></pre>
 * @constructor
 * @param {Object} config
 * @xtype listview
 */
Ext.ListView = Ext.extend(Ext.DataView, {
    /**
     * Set this property to <tt>true</tt> to disable the header click handler disabling sort
     * (defaults to <tt>false</tt>).
     * @type Boolean
     * @property disableHeaders
     */
    /**
     * @cfg {Boolean} hideHeaders
     * <tt>true</tt> to hide the {@link #internalTpl header row} (defaults to <tt>false</tt> so
     * the {@link #internalTpl header row} will be shown).
     */
    /**
     * @cfg {String} itemSelector
     * Defaults to <tt>'dl'</tt> to work with the preconfigured <b><tt>{@link Ext.DataView#tpl tpl}</tt></b>.
     * This setting specifies the CSS selector (e.g. <tt>div.some-class</tt> or <tt>span:first-child</tt>)
     * that will be used to determine what nodes the ListView will be working with.   
     */
    itemSelector: 'dl',
    /**
     * @cfg {String} selectedClass The CSS class applied to a selected row (defaults to
     * <tt>'x-list-selected'</tt>). An example overriding the default styling:
    <pre><code>
    .x-list-selected {background-color: yellow;}
    </code></pre>
     * @type String
     */
    selectedClass:'x-list-selected',
    /**
     * @cfg {String} overClass The CSS class applied when over a row (defaults to
     * <tt>'x-list-over'</tt>). An example overriding the default styling:
    <pre><code>
    .x-list-over {background-color: orange;}
    </code></pre>
     * @type String
     */
    overClass:'x-list-over',
    /**
     * @cfg {Boolean} reserveScrollOffset
     * By default will defer accounting for the configured <b><tt>{@link #scrollOffset}</tt></b>
     * for 10 milliseconds.  Specify <tt>true</tt> to account for the configured
     * <b><tt>{@link #scrollOffset}</tt></b> immediately.
     */
    /**
     * @cfg {Number} scrollOffset The amount of space to reserve for the scrollbar (defaults to
     * <tt>19</tt> pixels)
     */
    scrollOffset : 19,
    /**
     * @cfg {Boolean/Object} columnResize
     * Specify <tt>true</tt> or specify a configuration object for {@link Ext.ListView.ColumnResizer}
     * to enable the columns to be resizable (defaults to <tt>true</tt>).
     */
    columnResize: true,
    /**
     * @cfg {Array} columns An array of column configuration objects, for example:
     * <pre><code>
{
    align: 'right',
    dataIndex: 'size',
    header: 'Size',
    tpl: '{size:fileSize}',
    width: .35
}
     * </code></pre> 
     * Acceptable properties for each column configuration object are:
     * <div class="mdetail-params"><ul>
     * <li><b><tt>align</tt></b> : String<div class="sub-desc">Set the CSS text-align property
     * of the column. Defaults to <tt>'left'</tt>.</div></li>
     * <li><b><tt>dataIndex</tt></b> : String<div class="sub-desc">See {@link Ext.grid.Column}.
     * {@link Ext.grid.Column#dataIndex dataIndex} for details.</div></li>
     * <li><b><tt>header</tt></b> : String<div class="sub-desc">See {@link Ext.grid.Column}.
     * {@link Ext.grid.Column#header header} for details.</div></li>
     * <li><b><tt>tpl</tt></b> : String<div class="sub-desc">Specify a string to pass as the
     * configuration string for {@link Ext.XTemplate}.  By default an {@link Ext.XTemplate}
     * will be implicitly created using the <tt>dataIndex</tt>.</div></li>
     * <li><b><tt>width</tt></b> : Number<div class="sub-desc">Percentage of the container width
     * this column should be allocated.  Columns that have no width specified will be
     * allocated with an equal percentage to fill 100% of the container width.  To easily take
     * advantage of the full container width, leave the width of at least one column undefined.
     * Note that if you do not want to take up the full width of the container, the width of
     * every column needs to be explicitly defined.</div></li>
     * </ul></div>
     */
    /**
     * @cfg {Boolean/Object} columnSort
     * Specify <tt>true</tt> or specify a configuration object for {@link Ext.ListView.Sorter}
     * to enable the columns to be sortable (defaults to <tt>true</tt>).
     */
    columnSort: true,
    /**
     * @cfg {String/Array} internalTpl
     * The template to be used for the header row.  See {@link #tpl} for more details.
     */

    initComponent : function(){
        if(this.columnResize){
            this.colResizer = new Ext.ListView.ColumnResizer(this.colResizer);
            this.colResizer.init(this);
        }
        if(this.columnSort){
            this.colSorter = new Ext.ListView.Sorter(this.columnSort);
            this.colSorter.init(this);
        }
        if(!this.internalTpl){
            this.internalTpl = new Ext.XTemplate(
                '<div class="x-list-header"><div class="x-list-header-inner">',
                    '<tpl for="columns">',
                    '<div style="width:{width}%;text-align:{align};"><em unselectable="on" id="',this.id, '-xlhd-{#}">',
                        '{header}',
                    '</em></div>',
                    '</tpl>',
                    '<div class="x-clear"></div>',
                '</div></div>',
                '<div class="x-list-body"><div class="x-list-body-inner">',
                '</div></div>'
            );
        }
        if(!this.tpl){
            this.tpl = new Ext.XTemplate(
                '<tpl for="rows">',
                    '<dl>',
                        '<tpl for="parent.columns">',
                        '<dt style="width:{width}%;text-align:{align};"><em unselectable="on">',
                            '{[values.tpl.apply(parent)]}',
                        '</em></dt>',
                        '</tpl>',
                        '<div class="x-clear"></div>',
                    '</dl>',
                '</tpl>'
            );
        };
        var cs = this.columns, allocatedWidth = 0, colsWithWidth = 0, len = cs.length;
        for(var i = 0; i < len; i++){
            var c = cs[i];
            if(!c.tpl){
                c.tpl = new Ext.XTemplate('{' + c.dataIndex + '}');
            }else if(typeof c.tpl == 'string'){
                c.tpl = new Ext.XTemplate(c.tpl);
            }
            c.align = c.align || 'left';
            if(typeof c.width == 'number'){
                c.width *= 100;
                allocatedWidth += c.width;
                colsWithWidth++;
            }
        }
        // auto calculate missing column widths
        if(colsWithWidth < len){
            var remaining = len - colsWithWidth;
            if(allocatedWidth < 100){
                var perCol = ((100-allocatedWidth) / remaining);
                for(var j = 0; j < len; j++){
                    var c = cs[j];
                    if(typeof c.width != 'number'){
                        c.width = perCol;
                    }
                }
            }
        }
        Ext.ListView.superclass.initComponent.call(this);
    },

    onRender : function(){
        Ext.ListView.superclass.onRender.apply(this, arguments);

        this.internalTpl.overwrite(this.el, {columns: this.columns});
        
        this.innerBody = Ext.get(this.el.dom.childNodes[1].firstChild);
        this.innerHd = Ext.get(this.el.dom.firstChild.firstChild);

        if(this.hideHeaders){
            this.el.dom.firstChild.style.display = 'none';
        }
    },

    getTemplateTarget : function(){
        return this.innerBody;
    },

    /**
     * <p>Function which can be overridden which returns the data object passed to this
     * view's {@link #tpl template} to render the whole ListView. The returned object 
     * shall contain the following properties:</p>
     * <div class="mdetail-params"><ul>
     * <li><b>columns</b> : String<div class="sub-desc">See <tt>{@link #columns}</tt></div></li>
     * <li><b>rows</b> : String<div class="sub-desc">See
     * <tt>{@link Ext.DataView}.{@link Ext.DataView#collectData collectData}</div></li>
     * </ul></div>
     * @param {Array} records An Array of {@link Ext.data.Record}s to be rendered into the DataView.
     * @param {Number} startIndex the index number of the Record being prepared for rendering.
     * @return {Object} A data object containing properties to be processed by a repeating
     * XTemplate as described above.
     */
    collectData : function(){
        var rs = Ext.ListView.superclass.collectData.apply(this, arguments);
        return {
            columns: this.columns,
            rows: rs
        }
    },

    verifyInternalSize : function(){
        if(this.lastSize){
            this.onResize(this.lastSize.width, this.lastSize.height);
        }
    },

    // private
    onResize : function(w, h){
        var bd = this.innerBody.dom;
        var hd = this.innerHd.dom
        if(!bd){
            return;
        }
        var bdp = bd.parentNode;
        if(typeof w == 'number'){
            var sw = w - this.scrollOffset;
            if(this.reserveScrollOffset || ((bdp.offsetWidth - bdp.clientWidth) > 10)){
                bd.style.width = sw + 'px';
                hd.style.width = sw + 'px';
            }else{
                bd.style.width = w + 'px';
                hd.style.width = w + 'px';
                setTimeout(function(){
                    if((bdp.offsetWidth - bdp.clientWidth) > 10){
                        bd.style.width = sw + 'px';
                        hd.style.width = sw + 'px';
                    }
                }, 10);
            }
        }
        if(typeof h == 'number'){
            bdp.style.height = (h - hd.parentNode.offsetHeight) + 'px';
        }
    },

    updateIndexes : function(){
        Ext.ListView.superclass.updateIndexes.apply(this, arguments);
        this.verifyInternalSize();
    },

    findHeaderIndex : function(hd){
        hd = hd.dom || hd;
        var pn = hd.parentNode, cs = pn.parentNode.childNodes;
        for(var i = 0, c; c = cs[i]; i++){
            if(c == pn){
                return i;
            }
        }
        return -1;
    },

    setHdWidths : function(){
        var els = this.innerHd.dom.getElementsByTagName('div');
        for(var i = 0, cs = this.columns, len = cs.length; i < len; i++){
            els[i].style.width = cs[i].width + '%';
        }
    }
});

Ext.reg('listview', Ext.ListView);