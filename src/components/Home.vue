<template>
  <div class="home-container" ref="container">
    <IntroMessageSection class="section" />
    <AboutSection class="section" />
    <SkillSection class="section" />
    <ProjectSection class="section" />
    <CertificateSection class="section" />
    <LanguageSection class="section" />
    <EducationSection class="section" />
    <LinksSection class="section" />
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
import CertificateSection from './CertificateSection.vue';
import LanguageSection from './LanguageSection.vue';
import EducationSection from './EducationSection.vue';
import LinksSection from './LinksSection.vue';

export default {
  name: 'HomeVue',
  components: {
    IntroMessageSection,
    AboutSection,
    SkillSection,
    ProjectSection,
    CertificateSection,
    LanguageSection,
    EducationSection,
    LinksSection,
  },

  data() {
    return {
      sections: [
        { scrollType: 'section' },
        { scrollType: 'section' },
        { scrollType: 'section' },
        { scrollType: 'normal' },
        { scrollType: 'section' },
        { scrollType: 'section' },
        { scrollType: 'section' },
        { scrollType: 'normal' },
      ],
      isScrolling: false,
      scrollTime: 800
    }
  },

  // mounted() {
  //   window.addEventListener("wheel", this.handleWheel, { passive: false });
  //   window.addEventListener("keydown", this.handleKeyDown);
  //   this.initSectionYs();
  //   console.log(this.sections)
  // },

  // unmounted() {
  //   window.removeEventListener("wheel", this.handleWheel, { passive: false });
  //   window.removeEventListener("keydown", this.handleKeyDown);
  // },

  methods: {
    initSectionYs() {
      this.sections[0]['startY'] = 0;
      for (let i = 1; i < this.$refs.container.children.length; i++) {
        this.sections[i-1]['endY'] = this.sections[i]['startY'] = this.$refs.container.children[i].offsetTop;
      }
      const lastIdx = this.$refs.container.children.length-1;
      this.sections[lastIdx]['endY'] = this.$refs.container.children[lastIdx].offsetTop + this.$refs.container.children[lastIdx].offsetHeight;
    },

    getCurrScrollY() {
      return (window.scrollY || window.pageYOffset);
    },

    getActiveSection() {
      const scrollY = this.getCurrScrollY();
      let activeSection;
      this.sections.forEach((section, index) => {
        if (scrollY >= section.startY && scrollY < section.endY) {
          activeSection = index;
        }
      });
      return activeSection;
    },

    isScrollInTail(currSection) {
      const scrollY = this.getCurrScrollY();
      return this.sections[currSection].endY - window.innerHeight/2 < scrollY;
    },

    scrollToNextSection(currSection) {
      if (currSection < this.sections.length - 1) {
        const nextSection = currSection + 1;
        this.scrollToSectionTop(nextSection);
      }
    },

    scrollToPrevSection(currSection) {
      if (currSection > 0) {
        const prevSection = currSection - 1;
        switch (this.sections[prevSection].scrollType) {
          case 'normal':
            this.scrollToSectionBottom(prevSection);
            break;
          case 'section':
            this.scrollToSectionTop(prevSection);
            break;
        }
      }
    },

    scrollToSectionTop(sectionIdx) {
      if (this.isScrolling) {
        return;
      }
      this.isScrolling = true;
      window.scrollTo({
        top: this.sections[sectionIdx].startY,
        behavior: 'smooth'
      });

      setTimeout(() => {
        this.isScrolling = false;
      }, this.scrollTime);
    },

    scrollToSectionBottom(sectionIdx) {
      if (this.isScrolling) {
        return;
      }
      this.isScrolling = true;
      window.scrollTo({
        top: this.sections[sectionIdx].endY - window.innerHeight,
        behavior: 'smooth'
      });

      setTimeout(() => {
        this.isScrolling = false;
      }, this.scrollTime);
    },

    handleKeyDown(event) {
      const currSection = this.getActiveSection();
      
      switch (this.sections[currSection].scrollType) {
        case 'normal':
          if (event.deltaY > 0) {
            if(this.isScrollInTail(currSection)){
              event.preventDefault();
              this.scrollToNextSection(currSection);
            }
          }
          return;
        case 'section':
          if (event.key === "ArrowDown") {
            event.preventDefault();
            this.scrollToNextSection(currSection);
          } else if (event.key === "ArrowUp") {
            event.preventDefault();
            if(this.isScrollInTail(currSection)){
              this.scrollToSectionTop(currSection);
            }
            else{
              this.scrollToPrevSection(currSection);
            }
          }
      }
      
    },

    handleWheel(event) {
      const currSection = this.getActiveSection();
      console.log('currSection',currSection)
      switch (this.sections[currSection].scrollType) {
        case 'normal':
          if (event.deltaY > 0) {
            if(this.isScrollInTail(currSection)){
              event.preventDefault();
              this.scrollToNextSection(currSection);
            }
          }
          return;
        case 'section':
          event.preventDefault();
          if (event.deltaY > 0) {
            this.scrollToNextSection(currSection);
          } 
          else {
            if(this.isScrollInTail(currSection)){
              this.scrollToSectionTop(currSection);
            }
            else{
              this.scrollToPrevSection(currSection);
            }
          }
      }
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
  padding: 3rem 0;
  width: 80%;
  max-width: 88rem;
}

@media (max-width: 768px) {
  .section {
    width: 95%;
    align-items: center;
  }
}
</style>
