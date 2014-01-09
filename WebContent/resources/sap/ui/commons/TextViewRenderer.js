/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2013 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.ui.commons.TextViewRenderer");jQuery.sap.require("sap.ui.core.Renderer");sap.ui.commons.TextViewRenderer={};
sap.ui.commons.TextViewRenderer.render=function(R,t){var a=R;var r=sap.ui.commons.TextViewRenderer;if(!t.getVisible()){return}var e=t.getEnabled()===true,d=t.getDesign(),b=0;if(!e){b=-1;a.addClass("sapUiTvDsbl");t.allowTextSelection(false)}else{switch(t.getSemanticColor()){case(sap.ui.commons.TextViewColor.Negative):a.addClass('sapUiTvErr');break;case(sap.ui.commons.TextViewColor.Positive):a.addClass('sapUiTvSucc');break;case(sap.ui.commons.TextViewColor.Critical):a.addClass('sapUiTvWarn');break}}var T=sap.ui.commons.TextViewDesign;if(d!=T.Standard){if(d===T.Bold){a.addClass("sapUiTvEmph")}else if(d===T.H1){a.addClass("sapUiTvH1")}else if(d===T.H2){a.addClass("sapUiTvH2")}else if(d===T.H3){a.addClass("sapUiTvH3")}else if(d===T.H4){a.addClass("sapUiTvH4")}else if(d===T.H5){a.addClass("sapUiTvH5")}else if(d===T.H6){a.addClass("sapUiTvH6")}else if(d===T.Italic){a.addClass("sapUiTvItalic")}else if(d===T.Small){a.addClass("sapUiTvSmall")}else if(d===T.Monospace){a.addClass("sapUiTvMono")}else if(d===T.Underline){a.addClass("sapUiTvULine")}}if(!t.getWrapping()){a.addClass("sapUiTvWrap")}if(t.getWidth()&&t.getWidth()!=''){a.addStyle("width",t.getWidth())}a.write("<span");a.writeControlData(t);a.addClass("sapUiTv");if(t.getTooltip_AsString()){a.writeAttributeEscaped("title",t.getTooltip_AsString())}else if(t.getText()){a.writeAttributeEscaped("title",t.getText())}var o=t.getTextDirection();if(o){a.writeAttribute("dir",o)}var c=t.getTextAlign();if(c){var A=r.getTextAlign(c,o);A=A.charAt(0).toUpperCase()+A.substring(1);a.addClass("sapUiTvAlign"+A)}a.writeAttribute('tabindex','-1');a.writeAccessibilityState(t,{role:t.getAccessibleRole().toLowerCase(),invalid:t.getSemanticColor()==sap.ui.commons.TextViewColor.Negative,disabled:!t.getEnabled()});a.writeClasses();a.writeStyles();a.write(">");a.writeEscaped(t.getText(),true);a.write("</span>")};
sap.ui.commons.TextViewRenderer.getTextAlign=sap.ui.core.Renderer.getTextAlign;