jQuery.sap.declare("sap.ca.scfld.md.ApplicationFacade");sap.ui.base.Object.extend("sap.ca.scfld.md.ApplicationFacade",{constructor:function(a){this.oApplicationImplementation=a},getResourceBundle:function(){return this.oApplicationImplementation.getResourceBundle()},getODataModel:function(n){return this.oApplicationImplementation.getODataModel(n)},isMock:function(){return this.oApplicationImplementation.isMock()}});
