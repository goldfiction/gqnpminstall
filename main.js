/**
 * Created by happy on 3/26/17.
 */
const exec = require('child_process').exec;
const doq=require('gqdoq');
const dosave=""; // change this to "--save" to have modules added to package.json

// this installs given local module
function installModule(o, cb) {
    console.log("trying to install module: "+ o.module);
    exec('npm install '+dosave +" "+ o.module, function callback(error, stdout, stderr) {
        if(error){
            console.log(error)
        }
        cb(error,o);
    });
}

function q_installModule(o){
    o=o||{};
    o.query=installModule;
    return doq(o);
}

exports.installModule=q_installModule;

// this installs given local module
function uninstallModule(o, cb) {
    o.module= o.module.split('@')[0];
    console.log("trying to uninstall module: "+ o.module);
    exec('npm uninstall ' + o.module, function callback(error, stdout, stderr) {
        if (error) {
            console.log(error.stack);
        }
        cb(error,o);
    });
}

function q_uninstallModule(o){
    o=o||{};
    o.query=uninstallModule;
    return doq(o);
}

exports.uninstallModule=q_uninstallModule;

// this does a npm install
function npmInstall(o,cb){
    o=o||{};
    exec('npm install', function callback(error, stdout, stderr) {
        if (error) {
            console.log(error.stack);
        }
        cb(error,o);
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
function newRequire(o, cb) {
    cb=cb||function(e,r){
        if(e)
            console.log(e.stack);
    };

    if(!o.module){
        return cb(new Error("No module given!"));
    }

    o.moduleName= o.module.split("@")[0];

    try {
        o.result = require(o.moduleName);
        console.log("normal required: "+ o.module);
        cb(null, o);
        return o.result;
    } catch (e) {
        installModule(o, function (err, resp) {
            try {
                o.result = require(o.moduleName);
                console.log("success install required: "+ o.module);
                cb(null, o);
                return o.result;
            } catch (e) {
                console.log("failed to install require: "+ o.module);
                //console.log(e.stack);
                cb(e, o);
                return null;
            }
        })
    }
}

function doRequire(module){
    return newRequire({module:module});
}

exports.require=doRequire;

// this is a q_tree require
function q_newRequire(o){
    o=o||{};
    o.query=newRequire;
    return doq(o);
}

exports.q_require=q_newRequire;