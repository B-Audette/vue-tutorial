<template>
  <div class="user-profile">
    <div class="user-profile_user-panel">
      <h1 class="user-profile_username">@{{ user.username }}</h1>
      <div class="user-profile_admin-badge" v-if="user.isAdmin">Admin</div>
      <div class="user-profile_follower-count">
        <strong>Followers: </strong>{{ followers }}
      </div>
      <form
        class="user-profile_create-twoot"
        @submit.prevent="createNewTwoot"
        :class="{ '--exceeded': newTwootCharacterCount > 180 }"
      >
        <label for="newTwoot"
          ><strong>New Twoot</strong> ({{ newTwootCharacterCount }}/180)</label
        >
        <textarea id="newTwoot" rows="4" v-model="newTwootContent" />
        <div class="user-profile_create-twoot-type">
          <label for="newTwootType"><strong>Type: </strong></label>
          <select id="newTwootType" v-model="selectedTwootType">
            <option
              :value="option.value"
              v-for="option in twootTypes"
              :key="option.value"
            >
              <!-- or you can write it like below (less favorable,   -->
              <!-- in general it's not a great practice to use an array index as a key on iterated components  -->
              <!-- (this is true for both Vue and React).  -->
              <!-- The reason being is that since arrays can change,  -->
              <!-- that index value can change for an item in an array) -->
              <!-- Since Vue uses it to track and reuse each DOM element in the iteration (e.g. each <option> in this case), if that key changes it won't really be able to do that effectively if something changes. -->

              <!-- Example: -->
              <!-- <option :value="option.value" v-for="(option, index) in twootTypes" :key="index"> -->
              {{ option.name }}
            </option>
          </select>
        </div>

        <button>Twoot!</button>
      </form>
    </div>
    <div class="user-profile_twoots-wrapper">
      <!-- below was replaced with its own component -->
      <!-- <div class="user-profile_twoot" v-for="twoot in user.twoots" :key="twoot.id"> -->
      <TwootItem
        v-for="twoot in user.twoots"
        :key="twoot.id"
        :username="user.username"
        :twoot="twoot"
        @favorite="toggleFavorite"
      />
    </div>
  </div>
</template>

<script>
import TwootItem from "./TwootItem";

export default {
  name: "UserProfile",
  components: { TwootItem },
  data() {
    return {
      newTwootContent: "",
      selectedTwootType: "instant",
      twootTypes: [
        { value: "draft", name: "Draft" },
        { value: "instant", name: "Instant Twoot" },
      ],
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
  watch: {
    followers(newFollowerCount, oldFollowerCount) {
      if (oldFollowerCount < newFollowerCount) {
        console.log(`${this.user.username} has gained a follower!`);
      }
    },
  },
  computed: {
    fullName() {
      return `${this.user.firstName} ${this.user.lastName}`;
    },
    newTwootCharacterCount() {
      return this.newTwootContent.length;
    },
  },
  methods: {
    followUser() {
      this.followers++;
    },
    // should favorite it on click, then toggle to not favorite it on next click
    toggleFavorite(id) {
      console.log(`favorited twoot #${id}`);
    },
    createNewTwoot() {
      if (this.newTwootContent && this.selectedTwootType !== "draft") {
        this.user.twoots.unshift({
          id: this.user.twoots.length + 1,
          content: this.newTwootContent,
        });
        this.newTwootContent = "";
      }
    },
  },
  mounted() {
    this.followUser();
  },
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
    margin-bottom: 20px;
  }
}

.user-profile_twoots-wrapper {
  display: grid;
  grid-gap: 10px;
}

.user-profile_create-twoot {
  border-top: 1px solid #dfe3e8;
  display: flex;
  flex-direction: column;
  padding-top: 20px;

  &.--exceeded {
    color: red;

    button {
      background-color: red;
      border: none;
      color: white;
    }
  }
}
</style>
