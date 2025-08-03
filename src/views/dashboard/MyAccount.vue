<template>
  <div class="about">
     <div class="hero is-info ">
    <div class="hero-body has-text-centered">
     
        <h1 class="title">My Account</h1>
      </div>
    </div>
    <section class="section">
      <div class="columns is-multiline">
        <div class="column is-12">
          <h2 class="subtitle is-size-3">your active courses</h2>
        </div>

        <div 
        class="column is-4"
        v-for="course in courses"
         v-bind:key="course.id"
         >
         <CourseItem :course="course"/>
          
        </div>
      </div>
        <button @click="logout()" class="button is-danger">Log out</button>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
import Courses from '../Courses.vue';
  import CourseItem from '@/components/CourseItem.vue';

export default {
  data(){
    return {
      Courses:[]
    }
  },
  components:{
    CourseItem
  }, 
  mounted(){
    axios
    .get('activates/get_activate_courses/')
    .then(response => {
      console.log(response.data)
      this.courses = response.data
  })
},

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
