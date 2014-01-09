// Copyright (c) 2013 SAP AG, All Rights Reserved
(function(){"use strict";jQuery.sap.declare("sap.ushell.ui.tile.TileBaseRenderer");sap.ushell.ui.tile.TileBaseRenderer={};sap.ushell.ui.tile.TileBaseRenderer.highlight=function(h,t){if(h&&h.length&&h.length>0){var i;for(i=0;i<h.length;i++){var a=new RegExp("("+h[i].replace(/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1")+")","gi");t=t.replace(a,"<b>$1</b>")}}return t};sap.ushell.ui.tile.TileBaseRenderer.render=function(r,c){var C=(c.getTargetURL()||"")!=="",i;if(C){r.write("<a");r.addClass("sapUshellTileBaseWrapperLink");r.writeClasses();r.writeAttribute("href",c.getTargetURL());r.write(">")}r.write("<div");r.writeControlData(c);r.addClass("sapUshellTileBase");r.writeClasses();r.write(">");r.write("<div");r.addClass("sapUshellTileBaseHeader");r.writeClasses();r.write(">");r.write("<h3");r.addClass("sapUshellTileBaseTitle");r.writeClasses();r.write(">");r.write(this.highlight(c.getHighlightTerms(),c.getTitle()||""));r.write("</h3>");if(c.getSubtitle()){r.write("<h4");r.addClass("sapUshellTileBaseSubtitle");r.writeClasses();r.write(">");r.write(this.highlight(c.getHighlightTerms(),c.getSubtitle()));r.write("</h4>")}r.write("</div>");if(typeof(this.renderPart)==='function'){this.renderPart(r,c)}if(c.getIcon()){var a=new sap.ui.core.Icon({src:c.getIcon()});a.addStyleClass("sapUshellTileBaseIcon");r.renderControl(a)}r.write("<div");r.addClass("sapUshellTileBaseInfo");r.addClass(c.getInfoState()||sap.ushell.ui.tile.State.Neutral);r.writeClasses();r.write(">");if(typeof(this.getInfoPrefix)==='function'){i=this.getInfoPrefix(c);r.write(i)}if(c.getInfo()){if(i){r.write(", ")}r.write(this.highlight(c.getHighlightTerms(),c.getInfo()))}r.write("</div>");r.write("</div>");if(C){r.write("</a>")}}}());