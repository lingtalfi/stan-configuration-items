(function () {
    if ('undefined' !== typeof stanConfigurableItems) {


        var jPanel = null;

        var Module1Handler = function () {

        };
        Module1Handler.prototype = {
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
                    "boris": "vian"
                };
            }
        };


        stanConfigurableItems.inst().addHandler("Module1", new Module1Handler());
    }
})();
