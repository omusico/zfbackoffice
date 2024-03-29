/*
 * Ext JS Library 3.0 Pre-alpha
 * Copyright(c) 2006-2008, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */


(function(){var abs=Math.abs,pi=Math.PI,asin=Math.asin,pow=Math.pow,sin=Math.sin,EXTLIB=Ext.lib;Ext.apply(EXTLIB.Easing,{easeBoth:function(t,b,c,d){return((t/=d/2)<1)?c/2*t*t+b:-c/2*((--t)*(t-2)-1)+b;},easeInStrong:function(t,b,c,d){return c*(t/=d)*t*t*t+b;},easeOutStrong:function(t,b,c,d){return-c*((t=t/d-1)*t*t*t-1)+b;},easeBothStrong:function(t,b,c,d){return((t/=d/2)<1)?c/2*t*t*t*t+b:-c/2*((t-=2)*t*t*t-2)+b;},elasticIn:function(t,b,c,d,a,p){if(t==0||(t/=d)==1){return t==0?b:b+c;}
p=p||(d*.3);var s;if(a>=abs(c)){s=p/(2*pi)*asin(c/a);}else{a=c;s=p/4;}
return-(a*pow(2,10*(t-=1))*sin((t*d-s)*(2*pi)/p))+b;},elasticOut:function(t,b,c,d,a,p){if(t==0||(t/=d)==1){return t==0?b:b+c;}
p=p||(d*.3);var s;if(a>=abs(c)){s=p/(2*pi)*asin(c/a);}else{a=c;s=p/4;}
return a*pow(2,-10*t)*sin((t*d-s)*(2*pi)/p)+c+b;},elasticBoth:function(t,b,c,d,a,p){if(t==0||(t/=d/2)==2){return t==0?b:b+c;}
p=p||(d*(.3*1.5));var s;if(a>=abs(c)){s=p/(2*pi)*asin(c/a);}else{a=c;s=p/4;}
return t<1?-.5*(a*pow(2,10*(t-=1))*sin((t*d-s)*(2*pi)/p))+b:a*pow(2,-10*(t-=1))*sin((t*d-s)*(2*pi)/p)*.5+c+b;},backIn:function(t,b,c,d,s){s=s||1.70158;return c*(t/=d)*t*((s+1)*t-s)+b;},backOut:function(t,b,c,d,s){if(!s){s=1.70158;}
return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;},backBoth:function(t,b,c,d,s){s=s||1.70158;return((t/=d/2)<1)?c/2*(t*t*(((s*=(1.525))+1)*t-s))+b:c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b;},bounceIn:function(t,b,c,d){return c-EXTLIB.Easing.bounceOut(d-t,0,c,d)+b;},bounceOut:function(t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b;}else if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b;}else if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b;}
return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b;},bounceBoth:function(t,b,c,d){return(t<d/2)?EXTLIB.Easing.bounceIn(t*2,0,c,d)*.5+b:EXTLIB.Easing.bounceOut(t*2-d,0,c,d)*.5+c*.5+b;}});})();(function(){var EXTLIB=Ext.lib;EXTLIB.Anim.color=function(el,args,duration,easing,cb,scope){return EXTLIB.Anim.run(el,args,duration,easing,cb,scope,EXTLIB.ColorAnim);}
EXTLIB.ColorAnim=function(el,attributes,duration,method){EXTLIB.ColorAnim.superclass.constructor.call(this,el,attributes,duration,method);};Ext.extend(EXTLIB.ColorAnim,EXTLIB.AnimBase);var superclass=EXTLIB.ColorAnim.superclass,colorRE=/color$/i,transparentRE=/^transparent|rgba\(0, 0, 0, 0\)$/;function parseColor(s){var pi=parseInt,c;if(s.length==3){c=s;}else if(s.charAt(0)=="r"){c=s.replace(/[^0-9,]/g,"").split(',');c=[pi(c[1],10),pi(c[2],10),pi(c[3],10)];}else if(s.length<6){c=s.replace("#","").match(/./g);c=[pi(c[0]+c[0],16),pi(c[1]+c[1],16),pi(c[2]+c[2],16)];}else{c=s.replace("#","").match(/./g);c=[pi(c[0]+c[1],16),pi(c[2]+c[3],16),pi(c[4]+c[5],16)];}
return c;}
Ext.apply(EXTLIB.ColorAnim.prototype,{getAttr:function(attr){var me=this,el=me.el,val;if(colorRE.test(attr)){while(el&&transparentRE.test(val=fly(el).getStyle(attr))){el=el.parentNode;val="fff";}}else{val=superclass.getAttr.call(me,attr);}
return val;},doMethod:function(attr,start,end){var me=this,val,floor=Math.floor;if(colorRE.test(attr)){val=[];Ext.each(start,function(v,i){val[i]=superclass.doMethod.call(me,attr,v,end[i]);});val='rgb('+floor(val[0])+','+floor(val[1])+','+floor(val[2])+')';}else{val=superclass.doMethod.call(me,attr,start,end);}
return val;},setRunAttr:function(attr){var me=this,isEmpty=Ext.isEmpty;superclass.setRunAttr.call(me,attr);if(colorRE.test(attr)){var attribute=me.attrs[attr],ra=me.runAttrs[attr],start=parseColor(ra.start),end=parseColor(ra.end);if(isEmpty(attribute.to)&&!isEmpty(attribute.by)){end=parseColor(attribute.by);Ext.each(start,function(v,i){end[i]=v+end[i];});}
ra.start=start;ra.end=end;}}});})();(function(){var EXTLIB=Ext.lib;EXTLIB.Anim.scroll=function(el,args,duration,easing,cb,scope){return EXTLIB.Anim.run(el,args,duration,easing,cb,scope,EXTLIB.Scroll);}
EXTLIB.Scroll=function(el,attributes,duration,method){if(el){EXTLIB.Scroll.superclass.constructor.call(this,el,attributes,duration,method);}};Ext.extend(EXTLIB.Scroll,EXTLIB.ColorAnim);var Y=Ext.lib,superclass=EXTLIB.Scroll.superclass,SCROLL='scroll';Ext.apply(EXTLIB.Scroll.prototype,{toString:function(){var el=this.el;return("Scroll "+(el.id||el.tagName));},doMethod:function(attr,start,end){var val,me=this,curFrame=me.curFrame,totalFrames=me.totalFrames;if(attr==SCROLL){val=[me.method(curFrame,start[0],end[0]-start[0],totalFrames),me.method(curFrame,start[1],end[1]-start[1],totalFrames)];}else{val=superclass.doMethod.call(me,attr,start,end);}
return val;},getAttr:function(attr){var val=null,me=this;if(attr==SCROLL){val=[me.el.scrollLeft,me.el.scrollTop];}else{val=superclass.getAttr.call(me,attr);}
return val;},setAttr:function(attr,val,unit){var me=this;if(attr==SCROLL){me.el.scrollLeft=val[0];me.el.scrollTop=val[1];}else{superclass.setAttr.call(me,attr,val,unit);}}});})();