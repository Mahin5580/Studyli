<template>
  <div class="about">
     <div class="hero is-info ">
    <div class="hero-body has-text-centered">
     
        <h1 class="title">My Account</h1>
      </div>
    </div>
    <section class="section">
        <button @click="logout()" class="button is-danger">Log out</button>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  methods: {
    async logout() {
      console.log('Logging out');
      await axios.post('token/logout/')
        .then(response => {
          console.log('Logout successful:', response.data);
        })
       
      axios.defaults.headers.common['Authorization'] = '';

            localStorage.removeItem('token');
        this.$store.commit('removeToken');
        this.$router.push('/');
    }
  }
}

</script>
