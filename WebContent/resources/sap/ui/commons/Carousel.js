/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2013 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.ui.commons.Carousel");jQuery.sap.require("sap.ui.commons.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.ui.commons.Carousel",{metadata:{publicMethods:["showNext","showPrevious","showElementWithId"],library:"sap.ui.commons",properties:{"orientation":{type:"sap.ui.commons.enums.Orientation",group:"Misc",defaultValue:sap.ui.commons.enums.Orientation.horizontal},"width":{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:null},"height":{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:null},"defaultItemHeight":{type:"int",group:"Misc",defaultValue:150},"defaultItemWidth":{type:"int",group:"Misc",defaultValue:150},"animationDuration":{type:"int",group:"Misc",defaultValue:500},"visibleItems":{type:"int",group:"Misc",defaultValue:null},"handleSize":{type:"int",group:"Misc",defaultValue:22},"firstVisibleIndex":{type:"int",group:"Appearance",defaultValue:0}},defaultAggregation:"content",aggregations:{"content":{type:"sap.ui.core.Control",multiple:true,singularName:"content",bindable:"bindable"}}}});jQuery.sap.require("sap.ui.core.ResizeHandler");jQuery.sap.require("sap.ui.core.delegate.ItemNavigation");
sap.ui.commons.Carousel.prototype.init=function(){var m=this;m.startTouchX=undefined;m.startTouchY=undefined;m.scrollDelta=undefined;m._visibleItems=0;m._bTouchNotMoved=true;if(jQuery.sap.touchEventMode==="ON"){var t=function(e){e.preventDefault();m.startTouchX=e.touches[0].pageX;m.startTouchY=e.touches[0].pageY;m._bTouchNotMoved=true};var T=function(e){e.preventDefault();var d=e.touches[0].pageX-m.startTouchX;var a=e.touches[0].pageY-m.startTouchY;if(m.getOrientation()=="horizontal"){m.scrollDelta=-d}else{m.scrollDelta=-a}m._bTouchNotMoved=false};var f=function(e){e.preventDefault();if(!m._bTouchNotMoved){if(m.scrollDelta>0){m.showNext()}else{m.showPrevious()}m.startTouchX=undefined;m.startTouchY=undefined;m.scrollDelta=undefined}};this.ontouchstart=t;this.ontouchend=f;this.ontouchmove=T}};
sap.ui.commons.Carousel.prototype.exit=function(){if(this.sResizeListenerId){sap.ui.core.ResizeHandler.deregister(this.sResizeListenerId);this.sResizeListenerId=null}this._destroyItemNavigation()};
sap.ui.commons.Carousel.prototype.onclick=function(e){var c=this.getId();switch(e.target){case jQuery.sap.byId(c+'-prevbutton')[0]:this.showPrevious();break;case jQuery.sap.byId(c+'-nextbutton')[0]:this.showNext();break;default:return}};
sap.ui.commons.Carousel.prototype.onBeforeRendering=function(){if(this.sResizeListenerId){sap.ui.core.ResizeHandler.deregister(this.sResizeListenerId);this.sResizeListenerId=null}};
sap.ui.commons.Carousel.prototype.onAfterRendering=function(){if(this.getOrientation()=="vertical"){this._sAnimationAttribute='margin-top'}else{if(sap.ui.getCore().getConfiguration().getRTL()){this._sAnimationAttribute='margin-right'}else{this._sAnimationAttribute='margin-left'}}this.showElementWithId(this._getItemIdByIndex(this.getFirstVisibleIndex()));this.calculateAndSetSize();this.oDomRef=this.getDomRef();this.sResizeListenerId=sap.ui.core.ResizeHandler.register(this.oDomRef,jQuery.proxy(this.onresize,this));this._initItemNavigation()};
sap.ui.commons.Carousel.prototype._initItemNavigation=function(){var $=this.$();var a=jQuery.sap.byId(this.getId()+"-scrolllist");if(!this._oItemNavigation){this._oItemNavigation=new sap.ui.core.delegate.ItemNavigation();this._oItemNavigation.setCycling(true);this.addDelegate(this._oItemNavigation);this._oItemNavigation.attachEvent(sap.ui.core.delegate.ItemNavigation.Events.AfterFocus,function(e){jQuery.sap.byId(this.getId()+'-contentarea').scrollLeft(0)},this)}this._oItemNavigation.setRootDomRef(a[0]);this._oItemNavigation.setItemDomRefs(a.children())};
sap.ui.commons.Carousel.prototype._destroyItemNavigation=function(){if(this._oItemNavigation){this._oItemNavigation.destroy();this._oItemNavigation=undefined}};
sap.ui.commons.Carousel.prototype.onThemeChanged=function(e){this.calculateAndSetSize()};
sap.ui.commons.Carousel.prototype.onfocusin=function(e){var $=jQuery(e.target);if(!this._bIgnoreFocusIn&&($.hasClass("sapUiCrslBefore")||$.hasClass("sapUiCrslAfter"))){this._leaveActionMode();jQuery(this._oItemNavigation.getFocusedDomRef()||this._oItemNavigation.getRootDomRef()).focus()}};
sap.ui.commons.Carousel.prototype.onsaptabnext=function(e){var $=this.$();if(this._bActionMode){if($.find(".sapUiCrslScl").lastFocusableDomRef()===e.target){$.find(".sapUiCrslScl").firstFocusableDomRef().focus();e.preventDefault();e.stopPropagation()}}else{if(this._oItemNavigation.getFocusedDomRef()===e.target){this._bIgnoreFocusIn=true;$.find(".sapUiCrslAfter").focus();this._bIgnoreFocusIn=false}}};
sap.ui.commons.Carousel.prototype.onsaptabprevious=function(e){var $=this.$();if(this._bActionMode){if($.find(".sapUiCrslScl").firstFocusableDomRef()===e.target){$.find(".sapUiCrslScl").lastFocusableDomRef().focus();e.preventDefault();e.stopPropagation()}}else{if(this._oItemNavigation.getFocusedDomRef()===e.target&&jQuery.sap.containsOrEquals($.find(".sapUiCrslScl").get(0),e.target)){this._bIgnoreFocusIn=true;$.find(".sapUiCrslBefore").focus();this._bIgnoreFocusIn=false}}};
sap.ui.commons.Carousel.prototype.onsapescape=function(e){this._leaveActionMode(e)};
sap.ui.commons.Carousel.prototype.onsapnext=function(e){var $=jQuery(e.target);var s=jQuery.sap.byId(this.getId()+'-scrolllist');s.stop(true,true);if($.hasClass('sapUiCrslItm')&&$.nextAll(':visible').length<2){this.showNext();e.preventDefault()}};
sap.ui.commons.Carousel.prototype.onsapprevious=function(e){var $=jQuery(e.target);var s=jQuery.sap.byId(this.getId()+'-scrolllist');s.stop(true,true);if($.hasClass('sapUiCrslItm')&&$.prevAll(':visible').length<2){this.showPrevious();e.preventDefault()}};
sap.ui.commons.Carousel.prototype.onkeydown=function(e){var $=this.$();if(!this._bActionMode&&e.keyCode==jQuery.sap.KeyCodes.F2||e.keyCode==jQuery.sap.KeyCodes.ENTER){if($.find(".sapUiCrslScl li:focus").length>0){this._enterActionMode($.find(".sapUiCrslScl li:focus :sapFocusable").get(0));e.preventDefault();e.stopPropagation()}}else if(this._bActionMode&&e.keyCode==jQuery.sap.KeyCodes.F2){this._leaveActionMode(e)}};
sap.ui.commons.Carousel.prototype.onmouseup=function(e){if(this.$().find(".sapUiCrslScl li :focus").length>0){this._enterActionMode(this.$().find(".sapUiCrslScl li :focus").get(0))}else{this._leaveActionMode(e)}};
sap.ui.commons.Carousel.prototype._enterActionMode=function(d){if(d&&!this._bActionMode){this._bActionMode=true;this.removeDelegate(this._oItemNavigation);jQuery(this._oItemNavigation.getFocusedDomRef()).attr("tabindex","-1");jQuery.sap.byId(this.getId()+'-scrolllist').attr("aria-activedescendant",jQuery(this._oItemNavigation.getFocusedDomRef()).attr("id"));jQuery(d).focus()}};
sap.ui.commons.Carousel.prototype._leaveActionMode=function(e){if(this._bActionMode){this._bActionMode=false;this.addDelegate(this._oItemNavigation);jQuery(this._oItemNavigation.getFocusedDomRef()).attr("tabindex","0");jQuery.sap.byId(this.getId()+'-scrolllist').removeAttr("aria-activedescendant");if(e){if(jQuery(e.target).closest("li[tabindex=-1]").length>0){var i=jQuery(this._oItemNavigation.aItemDomRefs).index(jQuery(e.target).closest("li[tabindex=-1]").get(0));this._oItemNavigation.focusItem(i,null)}else{if(jQuery.sap.containsOrEquals(this.$().find(".sapUiCrslScl").get(0),e.target)){this._oItemNavigation.focusItem(this._oItemNavigation.getFocusedIndex(),null)}}}else{this._oItemNavigation.focusItem(this._oItemNavigation.getFocusedIndex(),null)}}};
sap.ui.commons.Carousel.prototype.onresize=function(e){if(!this.getDomRef()){if(this.sResizeListenerId){sap.ui.core.ResizeHandler.deregister(this.sResizeListenerId);this.sResizeListenerId=null}return}this.calculateAndSetSize()};
sap.ui.commons.Carousel.prototype.showPrevious=function(){var a={};a[this._sAnimationAttribute]=0;var s=jQuery.sap.byId(this.getId()+'-scrolllist');var c=jQuery.sap.byId(this.getId()+'-contentarea');if(s.children('li').length<2){return}s.stop(true,true);s.css(this._sAnimationAttribute,-this._iMaxWidth);var $=s.children('li:last');var b=s.children('li:first');this._showAllItems();$.insertBefore(b);s.append($.sapExtendedClone(true));var m=this;s.animate(a,this.getAnimationDuration(),function(){s.children('li:last').remove();m.setProperty("firstVisibleIndex",m._getContentIndex(s.children('li:first').attr('id')),true);m._hideInvisibleItems()})};
sap.ui.commons.Carousel.prototype.showNext=function(){var a={};a[this._sAnimationAttribute]=-this._iMaxWidth;var s=jQuery.sap.byId(this.getId()+'-scrolllist');var c=jQuery.sap.byId(this.getId()+'-contentarea');if(s.children('li').length<2){return}s.stop(true,true);this._showAllItems();var A=this._sAnimationAttribute;var m=this;var $=s.children('li:first');$.appendTo(s);$.sapExtendedClone(true).insertBefore(s.children('li:first'));s.animate(a,this.getAnimationDuration(),function(){s.children('li:first').remove();jQuery(this).css(A,'0px');m.setProperty("firstVisibleIndex",m._getContentIndex(s.children('li:first').attr('id')),true);m._hideInvisibleItems()})};
sap.ui.commons.Carousel.prototype.showElementWithId=function(e){this._showAllItems();var s=jQuery.sap.byId(this.getId()+'-scrolllist');e=this.getId()+"-item-"+e;var i=s.children('li').index(jQuery.sap.byId(e));s.children('li:lt('+i+')').appendTo(s);this._hideInvisibleItems()};
sap.ui.commons.Carousel.prototype.calculateAndSetSize=function(){var c=this.getContent();var C=this.getId();this._showAllItems();if(c.length>0){var m=0;var a=0;for(var i=0;i<c.length;i++){var b,d;try{b=c[i].getWidth();if(b.substr(-1)=="%"){b=this.getDefaultItemWidth()}}catch(e){b=this.getDefaultItemWidth()}try{d=c[i].getHeight();if(d.substr(-1)=="%"){d=this.getDefaultItemHeight()}}catch(e){d=this.getDefaultItemHeight()}m=Math.max(m,parseInt(b,10));a=Math.max(a,parseInt(d,10))}if(m==0||isNaN(m)){m=this.getDefaultItemWidth()}if(a==0||isNaN(a)){a=this.getDefaultItemHeight()}var f;var v=this.getVisibleItems();var M=jQuery.sap.byId(C);var n=jQuery.sap.byId(C+'-nextbutton');var p=jQuery.sap.byId(C+'-prevbutton');var $=jQuery.sap.byId(C+'-contentarea');if(this.getWidth()&&this.getOrientation()=="vertical"){m=M.width()}if(this.getHeight()&&this.getOrientation()=="horizontal"){a=M.height()}jQuery.sap.byId(this.getId()).addClass('sapUiCrsl'+jQuery.sap.charToUpperCase(this.getOrientation(),0));if(this.getOrientation()=="horizontal"){f=M.width()-this.getHandleSize()*2-1;$.css('left',this.getHandleSize()+"px").css('right',this.getHandleSize()+"px");if(v==0){v=Math.floor(f/m)}m=f/v;this._iMaxWidth=m;var g=a+"px";$.find('.sapUiCrslItm').css("width",m+"px").css("height",a+"px");p.css("height",a).css("line-height",g);n.css("height",a).css("line-height",g);$.height(a);M.height(a)}else{f=M.height()-this.getHandleSize()*2-1;$.css('top',this.getHandleSize()+"px").css('bottom',this.getHandleSize()+"px");if(v==0){v=Math.floor(f/a)}a=f/v;this._iMaxWidth=a;$.find('.sapUiCrslItm').css("width",m+"px").css("height",a+"px");p.width(m).after($);n.width(m);$.width(m);M.width(m)}this._visibleItems=v;this._hideInvisibleItems()}};
sap.ui.commons.Carousel.prototype.getFocusDomRef=function(){return this.oContentArea};
sap.ui.commons.Carousel.prototype._showAllItems=function(){var c=jQuery.sap.byId(this.getId()+'-contentarea');c.find('.sapUiCrslItm').show()};
sap.ui.commons.Carousel.prototype._hideInvisibleItems=function(){var c=jQuery.sap.byId(this.getId()+'-contentarea');c.find('.sapUiCrslItm:gt('+(this._visibleItems-1)+')').hide()};
sap.ui.commons.Carousel.prototype._getContentIndex=function(i){var I=i.split("-item-");return jQuery.inArray(sap.ui.getCore().byId(I[1]),this.getContent())};
sap.ui.commons.Carousel.prototype._getItemIdByIndex=function(i){var c=this.getContent()[i];if(!c){return null}return c.getId()};
sap.ui.commons.Carousel.prototype.setFirstVisibleIndex=function(f){this.setProperty("firstVisibleIndex",f,true);this.showElementWithId(this._getItemIdByIndex(f));if(this._oItemNavigation){this._oItemNavigation.focusItem(f)}return this};
//Licensed under the terms of the MIT source code license

(function(o){jQuery.fn.sapExtendedClone=function(){var r=o.apply(this,arguments);var m=this.find('textarea').add(this.filter('textarea'));var a=r.find('textarea').add(r.filter('textarea'));var b=this.find('select').add(this.filter('select'));var c=r.find('select').add(r.filter('select'));for(var i=0,l=m.length;i<l;++i){jQuery(a[i]).val(jQuery(m[i]).val())}for(var i=0,l=b.length;i<l;++i){c[i].selectedIndex=b[i].selectedIndex}return r}})(jQuery.fn.clone);
