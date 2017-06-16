(function () {
    if ('undefined' !== typeof stanConfigurableItems) {


        var jPanel = null;

        var ModuleHandler = function () {

        };
        ModuleHandler.prototype = {
            init: function (jModulePanel) {
                jPanel = jModulePanel;
                /**
                 * Configure the panel, so that when the getData method is called
                 * it returns the relevant data
                 */
            },
            // openPanel: function(jModulePanel){
            //     jModulePanel.show();
            // },
            // closePanel: function(jModulePanel){
            //     jModulePanel.hide();
            // }
            getData: function (jModulePanel) {
                /**
                 * Normally, you would inspect your panel and extract info from it (I'm just too lazy here)
                 */
                return {
                    "zoo": "France"
                };
            }
        };


        var oHandler = new ModuleHandler();
        stanConfigurableItems.inst().addHandler("Module2", oHandler);
        stanConfigurableItems.inst().addHandler("Module3", oHandler);
    }
})();
