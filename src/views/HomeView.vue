<template>
  <div class="home">
  <div class="hero is-info is-medium">
    <div class="hero-body has-text-centered">
     
        <h1 class="title">Welcome to Studyli</h1>
        <h2 class="subtitle">An online place for learning what you really want</h2>
      </div>
    </div>
    <section class="section">
      <div class="container">
        <div class="columns is-multiline">
          <div class="column is-4">
            <div class="box has-text-centered">

              <span class="icon is-size-2 has-text-info">
                <i class="fas fa-clock"></i>
              </span>
              <h2 class="is-size-4 mt-4 mb-4">Study at your own pace</h2>
              <p>Access resources anytime, anywhere.</p>
            </div>
          </div>
           <div class="column is-4">
            <div class="box has-text-centered">

              <span class="icon is-size-2 has-text-info">
                <i class="fas fa-comments"></i>
              </span>
              <h2 class="is-size-4 mt-4 mb-4">Study with others</h2>
              <p>Access resources anytime, anywhere.</p>
            </div>
          </div>
           <div class="column is-4">
            <div class="box has-text-centered">

              <span class="icon is-size-2 has-text-info">
                <i class="fas fa-home"></i>
              </span>
              <h2 class="is-size-4 mt-4 mb-4">Study from your home</h2>
              <p>Access resources anytime, anywhere.</p>
            </div>
          </div>
          <div class="column is-12 has-text-centered">
            <a href="/sign-up" class="button is-info is-large mt-5" >
             
              <span>Click here to get started</span>
            </a>
          </div>
          <hr>
           <div
                                
              class="column is-3"
              v-for="course in courses"
              v-blind:key="course.id"
              >
                <CourseItem :course="course"/>
              </div>
        </div>
        
      </div>

    </section>
  </div>

</template>

<script>
import axios from 'axios';
import CourseItem from '@/components/CourseItem.vue';

export default {
  name: 'HomeView',
  data() {
        return {
            courses: []
        }
    },
    components: {
        CourseItem
    },
    mounted() {
       console.log("Courses component mounted");
       document.title = 'Home | Studyli';
       axios
            .get('courses/get_frontpage_courses/')
            .then(response => {
                console.log("Courses fetched successfully:", response.data);
                this.courses = response.data;
            })
    },
  
}
</script>
