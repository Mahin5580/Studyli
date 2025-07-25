<template>
    <div class="courses">
        <div class="hero is-info ">
            <div class="hero-body has-text-centered">

                <h1 class="title">Courses</h1>
            </div>
        </div>
        <section class="section">
            <div class="container">
                <div class="columns">
                    <div class="column is-2">
                        <aside class="menu">
                            <p class="menu-label">
                                Categories
                            </p>
                            <ul class="menu-list">
                                <li><a class="is-active">All Courses</a></li>
                                <li><a>programming</a></li>
                                <li><a>Design</a></li>
                                <li><a>UI/UX</a></li>

                                </ul>
                        </aside>
                    </div>
                    <div class="column is-10">
                       
                            <div class="columns is-multiline">
                                <div
                                
                                class="column is-4"
                                v-for="course in courses"
                                v-blind:key="course.id"
                                >
                                    <div class="card">
                                        <div class="card-image">
                                          <figure class="image is-4by3">
                                            <img src="http://bulma.io/images/plateform/1280x960.png" alt="">
                                          </figure>
                                        </div>
                                        <div class="card-content">
                                            <div class="media">
                                                <div class="media-content">
                                                    <p class="is-size-5">{{course.title}}</p>
                                                   
                                                </div>
                                            </div>
                                            <div class="content">
                                                <p>
                                                    {{courses.short_description}}
                                                </p>
                                                <a href="#">More</a>
                                                
                                            </div>

                                        </div>
                                    </div>
                                </div>
                               
                               
                                
                          <div class="column is-12">
                                <nav class="pagination" >
                                    <a class="pagination-previous" href="">Previous</a>
                                    <a class="pagination-next" href="">Next</a>
                                    <ul class="pagination-list">
                                        <li><a class="pagination-link is-current" >1</a></li>
                                        <li><a class="pagination-link" >2</a></li>
                                        <li><a class="pagination-link" >3</a></li>
                                        </ul>
                                </nav>
                          </div>  
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Courses',
    data() {
        return {
            courses: []
        }
    },
    mounted() {
       console.log("Courses component mounted");
       axios
            .get('/api/v1/courses/')
            .then(response => {
                console.log("Courses fetched successfully:", response.data);
                this.courses = response.data;
            })
    },
   
}
</script>