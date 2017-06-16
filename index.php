<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="/theme/lee/libs/jquery/jquery-3.2.1.min.js"></script>
    <script src="/theme/lee/libs/stan-configurable-items/stan-configurable-items.js"></script>
    <script src="/theme/lee/libs/stan-configurable-items/example-module1.js"></script>
    <script src="/theme/lee/libs/stan-configurable-items/example-module2.js"></script>

    <style>

        html {
            box-sizing: border-box;
        }

        *, *:before, *:after {
            box-sizing: inherit;
        }

        .stan-configurable-items {
        }

        .stan-configurable-items .stan-configurable-item {
            border: 1px solid #ddd;
            background: #f5f5f5;
            padding: 10px;
        }

        .stan-configurable-items .stan-configurable-item.selected {
            background: #f3c7c7;
        }

        .stan-configurable-items .stan-configurable-item-panel {
            display: none;
        }


    </style>
</head>

<body>

<div class="stan-configurable-items">
    <div class="stan-configurable-item selected" data-id="1">Formatted item 1</div>
    <div class="stan-configurable-item-panel" data-name="MyModule1">
        Options for formatted item 1.
        <div class="panel">
            <label for="aaa">Is that what you want?</label> <input id="aaa" type="checkbox" value="1" checked>
        </div>
    </div>
    <div class="stan-configurable-item" data-id="2">Formatted item 2</div>
    <div class="stan-configurable-item-panel" data-name="MyModule2">
        Options for formatted item 2.
        <div class="panel">
            <input type="text" value="zoo">
            <select>
                <option value="1">France</option>
            </select>
        </div>
    </div>
    <div class="stan-configurable-item" data-id="3">Formatted item 3</div>
    <div class="stan-configurable-item-panel" data-name="MyModule3">
        Options for formatted item 3.
        <div class="panel">
            <label>
                Terminator <input type="radio" name="ali" value="1">
            </label>
            <label>
                Alibaba <input type="radio" name="ali" value="2">
            </label>
        </div>
    </div>
</div>


<div id="api-demo-buttons">
    <button class="validate">validate (check the console log messages)</button>
</div>


<script>


    $(document).ready(function () {
        //----------------------------------------
        // APPLICATION CODE
        //----------------------------------------
        var jStanConfigurableItems = $(".stan-configurable-items");
        var oMyStanApi = stanConfigurableItems.init("payment", jStanConfigurableItems);


        $('#api-demo-buttons').on('click', function (e) {
            var jTarget = $(e.target);
            if (jTarget.hasClass("validate")) {
                oMyStanApi.execute(function (id, options) {
                    console.log("do something useful with id: " + id + " and the options", options);
                }, function (err) {
                    console.log("oops", err);
                });
                return false;
            }
        });

    });
</script>
</body>
</html>



