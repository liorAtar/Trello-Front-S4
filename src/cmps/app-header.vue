<template>
  <header>
    <nav>
      <router-link to="/">
        <span role="img" aria-label="logo">🙏</span>
      </router-link>
      <router-link to="/car">Cars</router-link>
      <router-link to="/review">Reviews</router-link>
      <router-link to="/chat">Chat</router-link>
      <router-link to="/login">Login / Signup</router-link>
      <router-link to="/drag&drop">drag and drop</router-link>
      <router-link to="/drag&drop2">drag and drop2</router-link>
    </nav>
    <section class="loggedin-user" v-if="loggedInUser">
      <router-link :to="`/user/${loggedInUser._id}`">
        {{ loggedInUser.fullname }}
      </router-link>
      <span>{{ loggedInUser.score.toLocaleString() }}</span>
    </section>
  </header>
</template>
<script>
export default {
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
  }
}
</script>