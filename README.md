Stan configurable items
===========================
2017-06-16




Help you implement a configurable items system in your application.


What's configurable items?
============================

Imagine a stack of horizontal items.

Each item has a unique id.

When you click on the item, it opens and the other items close.
When an item is open, you change configure it via a configuration panel.

Each item has its own configuration panel.

There is a submit button below the stack of items.
When you click the submit button, it returns you the item id and the configuration values for the selected item.
 
 
That's it. 



[![stan-configurable-items.jpg](https://s19.postimg.org/rlushrcv7/stan-configurable-items.jpg)](https://postimg.org/image/r93ebkulb/)



How does it work?
================

Stan configurable items can help you in a modular architecture, where your application wants to provide
a semantical choice to the user.


There is a javascript api located in the **stand-configurable-items.js** file.

The file contains the **stanConfigurableItems** api which contains the following method:

- init ( jContext )
- execute ( onSuccess, onError )
- addHandler ( name, oHandler )


External modules can create their own javascript file and hook into the **stanConfigurableItems** api
by using the **addHandler** method.

A module will create an instance (and pass it via the **addHandler** method) which contains the following methods:

- init ( jModulePanel )
- getData ( jModulePanel )
- ?openPanel ( jModulePanel )
- ?closePanel ( jModulePanel )


The most important method is getData.

Sometimes you will need an init method to listen to the panel changes, so that you can prepare the data to be returned
by getData. 


When all modules's handlers are attached to the **stanConfigurableItems** api, you can  the system using the init method,
which in turn call the **init** method of every handler attached to the api.

Then later, after the user has configured the items she want and clicks the **submit** button,
you can collect and post the selected item's options using the **execute** method.




Code example
===============

Here is the main code example.


```php
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
    <div class="stan-configurable-item-panel" data-id="1" data-name="Module1">
        Options for formatted item 1.
        <div class="panel">
            <label for="aaa">Is that what you want?</label> <input id="aaa" type="checkbox" value="1" checked>
        </div>
    </div>
    <div class="stan-configurable-item" data-id="2">Formatted item 2</div>
    <div class="stan-configurable-item-panel" data-id="2" data-name="Module2">
        Options for formatted item 2.
        <div class="panel">
            <input type="text" value="zoo">
            <select>
                <option value="1">France</option>
            </select>
        </div>
    </div>
    <div class="stan-configurable-item" data-id="3">Formatted item 3</div>
    <div class="stan-configurable-item-panel" data-id="3" data-name="Module3">
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
        stanConfigurableItems.inst().init(jStanConfigurableItems);


        $('#api-demo-buttons').on('click', function (e) {
            var jTarget = $(e.target);
            if (jTarget.hasClass("validate")) {
                stanConfigurableItems.inst().execute(function (id, options) {
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




```


The **example-module1.js** and **example-module2.js** modules are also in this repository, have a look at their content.





History Log
------------------
    
- 1.1.0 -- 2017-06-16

    - now detect clicks INSIDE a stan configurable item
        
- 1.0.0 -- 2017-06-14

    - initial commit
    

