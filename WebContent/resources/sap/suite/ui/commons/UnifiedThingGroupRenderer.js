/*!
 * SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2012 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.suite.ui.commons.UnifiedThingGroupRenderer");sap.suite.ui.commons.UnifiedThingGroupRenderer={};
sap.suite.ui.commons.UnifiedThingGroupRenderer.render=function(r,c){r.write("<div");r.writeControlData(c);r.addClass("sapSuiteUtg");r.writeClasses();r.write(">");r.write("<div");r.addClass("sapSuiteUtgHeader");r.writeClasses();r.writeAttribute("id",c.getId()+"-thing-group-header");r.write(">");r.write("<div");r.addClass("sapSuiteUtgTitle");r.writeClasses();r.writeAttribute("id",c.getId()+"-thing-group-title");r.write(">");r.writeEscaped(c.getTitle());r.write("</div>");r.write("<div");r.addClass("sapSuiteUtgDesc");r.writeClasses();r.writeAttribute("id",c.getId()+"-thing-group-desc");r.write(">");r.writeEscaped(c.getDescription());r.write("</div>");r.write("</div>");r.write("<div");r.addClass("sapSuiteUtgContent");r.addClass("sapSuiteUtgContent"+c.getDesign());r.writeClasses();r.writeAttribute("id",c.getId()+"-thing-group-content");r.write(">");r.renderControl(c.getContent());r.write("</div>");r.write("</div>")};
