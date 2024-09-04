<template>
  <div class="home-container">
    <h1 class="title">Welcome to Kyungsu's Room</h1>
    <form @submit.prevent="goToVideoCall" class="form-container">
      <label for="nickname" class="label">Enter your nickname:</label>
      <input type="text" id="nickname" v-model="nickname" required class="input" />
      <button type="submit" class="button">Go to Video Call</button>
    </form>
  </div>
</template>
  
<script>
export default {
  name: 'HomeVue',
  data() {
    return {
      nickname: ''
    };
  },
  methods: {
    goToVideoCall() {
      this.$router.push({ name: 'VideoCall', params: { nickname: this.nickname } });
    }
  }
};
</script>
  
<style scoped>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  background-color: #f0f2f5;
  color: #333;
  font-family: 'Roboto', sans-serif;
}

.title {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  font-weight: bold;
  margin-top: 50px;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.label {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #555;
}

.input {
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 300px;
  box-sizing: border-box;
}

.input:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.button {
  padding: 0.7rem 2rem;
  font-size: 1rem;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #0056b3;
}
</style>
