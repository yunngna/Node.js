<!--layout/DefualtHeader.vue-->
<!-- app.vue(대문) 자식 컴퍼넌트로 등록 -->
<template>
    <nav class="nav">
    <!--router 연결 링크-->
    <router-link class="nav-link" to="/customerList">전체조회</router-link>
    <router-link class="nav-link" to="/customerAdd">등록</router-link>
    </nav>
</template>