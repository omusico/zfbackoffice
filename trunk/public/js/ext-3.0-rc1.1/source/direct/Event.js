/*
 * Ext JS Library 3.0 Pre-alpha
 * Copyright(c) 2006-2008, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

Ext.Direct.Event = function(config){
    Ext.apply(this, config);
}
Ext.Direct.Event.prototype = {
    status: true,
    getData: function(){
        return this.data;
    }
};

Ext.Direct.RemotingEvent = Ext.extend(Ext.Direct.Event, {
    type: 'rpc',
    getTransaction: function(){
        return this.transaction || Ext.Direct.getTransaction(this.tid);
    }
});

Ext.Direct.ExceptionEvent = Ext.extend(Ext.Direct.RemotingEvent, {
    status: false,
    type: 'exception'
});

Ext.Direct.eventTypes = {
    'rpc':  Ext.Direct.RemotingEvent,
    'event':  Ext.Direct.Event,
    'exception':  Ext.Direct.ExceptionEvent
};

