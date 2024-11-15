//03_process_os.js
// process, os는 require 사용 안해도 되나 명시적으로 나타내기 위해 사용
const os = require('os'); // 전체적인 운영체제 정보 
const process = require('process'); // node 가 실행 되는 순간의 정보 

console.log(process.env); // 전체 정보 조회 
console.log(process.env.JAVA_HOME); // 원하는 정보의 key 검색

console.log(os.cpus()); // CPU 운영체제 코어 정보
console.log(os.tmpdir()); // 임시 저장 경로

