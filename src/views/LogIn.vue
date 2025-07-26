<template>
    <div class="login">
        <div class="hero is-info ">
            <div class="hero-body has-text-centered">

                <h1 class="title">Log in</h1>
                <h2 class="subtitle">An online place for learning what you really want</h2>
            </div>
        </div>
        <section class="section">
            <div class="container">
                <div class="columns">
                    <div class="column is-4 is-offset-4">
                        <form v-on:submit.prevent="submitForm">

                            <div class="field">
                                <label class="label">Email</label>
                                <div class="control">
                                    <input v-model="username" class="input" type="email" placeholder="Enter your email">
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Password</label>
                                <div class="control">
                                    <input class="input" type="password" placeholder="Enter your password"
                                        v-model="password">
                                </div>
                            </div>
                            <div class="notification is-danger" v-if="errors.length">
                                <p v-for="error in errors" v-bind:key="error">
                                    {{ error }}
                                </p>
                            </div>

                            <div class="field is-grouped is-grouped-centered">
                                <div class="control">
                                    <button class="button is-info">Log in</button>
                                </div>
                            </div>
                        </form>

                        <hr>

                        Don't have an account - <router-link to="/sign-up" class="has-text-info">Signup</router-link> .

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
            username: '',
            password: '',
            errors: []
        }
    },
    mounted(){
        document.title = 'Log In | Studyli';
    },

    methods: {
        submitForm() {


            console.log('Form submitted');

            axios.defaults.headers.common['Authorization'] = '';

            localStorage.removeItem('token');

            this.errors = [];

            if (this.username === '') {
                this.errors.push('Username is required!');

            }
            if (this.password === '') {
                this.errors.push('Password is required!');

            }

            if (!this.errors.length) {
                const formData = {
                    username: this.username,
                    password: this.password
                };
                axios.post('/api/v1/token/login/', formData)
                    .then(response => {
                        const token = response.data.auth_token;

                        this.$store.commit('setToken', token);

                         axios.defaults.headers.common['Authorization'] = `Token ${token}`;

                        localStorage.setItem('token', token);
                        
                        this.$router.push('/dashboard/my-account');
                    })
                    .catch(error => {
                        if (error.response) {
                            for (const property in error.response.data) {
                                this.errors.push(`${property}: ${error.response.data[property]}`);
                            }
                        } else if (error.message) {
                            this.errors.push(`Error: ${error.message}`);
                            console.error(JSON.stringify(error));
                        }

                    });
            }
        }
    }
}
</script>
