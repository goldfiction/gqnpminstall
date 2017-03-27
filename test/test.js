/**
 * Created by happy on 3/26/17.
 */
var requ=require('./../main.js');
var assert=require('assert');

it("clear up past module",function(done){
    requ.uninstallModule("underscore",function(e,r){
        done(e);
    });
});

it("should be able to install require",function(done){
    requ.q_require("underscore").then(function(o){
        var _= o.result;
        var resu = _.first([1, 2, 3]);
        assert(resu === 1);
        done(o.error);
    });
});

it("should be able to fail install wrong module",function(done){
    requ.q_require("no_such_module").then(function(o){
        //console.log("o.error.message:")
        //console.log(o.error.message)
        assert(o.error.message==="Cannot find module 'no_such_module'");
        done();
    });
});

it("should be able to success rerequire same module",function(done){
    requ.q_require("underscore").then(function(o){
        var _= o.result;
        var resu = _.first([1, 2, 3]);
        assert(resu === 1);
        done(o.error);
    });
});

it("should be able to success require same module using require",function(done){
    requ.require("underscore",function(e,r){
        console.log(r)
        var _ = r;
        var resu = _.first([1, 2, 3]);
        assert(resu === 1);
        done(e);
    });
});
