rhino-ember-precompiler
===================


Ember handlebars pre-compiler using RhinoJs.

----------


Overview
-------------

You can pre-compile your handlebar files which are used with EmberJS. The custom helper files you have added to handlebar registries can also be loaded before compilation to get the custom helper support.

> **Note:**

> - Uses [RhinoJs][2] for javascript engine. If preferred can also be ported to node.js
> - [EnvJs][1] is used to configure the browser environment for pre-compilation.
> - Incase of 64KB method limit, try to split the EnvJs file to two parts to reduce the single load file size.

Usage
-------------------

**To compile:**
```
java -jar <rhino.jar> rhino-ember-compiler.js --handlebarJs <handlebars Js path> --emberJs <Ember Js path> --jqueryJs <Jquery Js path> --templatesDir <handlebar templates directory> --output <output Js file> --envJs <EnvJs files list[env1.js~env2.js~...]> --helperRegistryFiles <Helper1.js~Helper2.js~...>
```
**Arguments**

| Prameter            | Value                                                  |
|---------------------|--------------------------------------------------------|
| handlebarJs         | Path to Handlebar JS                                   |
| emberJs             | Path to Ember JS                                       |
| jqueryJs            | Path to Jquery JS                                      |
| templatesDir        | Templates directory                                    |
| output              | Output file path                                       |
| envJs               | List of browser environment JS (seperated by ~)        |
| helperRegistryFiles | List of custom Handlebar helper files (seperated by ~) |

License
---------
rhino-ember-precompiler is covered by the MIT License.

Copyright (C) 2015 ~ [Prashanth Rajasekar][3] ~ [prashanth@arcenix.com][4]

  [1]: http://www.envjs.com/
  [2]: https://developer.mozilla.org/en-US/docs/Mozilla/Projects/Rhino
  [3]: http://www.prashanthrv.com/
  [4]: mailto:prashanth@arcenix.com