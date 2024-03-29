/*
 * Ext JS Library 3.0 Pre-alpha
 * Copyright(c) 2006-2008, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */


Ext.Element.addMethods({scrollTo:function(side,value,animate){var tester=/top/i,prop="scroll"+(tester.test(side)?"Top":"Left"),me=this,dom=me.dom;if(!animate||!me.anim){dom[prop]=value;}else{me.anim({scroll:{to:tester.test(prop)?[dom[prop],value]:[value,dom[prop]]}},me.preanim(arguments,2),'scroll');}
return me;},scrollIntoView:function(container,hscroll){var c=Ext.getDom(container)||Ext.getBody().dom,el=this.dom,o=this.getOffsetsTo(c),l=o[0]+c.scrollLeft,t=o[1]+c.scrollTop,b=t+el.offsetHeight,r=l+el.offsetWidth,ch=c.clientHeight,ct=parseInt(c.scrollTop,10),cl=parseInt(c.scrollLeft,10),cb=ct+ch,cr=cl+c.clientWidth;if(el.offsetHeight>ch||t<ct){c.scrollTop=t;}else if(b>cb){c.scrollTop=b-ch;}
c.scrollTop=c.scrollTop;if(hscroll!==false){if(el.offsetWidth>c.clientWidth||l<cl){c.scrollLeft=l;}else if(r>cr){c.scrollLeft=r-c.clientWidth;}
c.scrollLeft=c.scrollLeft;}
return this;},scrollChildIntoView:function(child,hscroll){Ext.fly(child,'_scrollChildIntoView').scrollIntoView(this,hscroll);},scroll:function(direction,distance,animate){if(this.isScrollable()){var el=this.dom,l=el.scrollLeft,t=el.scrollTop,w=el.scrollWidth,h=el.scrollHeight,cw=el.clientWidth,ch=el.clientHeight,scrolled=false,l=Math.min(l+distance,w-cw),r=Math.max(l-distance,0),t=Math.max(t-distance,0),b=Math.min(t+distance,h-ch),hash={l:l,left:l,r:r,right:r,t:t,top:t,up:t,b:b,bottom:b,down:b};direction=direction.toLowerCase();if(v=hash[direction]){this.scrollTo("left",v,this.preanim(arguments,2));scrolled=true;}
return scrolled;}}});