jQuery.sap.declare("sap.ca.scfld.md.app.MasterHeaderFooterHelper");sap.ui.base.Object.extend("sap.ca.scfld.md.app.MasterHeaderFooterHelper",{constructor:function(a){this.oApplicationImplementation=a;this.oCommonHeaderFooterHelper=new sap.ca.scfld.md.app.CommonHeaderFooterHelper(a,{})},defineMasterHeaderFooter:function(c){this.defineMasterHeaderFooterInner(c)},defineMasterHeaderFooterInner:function(c){var o=c.getHeaderFooterOptions();if(!o){return}var p=this.oCommonHeaderFooterHelper.startBuild(c,o,{bEditState:false});this.defineHeader(c,p);this.defineFooter(c,p);this.oCommonHeaderFooterHelper.endBuild(c)},defineHeader:function(c,p){var C=p.getCustomHeader();if(!C){C=new sap.m.Bar();p.setCustomHeader(C)}this.defineMasterSubHeader(c,p);var a=-1;if(!c.isBackendSearch()){if(c._oControlStore.oMasterSearchField){var f=c._oControlStore.oMasterSearchField.getValue();if(f){a=c.applySearchPattern(f)}}}if(a<0){var l=c.getList();var I=l.getItems();a=0;for(var i=0;i<I.length;i++){if(!(I[i]instanceof sap.m.GroupHeaderListItem)){a++}}}this.defineMasterTitle(c,C,a);this.oCommonHeaderFooterHelper.setBackButton(c,C,true);this.defineEditButton(c,C)},defineFooter:function(c,p){this.defineSettingsButton(c);this.defineFooterRight(c)},defineMasterSubHeader:function(c,p){if(c._oControlStore.oMasterSearchField||c._oControlStore.oMasterPullToRefresh){return}var s=new sap.m.Bar();p.setSubHeader(s);var i=sap.ui.Device.support.touch;this.createMasterSearchField(c,s,i);if(i){this.createMasterPullToRefresh(c,p)}},createMasterSearchField:function(c,s,i){c._oControlStore.oMasterSearchField=new sap.m.SearchField();c._oControlStore.oMasterSearchField.setShowRefreshButton(!i);c._oControlStore.sMasterSearchText=null;c._oControlStore.oMasterSearchField.attachSearch(jQuery.proxy(function(e){this.handleMasterSearch(c,e)},this));if(c.isLiveSearch()){c._oControlStore.oMasterSearchField.attachLiveChange(jQuery.proxy(c._applyClientSideSearch,c))}if(c._oHeaderFooterOptions.sI18NSearchFieldPlaceholder){var b=this.oApplicationImplementation.AppI18nModel.getResourceBundle();var p=b.getText(c._oHeaderFooterOptions.sI18NSearchFieldPlaceholder)}else{var b=this.oApplicationImplementation.UilibI18nModel.getResourceBundle();var p=b.getText("MASTER_PLACEHOLDER_SEARCHFIELD")}c._oControlStore.oMasterSearchField.setPlaceholder(p);s.addContentMiddle(c._oControlStore.oMasterSearchField)},createMasterPullToRefresh:function(c,p){c._oControlStore.oMasterPullToRefresh=new sap.m.PullToRefresh();c._oControlStore.oMasterPullToRefresh.attachRefresh(jQuery.proxy(function(){this.handleMasterPullToRefresh(c)},this));p.insertContent(c._oControlStore.oMasterPullToRefresh,0)},handleMasterSearch:function(c,e){var b=c.isBackendSearch();var i=e.getParameter("refreshButtonPressed");if(i||b){this.refreshList(c,i)}if(!b&&!c.isLiveSearch()){c._applyClientSideSearch()}},handleMasterPullToRefresh:function(c){this.refreshList(c,true)},refreshList:function(c,I){var b=c.isBackendSearch();I=I&&c._oControlStore.sMasterSearchText!=null;if(I){var t=c._oControlStore.sMasterSearchText;c._oControlStore.oMasterSearchField.setValue(t)}else{var t=c._oControlStore.oMasterSearchField.getValue()}var l=c.getList();this.oApplicationImplementation.aKeyValues=null;if(this.oApplicationImplementation.aMasterKeys){var a=l.getItems();for(var i=0;i<a.length;i++){var L=a[i];if(L.getSelected()){this.oApplicationImplementation.aKeyValues=[];var o=L.getBindingContext(this.sModelName);for(var j=0;j<this.oApplicationImplementation.aMasterKeys.length;j++){this.oApplicationImplementation.aKeyValues.push(o.getProperty(this.oApplicationImplementation.aMasterKeys[j]))}i=a.length}}}var B=c._oMasterListBinding;var d=!B;if(B){B.attachChange(c._onMasterListLoaded,c);var r=jQuery.proxy(function(){if(c._oControlStore.oMasterPullToRefresh){c._oControlStore.oMasterPullToRefresh.hide()}if(b){c._oControlStore.sMasterSearchText=t;c._oControlStore.oMasterSearchField.setValue(c._oControlStore.sMasterSearchText)}B.detachDataReceived(r)},this);var R=jQuery.proxy(function(){d=true;B.detachDataRequested(R)},this);B.attachDataRequested(R);B.attachDataReceived(r)}if(b&&!I){var s=c.applyBackendSearchPattern(t,B);if(s){B.detachDataRequested(R);B.detachDataReceived(r);return}if(B&&B!=c._oMasterListBinding){B.detachDataRequested(R);B.detachDataReceived(r);c._oControlStore.sMasterSearchText=t;return}}if(!d&&c._oMasterListBinding){c._oMasterListBinding.refresh()}},defineMasterTitle:function(c,C,i){if(!c._oHeaderFooterOptions.sI18NMasterTitle){return}if(!c._oControlStore.oMasterTitle){c._oControlStore.oMasterTitle=new sap.m.Text();C.addContentMiddle(c._oControlStore.oMasterTitle)}this.setMasterTitle(c,i)},setMasterTitle:function(c,C){if(!c._oControlStore.oMasterTitle){return}var b=this.oApplicationImplementation.AppI18nModel.getResourceBundle();var t=b.getText(c._oHeaderFooterOptions.sI18NMasterTitle,[C]);c._oControlStore.oMasterTitle.setText(t)},defineEditButton:function(c,C){if(c._oHeaderFooterOptions.onEditPress||c._oHeaderFooterOptions.oEditBtn){if(!c._oControlStore.oEditBtn){c._oControlStore.oEditBtn=new sap.m.Button();C.addContentRight(c._oControlStore.oEditBtn);c._oControlStore.oEditBtn.attachPress(jQuery.proxy(function(){if(c._oControlStore.bEditState){c._oControlStore.oEditBtn.setIcon("sap-icon://multi-select")}else{c._oControlStore.oEditBtn.setIcon("sap-icon://sys-cancel")}c._oControlStore.bEditState=!c._oControlStore.bEditState;c._oControlStore.oSettingsButton.setVisible(!c._oControlStore.bEditState);(c._oHeaderFooterOptions.onEditPress||c._oHeaderFooterOptions.oEditBtn.onBtnPressed)(c._oControlStore.bEditState)},this))}if(c._oControlStore.bEditState){c._oControlStore.oEditBtn.setIcon("sap-icon://sys-cancel")}else{c._oControlStore.oEditBtn.setIcon("sap-icon://multi-select")}c._oControlStore.oEditBtn.setVisible(true);c._oControlStore.oEditBtn.setEnabled(!!(c._oHeaderFooterOptions.onEditPress||!c._oHeaderFooterOptions.oEditBtn.bDisabled));if(c._oHeaderFooterOptions.oEditBtn&&c._oHeaderFooterOptions.oEditBtn.sId){c._oControlStore.oButtonListHelper.mButtons[c._oHeaderFooterOptions.oEditBtn.sId]=c._oControlStore.oEditBtn}}else if(c._oControlStore.oEditBtn){c._oControlStore.oEditBtn.setVisible(false)}},defineSettingsButton:function(c){var i=this.oCommonHeaderFooterHelper.createSettingsButton(c);if(i){c._oControlStore.oButtonListHelper.oBar.addContentLeft(c._oControlStore.oSettingsButton)}c._oControlStore.oSettingsButton.setVisible(!c._oControlStore.bEditState)},defineFooterRight:function(c){var f=this.getFooterRightCount(c);this.oCommonHeaderFooterHelper.getGenericButtons(f,c,c._oControlStore.oButtonListHelper);if(c._oHeaderFooterOptions.buttonList){for(var i=0;i<c._oHeaderFooterOptions.buttonList.length;i++){var b={};jQuery.extend(b,c._oHeaderFooterOptions.buttonList[i]);delete b.sIcon;c._oControlStore.oButtonListHelper.ensureButton(b,"b",f)}}if(c._oHeaderFooterOptions.onAddPress||c._oHeaderFooterOptions.oAddOptions){this.addAddButton(c)}},getFooterRightCount:function(c){var g=this.oCommonHeaderFooterHelper.getGenericCount(c);if(g>0&&c.oApplicationImplementation.bIsPhone&&jQuery.device.is.landscape){return g+1}else if(g>0){return g}else{return 1}},addAddButton:function(c){if(c._oHeaderFooterOptions.onAddPress){var b={onBtnPressed:c._oHeaderFooterOptions.onAddPress}}else{var b={};jQuery.extend(b,c._oHeaderFooterOptions.oAddOptions);delete b.sBtnText;delete b.sI18nBtnTxt}b.sIcon="sap-icon://add";c._oControlStore.oButtonListHelper.ensureButton(b,"b")}});
