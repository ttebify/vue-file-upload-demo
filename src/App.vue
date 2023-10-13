<template>
  <div class="app">
    <side-nav :isOpen="isSideNavOpen" @toggle-side-nav="toggleSideNav"></side-nav>
    <div class="main" :class="{ 'pushed-left': isSideNavOpen }">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import SideNav from './components/SideNav.vue';

export default {
  name: 'App',
  components: {
    SideNav,
  },
  data() {
    return {
      isSideNavOpen: true,
    };
  },
  methods: {
    toggleSideNav() {
      this.isSideNavOpen = !this.isSideNavOpen;
    },
  },
};
</script>
<style scoped>
.app {
  display: flex;
}

.main {
  flex: 1;
  padding: 20px;
  transition: all 0.3s;
}

.pushed-left {
  margin-left: 290px;
}

/* Media query to hide side navigation on smaller screens */
@media (max-width: 768px) {
  .main {
    margin-left: 0;
  }
}
</style>