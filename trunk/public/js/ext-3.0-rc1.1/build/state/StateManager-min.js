/*
 * Ext JS Library 3.0 Pre-alpha
 * Copyright(c) 2006-2008, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */


Ext.state.Manager=function(){var provider=new Ext.state.Provider();return{setProvider:function(stateProvider){provider=stateProvider;},get:function(key,defaultValue){return provider.get(key,defaultValue);},set:function(key,value){provider.set(key,value);},clear:function(key){provider.clear(key);},getProvider:function(){return provider;}};}();