<template>
  <div>
    <MarkdownContent class="title" content=":tipping_hand_person: 안녕하세요!" />
    <div class="info-container">
      <IconInfo label="이름" value="박경수" icon="smile" iconType="emoji"></IconInfo>
      <IconInfo label="생년월일" value="1990.08.12" icon="birthday" iconType="emoji"></IconInfo>
      <IconInfo label="위치" value="서울 서초구" icon="round_pushpin" iconType="emoji"></IconInfo>
      <IconInfo label="연락처" value="010-9042-5605" icon="telephone_receiver" iconType="emoji"></IconInfo>
      <IconInfo label="이메일" value="kyungsu77777@gmail.com" icon="envelope" iconType="emoji"></IconInfo>
      <IconInfo label="학력" value="홍익대학교(컴퓨터공학과)" icon="mortar_board" iconType="emoji"></IconInfo>
    </div>
  </div>
</template>
  
<script>
import IconInfo from "@/components/IconInfo.vue";
import MarkdownContent from "@/components/MarkdownContent.vue";

export default {
  name: 'AboutSection',
  components: { IconInfo, MarkdownContent },
};
</script>
  
<style scoped>
.info-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  row-gap: 3rem;
  column-gap: 6rem;
  font-size: 1.1rem;
}
</style>
  