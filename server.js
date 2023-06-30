const express = require('express');         //package 불러옴
const app = express();                      // express 함수의 변환값 저장
const port = process.env.PORT || 3000;      //process.env = 환경변수 호출, 환경변수가 입력되지 않을 시 port에 3000번으로 설정

const mysql = require('mysql2');
const cors = require('cors');
const bodyparser = require('body-parser');

const dbconfig = require('./config/database.js');       //db 정보 로드

const db_conn = mysql.createPool(dbconfig);             //mysql과 express 연결 -> 이 변수를 통해 db접근 가능
const jsonParser = bodyparser.json();                   //body-parser를 사용하기 위한 변수 할당

const nunjucks = require('nunjucks');

app.set('view engine', 'html');                 //app에 view engine(key값) : html(value값)인 property 추가
nunjucks.configure('static', {express:app});    //nunjucks.config 첫번째 인자 : html을 담아 둘 폴더의 이름, 두번째 인자 : express 속성에 app을 연결
app.use(bodyparser.urlencoded({extends:true})); //중첩객체 표시 여부 -> true : 중첩 객체 포함, false : 중첩객체는 그냥 object로 나타냄

//get 정의
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/static/home.html");
});

app.get('/lists', (req, res) => {
    db_conn.query('SELECT * FROM LIST', (err, rows) => {
        if(err) throw err;
        res.render('/static/home.html', {postList:result});         //html로 변수 전달
    })
});

//리스트 추가
app.post('/lists', jsonParser, (req, res) => {
    console.log(req.body);
    // const sql = 'INSERT INTO LIST (NUM, CONTENT, DONE) VALUES (?, ?, ?)';
    // const num = req.body.num;
    // const content = req.body.content;
    // const done = req.body.done;

    // const params = [num, content, done];

    // console.log(num, content, done)
    // db_conn.query(sql, params, (err, rows, fields) => {
    //     if(err) throw err;
    //     console.log(rows);
    // });
});

app.listen(port, () => {
    console.log(`server is listening at localhost:${process.env.PORT}`);
});

app.use(express.static('static'));          //정적파일 제공