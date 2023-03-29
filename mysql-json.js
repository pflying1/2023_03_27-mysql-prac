const mysql = require('mysql');
const fs = require('fs')

//npm install -s mysql 모듈 설치 해야함
//이부분 보통 모듈화 해서 쓰는것 같음
//db 연동하기 
const db = mysql.createConnection({
  //본인 아이디 패스워드 db이름 사용할 것 
  host:'localhost',
  user:'root',
  password:'admin123',
  database:'test1',
}) 

db.connect();

//text이름의 테이블 데이터 파일에 Json파일로 저장하기 
db.query('SELECT * FROM  text',function(err,results,fields){
  if(err)throw err
  
  fs.writeFileSync('db.Json', JSON.stringify(results, null, 2),(err)=>{
    if(err)throw err
  })
});
db.end();
