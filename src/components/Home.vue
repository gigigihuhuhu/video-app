<template>
  <div class="home-container">
    <h1 class="title">안녕 친구들?</h1>
    <form class="form-container">
      <input type="text" id="nickname" :placeholder="nickname" v-model="clientId" required class="input" @keyup.enter="goToVideoCall" autofocus/>
      <div class="button-container">
        <button type="button" @click="goToVideoCall" class="button">방송 시작</button>
        <button type="button" @click="goToSneakIn" class="button sneak-in">몰래 구경하기</button>
      </div>
    </form>
  </div>
</template>
  
<script>
export default {
  name: 'HomeVue',
  data() {
    return {
      nickname: '',
      clientId: ''
    };
  },
  mounted(){
    this.generateNickname()
  },
  methods: {
    goToVideoCall() {
      if(this.clientId !== ''){
        console.log("this.clientId",this.clientId)
        this.$router.push({ name: 'VideoCall', params: { clientId: this.clientId, isSneaker: false } });
      }
      else{
        this.$router.push({ name: 'VideoCall', params: { clientId: this.nickname, isSneaker: false } });
      }
      
    },

    goToSneakIn() {
      this.$router.push({ name: 'VideoCall', params: { clientId: 'sneaker', isSneaker: true } });
    },

    generateNickname() {
      const randomAdjectives = [
        '멋진', '용감한', '행복한', '빠른', '귀여운', '지혜로운', '기쁜', '사려 깊은', '친절한', '상냥한',
        '강한', '단단한', '든든한', '활발한', '재미있는', '용감한', '자유로운', '성실한', '착한', '신중한',
        '빛나는', '지적인', '다정한', '충성스러운', '열정적인', '차분한', '열심히 하는', '부지런한', '튼튼한', '깨끗한',
        '깔끔한', '유쾌한', '섬세한', '기분 좋은', '행운의', '매력적인', '화려한', '화끈한', '흥미로운', '근면한',
        '지적인', '호기심 많은', '깨닫는', '풍부한', '기운찬', '평화로운', '자상한', '열렬한', '독창적인', '행복한'
      ];

      const randomAnimals = [
        '호랑이', '사자', '토끼', '다람쥐', '곰', '고양이', '강아지', '늑대', '여우', '표범',
        '팬더', '기린', '코끼리', '코뿔소', '물개', '거북이', '독수리', '참새', '비둘기', '부엉이',
        '캥거루', '하이에나', '수달', '청설모', '고래', '돌고래', '악어', '새우', '게', '펭귄',
        '치타', '침팬지', '올빼미', '매', '오리', '백조', '돼지', '양', '말', '소',
        '염소', '닭', '사슴', '족제비', '너구리', '라쿤', '까마귀', '오소리', '비버', '두더지'
      ];

      const adjective = randomAdjectives[Math.floor(Math.random() * randomAdjectives.length)];
      const animal = randomAnimals[Math.floor(Math.random() * randomAnimals.length)];

      this.nickname = `${adjective} ${animal}`;
    },
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
  border: 1px solid rgba(0, 0, 0, 0.1);
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

.button-container {
  display: flex;
  gap: 10px;
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


.sneak-in {
  padding: 0.7rem 2rem;
  font-size: 1rem;
  color: rgb(168, 168, 168);
  background-color: #efefef;
}


.sneak-in:hover {
  color: rgb(106, 106, 106);
  background-color: #d7d7d7;
}
</style>
