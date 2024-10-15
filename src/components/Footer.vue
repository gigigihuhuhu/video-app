<template>
    <footer class="footer">
      <div>
        © 2024, Kyungsu Park, All Rights Reserved.
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'FooterVue',
  };
  </script>
  
  <style scoped>
  .footer {
    background-color: var(--lightgray-background-color);
    padding: 30px 0;
    text-align: center;
    color: var(--gray-font-color);
    border-top: 1px solid var(--lightgray-color);
  }
  </style>