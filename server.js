const express = require('express');         //package 불러옴
const app = express();                      // express 함수의 변환값 저장
const port = process.env.PORT || 3000;      //process.env = 환경변수 호출, 환경변수가 입력되지 않을 시 port에 3000번을 지정

//get 정의
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/static/home.html");
    console.log(__dirname);
});

app.listen(port, () => {
    console.log(`server is listening at localhost:${process.env.PORT}`);
});