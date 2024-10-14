<template>
  <div class="home-container" ref="container">
    <IntroMessageSection class="section" />
    <AboutSection class="section" />
    <SkillSection class="section" />
    <ProjectSection class="section" />
  </div>
</template>
  

<script>
// TODO 보유 기술
// 경력
// Projects
// 받은 교육
// 학력
// 언어
// 취미
import IntroMessageSection from './IntroMessageSection.vue';
import AboutSection from './AboutSection.vue';
import SkillSection from './SkillSection.vue';
import ProjectSection from './ProjectSection.vue';

export default {
  name: 'HomeVue',
  components: {
    IntroMessageSection,
    AboutSection,
    SkillSection,
    ProjectSection
  },

  data() {
    return {
      currSection: 0,
      sectionCnt: 4,
      isScrolling: false,
      scrollTime: 800
    }
  },

  mounted() {
    window.addEventListener("wheel", this.handleWheel, { passive: false });
    window.addEventListener("keydown", this.handleKeyDown);
  },

  unmounted() {
    window.removeEventListener("wheel", this.handleWheel, { passive: false });
    window.removeEventListener("keydown", this.handleKeyDown);
  },

  methods: {
    scrollToNextSection() {
      if(this.currSection < this.sectionCnt - 1){
        this.currSection++;
        this.scrollToSection(this.currSection);
      }
    },

    scrollToPrevSection() {
      if(this.currSection > 0){
        this.currSection--;
        this.scrollToSection(this.currSection);
      }
    },

    scrollToSection(sectionIdx) {
      const sectionElement = this.$refs.container.children[sectionIdx];
      sectionElement.scrollIntoView({ behavior: "smooth" });
    },

    handleKeyDown(event) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        this.scrollToNextSection();
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        this.scrollToPrevSection();
      }
    },

    handleWheel(event) {
      event.preventDefault();
      if(this.isScrolling) {
        console.log("return")
        return;
      }
      this.isScrolling = true;
      if (event.deltaY > 0) {
        console.log('next')
        this.scrollToNextSection();
      } else {
        this.scrollToPrevSection();
      }
      setTimeout(() => {
        this.isScrolling = false;
      }, this.scrollTime);
    },
  },
};
</script>
  
<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.section {
  padding-top: 8rem;
  padding-bottom: 4rem;
  /* height: 100vh; */
  max-width: 60rem;
}
</style>
