<template>
  <div class="project-wrapper">
    <div class="project-container scroll-invisible" ref="projectContainer">
      <div v-for="(project, index) in items" :key="index" class="project-item-wrapper">
        <div class="project-item" :style="{ backgroundColor: color[index % color.length] }" @click="$function.goto(project.path)">
          <h5 class="project-title">{{ project.title }}</h5>
          <img :src="project.image">
        </div>
      </div>
    </div>
    <div class="arrow-in-circle button-left" @click="scrollToLeft" v-show="showLeftButton"></div>
    <div class="arrow-in-circle button-right" @click="scrollToRight" v-show="showRightButton"></div>
  </div>
</template>
  
<script>
export default {
  name: 'CarouselVue',
  props: {
    items: {
      type: Array,
      default: () => [
        {
          title: 'Project One',
          image: require('@/assets/logo.png'),
          path: 'proj1',
        },
        {
          title: 'Project Two',
          image: require('@/assets/logo.png'),
          path: 'proj2',
        },
        {
          title: 'Project Three',
          image: require('@/assets/logo.png'),
          path: 'proj3',
        },
      ],
    }
  },
  data() {
    return {
      color: ['#F8BBD0', '#FFECB3', '#C8E6C9', '#BBDEFB', '#D1C4E9', '#F48FB1', '#FFF9C4', '#B3E5FC', '#CE93D8', '#FFAB91'],
      showLeftButton: true,
      showRightButton: true,
      scrollLeft: 0,
      scrollLeftMax: 0,
      scrollUnit: 0,
      desiredScrollCount: 2,
    };
  },

  watch: {
    scrollLeft(val) {
      this.$refs.projectContainer.scrollLeft = val;
    }
  },

  mounted() {
    this.scrollLeftMax = this.$refs.projectContainer.scrollWidth - this.$refs.projectContainer.offsetWidth
    this.$refs.projectContainer.scrollLeft = this.scrollLeft = this.scrollLeftMax / 2;
    this.scrollUnit = this.scrollLeftMax / this.desiredScrollCount;

    this.checkScrollLocation();
  },

  methods: {
    scrollToLeft() {
      this.scrollLeft -= this.scrollUnit;
      this.checkScrollLocation();
    },

    scrollToRight() {
      this.scrollLeft += this.scrollUnit;
      this.checkScrollLocation();
    },

    checkScrollLocation() {
      setTimeout(() => {
        if (this.scrollLeft <= 0) {
          this.scrollLeft = 0;
          this.showLeftButton = false;
        }
        else {
          this.showLeftButton = true;
        }

        if (this.scrollLeft + this.$refs.projectContainer.offsetWidth >= this.$refs.projectContainer.scrollWidth) {
          this.scrollLeft = this.$refs.projectContainer.scrollWidth - this.$refs.projectContainer.offsetWidth;
          this.showRightButton = false;
        }
        else {
          this.showRightButton = true;
        }
      }, 300)
    }
  },
};
</script>

<style scoped>
.project-wrapper {
  position: relative;
}

.button-left {
  position: absolute;
  top: 50%;
  left: 0%;
  transform: translateY(-50%) translateX(50%) rotate(180deg);
}

.button-right {
  position: absolute;
  top: 50%;
  left: 100%;
  transform: translateY(-50%) translateX(-150%);
}

.project-container {
  margin-top: -0.7rem;
  max-width: 98rem;
  display: flex;
  flex-direction: row;
}

.project-item-wrapper {
  padding: 0.7rem;
  /* 너비가 줄어들지 않도록 설정 */
  flex-shrink: 0;
}

.project-item {
  width: 12rem;
  height: 16rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: transform 0.3s ease;
  overflow: hidden;
  cursor: pointer;
}

.project-item:hover {
  background-color: var(--white-hover-color);
  transform: scale(1.1);
}

.project-title {
  margin-top: 1.3rem;
  margin-bottom: 1.3rem;
  font-weight: 500;
}
</style>
  