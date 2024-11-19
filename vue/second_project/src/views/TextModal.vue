<!--views/TextModel.vue-->
<template>
    <Layout>
        <!--<template v-slot></template> 은 슬롯이 대체할 html -->
        <template v-slot:header>
            <h1>팝업 제목</h1> <!-- 따로 넣을 정보-->
        </template>
        <template v-slot:default><!--앞에서 이름이 있는 header, footer지정 했으면 이름이 없는 경우 default해도 알아서 찾아온다-->
            <p>팝업 컨텐츠1</p>
            <p>팝업 컨텐츠2</p>
        </template>
        <template v-slot:footer>
            <button type ="button">닫기</button>
        </template>
    </Layout>

</template>
<script>
import Layout from './ModalLayout.vue'

export default{
    components : {
        Layout
    }
}
</script>