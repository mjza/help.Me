sap.ui.define(["sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "./utilities",
    "sap/ui/core/routing/History"
    ], function(BaseController, MessageBox, Utilities, History) {
    "use strict";

    return BaseController.extend("com.sap.build.standard.helpMe.controller.Mentoring", {
    handleRouteMatched: function (oEvent) {
            		
		var oParams = {}; 
		
		if (oEvent.mParameters.data.context) { 
		    this.sContext = oEvent.mParameters.data.context;
		    var oPath; 
		    if (this.sContext) { 
		        oPath = {path: "/" + this.sContext, parameters: oParams}; 
		        this.getView().bindObject(oPath);
		    } 
		}
		
		
		
        },
_onPageNavButtonPress1: function (oEvent) {
            		
		var oBindingContext = oEvent.getSource().getBindingContext(); 
		
		return new Promise(function(fnResolve) {
		
		    this.doNavigate("Launch", oBindingContext, fnResolve, ""
		    );
		}.bind(this)).catch(function (err) { if (err !== undefined) { MessageBox.error(err.message); }});
		
        },
doNavigate: function (sRouteName, oBindingContext, fnPromiseResolve, sViaRelation) {
            		
		var sPath = (oBindingContext) ? oBindingContext.getPath() : null;
		var oModel = (oBindingContext) ? oBindingContext.getModel() : null;
		
		var sEntityNameSet;
		if (sPath !== null && sPath !== "") {
		    if (sPath.substring(0, 1) === "/") {
		        sPath = sPath.substring(1);
		    }
		    sEntityNameSet = sPath.split("(")[0];
		}
		var sNavigationPropertyName;
		var sMasterContext = this.sMasterContext ? this.sMasterContext : sPath;
		
		if (sEntityNameSet !== null) {
		    sNavigationPropertyName = sViaRelation || this.getOwnerComponent().getNavigationPropertyForNavigationWithContext(sEntityNameSet, sRouteName);
		}
		if (sNavigationPropertyName !== null && sNavigationPropertyName !== undefined) {
		    if (sNavigationPropertyName === "") {
		        this.oRouter.navTo(sRouteName, {
		            context: sPath,
		            masterContext: sMasterContext
		        }, false);
		    } else {
		        oModel.createBindingContext(sNavigationPropertyName, oBindingContext, null, function (bindingContext) {
		            if (bindingContext) {
		                sPath = bindingContext.getPath();
		                if (sPath.substring(0, 1) === "/") {
		                    sPath = sPath.substring(1);
		                }
		            }
		            else {
		                sPath = "undefined";
		            }
		
		            // If the navigation is a 1-n, sPath would be "undefined" as this is not supported in Build
		            if (sPath === "undefined") {
		                this.oRouter.navTo(sRouteName);
		            } else {
		                this.oRouter.navTo(sRouteName, {
		                    context: sPath,
		                    masterContext: sMasterContext
		                }, false);
		            }
		        }.bind(this));
		    }
		} else {
		    this.oRouter.navTo(sRouteName);
		}
		
		if (typeof fnPromiseResolve === "function") {
		    fnPromiseResolve();
		}
        },
_onLinkPress: function (oEvent) {
            		
		var oBindingContext = oEvent.getSource().getBindingContext(); 
		
		return new Promise(function(fnResolve) {
		
		    this.doNavigate("Questionery", oBindingContext, fnResolve, ""
		    );
		}.bind(this)).catch(function (err) { if (err !== undefined) { MessageBox.error(err.message); }});
		
        },
_onImagePress2: function (oEvent) {
            		
		var oBindingContext = oEvent.getSource().getBindingContext(); 
		
		return new Promise(function(fnResolve) {
		
		    this.doNavigate("Launch", oBindingContext, fnResolve, ""
		    );
		}.bind(this)).catch(function (err) { if (err !== undefined) { MessageBox.error(err.message); }});
		
        },
onInit: function () {
            		
        this.mBindingOptions = {};
        this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        this.oRouter.getTarget("Mentoring").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));

        var oView = this.getView();
        var oModel = new sap.ui.model.json.JSONModel();
        oView.setModel(oModel, "staticDataModel");
        function dateDimensionFormatter(dimensionValue) {
            if(dimensionValue instanceof Date) {
                var oFormat = sap.ui.core.format.DateFormat.getDateInstance({style: "short"});
            	return oFormat.format(dimensionValue);
            }
            return dimensionValue;
        }
    
        var oData = [{"dim0":"Without Mentoring","mea0":"16"},{"dim0":"With Mentoring","mea0":"80"}];
        oView.getModel("staticDataModel").setData({"sap_Worklist_Page_0-content-sap_ui_layout_Grid-1511016879838-content-sap_chart_BarChart-2":oData}, true);
        this.oBindingParameters = {"path":"/sap_Worklist_Page_0-content-sap_ui_layout_Grid-1511016879838-content-sap_chart_BarChart-2","parameters":{},"model":"staticDataModel"};
        oView.byId("sap_Worklist_Page_0-content-sap_ui_layout_Grid-1511016879838-content-sap_chart_BarChart-2").bindData(this.oBindingParameters);
        var aDimensions = oView.byId("sap_Worklist_Page_0-content-sap_ui_layout_Grid-1511016879838-content-sap_chart_BarChart-2").getDimensions();
        aDimensions.forEach(function(oDimension) {
            oDimension.setTextFormatter(dateDimensionFormatter);
        });
    
        var oData = [{"dim0":"Web Developer","mea0":428214.13,"mea1":"45000","mea2":76855.15368,"dim1":"30 Percent"},{"dim0":"Data Scientist","mea0":1722148.36,"mea1":"55000","mea2":310292.22,"dim1":"20 Percent"},{"dim0":"Database Administrator","mea1":"60000","dim1":"15 Percent","mea0":null,"mea2":null},{"undefined":null,"dim0":"SAP Consoltant","dim1":"8 Percent","mea1":"80000","mea0":null,"mea2":null}];
        oView.getModel("staticDataModel").setData({"sap_Worklist_Page_0-content-sap_ui_layout_Grid-1511016879838-content-sap_chart_BubbleChart-4":oData}, true);
        this.oBindingParameters = {"path":"/sap_Worklist_Page_0-content-sap_ui_layout_Grid-1511016879838-content-sap_chart_BubbleChart-4","parameters":{},"model":"staticDataModel"};
        oView.byId("sap_Worklist_Page_0-content-sap_ui_layout_Grid-1511016879838-content-sap_chart_BubbleChart-4").bindData(this.oBindingParameters);
        var aDimensions = oView.byId("sap_Worklist_Page_0-content-sap_ui_layout_Grid-1511016879838-content-sap_chart_BubbleChart-4").getDimensions();
        aDimensions.forEach(function(oDimension) {
            oDimension.setTextFormatter(dateDimensionFormatter);
        });
    


        },
onAfterRendering: function () {
            		
        var oBindingParameters, oChart;
        
        oChart = this.getView().byId("sap_Worklist_Page_0-content-sap_ui_layout_Grid-1511016879838-content-sap_chart_BarChart-2");
        oChart.bindData(oChart.getBindingInfo("data"));
        oChart = this.getView().byId("sap_Worklist_Page_0-content-sap_ui_layout_Grid-1511016879838-content-sap_chart_BubbleChart-4");
        oChart.bindData(oChart.getBindingInfo("data"));


        }
});
}, /* bExport= */true);
