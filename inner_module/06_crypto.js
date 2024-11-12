//06_crypto.js
//단방향 암호화
const crypto = require('crypto');
const data = 'pw1234'; 

let encData = crypto.createHash('sha512') // 암호화 알고리즘 | sha512 = hash 알고리즘 종류 (512 = 최대 512bite 출력길이 )
                    .update(data)
                    .digest('hex');  // 기본적으로 base64 많이 사용하는데 좀 더 길게 사용 하고자 하면 hex 사용 
                    //.digest('base64');  
                    // base64 = 64bite 기반으로 출력 (실제 출력길이와 최대출력 길이는 달라야 한다. 유사성이 없어야 하기 때문 )
console.log(encData);
// 보안에는 해시(hash) & 솔트 (salt) 알고리즘 이 있다.
// 솔트 (salt) = 의미없는 랜덤값을 섞어서 넣는다. 즉, 해쉬로 base64 로 암호화 만들어 주고 salt로 의미없는 랜덤값 넣어서 한번더 비틀어준다.
