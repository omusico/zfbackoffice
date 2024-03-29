/*
 * Ext JS Library 3.0 Pre-alpha
 * Copyright(c) 2006-2008, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

Ext.ns("Ext.samples");

(function() {

SamplePanel = Ext.extend(Ext.DataView, {
    autoHeight   : true,
    frame        : true,
    cls          : 'demos',
    itemSelector : 'dd',
    overClass    : 'over',
    tpl          : new Ext.XTemplate(
        '<div id="sample-ct">',
            '<tpl for=".">',
            '<div><a name="{id}"></a><h2><div>{title}</div></h2>',
            '<dl>',
                '<tpl for="samples">',
                    '<dd ext:url="{url}"><img src="shared/screens/{icon}"/>',
                        '<div><h4>{text}',
                            '<tpl if="values.isNew"><span class="new-sample"> (New)</span></tpl>',
                            '<tpl if="values.isUpdated"><span class="updated-sample"> (Updated)</span></tpl>',
                        '</h4><p>{desc}</p></div>',
                    '</dd>',
                '</tpl>',
            '<div style="clear:left"></div></dl></div>',
            '</tpl>',
        '</div>'
    ),

    onClick : function(e){
        var group = e.getTarget('h2', 3, true);
        if(group){
            group.up('div').toggleClass('collapsed');
        }else {
            var t = e.getTarget('dd', 5, true);
            if(t && !e.getTarget('a', 2)){
                var url = t.getAttributeNS('ext', 'url');
                window.open(url);
            }
        }
        return SamplePanel.superclass.onClick.apply(this, arguments);
    }
});
Ext.samples.SamplePanel = SamplePanel;
Ext.reg('samplespanel', Ext.samples.SamplePanel);
})();

Ext.onReady(function(){


// Instantiate Ext.App instance
    App = new Ext.App({});

    var catalog = Ext.samples.samplesCatalog;

    for(var i = 0, c; c = catalog[i]; i++){
        c.id = 'sample-' + i;
    }

    var store = new Ext.data.JsonStore({
        idProperty : 'id',
        fields     : ['id', 'title', 'samples'],
        data       : catalog
    });

    var panel = new Ext.Panel({
        frame      : true,
        renderTo   : 'all-demos',
        height     : 300,
        autoScroll : true,
        items      : new SamplePanel({
            store : store
        })
    });

    var tpl = new Ext.XTemplate(
        '<tpl for="."><li><a href="#{id}">{title:stripTags}</a></li></tpl>'
    );
    tpl.overwrite('sample-menu', catalog);

    Ext.select('#sample-spacer').remove();

    var headerEl  = Ext.get('hd'),
        footerEl  = Ext.get('ft'),
        bodyEl    = Ext.get('bd'),
        sideBoxEl = bodyEl.child('div[class=side-box]'),
        titleEl   = bodyEl.child('h3:first-child');

    var doResize = function() {
        var windowHeight = Ext.getDoc().getViewSize().height;

        var footerHeight  = footerEl.getHeight() + footerEl.getMargins().top,
            titleElHeight = titleEl.getHeight() + titleEl.getMargins().top,
            brElHeight    = bodyEl.child('br').getHeight(),
            headerHeight  = headerEl.getHeight() + titleElHeight + brElHeight;

        var warnEl = Ext.get('fb');
        var warnHeight = warnEl ? warnEl.getHeight() : 0;

        var availHeight = windowHeight - ( footerHeight + headerHeight + 14) - warnHeight;
        var sideBoxHeight = sideBoxEl.getHeight();

        panel.setHeight((availHeight > sideBoxHeight) ? availHeight : sideBoxHeight);
    }

    // Resize on demand
    Ext.EventManager.onWindowResize(doResize);

    var firebugWarning = function () {
        var cp = new Ext.state.CookieProvider();

        if(window.console && window.console.firebug && ! cp.get('hideFBWarning')){
            var tpl = new Ext.Template(
                '<div id="fb" style="border: 1px solid #FF0000; background-color:#FFAAAA; display:none; padding:15px; color:#000000;"><b>Warning: </b> Firebug is known to cause performance issues with Ext JS. <a href="#" id="hideWarning">[ Hide ]</a></div>'
            );
            var newEl = tpl.insertFirst('all-demos');

            Ext.fly('hideWarning').on('click', function() {
                Ext.fly(newEl).slideOut('t',{remove:true});
                cp.set('hideFBWarning', true);
                doResize();
            });
            Ext.fly(newEl).slideIn();
            doResize();
        }
    }

    var hideMask = function () {
        Ext.get('loading').remove();
        Ext.fly('loading-mask').fadeOut({
            remove:true,
            callback : firebugWarning
        });
    }

    hideMask.defer(250);
    doResize();

});