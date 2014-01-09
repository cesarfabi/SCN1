/*!
 * @copyright@
 */
jQuery.sap.require("sap.collaboration.components.utils.OdataUtil");jQuery.sap.require("sap.collaboration.components.utils.CommonUtil");jQuery.sap.require("sap.ui.core.UIComponent");jQuery.sap.declare("sap.collaboration.components.fiori.sharing.Component");jQuery.sap.require("sap.m.MessageBox");sap.ui.core.UIComponent.extend("sap.collaboration.components.fiori.sharing.Component",{metadata:{includes:["../../css/Sharing.css"],properties:{width:{type:"sap.ui.core.CSSSize",defaultValue:"100%"},height:{type:"sap.ui.core.CSSSize",defaultValue:"100%"},oDataServiceUrl:{type:"sap.ui.core.URI",defaultValue:"/sap/opu/odata/sap/SM_INTEGRATION_SRV"},object:{type:"object"}},aggregations:{},events:{}},init:function(){this.oCommonUtil=new sap.collaboration.components.utils.CommonUtil();this.oLangBundle=this.oCommonUtil.getLanguageBundle();this.aJamGroups=[];this.bOdataOn=true},onBeforeRendering:function(){if(this.bOdataOn===true){try{this.setGroupsData()}catch(e){this.oCommonUtil.displayError(e);this.bStopRendering=true}}},onAfterRendering:function(){jQuery.sap.log.debug("Share Component properties:","","sap.collaboration.components.fiori.sharing.Component.onAfterRendering()");jQuery.sap.log.debug("width: "+this.getWidth());jQuery.sap.log.debug("height: "+this.getHeight());jQuery.sap.log.debug("oDataServiceUrl: "+this.getODataServiceUrl());if(this.getObject()){jQuery.sap.log.debug("object->id: "+this.getObject().id);jQuery.sap.log.debug("object->share: "+this.getObject().share);jQuery.sap.log.debug("object->display: "+this.getObject().display)}else{jQuery.sap.log.debug("object: undefined")}var o=this.getObject();var O;var s;var a;if(o){O=o.display;s=o.share;a=o.id}if(this.bStopRendering===undefined||this.bStopRendering===false){if(!this.oSharingView){var j=this.getJamUrl();this.oSharingView=sap.ui.view({id:this.getId()+"_SharingView",viewData:{controlId:this.getId(),langBundle:this.oLangBundle,jamGroups:this.aJamGroups,jamUrl:j,objectDisplay:O,objectShare:s,objectId:a},type:sap.ui.core.mvc.ViewType.JS,viewName:"sap.collaboration.components.fiori.sharing.Sharing"})}else{this.oSharingView.getController().aJamGroups=this.aJamGroups;this.oSharingView.getController().sObjectShare=s;this.oSharingView.getController().oObjectDisplay=O}this.oSharingView.placeAt(this.getId())}},exit:function(){this.oView.destroy()},setSettings:function(s){this.setODataServiceUrl(s.oDataServiceUrl);this.setObject(s.object)},render:function(r){r.write("<div id='"+this.getId()+"' style='width:"+this.getWidth()+";height:"+this.getHeight()+"'");r.write(">");r.write("</div>")},setGroupsData:function(){this.initializeOdataModel();this.initializeOdataUtils();try{this.aJamGroups=this.getJamGroups()}catch(e){throw new Error(e.message)}},initializeOdataModel:function(){var a=true;this.sODataServiceUrl=this.getODataServiceUrl();this.oOdataModel=new sap.ui.model.odata.ODataModel(this.sODataServiceUrl,a)},initializeOdataUtils:function(){this.oODataUtil=new sap.collaboration.components.utils.OdataUtil()},getJamGroups:function(){return this.oODataUtil.getGroupsData(this.oOdataModel,"/Groups")},getJamUrl:function(){return this.oODataUtil.getJamUrl(this.oOdataModel)},shareToJam:function(){var s=this.oSharingView.getController().getSharingData();var a=this;var n=s.note;var g=s.groupId;var f=n;var o;var r;if(this.getObject()){o=this.getObject().id}if(o&&f!==""){f=f+"\n"+this.getObject().id}else if(o){f=this.getObject().id}jQuery.sap.log.debug("Share Component sFeedContent: "+f,"","sap.collaboration.components.fiori.sharing.Component.shareToJam()");var b=this.oODataUtil.createGroupFeed(this.oOdataModel,g,f);if(b===true){r=a.oLangBundle.getText("SHARING_SUCCESS_MSG")}else{r=a.oLangBundle.getText("SHARING_ERROR_MSG")}return r}});
