/*
 * Ext JS Library 3.0 Pre-alpha
 * Copyright(c) 2006-2008, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

// A DropZone which cooperates with DragZones whose dragData contains
// a "field" property representing a form Field. Fields may be dropped onto
// grid data cells containing a matching data type.
Ext.ux.CellFieldDropZone = Ext.extend(Ext.dd.DropZone, {
    constructor: function(){},

//  Call the DropZone constructor using the View's scrolling element
//  only after the grid has been rendered.
    init: function(grid) {
        if (grid.rendered) {
            this.grid = grid;
            this.view = grid.getView();
            this.store = grid.getStore();
            Ext.ux.CellFieldDropZone.superclass.constructor.call(this, this.view.scroller);
        } else {
            grid.on('render', this.init, this);
        }
    },

//  Scroll the main configured Element when we drag close to the edge
    containerScroll: true,

    getTargetFromEvent: function(e) {
//      Ascertain whether the mousemove is within a grid cell
        var t = e.getTarget(this.view.cellSelector);
        if (t) {

//          We *are* within a grid cell, so ask the View exactly which one,
//          Extract data from the Model to create a target object for
//          processing in subsequent onNodeXXXX methods. Note that the target does
//          not have to be a DOM element. It can be whatever the noNodeXXX methods are
//          programmed to expect.
            var rowIndex = this.view.findRowIndex(t);
            var columnIndex = this.view.findCellIndex(t);
            if ((rowIndex !== false) && (columnIndex !== false)) {
                return {
                    node: t,
                    record: this.store.getAt(rowIndex),
                    fieldName: this.grid.getColumnModel().getDataIndex(columnIndex)
                }
            }
        }
    },

//  On Node enter, see if it is valid for us to drop the field on that type of column.
    onNodeEnter: function(target, dd, e, dragData) {
        delete this.dropOK;
        if (!target) {
            return;
        }

//      Check that a field is being dragged.
        var f = dragData.field;
        if (!f) {
            return;
        }

//      Check whether the data type of the column being dropped on accepts the
//      dragged field type. If so, set dropOK flag, and highlight the target node.
        var type = target.record.fields.get(target.fieldName).type;
        switch (type) {
            case 'float':
            case 'int':
                if (!f.isXType('numberfield')) {
                    return;
                }
                break;
            case 'date':
                if (!f.isXType('datefield')) {
                    return;
                }
                break;
            case 'boolean':
                if (!f.isXType('checkbox')) {
                    return;
                }
        }
        this.dropOK = true;
        Ext.fly(target.node).addClass('x-drop-target-active');
    },

//  Return the class name to add to the drag proxy. This provides a visual indication
//  of drop allowed or not allowed.
    onNodeOver: function(target, dd, e, dragData) {
        return this.dropOK ? this.dropAllowed : this.dropNotAllowed;
    },

//   nhighlight the target node.
    onNodeOut: function(target, dd, e, dragData) {
        Ext.fly(target.node).removeClass('x-drop-target-active');
    },

//  Process the drop event if we have previously ascertained that a drop is OK.
    onNodeDrop: function(target, dd, e, dragData) {
        if (this.dropOK) {
            target.record.set(target.fieldName, dragData.field.getValue());
            return true;
        }
    }
});

//  A class which makes Fields within a Panel draggable.
//  the dragData delivered to a coooperating DropZone's methods contains
//  the dragged Field in the property "field".
Ext.ux.PanelFieldDragZone = Ext.extend(Ext.dd.DragZone, {
    constructor: function(){},

//  Call the DRagZone's constructor. The Panel must have been rendered.
    init: function(panel) {
        if (panel.nodeType) {
            Ext.ux.PanelFieldDragZone.superclass.init.apply(this, arguments);
        } else {
            if (panel.rendered) {
                Ext.ux.PanelFieldDragZone.superclass.constructor.call(this, panel.getEl());
                var i = Ext.fly(panel.getEl()).select('input');
                i.unselectable();
            } else {
                panel.on('afterlayout', this.init, this, {single: true});
            }
        }
    },

    scroll: false,

//  On mousedown, we ascertain whether it is on one of our draggable Fields.
//  If so, we collect data about the draggable object, and return a drag data
//  object which contains our own data, plus a "ddel" property which is a DOM
//  node which provides a "view" of the dragged data.
    getDragData: function(e) {
        var t = e.getTarget('input');
        if (t) {
            e.stopEvent();

//          Ugly code to "detach" the drag gesture from the input field.
//          Without this, Opera never changes the mouseover target from the input field
//          even when dragging outside of the field - it just keeps selecting.
            if (Ext.isOpera) {
                Ext.fly(t).on('mousemove', function(e1){
                    t.style.visibility = 'hidden';
                    (function(){
                        t.style.visibility = '';
                    }).defer(1);
                }, null, {single:true});
            }

//          Get the data we are dragging: the Field
//          create a ddel for the drag proxy to display
            var f = Ext.getCmp(t.id);
            var d = document.createElement('div');
            d.className = 'x-form-text';
            d.appendChild(document.createTextNode(t.value));
            Ext.fly(d).setWidth(f.getEl().getWidth());
            return {
                field: f,
                ddel: d
            };
        }
    },

//  The coordinates to slide the drag proxy back to on failed drop.
    getRepairXY: function() {
        return this.dragData.field.getEl().getXY();
    }
});

Ext.onReady(function(){

    var myData = [
        ['3m Co',71.72,0.02,0.03,'9/1 12:00am'],
        ['Alcoa Inc',29.01,0.42,1.47,'9/1 12:00am'],
        ['Altria Group Inc',83.81,0.28,0.34,'9/1 12:00am'],
        ['American Express Company',52.55,0.01,0.02,'9/1 12:00am'],
        ['American International Group, Inc.',64.13,0.31,0.49,'9/1 12:00am'],
        ['AT&T Inc.',31.61,-0.48,-1.54,'9/1 12:00am'],
        ['Boeing Co.',75.43,0.53,0.71,'9/1 12:00am'],
        ['Caterpillar Inc.',67.27,0.92,1.39,'9/1 12:00am'],
        ['Citigroup, Inc.',49.37,0.02,0.04,'9/1 12:00am'],
        ['E.I. du Pont de Nemours and Company',40.48,0.51,1.28,'9/1 12:00am'],
        ['Exxon Mobil Corp',68.1,-0.43,-0.64,'9/1 12:00am'],
        ['General Electric Company',34.14,-0.08,-0.23,'9/1 12:00am'],
        ['General Motors Corporation',30.27,1.09,3.74,'9/1 12:00am'],
        ['Hewlett-Packard Co.',36.53,-0.03,-0.08,'9/1 12:00am'],
        ['Honeywell Intl Inc',38.77,0.05,0.13,'9/1 12:00am'],
        ['Intel Corporation',19.88,0.31,1.58,'9/1 12:00am'],
        ['International Business Machines',81.41,0.44,0.54,'9/1 12:00am'],
        ['Johnson & Johnson',64.72,0.06,0.09,'9/1 12:00am'],
        ['JP Morgan & Chase & Co',45.73,0.07,0.15,'9/1 12:00am'],
        ['McDonald\'s Corporation',36.76,0.86,2.40,'9/1 12:00am'],
        ['Merck & Co., Inc.',40.96,0.41,1.01,'9/1 12:00am'],
        ['Microsoft Corporation',25.84,0.14,0.54,'9/1 12:00am'],
        ['Pfizer Inc',27.96,0.4,1.45,'9/1 12:00am'],
        ['The Coca-Cola Company',45.07,0.26,0.58,'9/1 12:00am'],
        ['The Home Depot, Inc.',34.64,0.35,1.02,'9/1 12:00am'],
        ['The Procter & Gamble Company',61.91,0.01,0.02,'9/1 12:00am'],
        ['United Technologies Corporation',63.26,0.55,0.88,'9/1 12:00am'],
        ['Verizon Communications',35.57,0.39,1.11,'9/1 12:00am'],
        ['Wal-Mart Stores, Inc.',45.45,0.73,1.63,'9/1 12:00am']
    ];

    // example of custom renderer function
    function change(val){
        if(val > 0){
            return '<span style="color:green;">' + val + '</span>';
        }else if(val < 0){
            return '<span style="color:red;">' + val + '</span>';
        }
        return val;
    }

    // example of custom renderer function
    function pctChange(val){
        if(val > 0){
            return '<span style="color:green;">' + val + '%</span>';
        }else if(val < 0){
            return '<span style="color:red;">' + val + '%</span>';
        }
        return val;
    }

    // create the data store
    var store = new Ext.data.ArrayStore({
        fields: [
           {name: 'company'},
           {name: 'price', type: 'float'},
           {name: 'change', type: 'float'},
           {name: 'pctChange', type: 'float'},
           {name: 'lastChange', type: 'date', dateFormat: 'n/j h:ia'}
        ]
    });
    store.loadData(myData);
    
    var helpWindow = new Ext.Window({
        title: 'Source code',
        width: 920,
        height: 500,
        closeAction: 'hide',
        bodyCfg: {tag: 'textarea', readonly: true},
        bodyStyle: {
            backgroundColor: 'white',
            margin: '0px',
            border: '0px none'
        },
        listeners: {
            render: function(w) {
                Ext.Ajax.request({
                    url: 'field-to-grid-dd.js',
                    success: function(r) {
                        w.body.dom.value = r.responseText;
                    }
                });
            }
        }
    });

    // create the Grid
    var grid = new Ext.grid.GridPanel({
        store: store,
        columns: [
            {id:'company',header: "Company", width: 160, sortable: true, dataIndex: 'company'},
            {header: "Price", width: 75, sortable: true, renderer: 'usMoney', dataIndex: 'price'},
            {header: "Change", width: 75, sortable: true, renderer: change, dataIndex: 'change'},
            {header: "% Change", width: 75, sortable: true, renderer: pctChange, dataIndex: 'pctChange'},
            {header: "Last Updated", width: 85, sortable: true, renderer: Ext.util.Format.dateRenderer('m/d/Y'), dataIndex: 'lastChange'}
        ],
        plugins: new Ext.ux.CellFieldDropZone(),
        stripeRows: true,
        autoExpandColumn: 'company',
        height:350,
        width:600,
        title:'Array Grid',
        bbar: new Ext.PagingToolbar({
            buttons: [{
                text: 'View Source',
                handler: function() {
                    helpWindow.show();
                }
            }],
            store: store,
            pageSize: 25
        })
    });

    grid.render('grid-example');
    grid.getSelectionModel().selectFirstRow();

    var f = new Ext.Panel({
        frame: true,
        layout: 'form',
        width: 600,
        plugins: new Ext.ux.PanelFieldDragZone(),
        style: {
            'margin-top': '10px'
        },
        labelWidth: 150,
        items: [{
            xtype: 'textfield',
            fieldLabel: 'Drag this text',
            value: 'test'
        },{
            xtype: 'numberfield',
            fieldLabel: 'Drag this number',
            value: '1.2'
        },{
            xtype: 'datefield',
            fieldLabel: 'Drag this date',
            value: new Date()
        }],
        renderTo: Ext.getBody()
    });
});