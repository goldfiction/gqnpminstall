/**
 * Created by happy on 3/26/17.
 */
var requ=require('./../main.js');
var assert=require('assert');

it("clear up past module",function(done){
    requ.uninstallModule({module:"underscore@1.8.0"}).then(function(o){done(o.error)});
});

it("should be able to install require",function(done){  // underscore is newly installed and can be used rightaway after install complete
    requ.q_require({module:"underscore@1.8.0"}).then(function(o){
        var _= o.result;
        var resu = _.first([1, 2, 3]);
        assert(resu === 1);
        done(o.error);
    });
});

it("should be able to fail install wrong module",function(done){
    requ.q_require({module:"no_such_module"}).then(function(o){  // no such module will work correctly
        //console.log("o.error.message:")
        //console.log(o.error.message)
        assert(o.error.message==="Cannot find module 'no_such_module'");
        done();
    });
});

it("should be able to success rerequire same module",function(done){
    requ.q_require({module:"underscore@1.8.0"}).then(function(o){  // q_require will handle async behaviour during race condition
        var _= o.result;
        var resu = _.first([1, 2, 3]);
        assert(resu === 1);
        done(o.error);
    });
});

it("should be able to success require same module using require",function(done){ // require will only work if there is no missing module. If there is, server might recycle and might run correctly next time.
    requ.uninstallModule({module:"underscore@1.8.0"}).then(function(o){
        var _=requ.require("underscore@1.8.0");
        var resu = _.first([1, 2, 3]);
        assert(resu === 1);
        done();
    });
});
