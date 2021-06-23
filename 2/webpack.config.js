const path = require('path');

module.exports = {
    name: 'word-relay-setting',
    mode: 'development', // 실서비스 : production
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx'] // 확장자를 일일히 입력하ㅐ줄 필요가 없도록 해준다. 
    },
    entry: {
        app: ['./client'],    // 다른 파일이 불러오고 있는 파일은 불러올 필요가 없음.
    }, //입력
    output: {
        path: path.join(__dirname, 'dist'), // __dirname : 현재 폴더 안에있는 , 'dist' : dist 폴더. 현재 폴더 안의 dist폴더를 의미.
        filename: 'app.js' 
    }, //출력
};