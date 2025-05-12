sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/odata/v2/ODataModel",
	'sap/ui/model/Filter',
	'sap/ui/model/FilterOperator',
	"sap/ui/model/json/JSONModel",
	'sap/m/MessageBox',
	'sap/ui/comp/library',
    'sap/ui/model/type/String',
    'sap/m/Token',
	'sap/ui/comp/valuehelpdialog/ValueHelpDialog'
], (Controller, ODataModel, Filter, FilterOperator, JSONModel, MessageBox, compLibrary, TypeString, Token, ValueHelpDialog) => {
	"use strict";

	return Controller.extend("com.sap.lh.mr.zusagethresholdbasic.controller.Main", {
		onInit: function () {
			this._oSingleConditionMultiInput = this.byId("idBillingClassFrm");


			// idTableUsgTresh
			// var oModel = new sap.ui.model.odata.v2.ODataModel("/ThresholdUsageOutputSet");
			// this.getView().setModel(this.oModel);
		},

		onSearch: function () {
			debugger;
			const oView = this.getView();
			var aTokens = this.getView().byId("idBillingClassFrm").getTokens();
            var idBillingClassFrm = "";
			var aFilter = [];
            if (aTokens.length === 0) {
                return MessageBox.error("Please select BillingClass");
            }
            else if (aTokens.length === 1) {
                idBillingClassFrm = aTokens[0].getText();
                idBillingClassFrm = idBillingClassFrm.replace("=", "");
                aFilter.push(new Filter("BillingClass", FilterOperator.EQ, idBillingClassFrm));
            }
            else if (aTokens.length === 2) {
                //return MessageBox.error("Select only one BillingClass...");
                var idBillingClassFrm1 = aTokens[0].getText();
                idBillingClassFrm1 = idBillingClassFrm1.replace("=", "");
                var idBillingClassFrm2 = aTokens[1].getText();
                idBillingClassFrm2 = idBillingClassFrm2.replace("=", "");
                aFilter.push(new Filter("BillingClass", FilterOperator.BT, idBillingClassFrm1, idBillingClassFrm2));
                
            }
            else if (aTokens.length > 2) {
                //return MessageBox.error("Select only one BillingClass...");               
                for (let i = 0; i <= aTokens.length - 1; i++) {
                    idBillingClassFrm = aTokens[i].getText();
                    idBillingClassFrm = idBillingClassFrm.replace("=", "");
                    aFilter.push(new Filter("BillingClass", FilterOperator.EQ, idBillingClassFrm));
                }
            }

            // if(aTokens.length === 0)
            // {
            //     return MessageBox.error("Please select BillingClass");
            // }
            // else if(aTokens.length === 1){
            //     idBillingClassFrm = aTokens[0].getText();
            //     idBillingClassFrm = idBillingClassFrm.replace("=","");
            // }
            // else if(aTokens.length > 1){
            //     return MessageBox.error("Select only one Billing Class...");
            // }
			// var idBillingClassFrm = this.getView().byId("idBillingClassFrm").getValue();

			var aTokensRateCategory = this.getView().byId("idRateCategoryFrm").getTokens();
            var idRateCategoryFrm = "";
			if (aTokensRateCategory.length === 0) {
                return MessageBox.error("Please select RateCategory");
            }
            else if (aTokensRateCategory.length === 1) {
                idRateCategoryFrm = aTokensRateCategory[0].getText();
                idRateCategoryFrm = idRateCategoryFrm.replace("=", "");
                aFilter.push(new Filter("RateCategory", FilterOperator.EQ, idRateCategoryFrm));
            }
            else if (aTokensRateCategory.length === 2) {
                //return MessageBox.error("Select only one RateCategory...");
                var idRateCategoryFrm1 = aTokensRateCategory[0].getText();
                idRateCategoryFrm1 = idRateCategoryFrm1.replace("=", "");
                var idRateCategoryFrm2 = aTokensRateCategory[1].getText();
                idRateCategoryFrm2 = idRateCategoryFrm2.replace("=", "");
                aFilter.push(new Filter("RateCategory", FilterOperator.BT, idRateCategoryFrm1, idRateCategoryFrm2));
                
            }
            else if (aTokensRateCategory.length > 2) {
                //return MessageBox.error("Select only one RateCategory...");               
                for (let i = 0; i <= aTokensRateCategory.length - 1; i++) {
                    idRateCategoryFrm = aTokensRateCategory[i].getText();
                    idRateCategoryFrm = idRateCategoryFrm.replace("=", "");
                    aFilter.push(new Filter("RateCategory", FilterOperator.EQ, idRateCategoryFrm));
                }
            }
			// var idRateCategoryFrm = this.getView().byId("idRateCategoryFrm").getValue();
			// if (idBillingClassFrm === "" || idRateCategoryFrm === "") {
			// 	return MessageBox.error("Billing Class and Rate Category are mandatory...");
			// }
			//  var billingPeriodRange = this.getView().byId("billingPeriodRange").getValue();
			var oDateRangeSelection = this.getView().byId("billingPeriodRange");
			var oStartDate = oDateRangeSelection.getDateValue();  // Start Date
			var oEndDate = oDateRangeSelection.getSecondDateValue();  // End Date
			if (oStartDate && oEndDate) {
				var startMonth = (oStartDate.getMonth() + 1).toString().padStart(2, '0');
				var startYear = oStartDate.getFullYear().toString();

				var endMonth = (oEndDate.getMonth() + 1).toString().padStart(2, '0');
				var endYear = oEndDate.getFullYear().toString();
			}

			var aTokensProfileRole = this.getView().byId("profileRole").getTokens();
			var profileRole = "";
			if (aTokensProfileRole.length === 0) {
                return MessageBox.error("Please select profileRole");
            }
            else if (aTokensProfileRole.length === 1) {
                profileRole = aTokensProfileRole[0].getText();
                profileRole = profileRole.replace("=", "");
                aFilter.push(new Filter("ProfileRole", FilterOperator.EQ, profileRole));
            }
            else if (aTokensProfileRole.length === 2) {
                //return MessageBox.error("Select only one profileRole...");
                var profileRole1 = aTokensProfileRole[0].getText();
                profileRole1 = profileRole1.replace("=", "");
                var profileRole2 = aTokensProfileRole[1].getText();
                profileRole2 = profileRole2.replace("=", "");
                aFilter.push(new Filter("ProfileRole", FilterOperator.BT, profileRole1, profileRole2));
                
            }
            else if (aTokensProfileRole.length > 2) {
                //return MessageBox.error("Select only one profileRole...");               
                for (let i = 0; i <= aTokensProfileRole.length - 1; i++) {
                    profileRole = aTokensProfileRole[i].getText();
                    profileRole = profileRole.replace("=", "");
                    aFilter.push(new Filter("ProfileRole", FilterOperator.EQ, profileRole));
                }
            }
           
			// var ProfileRole = this.getView().byId("profileRole").getValue();
			var thresholdfrm = this.getView().byId("thresholdfrm").getValue();
			// var aFilter = [];

			// aFilter.push(new Filter("BillingClass", FilterOperator.EQ, idBillingClassFrm));
			// aFilter.push(new Filter("RateCategory", FilterOperator.EQ, idRateCategoryFrm));
			// aFilter.push(new Filter("BillingPeriodMonth", FilterOperator.BT, "07","08"));
			// aFilter.push(new Filter("BillingPeriodYear", FilterOperator.BT, "2024","2024"));


			// Filter for the selected range (from start month-year to end month-year)
			aFilter.push(new Filter("BillingPeriodMonth", FilterOperator.BT, startMonth, endMonth));
			aFilter.push(new Filter("BillingPeriodYear", FilterOperator.BT, startYear, endYear));
			aFilter.push(new Filter("Threshold", FilterOperator.EQ, thresholdfrm));

			// aFilter.push(new Filter("ProfileRole", FilterOperator.EQ, profileRole));
			// oBinding.filter(oFilter);

			// var oTable=this.getView().byId("idTableUsgTresh");
			// var oBinding =oTable.getBinding();
			// oBinding.filter(aFilter);
			// oBinding.refresh(true);
			var oModel = this.getOwnerComponent().getModel();
			var oJsonModel = new sap.ui.model.json.JSONModel();
			var oBusyDialog = new sap.m.BusyDialog({
				title: "Loading Data",
				text: "Please wait..."
			});
			oBusyDialog.open();
			var oTable = this.getView().byId("idTableUsgTresh");
			oModel.read("/ThresholdUsageOutputSet", {
				filters: aFilter,
				success: function (response) {
					debugger;
					oBusyDialog.close();
					//oJsonModel.setData(response.results);
					oJsonModel.setData(response.results);
					oView.byId("idTableUsgTresh").setModel(oJsonModel, "ThresholdModel");
				},
				error: (oError) => {
					debugger;
					oBusyDialog.close();
					console.error("Error:", oError);
				}
			});


			// this.oFilterBar = this.getView().byId("filterbar");
			// var aTableFilters = this.oFilterBar.getFilterGroupItems().reduce(function (aResult, oFilterGroupItem) {
			// 	var oControl = oFilterGroupItem.getControl(),
			// 		//aSelectedKeys = oControl.getSelectedKeys(),
			// 		aFilters = aSelectedKeys.map(function (sSelectedKey) {
			// 			return new Filter({
			// 				path: oFilterGroupItem.getName(),
			// 				operator: FilterOperator.Contains,
			// 				value1: sSelectedKey
			// 			});
			// 		});


			// 	if (aSelectedKeys.length > 0) {
			// 		aResult.push(new Filter({
			// 			filters: aFilters,
			// 			and: false
			// 		}));
			// 	}

			// 	return aResult;
			// }, []);

			// oTable.getBinding("items").filter(aTableFilters);
			// oTable.setShowOverlay(false);
		},
		onSingleConditionVHRequested: function () {
            this.loadFragment({
                name: "com.sap.lh.mr.zusagethresholdbasic.fragment.billingclass"
            }).then(function (oSingleConditionDialog) {
                this._oSingleConditionDialog = oSingleConditionDialog;
				this.getView().addDependent(oSingleConditionDialog);
                oSingleConditionDialog.setRangeKeyFields([{
                    label: "Billing Class",
                    key: "billingClass",
                    type: "string",
                    typeInstance: new TypeString({}, {
                        maxLength: 7
                    })
                }]);

                oSingleConditionDialog.setTokens(this._oSingleConditionMultiInput.getTokens());
                oSingleConditionDialog.open();
            }.bind(this));
        },
		onSingleConditionValueHelpOkPress: function (oEvent) {
            var aTokens = oEvent.getParameter("tokens");
            this._oSingleConditionMultiInput.setTokens(aTokens);
            this._oSingleConditionDialog.close();
        },
        onSingleConditionCancelPress: function () {
            this._oSingleConditionDialog.close();
        },
        onSingleConditionAfterClose: function () {
            this._oSingleConditionDialog.destroy();
        },
		

		onRateCategoryVHRequested: function () {
			this._oRateCategoryMultiInput = this.byId("idRateCategoryFrm");
			this.loadFragment({
				name: "com.sap.lh.mr.zusagethresholdbasic.fragment.ratecategory"
			}).then(function (oDialog) {
				this._oRateCategoryDialog = oDialog;
				this.getView().addDependent(oDialog);
				oDialog.setRangeKeyFields([{
					label: "Rate Category",
					key: "rateCategory",
					type: "string",
					typeInstance: new TypeString({}, { maxLength: 10 })
				}]);
				oDialog.setTokens(this._oRateCategoryMultiInput.getTokens());
				oDialog.open();
			}.bind(this));
		},
		onRateCategoryValueHelpOkPress: function (oEvent) {
			var aTokens = oEvent.getParameter("tokens");
			this._oRateCategoryMultiInput.setTokens(aTokens);
			this._oRateCategoryDialog.close();
		},
		onRateCategoryCancelPress: function () {
			this._oRateCategoryDialog.close();
		},
		onRateCategoryAfterClose: function () {
			this._oRateCategoryDialog.destroy();
		},
		
		
		onProfileRoleVHRequested: function () {
			this._oProfileRoleMultiInput = this.byId("profileRole");
			this.loadFragment({
				name: "com.sap.lh.mr.zusagethresholdbasic.fragment.profilerole"
			}).then(function (oDialog) {
				this._oProfileRoleDialog = oDialog;
				this.getView().addDependent(oDialog);
				oDialog.setRangeKeyFields([{
					label: "Profile Role",
					key: "profileRole",
					type: "string",
					typeInstance: new TypeString({}, { maxLength: 10 })
				}]);
				oDialog.setTokens(this._oProfileRoleMultiInput.getTokens());
				oDialog.open();
			}.bind(this));
		},
		onProfileRoleValueHelpOkPress: function (oEvent) {
			var aTokens = oEvent.getParameter("tokens");
			this._oProfileRoleMultiInput.setTokens(aTokens);
			this._oProfileRoleDialog.close();
		},
		onProfileRoleCancelPress: function () {
			this._oProfileRoleDialog.close();
		},
		onProfileRoleAfterClose: function () {
			this._oProfileRoleDialog.destroy();
		},



	});
});