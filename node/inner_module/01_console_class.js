//01_console_class.js 
// log 를 남기기 (로그 남기는 폴더를 만들어서 각 로그 파일에 기록을 남긴다.)
// class를 사용 
// 내부 모듈은 node.js 설치하면서 같이 설치 되나 외부 모듈의 경우 추가적으로 설치 한 후 사용 가능하다(require사용).
const fs = require ('fs');
const {Console} = require('console');

const logOutput = fs.createWriteStream('./logs/stdout.log'); 
const errOutput = fs.createWriteStream('./logs/stderr.log');

// log 남기는 용도
const logger = new Console({stdout : logOutput, stderr : errOutput}); 
// 전역 console로는 사용 불가능 하고 class를 활용해서 log를 남겨 줘야 한다.

let count = 5;
logger.log('count : %d',count);
logger.error(`count : ${++count}`);


