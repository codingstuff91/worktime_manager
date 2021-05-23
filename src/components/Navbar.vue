<template>
    <b-navbar>
        <template #brand>
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="../assets/horloge.jpg"
                    class="mr-2"
                >
                <h4 class="has-text-primary has-text-bold">COMPTEUR PRESENCE</h4>
            </b-navbar-item>
        </template>
        <template #start>
            <b-navbar-item href="/">
                Compteur JOUR
            </b-navbar-item>
            <b-navbar-item href="/semaine">
                Compteur SEMAINE
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>