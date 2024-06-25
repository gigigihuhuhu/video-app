<template>
    <div>
      <h1>Home Page</h1>
      <router-link to="/video-call">Go to Video Call</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomeVue',
  };
  </script>
  
  <style scoped>
  h1 {
    font-size: 2em;
    margin-bottom: 20px;
  }
  </style>