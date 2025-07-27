<template>
    <div class="courses">
        <div class="hero is-info ">
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
                            <li v-for="lesson in lessons" v-bind:key="lesson.id">
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
                                <article class="media box" v-for="comment in comments" v-bind:key="comment.id">
                                    <div class="media-content">
                                        <div class="content">
                                            <p>
                                                <strong>{{ comment.name }}</strong>
                                                {{ comment.created_at }}
                                                <br>
                                                {{ comment.content }}
                                            </p>
                                        </div>
                                    </div>
                                </article>
                                <form v-on:submit.prevent="submitComment()">
                                    <div class="field">
                                        <label class="label">Name</label>
                                        <div class="control">
                                            <input v-model="comment.name" class="input" type="text"
                                                placeholder="Your name">
                                        </div>
                                    </div>
                                    <div class="field">
                                        <label class="label">Content</label>
                                        <div class="control">
                                            <textarea v-model="comment.content" class="textarea"
                                                placeholder="Your comment">
                                   </textarea>
                                        </div>
                                    </div>
                                    <div class="notification is-danger" v-for="error in errors" v-bind:key="error">

                                        {{ error }}
                                    </div>
                                    <div class="field">
                                        <div class="control">
                                            <button class="button is-link" type="submit">Submit</button>
                                        </div>
                                    </div>
                                </form>

                            </template>
                            <template v-else>
                                <p>{{ course.long_description }}</p>
                            </template>
                        </template>
                        <template v-else>
                            <h2>Restricted Access</h2>
                            <p>You need to have account to continue</p>
                        </template>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            course: {},
            lessons: [],
            comments: [],
            activeLesson: null,
            errors: [],
            comment: {
                name: '',
                content: '',

            }
        }
    },
    async mounted() {
        console.log("Courses component mounted");

        const slug = this.$route.params.slug;
        await axios
            .get(`/api/v1/courses/${slug}/`)
            .then(response => {
                console.log("Courses fetched successfully:", response.data)
                console.log("Course object:", response.data.course);
                this.course = response.data.course;
                this.lessons = response.data.lessons

            })

        document.title = this.course.title + '| Studyli';

    },
    methods: {
        submitComment() {
            console.log("Submit comment")
            
             axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('token')}`;

            this.errors = [];
            if (this.comment.name === '') {
                this.errors.push("Name is required");
            }
            if (this.comment.content === '') {
                this.errors.push("Content is required");
            }

            if (!this.errors.length) {


                axios
                    .post(`/api/v1/courses/${this.course.slug}/${this.activeLesson.slug}/`, this.comment)
                    .then(response => {
                        this.comment.name = '';
                        this.comment.content = '';
                        this.comments.push(response.data);

                    })
                    .catch(error => {
                        console.error("Error submitting comment:", error);
                    });
            }
        },
        setActiveLesson(lesson) {
            this.activeLesson = lesson;
            this.getComments();
        },
        getComments() {
            axios
                .get(`/api/v1/courses/${this.course.slug}/${this.activeLesson.slug}/get-comments/`)

                .then(response => {
                    console.log(response.data);
                    this.comments = response.data;
                })

        }
    }

}
</script>