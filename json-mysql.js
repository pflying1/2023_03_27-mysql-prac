const mysql = require('mysql');
const fs = require('fs');
const path = require('path');

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
/* db.query('SELECT * FROM  text',function(err,results,fields){
  if(err)throw err
  
  // const values = json.map
  
    fs.writeFileSync('db.Json', JSON.stringify(results, null, 2),(err)=>{
    if(err)throw err
  })
}); */
/* // JSON 파일 읽기
const data = fs.readFileSync('db.json');

// JSON 파싱
const json = JSON.parse(data);
console.log(json);
// MySQL 쿼리 실행
db.query (`INSERT INTO text (id, name, email) VALUES (${json.id},${data.name},${data.email})`); */
// JSON 파일 경로
const filePath = './db.Json'; 

// fs 모듈을 사용하여 JSON 파일 읽기
fs.readFile(filePath, 'utf-8', (err, data) => {
  if (err) throw err;
  
  // 데이터 파싱
  const jsonData = JSON.parse(data);
  

  //테이블 데이터 전체 삭제
  db.query('DELETE FROM text WHERE id<10000'); 
  //데이터 추가 
  const sql = 'INSERT INTO text (id, name, email) VALUES ?';
  // const sqlUpdate = 'UPDATE text SET name="대실패" WHERE id<100';
  const values = jsonData.map(value=> [value.id, value.name, value.email]);
  console.log(values);
  db.query(sql, [values], (err, result) => {
    if (err) {
      console.err('실패했다 이놈아');
      
    }else{
    console.log('성공했다 이놈아');
    }
    db.end();
  });
});
