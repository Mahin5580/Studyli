<template>
    <div class="signup">
        <div class="hero is-info ">
            <div class="hero-body has-text-centered">

                <h1 class="title">Sign up</h1>
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
                                    <input v-model="password" class="input" type="password"
                                        placeholder="Enter your password">
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Confirm Password</label>
                                <div class="control">
                                    <input v-model="password2" class="input" type="password"
                                        placeholder="Confirm your password">
                                </div>
                            </div>
                            <div class="notification is-danger" v-if="errors.length">
                                <p v-for="error in errors" v-bind:key="error">
                                    {{ error }}
                                </p>
                            </div>
                            <div class="field is-grouped is-grouped-centered">
                                <div class="control">
                                    <button class="button is-info">Sign Up</button>
                                </div>
                            </div>
                        </form>

                        <hr>

                        Already have an account - <router-link to="/log-in" class="has-text-info">login</router-link> .

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
            password2: '',
            errors: []
        }
    },
    mounted(){
        document.title = 'Sign Up | Studyli';
    },
    methods: {
        submitForm() {


            console.log('Form submitted');
            this.errors = [];
            if (this.username === '') {
                this.errors.push('Username is required!');

            }
            if (this.password === '') {
                this.errors.push('Password is required!');

            }
            if (this.password !== this.password2) {
                this.errors.push('Password should match!');

            }
            if (!this.errors.length) {
                const formData = {
                    username: this.username,
                    password: this.password
                };
                axios.post('users/', formData)
                    .then(response => {
                        // console.log('User created:', response.data);
                        this.$router.push('/log-in');
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
