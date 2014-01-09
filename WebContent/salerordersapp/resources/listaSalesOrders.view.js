jQuery.sap.require("salerordersapp.resources.utils.utility");

/**
 * First Application View - this is the application's starting point. It builds the application window.   
 */
sap.ui.jsview("salerordersapp.resources.listaSalesOrders", {

      getControllerName : function() {
         return "salerordersapp.resources.listaSalesOrders";
    	 
      },
      
      createContent : function(oController) {
		var oShell = this.createShell();
       	oShell.addContent(this.createSalesorderTable());	
       	return oShell;
       	
      },

      createShell:function(oController){
      
    	  var oShell = sap.ui.ux3.Shell("ID_SalesOrderShell",{
    	      appIcon: "images/SAPLogo.gif",
    		  appTitle: oBundle.getText("APP_TITLE"),
    		  showLogoutButton:false,
    		  showSearchTool: false,
    		  showInspectorTool: false,
    		  showFeederTool: false,
    		  worksetItems: [new sap.ui.ux3.NavigationItem("navItemList",{key: "SalesOrderList",text:oBundle.getText("WORKSET_TITLE")})]
    	  });
    	  return oShell;
      },
      
      /**
	 * Returns a table with the required columns, each column is bound for a specific odata service property   
	 * @returns {sap.ui.table.Table}
	 */
      createSalesorderTable:function(){
      
    	var oTable = new sap.ui.table.Table("ID_SalesOrderTable", {
    		visibleRowCount  : 20,
  			selectionMode: sap.ui.table.SelectionMode.None
  		});
    	
 
     	 oTable.addColumn(new sap.ui.table.Column({
    	 	label: new sap.ui.commons.Label({text:oBundle.getText("SALESORDER_SALESORDERID")}),
 			template: new sap.ui.commons.TextView().bindProperty("text", "SalesOrderID"),
			sortProperty: "SalesOrderID",
			filterProperty: "SalesOrderID"
 		}));

     	 oTable.addColumn(new sap.ui.table.Column({
    	 	label: new sap.ui.commons.Label({text:oBundle.getText("SALESORDER_NETSUM")}),
 			template: new sap.ui.commons.TextView().bindProperty("text", "NetSum"),
			sortProperty: "NetSum",
			filterProperty: "NetSum"
 		}));

     	 oTable.addColumn(new sap.ui.table.Column({
    	 	label: new sap.ui.commons.Label({text:oBundle.getText("SALESORDER_TAX")}),
 			template: new sap.ui.commons.TextView().bindProperty("text", "Tax"),
			sortProperty: "Tax",
			filterProperty: "Tax"
 		}));

     	 oTable.addColumn(new sap.ui.table.Column({
    	 	label: new sap.ui.commons.Label({text:oBundle.getText("SALESORDER_CURRENCY")}),
 			template: new sap.ui.commons.TextView().bindProperty("text", "Currency"),
			sortProperty: "Currency",
			filterProperty: "Currency"
 		}));

     	 oTable.addColumn(new sap.ui.table.Column({
    	 	label: new sap.ui.commons.Label({text:oBundle.getText("SALESORDER_CHANGEDAT")}),
 			template: new sap.ui.commons.TextView().bindProperty("text", "ChangedAt",new sap.ui.model.type.DateTime({style: "medium"})),
			sortProperty: "ChangedAt",
			filterProperty: "ChangedAt"
 		}));

     	 oTable.addColumn(new sap.ui.table.Column({
    	 	label: new sap.ui.commons.Label({text:oBundle.getText("SALESORDER_NOTE")}),
 			template: new sap.ui.commons.TextView().bindProperty("text", "Note"),
			sortProperty: "Note",
			filterProperty: "Note"
 		}));

     	 oTable.addColumn(new sap.ui.table.Column({
    	 	label: new sap.ui.commons.Label({text:oBundle.getText("SALESORDER_CREATEDAT")}),
 			template: new sap.ui.commons.TextView().bindProperty("text", "CreatedAt",new sap.ui.model.type.DateTime({style: "medium"})),
			sortProperty: "CreatedAt",
			filterProperty: "CreatedAt"
 		}));

     	 oTable.addColumn(new sap.ui.table.Column({
    	 	label: new sap.ui.commons.Label({text:oBundle.getText("SALESORDER_TOTALSUM")}),
 			template: new sap.ui.commons.TextView().bindProperty("text", "TotalSum"),
			sortProperty: "TotalSum",
			filterProperty: "TotalSum"
 		}));

     	 oTable.addColumn(new sap.ui.table.Column({
    	 	label: new sap.ui.commons.Label({text:oBundle.getText("SALESORDER_STATUS")}),
 			template: new sap.ui.commons.TextView().bindProperty("text", "Status"),
			sortProperty: "Status",
			filterProperty: "Status"
 		}));

     	 oTable.addColumn(new sap.ui.table.Column({
    	 	label: new sap.ui.commons.Label({text:oBundle.getText("SALESORDER_CUSTOMERNAME")}),
 			template: new sap.ui.commons.TextView().bindProperty("text", "CustomerName"),
			sortProperty: "CustomerName",
			filterProperty: "CustomerName"
 		}));

     	 oTable.addColumn(new sap.ui.table.Column({
    	 	label: new sap.ui.commons.Label({text:oBundle.getText("SALESORDER_BUSINESSPARTNERID")}),
 			template: new sap.ui.commons.TextView().bindProperty("text", "BusinessPartnerID"),
			sortProperty: "BusinessPartnerID",
			filterProperty: "BusinessPartnerID"
 		}));
 		return oTable;   		
      }
      
});
