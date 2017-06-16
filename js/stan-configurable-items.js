(function () {


    if ('undefined' === typeof window.stanConfigurableItems) {


        function getPanelByItem(jTarget) {
            var jNext = jTarget.next();
            if (jNext.hasClass("stan-configurable-item-panel")) {
                return jNext;
            }
            return false;
        }


        window.stanConfigurableItems = function () {
            this.handlers = {};
            this.jContext = null;
        };
        window.stanConfigurableItems.prototype = {
            init: function (jContext) {
                this.jContext = jContext;
                var zis = this;


                jContext.on('click', function (e) {
                    var jTarget = $(e.target);
                    if (jTarget.hasClass("stan-configurable-item")) {
                        jContext.find('.stan-configurable-item').removeClass("selected");
                        jTarget.addClass("selected");
                        var jNext = getPanelByItem(jTarget);
                        if (false !== jNext) {
                            var name = jNext.attr("data-name");
                            zis._openPanel(jNext);
                        }
                        return false;
                    }
                });


                jContext.find(".stan-configurable-item-panel").each(function () {
                    var name = $(this).attr("data-name");
                    zis._callHandlerMethod(name, "init", null, $(this));
                });
            },
            /**
             *
             * Gets info from the selected item and call the corresponding callback (onSuccess or onError)
             *
             * @param onSuccess ( id, options )
             * @param onError ( errMsg )
             */
            execute: function (onSuccess, onError) {
                var jSelected = this.jContext.find(".stan-configurable-item.selected:first");
                if (jSelected.length > 0) {
                    var jNext = getPanelByItem(jSelected);
                    if (false !== jNext) {
                        var name = jNext.attr("data-name");
                        var data = this._callHandlerMethod(name, "getData", null, jNext);
                        var id = jSelected.attr("data-id");
                        onSuccess(id, data);
                    }
                    else {
                        onError("panel not found", jSelected);
                    }
                }
                else {
                    onError("no selected item found");
                }
            },
            addHandler: function (name, oHandler) {
                this.handlers[name] = oHandler;
            },
            _callHandlerMethod: function (name, method, fallbackCallback) {

                var args = Array.prototype.slice.call(arguments, 3);


                if (name in this.handlers) {
                    var handler = this.handlers[name];
                    if (method in handler) {
                        return handler[method].apply(null, args);
                    }
                    else {
                        if ('undefined' !== typeof fallbackCallback && null !== fallbackCallback) {
                            return fallbackCallback.apply(null, args);
                        }
                    }
                }
                return false;
            },
            _openPanel: function (jPanel) {
                var name = jPanel.attr("data-name");
                for (var zename in this.handlers) {
                    if (zename === name) {
                        this._callHandlerMethod(name, "openPanel", function (jModulePanel) {
                            jModulePanel.show();
                        }, jPanel);
                    }
                    else {

                        var jOtherPanel = this.jContext.find('.stan-configurable-item-panel[data-name="' + zename + '"]');
                        if (jOtherPanel.length > 0) {
                            this._callHandlerMethod(zename, "closePanel", function (jModulePanel) {
                                jModulePanel.hide();
                            }, jOtherPanel);
                        }
                    }
                }
            }
        };


        var o = new window.stanConfigurableItems();


        stanConfigurableItems.inst = function () {
            return o;
        };
    }
})();