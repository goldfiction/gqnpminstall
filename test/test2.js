/**
 * Created by happy on 3/26/17.
 */
require=require("./../main.js").require;
it("should be able to require modules like normal",function(done){
    var _=require("underscore");
    var async=require("async");
    var needle=require("needle");

    // you can use this module like this to require modules normally
    // however, first run time will fail as the modules are installed
    // async. That means if you run with forever, however, the modules
    // will be installed correctly after a few failed start ups. This
    // behaviour is observed and deem as expected.
})
