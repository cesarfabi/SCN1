/*!
 * SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright
 * 		2009-2012 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.ca.ui.AddPicture");jQuery.sap.require("sap.ca.ui.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.ca.ui.AddPicture",{metadata:{library:"sap.ca.ui",properties:{"buttonPageType":{type:"string",group:"Appearance",defaultValue:'Tab'},"editable":{type:"boolean",group:"Appearance",defaultValue:true},"maxPictureNumber":{type:"int",group:"Behavior",defaultValue:10},"uploadUrl":{type:"string",group:"Misc",defaultValue:null},"width":{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:'100%'},"text":{type:"string",group:"Appearance",defaultValue:null},"pictureAlign":{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:sap.ui.core.TextAlign.Left},"itemSize":{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:'62px'}},aggregations:{"pictures":{type:"sap.ca.ui.PictureItem",multiple:true,singularName:"picture",bindable:"bindable"}},events:{"show":{},"pictureAdded":{},"maxPictureLimitReached":{},"imageUploadFailed":{}}}});sap.ca.ui.AddPicture.M_EVENTS={'show':'show','pictureAdded':'pictureAdded','maxPictureLimitReached':'maxPictureLimitReached','imageUploadFailed':'imageUploadFailed'};jQuery.sap.require("sap.ca.ui.utils.resourcebundle");jQuery.sap.require("sap.ca.ui.PictureItem");jQuery.sap.require("sap.ca.ui.utils.CanvasHelper");sap.ca.ui.AddPicture.BUTTON_PAGE_TYPE={'TAB':'Tab','FORM':'Form'};
sap.ca.ui.AddPicture.prototype.init=function(){var f=jQuery.proxy(this._clickCaptureInput,this);this._oButton=new sap.m.Button({press:f,icon:"sap-icon://add",type:sap.m.ButtonType.Transparent,width:"100%"});this._oButton.addStyleClass("sapCaUiAddPictureButton");this.setText(sap.ca.ui.utils.resourcebundle.getText("addPicture.text"));this._forceUpload=false;this._optimized=true};
sap.ca.ui.AddPicture.prototype.exit=function(){if(this._oButton){this._oButton.destroy()}if(!window.FileReader||this._forceUpload){jQuery.sap.byId(this.getId()+"-capture").fileupload('destroy')}};
sap.ca.ui.AddPicture.prototype.onAfterRendering=function(){if(!window.FileReader||this._forceUpload){var u=this.getUploadUrl();if(null==u||u.length==0){jQuery.sap.log.error("AddPicture: The 'uploadUrl' property has not been set or is empty, and is required for this browser")}else{jQuery.sap.byId(this.getId()+"-capture").fileupload({url:u,add:jQuery.proxy(this._handleServerUpload,this),done:jQuery.proxy(this._handleServerUploadComplete,this),fail:jQuery.proxy(this._handleServerUploadFail,this)})}}else{var i=jQuery.sap.domById(this.getId()+"-capture");if(i)i.onchange=jQuery.proxy(this._handleClientUpload,this)}var n=this.getPictures().length;if(i){i.visibility=n>=this.getMaxPictureNumber()}};
sap.ca.ui.AddPicture.prototype.setText=function(v){this._oButton.setText(v);this.setProperty("text",v)};
sap.ca.ui.AddPicture.prototype._getButton=function(){return this._oButton};
sap.ca.ui.AddPicture.prototype._handleClientUpload=function(){var a=jQuery.sap.domById(this.getId()+"-capture");var b=a.files;if(!b){jQuery.sap.log.error("HTML5 files property not supported on input element for this browser")}else{for(var i=0,f;f=b[i];i++){if(!f.type.match('image.*')){continue}this._readFile(f)}}};
sap.ca.ui.AddPicture.prototype._handleServerUpload=function(e,d){try{d.submit()}catch(a){this.fireImageUploadFailed({reason:"Submit Error",response:d})}};
sap.ca.ui.AddPicture.prototype._handleServerUploadComplete=function(a,d){var b=null;if(null!=d&&null!=d.result){var f=null;if(null!=d.files&&d.files.length===1){f=d.files[0].name}try{var c=d.result.find("pre");if(c.length===0){c=$('pre',d.result)}var i=c.text();if(null!=i&&i.indexOf("data:image/")===0){this._createAndAddPictureItem(i,f)}else if(null!=d.result.indexOf&&d.result.indexOf("data:image/")===0){this._createAndAddPictureItem(d.result,f)}else if(null!=d.result[0]&&null!=d.result[0].title){b=d.result[0].title}}catch(e){jQuery.sap.log.error("Error while retrieving upload response from iframe");b="No response found"}}else{b="Invalid response"}if(null!=b){this.fireImageUploadFailed({reason:b,response:d})}};
sap.ca.ui.AddPicture.prototype._handleServerUploadFail=function(e,d){this.fireImageUploadFailed({reason:"Upload Failed",response:d})};
sap.ca.ui.AddPicture.prototype._readFile=function(f){this._createAndAddPictureItemFromFile(f)};
sap.ca.ui.AddPicture.prototype._clickCaptureInput=function(){var n=this.getPictures().length;if(n>=this.getMaxPictureNumber()){this.fireMaxPictureLimitReached({Limit:n})}else{jQuery.sap.domById(this.getId()+'-capture').click()}};
sap.ca.ui.AddPicture.prototype._createAndAddPictureItem=function(i,f){var p=new sap.ca.ui.PictureItem({status:sap.ca.ui.PictureItem.STATUS.ADD,name:f,source:i,width:this.getItemSize(),height:this.getItemSize()});this.addPicture(p);this.firePictureAdded({pictureItem:p})};
sap.ca.ui.AddPicture.prototype._createAndAddPictureItemFromFile=function(f){var p=new sap.ca.ui.PictureItem({status:sap.ca.ui.PictureItem.STATUS.ADD,name:f.name,width:this.getItemSize(),height:this.getItemSize()});var t=this;p.attachLoaded(function(){t.addPicture(p);t.firePictureAdded({pictureItem:p})});p.setFile(f)};
sap.ca.ui.AddPicture.prototype._pictureTapped=function(p){this.fireShow({pictureItem:p})};