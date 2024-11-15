//04_path.js
// 모듈과 관계없이 사용가능한 전역변수, 절대경로(underbar _ X 2)
console.log(__filename);  // 실제 실행하고 있는 파일의 절대경로
console.log(__dirname); // 실행하고 있는 파일의 디렉토리(폴더정보) 이다.

// 파일을 각각 쪼개서 가져오기 
const path = require('path');

console.log('폴더정보',path.dirname(__filename));
console.log('실제 파일명 : %s',path.basename(__filename));
console.log('확장자 : %s',path.extname(__filename));