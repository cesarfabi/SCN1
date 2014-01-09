/*!
 * SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright
 * 		2009-2012 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.ca.ui.charts.BubbleChart");jQuery.sap.require("sap.ca.ui.library");jQuery.sap.require("sap.ca.ui.charts.Chart");sap.ca.ui.charts.Chart.extend("sap.ca.ui.charts.BubbleChart",{metadata:{library:"sap.ca.ui",properties:{"dataLabelFormat":{type:"any",group:"Appearance",defaultValue:null,deprecated:true},"showTitle":{type:"boolean",group:"Appearance",defaultValue:false},"showXAxisLabel":{type:"boolean",group:"Appearance",defaultValue:true},"xAxisFixedRange":{type:"boolean",group:"Appearance",defaultValue:false},"xAxisMinValue":{type:"float",group:"Appearance",defaultValue:0},"xAxisMaxValue":{type:"float",group:"Appearance",defaultValue:0},"showYAxisLabel":{type:"boolean",group:"Appearance",defaultValue:true},"yAxisFixedRange":{type:"boolean",group:"Appearance",defaultValue:false},"yAxisMinValue":{type:"float",group:"Appearance",defaultValue:0},"yAxisMaxValue":{type:"float",group:"Appearance",defaultValue:0},"showSizeLegend":{type:"boolean",group:"Appearance",defaultValue:false},"xAxisTitle":{type:"string",group:"Appearance",defaultValue:null},"yAxisTitle":{type:"string",group:"Appearance",defaultValue:null},"showCustomLabels":{type:"boolean",group:"Appearance",defaultValue:false},"labelProperty":{type:"object",group:"Appearance",defaultValue:null},"xAxisFormatFunction":{type:"object",group:"Appearance",defaultValue:null,deprecated:true},"xAxisFormatString":{type:"string",group:"Appearance",defaultValue:null,deprecated:true},"yAxisFormatFunction":{type:"object",group:"Appearance",defaultValue:null,deprecated:true},"yAxisFormatString":{type:"string",group:"Appearance",defaultValue:null,deprecated:true},"axisTooltipFormatString":{type:"any",group:"Appearance",defaultValue:null,deprecated:true},"axisFormatFunction":{type:"object",group:"Appearance",defaultValue:null,deprecated:true}},aggregations:{"content":{type:"sap.ui.core.Control",multiple:true,singularName:"content"}}}});
sap.ca.ui.charts.BubbleChart.prototype.init=function(){sap.ca.ui.charts.Chart.prototype.init.apply(this);this.setChartType("Bubble");this.setProperty("showSizeLegend",this.getShowSizeLegend());this.sId=this.getId()};
sap.ca.ui.charts.BubbleChart.prototype._getChartSettings=function(){var g=sap.ca.ui.charts.Chart.prototype._getChartSettings.call(this);var s={sizeLegend:{visible:this.getShowLegend()},xAxis:{title:{visible:true,text:this.getXAxisTitle()},label:{visible:this.getShowXAxisLabel(),formatString:this.getXAxisFormatString()},scale:{fixedRange:this.getXAxisFixedRange(),minValue:this.getXAxisMinValue(),maxValue:this.getXAxisMaxValue()}},yAxis:{title:{visible:true,text:this.getYAxisTitle()},label:{visible:this.getShowYAxisLabel(),formatString:this.getYAxisFormatString()},scale:{fixedRange:this.getYAxisFixedRange(),minValue:this.getYAxisMinValue(),maxValue:this.getYAxisMaxValue()}},plotArea:{axisTooltip:{formatString:this.getAxisTooltipFormatString()}},dataLabel:{visible:this.getShowDataLabel(),formatString:this.getDataLabelFormat()}};return jQuery.extend(true,g,s)};
sap.ca.ui.charts.BubbleChart.prototype.setXAxisFixedRange=function(v){this._oInternalVizChart.getXAxis().getScale().setFixedRange(v);this.setProperty("xAxisFixedRange",v)};
sap.ca.ui.charts.BubbleChart.prototype.setYAxisFixedRange=function(v){this._oInternalVizChart.getYAxis().getScale().setFixedRange(v);this.setProperty("yAxisFixedRange",v)};
sap.ca.ui.charts.BubbleChart.prototype.setXAxisMinValue=function(v){this._oInternalVizChart.getXAxis().getScale().setMinValue(v);this.setProperty("xAxisMinValue",v)};
sap.ca.ui.charts.BubbleChart.prototype.setYAxisMinValue=function(v){this._oInternalVizChart.getYAxis().getScale().setMinValue(v);this.setProperty("yAxisMinValue",v)};
sap.ca.ui.charts.BubbleChart.prototype.setXAxisMaxValue=function(v){this._oInternalVizChart.getXAxis().getScale().setMaxValue(v);this.setProperty("xAxisMaxValue",v)};
sap.ca.ui.charts.BubbleChart.prototype.setYAxisMaxValue=function(v){this._oInternalVizChart.getYAxis().getScale().setMaxValue(v);this.setProperty("yAxisMaxValue",v)};
sap.ca.ui.charts.BubbleChart.prototype.setXAxisTitle=function(v){this._oInternalVizChart.getXAxis().getTitle().setText(v);this.setProperty("xAxisTitle",v)};
sap.ca.ui.charts.BubbleChart.prototype.setYAxisTitle=function(v){this._oInternalVizChart.getYAxis().getTitle().setText(v);this.setProperty("yAxisTitle",v)};
sap.ca.ui.charts.BubbleChart.prototype.setShowXAxisLabel=function(v){this._oInternalVizChart.getXAxis().getLabel().setVisible(v);this.setProperty("xAxisLabel",v)};
sap.ca.ui.charts.BubbleChart.prototype.setShowYAxisLabel=function(v){this._oInternalVizChart.getYAxis().getLabel().setVisible(v);this.setProperty("yAxisLabel",v)};
sap.ca.ui.charts.BubbleChart.prototype.setDataLabelFormat=function(f){this._oInternalVizChart.getDataLabel().setFormatString(f);this.setProperty("dataLabelFormat",f)};
sap.ca.ui.charts.BubbleChart.prototype.getDataLabelFormat=function(){if(!this.getProperty("dataLabelFormat")){return this.getProperty("dataLabelFormatter")}jQuery.sap.log.warning("dataLabelFormat property is deprecated. Please use dataLabelFormatter.");return this.getProperty("dataLabelFormat")};
sap.ca.ui.charts.BubbleChart.prototype.setShowSizeLegend=function(s){this.setProperty("showSizeLegend",s);if(this._oInternalVizChart){this._oInternalVizChart.getSizeLegend().setVisible(s)}return this};
sap.ca.ui.charts.BubbleChart.prototype.formatDataLabel=function(e){var c=d3.select(jQuery.sap.byId(this.getId()).children()[0]).select('.v-m-root');c.selectAll('.sapBubbleTxt').remove();if(this._oInternalVizChart.getDataset()&&this.aData.length>0){c=d3.select(jQuery.sap.byId(this.getId()).children()[0]).select('.v-m-root');var D=c.selectAll('.v-datapoint');var C=c.node().getBoundingClientRect();var b=this.aData;var l=this.getLabelProperty();c.selectAll('.sapBubbleTxt').remove();D.each(function(d,i){var p=this.getBoundingClientRect();var x=p.left-C.left;var y=p.top+p.height/2-C.top;var n=p.right-p.left;if(sap.ui.Device.browser.firefox){y=y-10}if((p.right-p.left)>60){var L=l[0];if(L){var s=b[this.__data__.ctx[0].path.dii_a1][L];if(sap.ui.Device.browser.internet_explorer){var a="path"+d.x+s;c.append("path").attr("id",a).attr("d",'M '+(x+10)+" "+(y)+' h '+(n-20)).style('stroke','none');c.append('text').append("textPath").attr("xlink:href","#"+a).attr('class','sapBubbleTxt').text(s)}else{c.append("foreignObject").attr("width",n).attr("height",20).attr('x',x).attr('y',y-7).attr('text-anchor','middle').attr('class','sapBubbleTxt').append("xhtml:body").style("background","transparent").html("<div class='sapBubbleTxtDiv'>"+s+"</div>")}}var f=l[1];if(f){var g=b[this.__data__.ctx[0].path.dii_a1][f];if(sap.ui.Device.browser.internet_explorer){var h="path"+d.y+g;c.append("path").attr("id",h).attr("d",'M '+(x+10)+" "+(y+12)+' h '+(n-20)).style('stroke','none');c.append('text').append("textPath").attr("xlink:href","#"+h).attr('class','sapBubbleTxt').text(g)}else{c.append("foreignObject").attr("width",n).attr("height",20).attr('x',x).attr('y',y+4).attr('text-anchor','middle').attr('class','sapBubbleTxt').append("xhtml:body").style("background","transparent").html("<div class='sapBubbleTxtDiv'>"+g+"</div>")}}}})}else{jQuery.sap.log.error("BubbleChart: formatDataLabel not possible without dataset")}};
sap.ca.ui.charts.BubbleChart.prototype.setXAxisFormatFunction=function(v){if(v){this.setXAxisLabelFormatter(v);this.oChartFormatter._legacyBubbleFormatter=v}this.setProperty("xAxisFormatFunction",v)};
sap.ca.ui.charts.BubbleChart.prototype.getXAxisFormatString=function(){if(!this.getProperty("xAxisFormatString")||this.getProperty("xAxisFormatString")==""){return this.getProperty("xAxisLabelFormatter")}jQuery.sap.log.warning("xAxisFormatString property is deprecated. Please use xAxisLabelFormatter.");return this.getProperty("xAxisFormatString")};
sap.ca.ui.charts.BubbleChart.prototype.setXAxisFormatString=function(f){jQuery.sap.log.warning("xAxisFormatString property is deprecated. Please use xAxisLabelFormatter.");this.setProperty("xAxisFormatString",f);return this};
sap.ca.ui.charts.BubbleChart.prototype.getYAxisFormatString=function(){if(!this.getProperty("yAxisFormatString")||this.getProperty("yAxisFormatString")==""){return this.getProperty("yAxisLabelFormatter")}jQuery.sap.log.warning("yAxisFormatString property is deprecated. Please use yAxisLabelFormatter.");return this.getProperty("yAxisFormatString")};
sap.ca.ui.charts.BubbleChart.prototype.getAxisTooltipFormatString=function(){if(!this.getProperty("axisTooltipFormatString")||this.getProperty("axisTooltipFormatString")==""){return this.getProperty("plotAreaAxisTooltipFormatter")}jQuery.sap.log.warning("axisTooltipFormatString property is deprecated. Please use plotAreaAxisTooltipFormatter.");return this.getProperty("axisTooltipFormatString")};
sap.ca.ui.charts.BubbleChart.prototype.setAxisTooltipFormatString=function(f){jQuery.sap.log.warning("axisTooltipFormatString property is deprecated. Please use axisTooltipFormatString.");this.setProperty("axisTooltipFormatString",f);return this};
sap.ca.ui.charts.BubbleChart.prototype.setYAxisFormatString=function(f){jQuery.sap.log.warning("yAxisFormatString property is deprecated. Please use yAxisLabelFormatter.");this.setProperty("yAxisFormatString",f);return this};
sap.ca.ui.charts.BubbleChart.prototype.setYAxisFormatFunction=function(v){if(v){jQuery.sap.log.warning("yAxisFormatFunction property is deprecated. Please use yAxisLabelFormatter.");this.setYAxisLabelFormatter(v);this.oChartFormatter._legacyBubbleFormatter=v}this.setProperty("yAxisFormatFunction",v)};
sap.ca.ui.charts.BubbleChart.prototype.setAxisFormatFunction=function(v){if(v){jQuery.sap.log.warning("axisFormatFunction property is deprecated. Please use plotAreaAxisTooltipFormatter.");this.axisLabelFormatter=v;this.oChartFormatter._legacyBubbleFormatter=v}this.setProperty("axisFormatFunction",v)};
sap.ca.ui.charts.BubbleChart.prototype.getShowTitle=function(){return sap.ca.ui.charts.Chart.prototype.getTitle.apply(this)};
sap.ca.ui.charts.BubbleChart.prototype.setShowTitle=function(t){sap.ca.ui.charts.Chart.prototype.setTitle.apply(this,t)};
sap.ca.ui.charts.BubbleChart.prototype.setContent=function(c){jQuery.sap.log.warning("Usage of deprecated feature, please use setAggregation('internalContent')")};
sap.ca.ui.charts.BubbleChart.prototype.getContent=function(){jQuery.sap.log.warning("Usage of deprecated feature please use getAggregation('internalContent')");return null};
sap.ca.ui.charts.BubbleChart.prototype.onChartInitialized=function(e){sap.ca.ui.charts.Chart.prototype.onChartInitialized.apply(this,arguments);var d=this._oInternalVizChart.getModel().getData();this.aData=[];for(var k in d){if(jQuery.isArray(d[k])){this.aData=d[k]}}if(this.getShowCustomLabels()){this.formatDataLabel()}};
sap.ca.ui.charts.BubbleChart.prototype.getShowLegend=function(){return sap.ca.ui.charts.Chart.prototype.getShowLegend.call(this)||this.getShowSizeLegend()};
sap.ca.ui.charts.BubbleChart.prototype.setShowLegend=function(s){sap.ca.ui.charts.Chart.prototype.setShowLegend.call(this,s);this.setShowSizeLegend(s);return this};
