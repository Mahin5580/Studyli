<template>
  <div class="courses">
    <div class="hero is-info">
      <div class="hero-body has-text-centered">
        <h1 class="title">{{ course.title }}</h1>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="columns content">
          <div class="column is-2">
            <h2>Table of contents</h2>
            <ul>
              <li v-for="lesson in lessons" :key="lesson.id">
                <a @click="setActiveLesson(lesson)">{{ lesson.title }}</a>
              </li>
            </ul>
          </div>

          <div class="column is-10">
            <template v-if="$store.state.user.isAuthenticated">
              <template v-if="activeLesson">
                <h2 class="is-size-4">{{ activeLesson.title }}</h2>
                {{ activeLesson.long_description }}
                <hr>

                <!-- QUIZ SECTION -->
                <template v-if="activeLesson.lesson_type === 'quiz'">
                  <Quiz
                      v-bind:quiz="quiz"
                  />
                  
                </template>

                <!-- ARTICLE SECTION -->
                <template v-if="activeLesson.lesson_type === 'article'">
                  <CourseComment
                      v-for="comment in comments"
                     :key="comment.id"
                     :comment="comment"
                  />

                    <AddComment
                        v-bind:course="course"
                        v-bind:activeLesson="activeLesson"
                        v-on:submitComment="submitComment"
                      />

                  <!-- Comment Form -->
                
                </template>
              </template>

              <template v-else>
                <p>{{ course.long_description }}</p>
              </template>
            </template>

            <template v-else>
              <h2>Restricted Access</h2>
              <p>You need to have an account to continue</p>
            </template>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

import CourseComment from '@/components/CourseComment'
import AddComment from '@/components/AddComment'
import Quiz from '@/components/Quiz'

export default {
  components: {
    CourseComment,
    AddComment,
    Quiz
  },
  data() {
    return {
      course: {},
      lessons: [],
      comments: [],
      activeLesson: null,
      errors: [],
      quiz: {},
      
      
    }
  },
  async mounted() {
    console.log("Courses component mounted");

    const slug = this.$route.params.slug;
    console.log(slug);
    await axios.get(`courses/${slug}/`)
      .then(response => {
        console.log("Courses fetched successfully:", response.data);
             console.log("Course slug received:", response.data.course.slug);
        this.course = response.data.course;
        this.lessons = response.data.lessons;
        document.title = this.course.title + ' | Studyli';
      })
  },
  methods: {
    submitComment(comment) {
      this.comments.push(comment)

    },
    setActiveLesson(lesson) {
      this.activeLesson = lesson;
      if (lesson.lesson_type === 'quiz') {
        this.getQuiz();
      } else {
        this.getComments();
      }
    },
    getQuiz() {
      axios
        .get(`courses/${this.course.slug}/${this.activeLesson.slug}/get-quiz/`)
        .then(response => {
          console.log(response.data);
          this.quiz = response.data;
        })
    },
    getComments() {
        console.log("Requesting comments from:", `courses/${this.course.slug}/${this.activeLesson.slug}/get-comments/`);
      axios
        .get(`courses/${this.course.slug}/${this.activeLesson.slug}/get-comments/`)
        .then(response => {
          console.log("Comments response:", response.data);
          console.log(response.data);
          this.comments = response.data;
        })
    },
    
    
  }
}
</script>
