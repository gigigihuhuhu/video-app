<template>
    <section id="projects" class="projects">
      <h2>Projects</h2>
      <div class="project-list">
        <div v-for="project in projects" :key="project.id" class="project-item">
          <img :src="project.image" :alt="project.title" />
          <h3>{{ project.title }}</h3>
          <p>{{ project.description }}</p>
          <a :href="project.link" target="_blank" class="project-link">View Project</a>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'ProjectSection',
    data() {
      return {
        projects: [
          {
            id: 1,
            title: 'Project One',
            description: 'This is a description for project one.',
            image: '/path/to/project1.jpg',
            link: 'https://project1.com',
          },
          {
            id: 2,
            title: 'Project Two',
            description: 'This is a description for project two.',
            image: '/path/to/project2.jpg',
            link: 'https://project2.com',
          },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .projects {
    padding: 4rem 2rem;
  }
  
  .project-list {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
  }
  
  .project-item {
    width: 45%;
    background-color: #fff;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  
  .project-link {
    display: inline-block;
    margin-top: 1rem;
    color: #42b883;
    text-decoration: none;
    font-weight: bold;
  }
  </style>
  