/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2013 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.ui.commons.PanelRenderer");
sap.ui.commons.PanelRenderer=function(){};
sap.ui.commons.PanelRenderer.render=function(r,c){var a=r;var b=c.getId();if(!c.getVisible()){return}var d=sap.ui.getCore().getConfiguration().getAccessibility();var h=sap.ui.commons.Panel._isSizeSet(c.getHeight());var w=sap.ui.commons.Panel._isSizeSet(c.getWidth());c.getScrollTop();c.getScrollLeft();a.write("<section");a.writeControlData(c);a.addClass("sapUiPanel");a.addStyle("width",c.getWidth());if(!c.getCollapsed()){a.addStyle("height",c.getHeight())}else{a.addClass("sapUiPanelColl");a.addStyle("height","auto")}if(h){a.addClass("sapUiPanelHeightSet")}if(w){a.addClass("sapUiPanelWidthSet")}if(c.getApplyContentPadding()){a.addClass("sapUiPanelWithPadding")}if(!c.getEnabled()){a.addClass("sapUiPanelDis")}if(c.getShowCollapseIcon()){a.addClass("sapUiPanelWithCollapseIcon")}a.addClass("sapUiPanelBorderDesign"+c.getBorderDesign());a.addClass("sapUiPanelAreaDesign"+c.getAreaDesign());a.writeClasses();a.writeStyles();if(d){a.writeAttribute("aria-labelledby",b+"-title ");a.writeAttribute("aria-describedby",b+"-acc");a.writeAttribute("role","region");if(c.getCollapsed()){a.writeAttribute("aria-expanded","false")}else{a.writeAttribute("aria-expanded","true")}a.writeAttribute("tabindex","0")}var t=c.getTooltip_AsString();if(t){a.writeAttributeEscaped("title",t)}a.write("><header id='"+b+"-hdr'");a.addClass("sapUiPanelHdr");var T=c.getTitle();var s;var l=sap.ui.core.TitleLevel.H5;var e=true;if(T){s=T.getTooltip_AsString();if(s){a.writeAttributeEscaped("title",s)}if(T.getLevel()!=sap.ui.core.TitleLevel.Auto){l=T.getLevel();e=T.getEmphasized()}}if(e){a.addClass("sapUiPanelHdrEmph")}a.writeClasses();a.write(">");if(c.getShowCollapseIcon()&&d){a.write("<span id=\""+b+"-acc\" style=\"display:none;\">");a.writeEscaped(c._rb.getText("PANEL_HEAD_ACC"));a.write("</span>")}var C=c._rb.getText(c.getCollapsed()?"PANEL_EXPAND":"PANEL_COLLAPSE");if(c.getShowCollapseIcon()){a.write("<a id='"+b+"-collArrow' class='sapUiPanelHdrItem sapUiPanelCollArrow' href='javascript:void(0)' tabindex='0' title='"+C+"'");if(d){a.writeAttribute("role","button")}a.write(">&nbsp;</a>")}if(T&&T.getIcon()){a.write("<img id='"+b+"-ico' class='sapUiPanelHdrItem sapUiPanelIco' src='");a.writeEscaped(T.getIcon());a.write("'");if(d){a.write(" role='presentation' alt=''")}a.write("/>")}var f=jQuery.sap.escapeHTML(c.getText());if(!f){f="&nbsp;"}a.write("<"+l+" ");a.addClass("sapUiTv"+l);a.write(" id='"+b+"-title' ");a.addClass("sapUiPanelHdrItem");a.addClass("sapUiPanelTitle");a.writeClasses();if(d){a.writeAttribute("role","heading")}a.write(">");a.write(f);a.write("</"+l+">");var B=c.getButtons();if(B&&(B.length>0)){a.write("<div id='"+b+"-tb' class='sapUiPanelHdrItem sapUiPanelTb sapUiTbDesignFlat'>");for(var i=0;i<B.length;i++){a.renderControl(B[i])}a.write("</div>")}if(c.getShowCollapseIcon()){a.write("<a id='"+b+"-collIco' class='sapUiPanelHdrRightItem sapUiPanelCollIco' href='javascript:void(0)' tabindex='0' title='"+C+"'");if(d){a.writeAttribute("role","button")}a.write(">&nbsp;</a>")}a.write("</header>");if(!c.getCollapsed()){a.write("<div class='sapUiPanelCont' id='",b,"-cont'>");var o=c.getContent(),L=o.length;for(var i=0;i<L;i++){a.renderControl(o[i])}a.write("</div>")}a.write("</section>")};
