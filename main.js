/**
 * Created by happy on 3/26/17.
 */
const exec = require('child_process').exec;
const doq=require('gqdoq');
const dosave=""; // change this to "--save" to have modules added to package.json

// this installs given local module
function installModule(module, cb) {
    console.log("trying to install module: "+module);
    exec('npm install '+dosave +" "+ module, function callback(error, stdout, stderr) {
        if (error) {
            //console.log(error.stack);
            cb(error);
        }
        else {
            cb();
        }
    });
}

exports.installModule=installModule;

// this installs given local module
function uninstallModule(module, cb) {
    console.log("trying to uninstall module: "+module);
    exec('npm uninstall ' + module, function callback(error, stdout, stderr) {
        if (error) {
            console.log(error.stack);
            cb(error);
        }
        else {
            cb();
        }
    });
}

exports.uninstallModule=uninstallModule;

// this does a npm install
function npmInstall(o,cb){
    o=o||{};
    exec('npm install', function callback(error, stdout, stderr) {
        if (error) {
            o.error=error;
            console.log(error.stack);
            cb(error,o);
        }
        else {
            cb(null,o);
        }
    });
}

// this is q_tree npm install
function q_npmInstall(o){
    o=o||{};
    o.query=npmInstall;
    return doq(o);
}
exports.npmInstall=q_npmInstall;

// this try to require module normally, when fails, invoke installModule
function newRequire(module, cb) {
    cb=cb||function(e,r){
        console.log(e.stack);
    };

    if(!module){
        return cb("No module given!");
    }

    var result = null;

    try {
        result = require(module);
        console.log("normal required: "+module);
        cb(null, result);
    } catch (e) {
        installModule(module, function (err, resp) {
            try {
                result = require(module);
                console.log("success install required: "+module);
                cb(null, result);
            } catch (e) {
                console.log("failed to install require: "+module);
                cb(e, null);
            }
        })
    }
}

exports.require=newRequire;

function q_o_newRequire(o,cb){
    newRequire(o.module,function(e,r){
        o.result=r;
        cb(e,o);
    });
}

// this is a q_tree require
function q_newRequire(module,o){
    o=o||{};
    o.query=q_o_newRequire;
    o.module=module;
    return doq(o);
}

exports.q_require=q_newRequire;