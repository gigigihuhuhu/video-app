<template>
    <div class="info-item" :style="infoItemStyle">
        <div v-html="$function.renderMarkdownEmoji(icon)" :style="emojiStyle" v-if="iconType==='emoji'"></div>
        <img :style="iconStyle" :src="icon" v-if="iconType==='file'">
        <span class="text" :style="textStyle">
            <h1 v-if="label" class="label">{{ label }}</h1>
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
        fontColor: {
            type: String,
            default: () => 'black',
        },
        borderType: {
            type: String,
            default: () => 'clean',
        },
        iconType: {
            type: String,
            default: () => 'file',
        }
    },
    computed: {
        infoItemStyle() {
            let style = new Object();
            switch(this.borderType){
                default:
                    return style;
                case 'clean':
                    return style;
                case 'shadow':
                    style['boxShadow'] ='2px 2px 3px var(--lightgray-color), -2px -2px 3px var(--lightgray-color)';
                    break;
                case 'line' :
                    style['border'] ='1px solid var(--lightgray-color)';
                    break;
            }
            style['padding'] ='0.2em';
            style['paddingRight'] ='0.5em';
            style['paddingLeft'] ='0.4em';
            style['borderRadius'] ='32px';
            
            return style;
        },
        iconStyle() {
            let style = new Object();
            if (this.label != null && this.value != null) {
                style['width'] ='2.5em';
                style['height'] ='2.5em';
                style['paddingRight'] ='1em';
            } else{
                style['width'] ='1.5em';
                style['height'] ='1.5em';
                style['paddingRight'] ='0.5em';
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
        textStyle() {
            let style = new Object();
            style['color'] = this.fontColor;
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

.label {
    font-weight: 500;
}
</style>