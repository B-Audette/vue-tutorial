<template>
  <div class="user-profile">
    <div class="user-profile_sidebar">
      <div class="user-profile_user-panel">
        <h1 class="user-profile_username">@{{ user.username }}</h1>
        <div class="user-profile_admin-badge" v-if="user.isAdmin">Admin</div>
        <div class="user-profile_follower-count">
          <strong>Followers: </strong>{{ followers }}
        </div>
      </div>
      <CreateTwootPanel @add-twoot="addTwoot" />
    </div>
    <div class="user-profile_twoots-wrapper">
      <!-- below was replaced with its own component -->
      <!-- <div class="user-profile_twoot" v-for="twoot in user.twoots" :key="twoot.id"> -->
      <!-- Add @favorite="toggleFavorite" back into TwootItem here and in methods to activate the favorite option again -->
      <TwootItem
        v-for="twoot in user.twoots"
        :key="twoot.id"
        :username="user.username"
        :twoot="twoot"
      />
    </div>
  </div>
</template>

              <!-- or you can write TwootItem like example below (less favorable,   -->
              <!-- in general it's not a great practice to use an array index as a key on iterated components  -->
              <!-- (this is true for both Vue and React).  -->
              <!-- The reason being is that since arrays can change,  -->
              <!-- that index value can change for an item in an array) -->
              <!-- Since Vue uses it to track and reuse each DOM element in the iteration (e.g. each <option> in this case), if that key changes it won't really be able to do that effectively if something changes. -->

              <!-- Example: -->
              <!-- <option :value="option.value" v-for="(option, index) in twootTypes" :key="index"> -->



<script>
import TwootItem from "./TwootItem";
import CreateTwootPanel from "./CreateTwootPanel"

export default {
  name: "UserProfile",
  components: { CreateTwootPanel, TwootItem },
  data() {
    return {
    
      followers: 0,
      user: {
        id: 1,
        username: "ExampleUser",
        firstName: "Example",
        lastName: "User",
        email: "anemail@wow.com",
        isAdmin: true,
        twoots: [
          { id: 1, content: "twotter is amazing!" },
          { id: 2, content: "don't forget to subscribe" },
        ],
      },
    };
  },
  // watch: {
  //   followers(newFollowerCount, oldFollowerCount) {
  //     if (oldFollowerCount < newFollowerCount) {
  //       console.log(`${this.user.username} has gained a follower!`);
  //     }
  //   },
  // },
  // computed: {
  //   fullName() {
  //     return `${this.user.firstName} ${this.user.lastName}`;
  //   },
  //   newTwootCharacterCount() {
  //     return this.newTwootContent.length;
  //   },
  // },
  methods: {
    // followUser() {
    //   this.followers++;
    addTwoot(twoot) {
      this.user.twoots.unshift({
        id: this.user.twoots.length + 1,
        content: twoot,
      });
    },
  },
  // should favorite it on click, then toggle to not favorite it on next click
  // toggleFavorite(id) {
  //   console.log(`favorited twoot #${id}`);
  // },
  //   createNewTwoot() {
  //     if (this.newTwootContent && this.selectedTwootType !== "draft") {
  //       this.user.twoots.unshift({
  //         id: this.user.twoots.length + 1,
  //         content: this.newTwootContent,
  //       });
  //       this.newTwootContent = "";
  //     }
  //   },
  // },
  // mounted() {
  //   this.followUser();
  // },
};
</script>

<style lang="scss" scoped>
.user-profile {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 50px;
  padding: 50px 5%;

  .user-profile_user-panel {
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: white;
    border-radius: 5px;
    border: 1px solid #dfe3e8;
    margin-bottom: auto;
  }

  h1 {
    margin: 0;
  }

  .user-profile_admin-badge {
    background: rebeccapurple;
    color: white;
    border-radius: 5px;
    margin-right: auto;
    padding: 0 10px;
    font-weight: bold;
  }
}

.user-profile_twoots-wrapper {
  display: grid;
  grid-gap: 10px;
  margin-bottom: auto;
}
</style>
