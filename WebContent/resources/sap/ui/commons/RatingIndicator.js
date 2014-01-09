/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2013 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.ui.commons.RatingIndicator");jQuery.sap.require("sap.ui.commons.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.ui.commons.RatingIndicator",{metadata:{library:"sap.ui.commons",properties:{"visible":{type:"boolean",group:"Behavior",defaultValue:true},"editable":{type:"boolean",group:"Behavior",defaultValue:true},"maxValue":{type:"int",group:"Behavior",defaultValue:5},"value":{type:"float",group:"Behavior",defaultValue:0,bindable:"bindable"},"iconSelected":{type:"sap.ui.core.URI",group:"Behavior",defaultValue:null},"iconUnselected":{type:"sap.ui.core.URI",group:"Behavior",defaultValue:null},"iconHovered":{type:"sap.ui.core.URI",group:"Behavior",defaultValue:null},"visualMode":{type:"sap.ui.commons.RatingIndicatorVisualMode",group:"Behavior",defaultValue:sap.ui.commons.RatingIndicatorVisualMode.Half}},associations:{"ariaDescribedBy":{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},"ariaLabelledBy":{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{"change":{}}}});sap.ui.commons.RatingIndicator.M_EVENTS={'change':'change'};jQuery.sap.require("sap.ui.core.theming.Parameters");
sap.ui.commons.RatingIndicator.prototype.init=function(){this.iHoveredRating=-1};
sap.ui.commons.RatingIndicator.prototype.exit=function(){};
sap.ui.commons.RatingIndicator.prototype.onThemeChanged=function(e){if(this.getDomRef()){this.invalidate()}};
sap.ui.commons.RatingIndicator.prototype.ondragstart=function(e){e.preventDefault()};
sap.ui.commons.RatingIndicator.prototype.onsapincrease=function(e){var n=this.iHoveredRating;if(n==-1){n=Math.round(this.getValue())-1;if(n==-1){n=0}}if(n<this.getMaxValue()){n=n+1}else{n=this.getMaxValue()}this.updateHoverState(e,n)};
sap.ui.commons.RatingIndicator.prototype.onsapdecrease=function(e){var n=this.iHoveredRating;if(n==-1&&Math.round(this.getValue())==0){return}if(n==-1){n=Math.round(this.getValue())+1}if(n>1){n=n-1}else{n=1}this.updateHoverState(e,n)};
sap.ui.commons.RatingIndicator.prototype.onsaphome=function(e){this.updateHoverState(e,1)};
sap.ui.commons.RatingIndicator.prototype.onsapend=function(e){this.updateHoverState(e,this.getMaxValue())};
sap.ui.commons.RatingIndicator.prototype.onsapselect=function(e){this.saveValue(e,true,this.iHoveredRating)};
sap.ui.commons.RatingIndicator.prototype.onsapescape=function(e){this.saveValue(e,true,-1)};
sap.ui.commons.RatingIndicator.prototype.onfocusout=function(e){if(!!sap.ui.Device.browser.internet_explorer&&e.target!=this.getDomRef()){return}this.saveValue(e,false,this.iHoveredRating)};
sap.ui.commons.RatingIndicator.prototype.onfocusin=function(e){if(!!sap.ui.Device.browser.internet_explorer&&e.target!=this.getDomRef()){this.getDomRef().focus()}};
sap.ui.commons.RatingIndicator.prototype.onclick=function(e){this.saveValue(e,true,this.getSymbolValue(e))};
sap.ui.commons.RatingIndicator.prototype.onmouseover=function(e){e.preventDefault();e.stopPropagation();if(!this.getEditable()){return}this.iHoveredRating=-1;var s=this.getSymbolValue(e);if(s==-1){return}for(var i=1;i<=s;i++){sap.ui.commons.RatingIndicatorRenderer.hoverRatingSymbol(i,this)}for(var i=s+1;i<=this.getMaxValue();i++){sap.ui.commons.RatingIndicatorRenderer.hoverRatingSymbol(i,this,true)}};
sap.ui.commons.RatingIndicator.prototype.onmouseout=function(e){e.preventDefault();e.stopPropagation();if(!this.getEditable()){return}if(jQuery.sap.checkMouseEnterOrLeave(e,this.getDomRef())){this.iHoveredRating=-1;for(var i=1;i<=this.getMaxValue();i++){sap.ui.commons.RatingIndicatorRenderer.unhoverRatingSymbol(i,this)}}};
sap.ui.commons.RatingIndicator.prototype.getSymbolValue=function(e){var s=jQuery(e.target);if(s.hasClass("sapUiRatingItmImg")||s.hasClass("sapUiRatingItmOvrflw")){s=jQuery(e.target.parentNode)}else if(s.hasClass("sapUiRatingItmOvrflwImg")){s=jQuery(e.target.parentNode.parentNode)}var i=s.attr("itemvalue");if(i){return parseInt(i,10)}return-1};
sap.ui.commons.RatingIndicator.prototype.updateKeyboardHoverState=function(s){for(var i=1;i<=this.getMaxValue();i++){sap.ui.commons.RatingIndicatorRenderer.unhoverRatingSymbol(i,this);if(i<=this.iHoveredRating){sap.ui.commons.RatingIndicatorRenderer.hoverRatingSymbol(i,this)}else if(!s){sap.ui.commons.RatingIndicatorRenderer.hoverRatingSymbol(i,this,true)}}this.setAriaState()};
sap.ui.commons.RatingIndicator.prototype.onAfterRendering=function(){this.setAriaState()};
sap.ui.commons.RatingIndicator.prototype.setAriaState=function(){var v=this.iHoveredRating==-1?this.getValue():this.iHoveredRating;jQuery.sap.byId(this.getId()).attr("aria-valuenow",v).attr("aria-valuetext",this._getText("RATING_ARIA_VALUE",[v])).attr("aria-label",this._getText("RATING_ARIA_NAME"))};
sap.ui.commons.RatingIndicator.prototype._getText=function(k,a){var r=sap.ui.getCore().getLibraryResourceBundle("sap.ui.commons");if(r){return r.getText(k,a)}return k};
sap.ui.commons.RatingIndicator.prototype.saveValue=function(e,b,n){if(b){e.preventDefault()}if(!this.getEditable()){return false}this.iHoveredRating=-1;if(n!=-1&&n!=this.getValue()){this.setValue(n);this.fireChange({value:n});return true}else{for(var i=1;i<=this.getMaxValue();i++){sap.ui.commons.RatingIndicatorRenderer.unhoverRatingSymbol(i,this)}this.setAriaState();return false}};
sap.ui.commons.RatingIndicator.prototype.updateHoverState=function(e,n){e.preventDefault();e.stopPropagation();if(!this.getEditable()){return}this.iHoveredRating=n;this.updateKeyboardHoverState()};
sap.ui.commons.RatingIndicator.prototype.setMaxValue=function(m){if(m<1){m=1}this.setProperty("maxValue",m);return this};
