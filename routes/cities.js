/**
 * Created by Administrator on 14-12-2.
 */

"use strict";
var citiesDBModel = require('../models/cities.js');
var crypt = require('../utils/crypt.js');
var validator = require('validator');
var mail = require('../common/mail');
//var tools = require('../common/tools');
var utility = require('utility');
var config = require('../config');
var cities =new citiesDBModel.Schema("cities").model;



//var t2="[{name:'zhangsan',age:'24'},{name:'lisi',age:'30'},{name:'wangwu',age:'16'},{name:'tianqi',age:'7'}] ";
//var myobj=eval(t2);
//for(var i=0;i<myobj.length;i++){
//    alert(myobj[i].name);
//    alert(myobj[i].age);
//}


exports.addCities=function(req,res){
//    console.log(req.body);
    //console.log("addCities.............."+req.body['data']);
    var json = req.body['data'];
    var myobj=eval(json);
    for(var i=0;i<myobj.length;i++){
        //console.log(myobj[i].city);
        var cityEntity = new cities();
        cityEntity.city=myobj[i].city;
        cityEntity.province=myobj[i].province;
        cityEntity.country=myobj[i].country;
        cityEntity.code=myobj[i].code;
        cityEntity.save(true,true,function (err,userInfo){
            console.log("save.......cityEntity.............. "+err);
        });
    }
    res.send(JSON.stringify("insert cities success"));
};

exports.findCities=function(req,res){
 //   console.log("findCities.............."+req.body['city']);
    var json = req.body['city'];
    var cityEntity = new cities();
    var query = {"province":json};
    console.log("query "+query);
    cities.find(query, function(err, city) {
        console.log("province............"+err);
        if(err || !city) {
            console.log("No female users found");
        }else {
            //console.log(" city found "+city);
            city.forEach( function(femaleUser) {
                console.log(json+"has follow city: "+femaleUser);
            } );
            res.send(JSON.stringify(city));
        }
    });
};
exports.showAllCity = function(req,res){
    var json = req.body['all'];
};
