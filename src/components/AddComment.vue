<template>
     <form @submit.prevent="submitComment()">
            <div class="field">
                <label class="label">Name</label>
                <div class="control">
                <input v-model="comment.name" class="input" type="text" placeholder="Your name" />
                </div>
            </div>

            <div class="field">
                <label class="label">Content</label>
                <div class="control">
                <textarea v-model="comment.content" class="textarea" placeholder="Your comment"></textarea>
                </div>
            </div>

            <div
                class="notification is-danger"
                v-for="error in errors"
                :key="error"
            >
                {{ error }}
            </div>

            <div class="field">
                <div class="control">
                <button class="button is-link" type="submit">Submit</button>
                </div>
            </div>
            </form>

</template>

<script>
import axios from 'axios'
export default {
    props: [
        'course','activeLesson',

    ],
    data () {
        return {
            comment: {
                name: '',
                content: '',
            },
            errors: []
        }
    },
    methods: {
        submitComment() {
      console.log("Submit comment");

      this.errors = [];
      if (this.comment.name === '') {
        this.errors.push("Name is required");
      }
      if (this.comment.content === '') {
        this.errors.push("Content is required");
      }

      if (!this.errors.length) {
        axios
          .post(`courses/${this.$route.params.slug}/${this.activeLesson.slug}/`, this.comment)
          .then(response => {
            this.comment.name = '';
            this.comment.content = '';

            this.$emit('submitComment',response.data)
          })
          .catch(error => {
            console.error("Error submitting comment:", error);
          });
      }
    }
    }

}

</script>