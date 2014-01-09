jQuery.sap.declare('sap.ui.vbm.library-all');if(!jQuery.sap.isDeclared('sap.ui.vbm.VBIRenderer')){
/*!
 * SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2012 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.ui.vbm.VBIRenderer");sap.ui.vbm.VBIRenderer={};sap.ui.vbm.VBIRenderer.render=function(r,c){r.write("<div align='center'");r.writeControlData(c);r.addClass("sapVBIMAIN");r.writeClasses();r.addStyle("width",c.getWidth()+"px");r.addStyle("height",c.getHeight()+"px");r.addStyle("color","@sapUiTextColor");r.addStyle("border","1px solid #000");r.addStyle("position","relative");r.addStyle("vertical-align","middle");r.writeStyles();r.write(">");if(c.getPlugin()){var i=c.getId();if(navigator.appName=="Microsoft Internet Explorer"){r.write("<object id='VBI"+i+"'"+" CLASSID='CLSID:00100000-2011-0070-2000-FC7214A1CD7B' "+"width='"+c.getWidth()+"px' "+"height='"+c.getHeight()+"px' "+">");r.write("<a href='file://production2/components/VBIS/VBIS_d/VisualBiz/VBIS_d_stream/gen/dbg/java/packaged/full/_setup/SAPVisualBusiness.exe' > Get the Visual Business PlugIn.</a>");r.write("</object>")}else{r.write("<embed id='VBI"+i+"'"+" type='application/x-visualbusiness' "+"width='"+c.getWidth()+"px' "+"height='"+c.getHeight()+"px' "+">")}}r.write("</div>")}};if(!jQuery.sap.isDeclared('sap.ui.vbm.library')){jQuery.sap.declare("sap.ui.vbm.library");jQuery.sap.require('sap.ui.core.Core');jQuery.sap.require('sap.ui.core.library');sap.ui.getCore().initLibrary({name:"sap.ui.vbm",dependencies:["sap.ui.core"],types:[],interfaces:[],controls:["sap.ui.vbm.VBI"],elements:[],version:"1.16.3"})};if(!jQuery.sap.isDeclared('sap.ui.vbm.VBI')){jQuery.sap.declare("sap.ui.vbm.VBI");jQuery.sap.require('sap.ui.core.Control');sap.ui.core.Control.extend("sap.ui.vbm.VBI",{metadata:{publicMethods:["load","zoomToGeoPosition"],library:"sap.ui.vbm",properties:{"width":{type:"int",group:"Misc",defaultValue:800},"height":{type:"int",group:"Misc",defaultValue:600},"config":{type:"object",group:"Misc",defaultValue:null},"plugin":{type:"boolean",group:"Misc",defaultValue:false}},events:{"submit":{},"render":{},"zoom":{},"move":{}}}});sap.ui.vbm.VBI.M_EVENTS={'submit':'submit','render':'render','zoom':'zoom','move':'move'};jQuery.sap.require('sap.ui.vbm.lib.sapvbi');jQuery.sap.require('sap.ui.thirdparty.jqueryui.jquery-ui-core');jQuery.sap.require('sap.ui.thirdparty.jqueryui.jquery-ui-widget');jQuery.sap.require('sap.ui.thirdparty.jqueryui.jquery-ui-mouse');jQuery.sap.require('sap.ui.thirdparty.jqueryui.jquery-ui-draggable');sap.ui.vbm.VBI.prototype.exit=function(){if(this.getPlugin()){}else{if(this.m_VBIContext)this.m_VBIContext.clear()}};sap.ui.vbm.VBI.prototype.init=function(){this.m_aLoadQueue=null;if(this.getPlugin()){}else{this.m_VBIContext=new VBI.VBIContext(this)}};sap.ui.vbm.VBI.prototype.loadNative=function(d){var l=this.getId();var a=document.getElementById('VBI'+l);if(!a)return;if(jQuery.type(d)=='object'){var t=JSON.stringify(d,null,'  ');try{a.Load(t)}catch(e){}}else if(jQuery.type(d)=='string'){a.Load(d)}};sap.ui.vbm.VBI.prototype.loadHtml=function(d){var l=this.getId();if(jQuery.type(d)=='string')d=JSON.parse(d);var m=false;var M=false;var b=false;var a=false;var c=false;var e=false;var f=false;var g=false;if(jQuery.type(d)=='object'){if(d.SAPVB){if(d.SAPVB.Resources){this.m_VBIContext.GetResources().load(d.SAPVB.Resources,this.m_VBIContext);g=true}if(d.SAPVB.DataTypes){if(!this.m_VBIContext.m_DataTypeProvider)this.m_VBIContext.m_DataTypeProvider=new VBI.DataTypeProvider();this.m_VBIContext.m_DataTypeProvider.load(d.SAPVB.DataTypes,this.m_VBIContext);m=true}if(d.SAPVB.Data){if(!this.m_VBIContext.m_DataProvider)this.m_VBIContext.m_DataProvider=new VBI.DataProvider();this.m_VBIContext.m_DataProvider.load(d.SAPVB.Data,this.m_VBIContext);M=true}if(d.SAPVB.MapProviders){if(!this.m_VBIContext.m_MapProviders)this.m_VBIContext.m_MapProviders=new VBI.MapProviders();this.m_VBIContext.m_MapProviders.load(d.SAPVB.MapProviders,this.m_VBIContext);b=true}if(d.SAPVB.MapLayerStacks){if(!this.m_VBIContext.m_MapLayerStackManager)this.m_VBIContext.m_MapLayerStackManager=new VBI.MapLayerStackManager(this.m_VBIContext);this.m_VBIContext.m_MapLayerStackManager.load(d.SAPVB.MapLayerStacks,this.m_VBIContext);a=true}if(d.SAPVB.Scenes){if(!this.m_VBIContext.m_SceneManager)this.m_VBIContext.m_SceneManager=new VBI.SceneManager();this.m_VBIContext.m_SceneManager.load(d.SAPVB.Scenes,this.m_VBIContext);c=true}if(d.SAPVB.Windows){if(!this.m_VBIContext.m_Windows)this.m_VBIContext.m_Windows=new VBI.Windows();this.m_VBIContext.m_Windows.load(d.SAPVB.Windows,this.m_VBIContext);e=true}if(d.SAPVB.Actions){if(!this.m_VBIContext.m_Actions)this.m_VBIContext.m_Actions=new VBI.Actions();this.m_VBIContext.m_Actions.load(d.SAPVB.Actions,this.m_VBIContext);f=true}}if(M)if(this.m_VBIContext.m_Windows)this.m_VBIContext.m_Windows.NotifyDataChange();if(c){if(this.m_VBIContext.m_Windows)this.m_VBIContext.m_Windows.Awake(l)}if(c||M)if(this.m_VBIContext.m_Windows)this.m_VBIContext.m_Windows.Render()}};sap.ui.vbm.VBI.prototype.load=function(d){if(!this.IsRendered()){if(!this.m_aLoadQueue)this.m_aLoadQueue=[];this.m_aLoadQueue.push(d);return}if(this.getPlugin())return this.loadNative(d);else return this.loadHtml(d)};sap.ui.vbm.VBI.prototype.zoomToGeoPosition=function(l,a,b){var s=null;if(s=this.m_VBIContext.GetMainScene()){if(jQuery.type(l)=='array'&&jQuery.type(a)=='array'){if(l.length>1&&a.length>1)s.ZoomToMultiplePositions(l,a);else s.ZoomToGeoPosition(VBI.MathLib.DegToRad([parseFloat(l[0]),parseFloat(a[0])]),parseInt(b))}else s.ZoomToGeoPosition(VBI.MathLib.DegToRad([parseFloat(l),parseFloat(a)]),parseInt(b))}};sap.ui.vbm.VBI.prototype.onAfterRendering=function(){if(this.m_aLoadQueue){var n;for(n=0;n<this.m_aLoadQueue.length;++n)this.load(this.m_aLoadQueue[n]);this.m_aLoadQueue=null}var l=this.getId();if(this.m_VBIContext.m_Windows)this.m_VBIContext.m_Windows.Awake(l)};sap.ui.vbm.VBI.prototype.onBeforeRendering=function(){};sap.ui.vbm.VBI.prototype.IsRendered=function(){return this.getDomRef()?true:false};sap.ui.vbm.VBI.prototype.setConfig=function(c){return this.load(c)}};
