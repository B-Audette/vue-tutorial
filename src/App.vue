<template>
  <div id="app">
    <nav>
      <router-link to="/">
      <div class="navigation_logo">Twotter</div>
      </router-link>
      <div class="navigation_user" v-if="user">
        {{ user.username }}
      </div>
    </nav>
    <!-- whatever page  you are on, according to the router, is what loads in router-view -->
    <router-view/>
    <UserProfile />
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue';

export default {
  name: 'App',
  setup() {
    const store = useStore()
    const user = computed(() => store.state.User.user)

    return {
      user
    }
  }
}
//----------------
// pre-context api
// ---------------
//import UserProfile from "./components/UserProfile";

// export default {
//   name: "App",
//   components: { UserProfile },
//   data() {
//     return {
//       user: {
//         username: "ExampleUser"
//       }
//     }
//   }
// };
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  background-color: #f3f5fa;
  
  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 5%;
    background-color: deepskyblue;
    color: white;

    .navigation_logo {
      font-weight: bold;
      font-size: 24px;
    }

    .navigation_user {
      font-weight: bold;
    }
  }
}
</style>
