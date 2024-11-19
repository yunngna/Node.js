<!--views/ModalLayout.vue-->
<!-- 모달 slot template-->
<template>
    <div class="modal-container">
        <!--slot 이 들어갈 위치에 slot 이라고 적어줘야 한다.-->
        <header>
            <slot name="header"></slot>
        </header>
        <main>
            <slot></slot>
        </main>
        <footer>
            <slot name="footer"></slot>
        </footer>
    </div>
</template>

<style scoped>
.modal-container {
    text-align: center;
    max-width: 40em;
    padding: 2em;
}
</style>