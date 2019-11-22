const express = require('express');
const fs = require('fs');
const urlLib = require('url');
const pathLib = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const querystring = require('querystring');
const multer = require('multer');
const CircularJSON = require('circular-json');
const mysql = require('mysql');
const sd = require('silly-datetime');
var uuid = require('uuid');//根据时间产生唯一标识符id
var cors = require('cors');

var db = mysql.createConnection({
	host:'148.70.73.191',
	user:'root',
	password:'Web123456',
	database:'reservation'
});

var obj={
		length:0,
		list:[]
	};

setInterval(function(){
	db.query(`select * from acttab`,function(err,data){
			if(err){
				console.log(err);
				res.send("database error").end();
			}
			else{
				//console.log(data);
				var results = JSON.stringify(data);
				results = JSON.parse(results);
				 //console.log(results);
				 //console.log(results.length);
				obj.length = results.length;
			}
		})
},1000);

var myDate = new Date();

var server = express();

//console.log('started');
//server.use('*', function(req,res,next){console.log("wdnmd");  next();});

server.all('*', function (req, res, next) {
	//console.log("开始服务");
	res.header('Access-Control-Allow-Origin', '*');
	  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
	  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
	
	  if (req.method == 'OPTIONS') {
	    res.send(200); /*让options请求快速返回*/
	  }
	  else {
	    next();
	  }
});

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended : false}));


  var obj = multer({dest:'./www/upload'});
  
  server.post('/login',function(req,res,next){
	   //console.log(req.body);
	  var teaNumber = req.body.params.teaNumber;
	  var teaPass = req.body.params.teaPass;
	  //console.log(teaNumber,teaPass);
	  var sql = "select teaNumber,teaName from teacher where teaNumber = '"+teaNumber+"' and teaPass = '" + teaPass+"'";
	  db.query(sql,function(err,data){
	  	if(err){console.log(err);res.send("database error").end();}
	  	else{
	  		if(data ==''){
	  			res.send("null").end();
	  		}
	  		else{
				console.log(JSON.stringify(data));
	  			res.json(data).end();
	  		}
	  	}
	  })
  })//登陆服务

  
server.post('/upAct',function(req,res,next){
  var activity = req.body;
  //console.log(activity);
  var actid = uuid.v1();
  var actTime = activity.actTime;
  var actTitle = activity.actTitle;
  var actIntro = activity.actIntro;
  var actPlace = activity.actPlace;
  var isUrgent = activity.isUrgent;
  var isTop = activity.isTop;
  var teaName = activity.teaName;
  //console.log(actid,actTime,actIntro,actPlace,actTitle,isUrgent,isTop,teaName);
  var sql = `insert into acttab values (?,?,?,?,?,?,?,?)`;
  db.query(sql,[actid,actTime,actTitle,actIntro,actPlace,isUrgent,isTop,teaName],function(err,data){
	  if(err){
		  console.log(err);
		  res.send("database error").end();
	  }
	  else{
		  res.send("新活动插入成功!").end();
	  }
  })
  
})//辅导员新添活动(无论活动是否是正常还是紧急)

server.get('/browse',function(req,res,next){
	
	var i = req.query.index;
	var sql = `select * from acttab limit ?,5`;
	var time1 = Date.now();
	db.query(sql,[(i-1)*5],function(err,data){
		if(err){
			console.log(err);
			res.send("database error.").end();
		}
		else{
			//console.log(data);
			data = JSON.stringify(data);
			data = JSON.parse(data);
			obj.list = data;
			var time2 = Date.now();
			console.log(time2,time1);
			//console.log(obj);
			res.json(obj).end();
		}
	})
	
	
})//显示全部活动信息的总条数

server.post('/actDelete',function(req,res,next){
	var actid = req.body.params.actid;
	console.log(actid);
	var sql = `delete from acttab where actid = ?`;
	db.query(sql,[actid],function(err,data){
		if(err){
			console.log(err);
			res.send("database error").end();
		}
		else{
			res.send("删除成功!").end();
		}
	})
})//删除活动

server.get('/showMyAct',function(req,res,next){
	var teaName = req.query.teaName;
	//console.log(req.query);
	var sql = `select * from acttab where teaName = ?`;
	db.query(sql,[teaName],function(err,data){
		if(err){
			console.log("database error");
			res.send("database error.").end();
		}
		else{
			res.json(data).end();
			//console.log(data);
		}
	})
})//显示对应教师发布活动页面(用于查看登陆教师发布活动和修改)
  
server.get('/changeAct',function(req,res,next){
	var actid = req.query.actid;
	//console.log(actid);
	var sql = `select * from acttab where actid = ?`;
	db.query(sql,[actid],function(err,data){
		if(err){
			console.log("database error");
			res.send("database error.").end();
		}
		else{
			res.json(data).end();
		}
	})
})//登陆教师查看对应id的活动信息(未修改)

server.post('/updateAct',function(req,res,next){
	var activity = req.body.params.activity;
	//console.log(req.body);
	var teaName = activity.teaName;
	var actid = activity.actid;
	var actTime = activity.actTime;
	var actTitle = activity.actTitle;
	var actIntro = activity.actIntro;
	var actPlace = activity.actPlace;
	var isUrgent = activity.isUrgent;
	var isTop = activity.isTop;
	console.log(actid,actTime,actTitle,actPlace,isUrgent,isTop);
	var sql = `update acttab set actTime = ?,actTitle = ?,actIntro = ?,actPlace = ?,isUrgent = ?,isTop =? where actid = ?`;
	db.query(sql,[actTime,actTitle,actIntro,actPlace,isUrgent,isTop,actid],function(err,data){
		  if(err){
			  console.log(err);
			  res.send("database error").end();
		  }
		  else{
			  res.send("修改成功!").end();
		  }
	})
})//登陆教师修改并上传对应id的活动信息

  server.get('/review',function(req,res,next){
	  var actid = req.query.actid;
	  var sql = `select * from signup where actid = ?`;
	  db.query(sql,[actid],function(err,data){
		  if(err){
			  console.log(err);
			  res.send("database error").end();
		  }
		  else{
			  res.json(data).end();
		  }
	  })
  })//辅导员查看单个活动预约名单
  
  server.post('/approve',function(req,res,next){
	  var isApprove = req.body.isApprove;
	  var stdNumber = req.body.stdNumber;
	  var sql = `update signup set isApprove = ? where stdNumber = ?`;
	  db.query(sql,[isApprove,stdNumber],function(err,data){
		  if(err){
			  console.log(err);
			  res.send("database error").end();
		  }else{
			  res.send("操作成功").end();
		  }
	  })
  })//辅导员同意预约请求
  
  server.listen(9528);
  
