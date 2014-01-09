﻿ 
VBI.MapLayerStackManager=function(){var m={};m.vbiclass="MapLayerStackManager";m.m_MapLayerStackArray=[];m.clear=function(){for(var n=0;n<m.m_MapLayerStackArray.length;++n)m.m_MapLayerStackArray[n].clear();m.m_MapLayerStackArray=[]};m.load=function(d,c){if(d.Set){m.clear();var a;if(jQuery.type(d.Set.MapLayerStack)=='object'){a=new VBI.MapLayerStack();a.load(d.Set.MapLayerStack,c);m.Add(a)}else if(jQuery.type(d.Set.MapLayerStack)=='array'){for(var n=0;n<d.Set.MapLayerStack.length;++n){a=new VBI.MapLayerStack();a.load(d.Set.MapLayerStack[n],c);m.Add(a)}}}};m.Add=function(a){this.m_MapLayerStackArray.push(a)};m.GetMapLayerStack=function(n){for(var i=0;i<this.m_MapLayerStackArray.length;++i){if(this.m_MapLayerStackArray[i].m_Name==n)return this.m_MapLayerStackArray[i]}return null};return m};
VBI.MapLayerStacks=VBI.MapLayerStackManager();
VBI.MapLayerStack=function(n,d){var m={};m.vbiclass="MapLayerStack";m.m_MapLayerArray=[];m.m_Name=n;m.m_Description=d;m.clear=function(){for(var a=0;a<m.m_MapLayerArray.length;++a)m.m_MapLayerArray[a].clear();m.m_MapLayerArray=[]};m.load=function(a,c){if(a.name)m.m_Name=a.name;if(a.description)m.m_Description=a.description;var b;if(a.MapLayer){if(jQuery.type(a.MapLayer)=='object'){b=new VBI.MapLayer();b.load(a.MapLayer,c);m.Add(b)}else if(jQuery.type(a.MapLayer)=='array'){for(var e=0;e<a.MapLayer.length;++e){b=new VBI.MapLayer();b.load(a.MapLayer[e],c);m.Add(b)}}}};m.Add=function(a){this.m_MapLayerArray.push(a)};m.GetMaxLOD=function(){var a,b=0;var c=this.m_MapLayerArray;for(var i=0;i<c.length;++i){a=c[i].GetMaxLOD();if(a>b)b=a}return b};m.GetMinLOD=function(){var a,b=Number.MAX_VALUE;var c=this.m_MapLayerArray;for(var i=0;i<c.length;++i){a=c[i].GetMinLOD();if(a<b)b=a}return b};m.GetCopyright=function(){var c=null;for(var a=0;a<this.m_MapLayerArray.length;a++){var b=this.m_MapLayerArray[a].GetMapProvider();if(b.m_Copyright){if(!c)c=b.m_Copyright;else c=c+", "+b.m_Copyright}}return c};return m};
VBI.MapLayer=function(){var m={};m.vbiclass="MapLayer";m.m_Name=null;m.m_refMapProvider=null;m.m_fOpacity=1.0;m.m_colBkgnd=null;m.clear=function(){m.m_refMapProvider=null};m.load=function(d,c){if(d.name)m.m_Name=d.name;if(d.opacity)m.m_fOpacity=d.opacity;if(d.colBkgnd)m.m_colBkgnd=d.colBkgnd;if(d.refMapProvider)if(c.m_MapProviders)m.m_refMapProvider=c.m_MapProviders.GetMapProviderByName(d.refMapProvider);if(!m.m_refMapProvider)VBI.m_bTrace&&VBI.Trace("Error: MapLayer: no valid mapprovider specified")};m.GetMinLOD=function(){if(m.m_refMapProvider)return m.m_refMapProvider.GetMinLOD()};m.GetMaxLOD=function(){if(m.m_refMapProvider)return m.m_refMapProvider.GetMaxLOD()};m.GetMapProvider=function(){if(m.m_refMapProvider)return m.m_refMapProvider;return null};return m};
