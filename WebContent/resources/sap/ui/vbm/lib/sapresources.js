﻿ VBI.ResourceManager=(function(){var r={};r.m_DummyData="iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA61JREFUeNqsVG1LU2EYvs85bjomsr6YhFQsNagke6FQigoiSQOJ8FM/oT8R9CmoCD/2C4o+FxUFWmFFKNHS2rTMtbmjm3vx7O3Msz1d9/YcXcvhjB643OY5z329PPf9KER0HTgBuOn/rTAwBXxpwp/2W8PD3hsjI3tcmqaKdJpEofBPVXlfSdcpNzXV9+ndu6ZBId4wwdq11tZdjoUFtdjcTMIwKgRC7LC6IBZn+XykT09rQUW5IIR4wAQLvomJmd0+3ynF7SZhWUTr65VNitJ4cewrhUL0ESTP8a98d/fPrvHxM1yhq49o30OiWzgEp6Nqn9KoeI4BmAGeArOKIq7evPnV4fHEVfyOfSIKvSV6wy8V5IadLHimBOAH5oG9x4/ntLY2TzAYbGeCLGDcI3qVRn0TP0qSRDSongv8kgTrmiaOXrmSzmazpeXl5SwTcODpWbh4T/SBHRR3qH4VmAN+APtPnsw1ezxWLBYr6LoeUUWlW/JA8g7RE4PIzDfogp9lgBDwjYVBfe/QUBqriOJJkMyr8t2yC9hcgov361JZI+rjQIBbEfCePp1ztrVZ8Xi8gHgiqVQqoFa6bNPFXTRCCt+3OwtbfVBmLxwOceTy5bL6SCSSAsn3ZDK5qK6gpWpcRCaJJgtSYb2I+OVYVfYH+vuzTW53OXuoXwLBt0QiEVc3Z2XTxRjRsySaw6xyIOp0DmevOJ2lw4ODGaxy9ig8Dyf82CwT1LgwYDuCuXhbqHMW/FJUqufsuwYGcprLZUWjURPqw1AfAHg0xIYDJqlykbpP9CIhXZRqnNjZfwVUqO9F9qwexZOrq6vz+M6PeSupdZrD0Il0nm5TKhY12XPn/AR6zp7NksNRRPZ5zh4EfiBhb/mDoNbFbZwF3kzb1wcPIKadFiWBo6WldPjSpQzyttA5rH7ONM2wvHGongPbRRoHvfKaaMJ2YWe/of7cuQyr5+xxuJw9q49X98RfBDUu1jDdL7FjLS/V233vdLlKhy5ezBqGYSEaNE6C1YekDtrOQbWL5XGicS6uy4NlkoPnz2eEppXVI54Qdw7OIVk7OlsSVLnI8VzgLJ4ikgQX/wy0tLaWs7fVc/aY2r/Ub+eAIhUXaxiq4DTRo4C8OY8NDeU0p1PIvg/hzplDa6a2Gvy6BOyiQwgF45iHm6h3bOy14vX+6ujuzrN6RGKFw+E4YglAfXgr9byatrsxO0V5GFuGR0eLnT09j5H3AAq3+/1+E5+LfGPWU8/rtwADAFTqgB/beBQtAAAAAElFTkSuQmCC";return r})();
VBI.Resources=function(){var r={};r.m_resoursedata=[];r.m_resourseinstance=[];r.clear=function(){};r.load=function(d,c){if(d.Set){r.clear();if(jQuery.type(d.Set.Resource)=='object'){r.m_resoursedata[d.Set.Resource.name]=d.Set.Resource.value}else if(jQuery.type(d.Set.Resource)=='array'){for(var n=0;n<d.Set.Resource.length;++n){r.m_resoursedata[d.Set.Resource[n].name]=d.Set.Resource[n].value}}}};r.GetImageBits=function(n,l){var a;if(a=r.m_resourseinstance[n])if(a.m_Bits)return([a.m_Bits,a.m_Image.naturalWidth,a.m_Image.naturalHeight]);var i=r.GetImage(n,l);if(i){var b=VBI.Utilities.GetImagePixelData(i).data;r.m_resourseinstance[n].m_Bits=b;return([r.m_resourseinstance[n].m_Bits,i.naturalWidth,i.naturalHeight])}return null};r.GetImage=function(n,l){var a,b;if(a=r.m_resourseinstance[n])if(a.m_Image)return a.m_Image;if(a){a.m_Image=VBI.Utilities.CreateDOMImageFromData(r.m_resoursedata[n],l);return a.m_Image}else if(b=r.m_resoursedata[n]){return(r.m_resourseinstance[n]={m_Image:VBI.Utilities.CreateDOMImageFromData(b,l)}).m_Image}VBI.m_bTrace&&VBI.Trace("resource not found; default image loaded");return(r.m_resourseinstance[n]={m_Image:VBI.Utilities.CreateDOMImageFromData(VBI.ResourceManager.m_DummyData,l)}).m_Image};return r};