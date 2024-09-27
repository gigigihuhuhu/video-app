<template>
  <div class="home-container">
    <IntroMessage />
    <AboutSection />
  </div>
</template>
  
<script>
import IntroMessage from './IntroMessage.vue';
import AboutSection from './AboutSection.vue';

export default {
  name: 'HomeVue',
  components: {
    IntroMessage,
    AboutSection,
  },
};
</script>
  
<style scoped>
.home-container {
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4rem;
}
</style>
