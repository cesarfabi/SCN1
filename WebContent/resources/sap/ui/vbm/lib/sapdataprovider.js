VBI.Bindable={};
VBI.Bindable.RemoveTypeObject=function(o){var n=this.length;for(var a=0;a<n;++a){if(this[a]==o){this[a].clear();this[a]=null;break}}};
VBI.isInt=function(i){return((i-0)==i&&i%1==0)};
VBI.FindElementByKey=function(e,a,v){if(map)if(map[v])return map[v];for(var n=0;n<e.length;++n){if(e[n].m_dataattributes.length<=a)continue;if(e[n].m_dataattributes[a]==v)return e[n]}return null};
VBI.IndexOf=function(a,e){var l=a.length;for(var n=0;n<l;++n)if(e==a[n])return n;return-1};
VBI.Types={st_unknown:0,st_vector:1,st_string:2,st_vectorarray:3,st_float:4,st_color:5,st_long:6,st_bool:7,string2bool:function(a){var t=a.slice(0,1);return(t=='t'||t=='1'||t=='X')?true:false},string2vector:function(a){var b=a.split(';');for(var n=0;n<b.length;++n)b[n]=parseFloat(b[n]);return b},string2color:function(a){var c;if(c=/^RGBA\(([\d]+),([\d]+),([\d]+),([\d]+|[\d]*.[\d]+)\)/.exec(a)){c=[+c[1],+c[2],+c[3],parseFloat(+c[4])/255.0];return"rgba("+c[0]+","+c[1]+","+c[2]+","+c[3]+")"}else if(c=/^RGB\(([\d]+),([\d]+),([\d]+)\)/.exec(a)){c=[+c[1],+c[2],+c[3]];return"rgba("+c[0]+","+c[1]+","+c[2]+", 1.0 )"}return"rgba( 255, 0, 0, 1.0 )"},string2long:function(a){return parseInt(a,10)},string2float:function(a){return parseFloat(a)},vector2string:function(a){tmp="";for(var n=0;n<a.length;++n){tmp+=a[n];if((n+1)<a.length)tmp+=";"}return tmp},color2string:function(a){var r;if(r=/^rgba\(([\d]+),([\d]+),([\d]+),([\d]+|[\d]*.[\d]+)\)/.exec(a)){r=[+r[1],+r[2],+r[3],parseInt(parseFloat(+r[4])*255.0)];return"RGBA("+r[0]+","+r[1]+","+r[2]+","+r[3]+")"}return null},long2float:function(a){return parseFloat(a)},float2long:function(a){return parseInt(a)},};
VBI.DataTypeProvider=function(){var d={};d.m_datatypenodes=[];d.vbiclass="DataTypeProvider";d.isParentOf=function(p,c){var t=c;while(t=t.m_Parent){if(t==p)return true}return false};d.clear=function(){var o,n=this.m_datatypenodes.length;for(var a=0;a<n;++a)if(o=this.m_datatypenodes[a])o.clear();this.m_datatypenodes=[]};d.load=function(a,c){var n;if(a.Set){this.clear();var b;if(jQuery.type(a.Set.N)=='object'){}else if(jQuery.type(a.Set.N)=='array'){for(var i=0;i<a.Set.N.length;++i){this.m_datatypenodes.push(b=new VBI.DataTypeProvider.DataTypeNode(this,this.m_datatypenodes.length));if(a.Set.N[i].name)b.m_Name=a.Set.N[i].name;if(a.Set.N[i].key)b.m_Key=a.Set.N[i].key;b.load(a.Set.N[i])}}}if(a.Remove){var o;if(jQuery.type(a.Remove)=='object'){}else if(jQuery.type(a.Remove)=='array'){n=a.Remove.length;for(var e=0;e<n;++e){var p=a.Remove[e].name.split(".");if(a.Remove[e].type=='A'){if(o=d.FindTypeAttributeFromPath(p))(VBI.Bindable.RemoveTypeObject.bind(o.m_Parent.m_datatypeattributes))(o)}else if(a.Remove[e].type=='N'){if(o=d.FindTypeNodeFromPath(p))(VBI.Bindable.RemoveTypeObject.bind(o.m_Parent.m_datatypenodes))(o)}}}}};d.GetTypeNode=function(n,b){for(var i=0;i<this.m_datatypenodes.length;++i){if(this.m_datatypenodes[i].m_Name==n)return this.m_datatypenodes[i]}if(!b)return null;var a;this.m_datatypenodes.push(a=new VBI.DataTypeProvider.DataTypeNode(null,0));a.m_Name=n;return a};d.FindTypeNodeFromPath=function(p){var n,a=this.GetTypeNode(p[0],false);for(var b=1;b<p.length;++b){if(!(n=a.GetTypeNode(p[b],false)))continue;a=n}return a};d.FindTypeAttributeFromPath=function(p){var n=[];for(var a=0;a<(p.length-1);++a)n.push(p[a]);var b=this.FindTypeNodeFromPath(n);return b.GetTypeAttribute(p[a])};VBI.DataTypeProvider.DataTypeNode=function(p,a){var b={};b.m_datatypenodes=[];b.m_datatypeattributes=[];b.m_nArrayIndex=a;b.m_Name="";b.m_Key=null;b.m_Parent=p;b.clear=function(){var o,n,c;b.m_Parent=null;c=b.m_datatypenodes.length;for(n=0;n<c;++n)if(o=b.m_datatypenodes[n])o.clear();b.m_datatypenodes=[];c=b.m_datatypeattributes.length;for(n=0;n<c;++n)if(o=b.m_datatypeattributes[n])o.clear();b.m_datatypeattributes=[]};b.load=function(c){if(c.name)b.m_Name=c.name;if(c.key)b.m_Key=c.key;if(c.A){var t;if(jQuery.type(c.A)=='array'){for(var i=0;i<c.A.length;++i){b.m_datatypeattributes.push(t=new VBI.DataTypeProvider.DataTypeAttribute(b.m_datatypeattributes.length));t.m_Parent=this;t.load(c.A[i])}}else if(jQuery.type(c.A)=='object'){b.m_datatypeattributes.push(t=new VBI.DataTypeProvider.DataTypeAttribute(b.m_datatypeattributes.length));t.m_Parent=this;t.load(c.A)}}if(c.N){if(jQuery.type(c.N)=='array'){for(var i=0;i<c.N.length;++i){var e;b.m_datatypenodes.push(e=new VBI.DataTypeProvider.DataTypeNode(this,b.m_datatypenodes.length));e.load(c.N[i])}}else if(jQuery.type(c.N)=='object'){var e;b.m_datatypenodes.push(e=new VBI.DataTypeProvider.DataTypeNode(this,b.m_datatypenodes.length));e.load(c.N)}}};b.GetTypeNode=function(n,c){for(var i=0;i<b.m_datatypenodes.length;++i){if(b.m_datatypenodes[i].m_Name==n)return b.m_datatypenodes[i]}if(!c)return null;var e;b.m_datatypenodes.push(e=new VBI.DataTypeProvider.DataTypeNode(this,b.m_datatypenodes.length));e.m_Name=n;return e};b.GetKeyTypeAttribute=function(){if(b.m_Key)return b.GetTypeAttribute(b.m_Key,true);else return b.GetTypeAttribute("VB:ix",true);return null};b.GetPath=function(){var n=[];var c=this;do{n.splice(0,0,c.m_Name)}while((c=c.m_Parent)&&c['m_Name']);return n};b.GetTypeAttribute=function(n,c){for(var i=0;i<b.m_datatypeattributes.length;++i){if(b.m_datatypeattributes[i].m_Alias==n)return b.m_datatypeattributes[i];if(b.m_datatypeattributes[i].m_Name==n)return b.m_datatypeattributes[i]}if(c){var e;b.m_datatypeattributes.push(e=new VBI.DataTypeProvider.DataTypeAttribute(b.m_datatypeattributes.length));e.m_Name=n;return e}return null};return b};VBI.DataTypeProvider.DataTypeAttribute=function(a){var b={};b.m_Name="";b.m_Alias="";b.m_Type=VBI.Types.st_unknown;b.m_nArrayIndex=a;b.m_Parent=null;b.clear=function(){b.m_Parent=null};b.load=function(c){if(c.name)b.m_Name=c.name;if(c.alias)b.m_Alias=c.alias;if(c.type){switch(c.type){case"vectorarray":b.m_Type=VBI.Types.st_vectorarray;break;case"vector":b.m_Type=VBI.Types.st_vector;break;case"long":b.m_Type=VBI.Types.st_long;break;case"string":b.m_Type=VBI.Types.st_string;break;case"color":b.m_Type=VBI.Types.st_color;break;case"bool":b.m_Type=VBI.Types.st_bool;break;case"float":b.m_Type=VBI.Types.st_float;break;default:b.m_Type=VBI.Types.st_string;break}}};return b};return d};
VBI.DataProvider=function(){var d={};d.vbiclass="DataProvider";d.m_datanodes=[];d.m_dtp=null;d.clear=function(){var o,n=this.m_datanodes.length;for(var a=0;a<n;++a)if(o=this.m_datanodes[a])o.clear();this.m_datanodes=[]};d.set=function(a,c){var b=c.m_DataTypeProvider;if(!b){VBI.m_bTrace&&VBI.Trace("Error: data types are not available");return}if(a.type&&a.name){if((a.type=="N")){if(jQuery.type(a.N)=='object'){var e;var p=a.name.split(".");if(e=this.FindNodeFromPath(p)){if(a.name!=a.N.name){VBI.m_bTrace&&VBI.Trace("Error: node loading delta operation failed");return}e.load(a.N,b.FindTypeNodeFromPath(p));return}}else if(jQuery.type(a.N)=='array'){}}else if((a.type=="E")){}}else{this.clear()}if(a.N){var f,n,g;if(jQuery.type(a.N)=='object'){f=b.GetTypeNode(g=a.N.name,true);this.m_datanodes[f.m_nArrayIndex]=(n=new VBI.DataProvider.DataNode());n.m_Parent=this;n.m_Name=g;n.load(a.N,f)}else if(jQuery.type(a.N)=='array'){for(var i=0;i<a.N.length;++i){f=b.GetTypeNode(g=a.N[i].name,true);this.m_datanodes[f.m_nArrayIndex]=(n=new VBI.DataProvider.DataNode());n.m_Parent=this;n.m_Name=g;n.load(a.N[i],f)}}}};d.load=function(a,c){var b=c.m_DataTypeProvider;this.m_dtp=b;if(a.Remove){var n;if(jQuery.type(a.Remove)=='object'){}else if(jQuery.type(a.Remove)=='array'){var e;for(var f=0;f<a.Remove.length;++f){if(a.Remove[f].type=="N"&&(n=a.Remove[f].name)){if(e=this.FindNodeFromPath(n.split("."))){e.m_Parent.RemoveNode(e)}}else if(a.Remove[f].type=="E"&&(n=a.Remove[f].name)){if(e=this.FindNodeFromPath(n.split("."))){e.RemoveElements(a.Remove[f].N)}}}}}if(a.Set){if(jQuery.type(a.Set)=='object'){d.set(a.Set,c)}else if(jQuery.type(a.Set)=='array'){for(var i=0;i<a.Set.length;++i)d.set(a.Set[i],c)}}};d.store=function(a){if(this.IsModified()){a.Data={};a.Data.Merge={};a.Data.Merge.Node=[];var t;for(var n=0;n<this.m_datanodes.length;++n){if((t=this.m_datanodes[n])&&t.IsModified()){var b={};a.Data.Merge.Node.push(b);t.store(b)}}}};d.IsModified=function(){var t;for(var n=0;n<this.m_datanodes.length;++n){if((t=this.m_datanodes[n])&&t.IsModified())return true}return false};d.RemoveNode=function(n){var a=n.m_dtn.m_nArrayIndex;this.m_datanodes[a].clear();this.m_datanodes[a]=null};d.FindNodeFromPath=function(p){if(!this.m_dtp)return null;var c=this.m_dtp.GetTypeNode(p[0],false);var a=null;var b=this.m_datanodes[c.m_nArrayIndex];var P=true;for(var n=1;n<p.length;++n){if(P){if(c.m_Key){var e;if(e=c.GetTypeAttribute(c.m_Key))a=VBI.FindElementByKey(b.m_dataelements,e.m_nArrayIndex,p[n]);P=false;continue}else if(VBI.isInt(p[n])){parseInt(p[n]);a=b.m_dataelements[parseInt(p[n])];P=false;continue}else{if((a=b.GetLeadSelectedElement())===null)if(b.m_dataelements.length)a=b.m_dataelements[0];if(!a){VBI.m_bTrace&&VBI.Trace("Error: invalid lead selected element")}}}c=c.GetTypeNode(p[n],true);b=a.m_datanodes[c.m_nArrayIndex];P=true}return b};VBI.DataProvider.DataNode=function(){var a={};a.m_Name="";a.m_sLeadSelection=null;a.m_dataelements=[];a.m_Parent=null;a.m_dtn=null;a.m_bModified=false;a.clear=function(){a.m_dtn=null;for(var n=0;n<a.m_dataelements.length;++n){a.m_dataelements[n].clear();a.m_dataelements[n].m_Parent=null}a.m_dataelements=[];a.m_Parent=null};a.IsModifiedSelection=function(){return a.m_bModified?true:false};a.IsModifiedElements=function(){var e=a.m_dataelements;for(var n=0;n<e.length;++n){if(e[n].IsModified())return true}return false};a.IsModified=function(){if(a.IsModifiedSelection()||a.IsModifiedElements())return true;return false};a.store=function(b){b.name=a.m_dtn.m_Name;if((this.m_sLeadSelection!==null)&&a.IsModifiedSelection())b["VB:s"]=this.m_sLeadSelection;if(a.IsModifiedElements()){b.E=[];for(var n=0;n<a.m_dataelements.length;++n){if(a.m_dataelements[n].IsModified()){var e={};b.E.push(e);a.m_dataelements[n].store(e)}}}};a.RemoveNode=function(n){var b=n.m_dtn.m_nArrayIndex;a.m_datanodes[b].clear();a.m_datanodes[b]=null};a.RemoveElements=function(b){var k=a.m_dtn.GetKeyTypeAttribute();var c=a.GetElementKeyMap(k);if(b.E){if(jQuery.type(b.E)=='object'){a.InternalFindAndRemoveExistingElement(b.E,0,k,c)}else if(jQuery.type(b.E)=='array'){for(var i=0;i<b.E.length;++i)a.InternalFindAndRemoveExistingElement(b.E[i],i,k,c)}}};a.GetElementKeyMap=function(k){var t,b=[];ktattribute=k?k:a.m_dtn.GetKeyTypeAttribute();for(var n=0;n<a.m_dataelements.length;++n)b[(t=a.m_dataelements[n]).m_dataattributes[ktattribute.m_nArrayIndex].m_Value]=t;return b};a.FindElementByKey=function(k,b,c){var t;if(c)return(t=c[k])?t:null;ktattribute=b?b:a.m_dtn.GetKeyTypeAttribute();var e,E=a.m_dataelements;for(var n=0;n<E.length;++n){if(e=E[n]){if(e.m_dataattributes[ktattribute.m_nArrayIndex].m_Value==k)return e}}return null};a.FindElementByIndex=function(i){return a.m_dataelements[i]};a.InternalFindAndRemoveExistingElement=function(b,i,k,c){var e=null,f=null;if(k.m_Alias&&(e=b[k.m_Alias]))f=a.FindElementByKey(e,k,c);else if(k.m_Name&&(e=b[k.m_Name]))f=a.FindElementByKey(e,k,c);else f=a.FindElementByKey(e=i,k,c);if(f){a.m_dataelements.splice(VBI.IndexOf(a.m_dataelements,f),1);if(c)c.splice(e,1);f.clear()}};a.InternalFindOrCreateExistingElement=function(b,i,k,c){var e=null,f=null;if(k.m_Alias&&(e=b[k.m_Alias]))f=a.FindElementByKey(e,k,c);else if(k.m_Name&&(e=b[k.m_Name]))f=a.FindElementByKey(e,k,c);else f=a.FindElementByKey(e=i,k,c);if(f){return f}else{f=new VBI.DataProvider.DataElement();a.m_dataelements.push(f);if(c)c[e]=f}return f};a.load=function(b,c){a.m_dtn=c;a.m_sLeadSelection=b["VB:s"];var k=a.m_dtn.GetKeyTypeAttribute();var e=a.GetElementKeyMap(k);if(b.E){if(jQuery.type(b.E)=='object'){var f=a.InternalFindOrCreateExistingElement(b.E,0,k,e);f.m_Parent=a;f.load(b.E,c);if(f.m_dataattributes[k.m_nArrayIndex]==null){da=new VBI.DataProvider.DataAttribute(k,null,f);da.m_Value=0;f.m_dataattributes[k.m_nArrayIndex]=da}}else if(jQuery.type(b.E)=='array'){var f;for(var i=0;i<b.E.length;++i){f=a.InternalFindOrCreateExistingElement(b.E[i],i,k,e);f.m_Parent=a;f.load(b.E[i],c);if(f.m_dataattributes[k.m_nArrayIndex]==null){da=new VBI.DataProvider.DataAttribute(k,null,f);da.m_Value=i;f.m_dataattributes[k.m_nArrayIndex]=da}}}}};a.GetName=function(){return this.m_Name};a.GetPath=function(){return this.m_dtn.GetPath()};a.SetLeadSelection=function(k){if(this.m_sLeadSelection!=k){this.m_sLeadSelection=k;this.m_bModified=true}};a.GetLeadSelectedElement=function(){if(this.m_sLeadSelection!==null){var i;if(m_dtn.m_Key){i=m_dtn.GetTypeAttribute(m_dtn.m_Key).m_nArrayIndex;return VBI.FindElementByKey(this.m_dataelements,i,m_dtn.m_Key)}else{i=parseInt(this.m_sLeadSelection);if(i<=this.m_dataelements.length&&i>=0){return this.m_dataelements[i]}else{VBI.m_bTrace&&VBI.Trace("Error: lead selection index out of range")}}}return null};return a};VBI.DataProvider.DataElement=function(){this.m_dataattributes=[];this.m_datanodes=[];this.m_Parent=null;this.m_bModifiedSelection=false};VBI.DataProvider.DataElement.prototype={m_dataattributes:null,m_datanodes:null,m_Parent:null,m_bModifiedSelection:null,clear:function(){var n,t;for(n=0;n<this.m_datanodes.length;++n){if(t=this.m_datanodes[n]){t.clear();t.m_Parent=null}}this.m_datanodes=[];for(n=0;n<this.m_dataattributes.length;++n){if(t=this.m_dataattributes[n]){t.clear();t.m_Parent=null}}this.m_dataattributes=[]},load:function(b,c){for(var a in b){if(!b.hasOwnProperty(a))continue;if(a=="N"&&(jQuery.type(b[a])=='object')){var n;var l=c.GetTypeNode(b.N.name,true);this.m_datanodes[l.m_nArrayIndex]=(n=new VBI.DataProvider.DataNode());n.m_Parent=this;n.m_Name=b.N.name;n.load(b[a],l)}else{var e=c.GetTypeAttribute(a,true);this.m_dataattributes[e.m_nArrayIndex]=new VBI.DataProvider.DataAttribute(e,b[a],this)}}},IsModified:function(a){if(this.m_bModifiedSelection)return true;var n,t;for(n=0;n<this.m_dataattributes.length;++n){if((t=this.m_dataattributes[n])&&t.IsModified())return true}return false},store:function(a){var k=this.m_Parent.m_dtn.GetKeyTypeAttribute();var b=k.m_Alias?k.m_Alias:k.m_Name;a[b]=this.m_dataattributes[k.m_nArrayIndex].GetStringValue();if(this.m_bModifiedSelection){}var n,t;for(n=0;n<this.m_dataattributes.length;++n){if((t=this.m_dataattributes[n])&&t.IsModified()){var c=t.m_dta.m_Alias?t.m_dta.m_Alias:t.m_dta.m_Name;a[c]=t.GetStringValue()}}},GetKeyValue:function(){var k;if(this.m_Parent&&(k=this.m_Parent.m_dtn.GetKeyTypeAttribute()))return this.m_dataattributes[k.m_nArrayIndex].m_Value;return null},GetPath:function(){var p=null;var c=this;while(c){var k=c.GetKeyValue();if(p)p=k+"."+p;else p=k;var n;if(n=this.m_Parent)p=this.m_Parent.m_dtn.m_Name+"."+p;else break;if(n.m_Parent&&n.m_Parent.m_Parent)c=n.m_Parent?n.m_Parent:null;else break}return p},Select:function(s){var k=this.m_Parent.m_dtn.GetTypeAttribute("VB:s",true);k.m_Type=VBI.Types.st_bool;var i=k.m_nArrayIndex;if(this.m_dataattributes[i]==null)this.m_dataattributes[i]=new VBI.DataProvider.DataAttribute(k,null,this);this.m_dataattributes[i].m_Value=s?true:false;this.m_dataattributes[i].m_bModified=true;if(s&&this.m_Parent)this.m_Parent.SetLeadSelection(this.GetKeyValue())},FindNodeFromPathArray:function(p){var a=null,b=this;var P=false;for(var n=0;n<p.length;++n){if(P){if(a.m_dtn.m_Key&&(tmp=b.FindElementByKey(p[n]))){P=false;continue}else if(VBI.isInt(p[n])){b=a.m_dataelements[parseInt(p[n])];P=false;continue}}var c=b.m_Parent.m_dtn.GetTypeNode(p[n],false).m_nArrayIndex;a=b.m_datanodes[c];P=true}return a},FindAttributeFromPathArray:function(p){if(p.length==1){var t;if(t=this.m_Parent.m_dtn.GetTypeAttribute(p[0],false))return this.m_dataattributes[t.m_nArrayIndex]}return null}};VBI.DataProvider.DataAttribute=function(a,v,p){this.m_dta=a;this.m_Parent=p;if(v===null)return;if(a.m_Type==VBI.Types.st_vectorarray||a.m_Type==VBI.Types.st_vector)this.m_Value=VBI.Types.string2vector(v);else if(a.m_Type==VBI.Types.st_long)this.m_Value=VBI.Types.string2long(v);else if(a.m_Type==VBI.Types.st_float)this.m_Value=VBI.Types.string2float(v);else if(a.m_Type==VBI.Types.st_bool)this.m_Value=VBI.Types.string2bool(v);else if(a.m_Type==VBI.Types.st_color)this.m_Value=VBI.Types.string2color(v);else if(a.m_Type==VBI.Types.st_string)this.m_Value=v;else this.m_Value=v};VBI.DataProvider.DataAttribute.prototype={m_dta:null,m_Value:null,m_Parent:null,m_bModified:false,clear:function(){this.m_Parent=null;this.m_dta=null},store:function(a){},set:function(v){if(v!=this.mValue)this.m_bModified=true;this.m_Value=v},IsModified:function(){return this.m_bModified},GetStringValue:function(){var t="";switch(this.m_dta.m_Type){case VBI.Types.st_vectorarray:case VBI.Types.st_vector:return vector2string(this.m_Value);case VBI.Types.st_long:t+=this.m_Value;return t;case VBI.Types.st_float:t+=this.m_Value;return t;case VBI.Types.st_string:return this.m_Value;case VBI.Types.st_bool:return this.m_Value?"true":"false";case VBI.Types.st_color:var c;if(c=/^rgba\(([\d]+),([\d]+),([\d]+),([\d]+|[\d]*.[\d]+)\)/.exec(this.m_Value)){c=[+c[1],+c[2],+c[3],parseInt(parseFloat(+c[4])*255.0)];return"RGBA("+c[0]+","+c[1]+","+c[2]+","+c[3]+")"}break}return this.m_Value},};return d};