const express = require('express');
const fs = require('fs');
const urlLib = require('url');
const pathLib = require('path');
const http = require('http');
const https = require("https");
const bodyParser = require('body-parser');
const querystring = require('querystring');
const multer = require('multer');
const CircularJSON = require('circular-json');
const mysql = require('mysql');
const sd = require('silly-datetime');
var uuid = require('uuid');//根据时间产生唯一标识符id

var db = mysql.createConnection({
	host:'148.70.73.191',
	user:'root',
	password:'Web123456',
	database:'reservation'
});

const options = {
    pfx: fs.readFileSync('./www.uestcyilu.cn.pfx'),
    passphrase: 'e9a01nm65'
};

var myDate = new Date();

var server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended : false}));


var obj = multer({dest:'./www/upload'});

server.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
	//console.log(123);
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
  });
  
  server.post('/login',function(req,res,next){
	console.log(req.body);
	var stdNumber = req.body.id;
	var stdPass = req.body.pass;
	var sql = `select * from student where stdNumber = `+ mysql.escape(stdNumber)+`and stdPass =`+ mysql.escape(stdPass);
	db.query(sql,function(err,data){
		if(err){console.log(err);res.send("database error").end();}
		else{
			if(data ==''){
				res.send("fail").end();
			}
			else{
				res.send("success").end();
			}
		}
	})
  })//学生登录页面
  
  server.get('/history',function(req,res,next){
	  console.log(req.query);
	  var stdNumber = req.query.stdNumber;
	  var sql = `select * from history where stdNumber = ? order by time asc`;
	  db.query(sql,[stdNumber],function(err,data){
		  if(err){
			  console.log(err);
			  res.send("database error").end();
		  }
		  else{
			  res.json(data).end();
		  }
	  })
  })//获取对应学生id的历史预约
  
  server.get('/getAct',function(req,res,next){
	  var sql = `select * from acttab`;
	  db.query(sql,function(err,data){
		  if(err){console.log("database error");res.send("database error").end()}
		  else{
			  res.json(data).end();
		  }
	  })
  })//获取全部活动信息
  
  server.get('/actSignle',function(req,res,next){
	  var actid = req.query.actid;
	  var sql = `select * from acttab where actid = ?`;
	  db.query(sql,[actid],function(err,data){
		  if(err){
			  console.log(err);
			  res.send("database error").end();
		  }
		  else{
			  res.json(data).end();
		  }
	  })
  })//通过id获取单个活动页面
  
  server.post('/signup',function(req,res,next){
	  //console.log(req.query);
	  var actid = req.body.actid;
	  var stdNumber = req.body.stdNumber;
	  var actPlace = req.body.actPlace;
	  var actTime = req.body.actTime;
	  var actTitle = req.body.actTitle;
	  var id =uuid.v1();
	  var time=sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
	  var isApprove = 0;
	  console.log(actid,stdNumber,actTime,actTitle,actPlace);
	  var detection = `select stdNumber from signup where actid = ?`;
	  db.query(detection,[actid],function(err,data){
		  if(err){
		  			  console.log(err);
		  			  res.send("database error").end();
		  }
		  else{
			  var string=JSON.stringify(data); 
			  var data = JSON.parse(string);
			  //console.log(data+'\n');
			  var temp = 0;
			  for(var i=0;i<data.length;i++){
				  if(data[i].stdNumber == stdNumber){
					  temp = 1;
					  break;
				  }
			  }
			  //console.log(temp);
			  if(temp == 1){
				  res.send("false").end();
			  }
			  else{
				  var sql = `insert into signup values ("${id}",'${actid}','${stdNumber}','${time}','${isApprove}')`;
				  db.query(sql,function(err,data){
				  		  if(err){
				  			  console.log(err);
				  			  res.send("database error").end();
				  		  }
				  		  else{
				  			  console.log("123");
				  			   
				  			  var sql1 = `insert into history values ('${id}','${actid}','${stdNumber}','${actTitle}','${actTime}','${actPlace}','${time}')`;
				  			  db.query(sql1,function(err,data){
				  				  if(err){
				  				  			  console.log(err);
				  				  			  res.send("database error").end();
				  				  }
				  				  else{
				  					  console.log("写入预约成功");
									res.send("true").end();
				  				  }
				  			  })
				  		  }
				  })
			  }
		  }
	  })

  })//学生预约服务

https.createServer(server).listen(4396);