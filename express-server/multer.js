const multer = require('multer');
const path = require('path');

const express = require('express');
const app = express();

const storage = multer.diskStorage({
  destination : function(req, file, cb){
    cb(null, 'uploads/'); // uploads 폴더 에 파일 저장 
  },
  filename : function(req, file, cb){
    // murter의 경우 한글이 지원이 안되서 한글이름 지원을 위해서 한번더 바꿔주는 과정을 추가해준다.
    // 파일이름, utf8 로 보냈는데 multer경우 latin1로 해석 하기 때문에 한번 바꿔준다. *buffer = 읽어들이기
    file.originalname = Buffer.from(file.originalname,'latin1').toString('utf8'); 
    cb(null, new Date().valueOf() + path.basename(file.originalname));
  }
});

const upload = multer({ storage : storage });
// 프로필 저장 이라 가정 
// name = 'avatar' 라는 이름으로 보내야 한다. 
app.post('/profile', upload.single('avatar'), (req, res)=>{
  console.log(req.file); // 단건의 경우 file 
  console.log(req.body);
});
// name = 'photos' 라는 이름으로 보내야 한다. 
app.post('/photos', upload.array('photos', 12), (req,res)=>{
  for(let file of req.files){ // 다중건의 경우 files
    console.log(file);
  }
})

app.listen(5000, ()=>{
  console.log('Server Start!!');
})