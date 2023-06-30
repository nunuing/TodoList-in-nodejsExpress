const express = require('express');         //package 불러옴
const app = express();                      // express 함수의 변환값 저장
const port = process.env.PORT || 3000;      //process.env = 환경변수 호출, 환경변수가 입력되지 않을 시 port에 3000번으로 설정

const mysql = require('mysql2');
const cors = require('cors');
const bodyparser = require('body-parser');

const dbconfig = require('./config/database.js');       //db 정보 로드

const db_conn = mysql.createPool(dbconfig);             //mysql과 express 연결 -> 이 변수를 통해 db접근 가능

//get 정의
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/static/home.html");
});

app.get('/todolists', (req, res) => {
    db_conn.query('SELECT * FROM LIST', (err, rows) => {
        if(err) throw err;
        console.log(rows);
        res.send(rows);
    })
});

app.listen(port, () => {
    console.log(`server is listening at localhost:${process.env.PORT}`);
});

app.use(express.static('static'));