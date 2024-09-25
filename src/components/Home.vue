<template>
  <div class="home-container">
    <IntroMessage />
    <AboutSection />
    <ProjectSection />
  </div>
</template>
  
<script>
import IntroMessage from './IntroMessage.vue';
import AboutSection from './AboutSection.vue';
import ProjectSection from './ProjectSection.vue';

export default {
  name: 'HomeVue',
  components: {
    IntroMessage,
    AboutSection,
    ProjectSection,
  },
};
</script>
  
<style scoped>
.home-container {
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 4rem;
}
</style>
