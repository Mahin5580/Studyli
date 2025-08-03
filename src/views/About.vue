<template>
  <div class="about">
    <div class="hero is-info">
      <div class="hero-body has-text-centered">
        <h1 class="title">About</h1>
      </div>
    </div>

    <section class="section">
      StudyLi is a smart learning platform that offers structured courses, lessons, and quizzes to help students learn effectively and track their progress.
    </section>
  </div>
</template>

<script>
export default {
  mounted() {
    document.title = 'About | StudyLi'
  }
}
</script>