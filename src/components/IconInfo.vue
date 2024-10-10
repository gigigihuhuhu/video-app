<template>
    <div class="info-item" :style="infoItemStyle">
        <div v-html="$function.renderMarkdownEmoji(icon)" :style="emojiStyle" v-if="iconType==='emoji'"></div>
        <img :style="iconStyle" :src="icon" v-if="iconType==='file'">
        <span class="text">
            <h1 v-if="label">{{ label }}</h1>
            <h1 v-if="value">{{ value }}</h1>
        </span>
    </div>
</template>

<script>
export default {
    name: 'IconInfo',
    props: {
        label: {
            type: String,
        },
        value: {
            type: String,
        },
        icon: {
            type: String,
            default: () => require('@/assets/not-found.png'),
        },
        color: {
            type: String,
            default: () => 'white',
        },
        type: {
            type: String,
            default: () => 'item',
        },
        iconType: {
            type: String,
            default: () => 'file',
        }
    },
    computed: {
        infoItemStyle() {
            if(this.type === 'card'){
                return {
                    padding: '0.2em',
                    paddingRight: '0.4em',
                    borderRadius: '8px',
                    boxShadow: '3px 3px 3px rgba(91, 94, 110, 0.1), -3px -3px 3px rgba(91, 94, 110, 0.1)',
                }
            } else {
                return {}
            }
        },
        iconStyle() {
            let style = new Object();
            style['width'] ='1.5em';
            style['height'] ='1.5em';
            style['paddingRight'] ='0.5em';
            if (this.label != null && this.value != null) {
                style['width'] ='2.5em';
                style['height'] ='2.5em';
                style['paddingRight'] ='1em';
            }

            return style;
        },
        emojiStyle() {
            let style = new Object();
            style['display'] = 'inline-flex';
            style['align-items'] = 'center';
            if (this.label != null && this.value != null) {
                style['font-size'] ='2em';
                style['paddingRight'] ='0.8em';
            }else{
                style['font-size'] ='1.15em';
                style['paddingRight'] ='0.4em';
            }
            return style;
        },
}
}
</script>

<style scoped>
.info-item {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.info-item .text {
    text-align: left;
}

h1 {
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
}
</style>