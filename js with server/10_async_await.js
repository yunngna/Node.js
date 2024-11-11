//10_async_await.js
//await : 작업이 끝날 때 가지 대기 하라는 의미 

async function getPostInfo(){
    let postList = await fetch('https://jsonplaceholder.typicode.com/posts')
                        .then(res => res.json());

    let postId = postList[0].id; // 첫번째 게시글의 아이디 가져오기 

    let post = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
                    .then(res => res.json()); // 아이디로 게시글 가져오기 
    
    let commentList = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
                             .then(res => res.json()); // comments 도 가져오기
    post.comments = commentList; // 게시글과 comments 합산 하기 
    console.log(post);
}

getPostInfo();