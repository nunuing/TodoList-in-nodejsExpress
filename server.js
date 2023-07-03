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

app.set('view engine', 'ejs');                          //view engine이 사용할 template engine
app.set('views', './views');
app.use(express.static('views'));                       //정적파일 제공

app.get('/', (req, res) => {
    db_conn.query('SELECT * FROM LIST', (err, rows) => {
        if(err) throw err;
        res.render("home.ejs", {rows:rows});            //rows 변수 안에 rows를 담아서 home.ejs로 전달
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
