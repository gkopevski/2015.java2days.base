# 2015.java2days.base
Base module for conference talk at java2days 2015, Modularize your Angular application in two weeks

This application has 3 branches which demonstrates 3 types of app that were demonstrated on Java2days 2015.
full-demo-without-modules - Full app before modularizing
empty-app - container and base module of the app
full-demo-without-modules - demo app before was modularized, the code is already splited
modularized-app - app with added all submodules

To build the app you will need need to clone this repo

This app is example app with a lot of tips and tricks how to make modularized app.
This is container of the app which is the skeleton of the project. Business logic is stored in src/app folder. You have 4 business modules which represent the business logic for a restaurant (table, starter, meal, dessert). All of this business modules are actually git repos:
- https://github.com/gkopevski/2015.java2days.table
- https://github.com/gkopevski/2015.java2days.starter
- https://github.com/gkopevski/2015.java2days.meal
- https://github.com/gkopevski/2015.java2days.dessert

To run this project you will need to add this repo as submodules and the root folder for all of them is src/app. It should look something like this:

```sh
root of the app/
    src/
        app/
          base
          dessert
          starter
          meal
          table
```
          
The common modules represent modules that can be used in any other app. They need to be placed simmilary like the business modules. Here are the business modules and the structure how to place them as submodules in your empty-app project:
- https://github.com/gkopevski/2015.java2days.menu
- https://github.com/gkopevski/2015.java2days.configration

```sh
 root of the app/
    src/
      common/
          menu
          configuration
}}
```

These 2 common modules are example how to make dynamic menu that is built with gruntscript and in configuration you have an example how to register the modules in generic provider that will have all of the modules.

Important to note is that file modules.json needs to be placed on root of the empty-app. That is configuration json file which containts all of the business modules which are basically definition of the app you are building. In modularized-app branch you can find the full demo as a reference how the app should look like.


In order to build the app after you clone the this repo swtich to empty-app branch, add all of the submodules, modules.json file you will need to make:

```sh
npm install
bower install
grunt build
```
These 3 commands will build the app and will create the app in dist folder. You can run the app with oppening index.html file.

Features that you can find in this project for modularized app:
- dynamic registering of angular modules
- dynamic creation of menu
- distributed sass files for building your css based on the modules present
- registration of your modules in dynamic provider and making the accessable thoughout the app
- directives for displaying something on your homepage
- compiling your htmls into angular module for increased speed
- and much more (you need to explore the Gruntfile.js to see all of the magic that is present :)) 





