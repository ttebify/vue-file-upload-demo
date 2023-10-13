<template>
    <div class="sidenav" :class="{ 'sidenav-open': isOpen }">
        <button @click="toggleSideNav" class="toggle-btn">
            <i class="fas fa-bars"></i>
        </button>
        <router-link to="/vue-file-upload" class="nav-link" active-class="active-link">Vue File Upload</router-link>
        <router-link to="/composition-api" class="nav-link" active-class="active-link">Composition API</router-link>
        <router-link to="/imagekit" class="nav-link" active-class="active-link">ImageKit</router-link>
    </div>
</template>
  
<script>
export default {
    name: 'SideNav',
    props: {
        isOpen: Boolean, // Receive the isOpen prop
    },
    methods: {
        toggleSideNav() {
            this.$emit('toggle-side-nav');
        },
    },
};
</script>
  
<style scoped>
.sidenav {
    width: 250px;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    background-color: #333;
    padding: 20px;
    color: white;
    transition: all 0.3s;
    transform: translateX(-100%);
    z-index: 9999;
}

.sidenav-open {
    transform: translateX(0);
}

.toggle-btn {
    position: absolute;
    top: 10px;
    right: -30px;
    background: #333;
    color: white;
    border: none;
    cursor: pointer;
    padding: 5px;
}

.nav-link {
    color: white;
    text-decoration: none;
    padding: 10px;
    display: block;
    transition: background-color 0.3s;
}

.active-link {
    background-color: #555;
}

.nav-link:hover {
    background-color: #444;
    transition: background-color 0.3s;
}
</style>