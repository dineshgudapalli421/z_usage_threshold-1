sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel",
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator'
], (Controller, ODataModel,Filter, FilterOperator)  => {
    "use strict";

    return Controller.extend("com.sap.lh.mr.zusagethresholdbasic.controller.Main", {
        onInit: function (){
            
            // idTableUsgTresh
            // var oModel = new sap.ui.model.odata.v2.ODataModel("/ThresholdUsageOutputSet");
            // this.getView().setModel(this.oModel);
        },
        
        onSearch: function () {
			debugger;
			 var idBillingAnalysisFrm = this.getView().byId("idBillingAnalysisFrm").getValue();
			 var idRateCategoryFrm = this.getView().byId("idRateCategoryFrm").getValue();
			//  var billingPeriodRange = this.getView().byId("billingPeriodRange").getValue();
			var oDateRangeSelection = this.getView().byId("billingPeriodRange");
			var oStartDate = oDateRangeSelection.getDateValue();  // Start Date
			var oEndDate = oDateRangeSelection.getSecondDateValue();  // End Date
			if (oStartDate && oEndDate) {
				var startMonth = (oStartDate.getMonth() + 1).toString().padStart(2, '0');
				var startYear = oStartDate.getFullYear().toString();
		
				var endMonth = (oEndDate.getMonth() + 1).toString().padStart(2, '0');
				var endYear = oEndDate.getFullYear().toString();}
			 var profileRatio = this.getView().byId("profileRatio").getValue();
			 var thresholdfrm = this.getView().byId("thresholdfrm").getValue();
			 var aFilter = [];
         
                aFilter.push(new Filter("BillingClass", FilterOperator.EQ, idBillingAnalysisFrm));
				aFilter.push(new Filter("RateCategory", FilterOperator.EQ, idRateCategoryFrm));
				// aFilter.push(new Filter("BillingPeriodMonth", FilterOperator.BT, "07","08"));
				// aFilter.push(new Filter("BillingPeriodYear", FilterOperator.BT, "2024","2024"));
				
			
				// Filter for the selected range (from start month-year to end month-year)
				aFilter.push(new Filter("BillingPeriodMonth", FilterOperator.BT, startMonth, endMonth)); 
				aFilter.push(new Filter("BillingPeriodYear", FilterOperator.BT, startYear, endYear)); 
				
				aFilter.push(new Filter("ProfileRole", FilterOperator.EQ, profileRatio));
               // oBinding.filter(oFilter);
                
            var oTable=this.getView().byId("idTableUsgTresh");
			var oBinding =oTable.getBinding();
			oBinding.filter(aFilter);
			oBinding.refresh(true);


            this.oFilterBar = this.getView().byId("filterbar");
            var aTableFilters = this.oFilterBar.getFilterGroupItems().reduce(function (aResult, oFilterGroupItem) {
				var oControl = oFilterGroupItem.getControl(),
					//aSelectedKeys = oControl.getSelectedKeys(),
					aFilters = aSelectedKeys.map(function (sSelectedKey) {
						return new Filter({
							path: oFilterGroupItem.getName(),
							operator: FilterOperator.Contains,
							value1: sSelectedKey
						});
					});


				if (aSelectedKeys.length > 0) {
					aResult.push(new Filter({
						filters: aFilters,
						and: false
					}));
				}

				return aResult;
			}, []);

			oTable.getBinding("items").filter(aTableFilters);
			oTable.setShowOverlay(false);
		},
       

});
});