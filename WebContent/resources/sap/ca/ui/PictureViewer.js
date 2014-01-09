/*!
 * SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright
 * 		2009-2012 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.ca.ui.PictureViewer");jQuery.sap.require("sap.ca.ui.library");jQuery.sap.require("sap.m.TileContainer");sap.m.TileContainer.extend("sap.ca.ui.PictureViewer",{metadata:{library:"sap.ca.ui",properties:{"tileScaling":{type:"float",group:"Misc",defaultValue:0.95},"removable":{type:"boolean",group:"Misc",defaultValue:false}},defaultAggregation:"items",aggregations:{"items":{type:"sap.ca.ui.PictureViewerItem",multiple:true,singularName:"item"}},events:{"pictureDeleted":{}}}});sap.ca.ui.PictureViewer.M_EVENTS={'pictureDeleted':'pictureDeleted'};jQuery.sap.declare("sap.ca.ui.PictureViewer");jQuery.sap.require("sap.ui.core.ResizeHandler");jQuery.sap.require("sap.m.TileContainer");
sap.ca.ui.PictureViewer.prototype.init=function(){sap.m.TileContainer.prototype.init.apply(this);this.setEditable(false);if(!jQuery.device.is.desktop){jQuery(window).bind("tap",jQuery.proxy(this._reset,this))}this.addStyleClass("sapCaPW");this.addStyleClass("sapCaPWRendering")};
sap.ca.ui.PictureViewer.prototype.exit=function(){jQuery(window).unbind("resize",jQuery.proxy(this._resize,this));sap.m.TileContainer.prototype.exit.apply(this);if(!jQuery.device.is.desktop){jQuery(window).unbind("tap",jQuery.proxy(this._reset,this))}};
sap.ca.ui.PictureViewer.prototype.setTileScaling=function(t){if(t<0||t>1){t=0.75;jQuery.sap.log.error("Tile Scaling should be a float value between 0 and 1 and not "+t+". Setting it to 0.75 by default.")}this.setProperty('tileScaling',t)};
sap.ca.ui.PictureViewer.prototype.addItem=function(i){this.insertItem(i,this.getItems().length)};
sap.ca.ui.PictureViewer.prototype.insertItem=function(i,I){var t=new sap.ca.ui.PictureTile({tileContent:i});t.attachPictureDelete(jQuery.proxy(this._deletePictureRequestHandler,this));this.insertTile(t,I);this.insertAggregation("items",i,I);return this};
sap.ca.ui.PictureViewer.prototype.insertTile=function(t,i){t.attachPictureDelete(jQuery.proxy(this._deletePictureRequestHandler,this));sap.m.TileContainer.prototype.insertTile.apply(this,arguments)};
sap.ca.ui.PictureViewer.prototype.deleteTile=function(t){sap.m.TileContainer.prototype.deleteTile.apply(this,arguments);t.destroy()};
sap.ca.ui.PictureViewer.prototype.deletePicture=function(i){var p,a,n;n=this.getTiles().length;if(typeof i!="number"||i<0||i>=n){p=this.getPageFirstTileIndex()}else{p=i}if(p>-1){a=this.getTiles()[p];a.detachPictureDelete(jQuery.proxy(this._deletePictureRequestHandler,this));this.deleteTile(a);this.removeAggregation("items",p,true)}else{jQuery.sap.log.warning("Cannot find and delete a picture at index : "+i)}return this};
sap.ca.ui.PictureViewer.prototype.selectPicture=function(i){if(this._bRendered){this.addStyleClass("sapCaPWRendering")}else{}this._selectedIndex=i;return this};
sap.ca.ui.PictureViewer.prototype.setSelectedIndex=function(i){this.selectPicture(i)};
sap.ca.ui.PictureViewer.prototype.getCurrentPictureIndex=function(){return this.getPageFirstTileIndex()};
sap.ca.ui.PictureViewer.prototype._deletePictureRequestHandler=function(e){var p=this.indexOfTile(e.getSource());this.deleteTile(e.getSource());this.firePictureDeleted({index:p})};
sap.ca.ui.PictureViewer.prototype._reset=function(e){var i=this.getCurrentPictureIndex();var t=this.getTiles();if(i>-1&&t&&t.length>i){var T=t[i];if(T){var $=jQuery(e.target);var a=this.$();if(a.length>0&&$.length>0){var b=$.closest(this.$());if(b.length===0){T.switchVisibility(false)}}}}};
sap.ca.ui.PictureViewer.prototype.setRemovable=function(v){this.setProperty("removable",v,true);this.toggleStyleClass("sapCaPWEditable",v)};
sap.ca.ui.PictureViewer.prototype.setEditable=function(v){sap.m.TileContainer.prototype.setEditable.call(this,false)};
sap.ca.ui.PictureViewer.prototype._getTileDimension=function(){if(!this._bRendered)return;var $=jQuery.sap.byId(this.getId()+"-scrl");var t={width:$.width(),height:$.height()};return t};
sap.ca.ui.PictureViewer.prototype.onBeforeRendering=function(){jQuery(window).unbind("resize",jQuery.proxy(this._resize,this));this.addStyleClass("sapCaPWRendering")};
sap.ca.ui.PictureViewer.prototype.onAfterRendering=function(){this._bRendered=true;jQuery(window).bind("resize",jQuery.proxy(this._resize,this));this._applyDimension();this.$().toggleClass("sapCaPWEditable",this.getRemovable()===true);var t=this;this._sInitialResizeTimeoutId=setTimeout(function(){t.addStyleClass("sapCaPWRendering");t._applyPageStartIndex(t._selectedIndex);t._update(false)},this._iInitialResizeTimeout);if(jQuery.device.is.desktop){var f=this.getTiles()[0],T=this._iInitialResizeTimeout;if(!!f){setTimeout(jQuery.proxy(function(){this._findTile(f.$()).focus()},this),T)}}};
sap.ca.ui.PictureViewer.prototype._update=function(a){sap.m.TileContainer.prototype._update.apply(this,arguments);this.removeStyleClass("sapCaPWRendering")};
sap.ca.ui.PictureViewer.prototype._applyDimension=function(){var d=this._getContainerDimension(),i=this.getId(),$=this.$(),t,o=10,T=60,c=jQuery.sap.byId(i+"-cnt"),a,b,p=jQuery.sap.byId(i+"-pager").outerHeight();jQuery.sap.byId(i+"-scrl").css({width:d.outerwidth+"px",height:(d.outerheight-p)+"px"});c.css({height:(d.outerheight-p)+"px",visibility:"visible"});$.css("visibility","visible");t=$.position();a=c.position();b=c.outerHeight();if(jQuery.device.is.phone){o=2}else if(jQuery.device.is.desktop){o=0}jQuery.sap.byId(i+"-blind").css({top:(a.top+o)+"px",left:(a.left+o)+"px",width:(c.outerWidth()-o)+"px",height:(b-o)+"px"});jQuery.sap.byId(i+"-rightedge").css({top:(t.top+o+T)+"px",right:o+"px",height:(b-o-T)+"px"});jQuery.sap.byId(i+"-leftedge").css({top:(t.top+o+T)+"px",left:(t.left+o)+"px",height:(b-o-T)+"px"})};
