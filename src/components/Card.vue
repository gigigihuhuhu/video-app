<template>
    <div class="card-wrapper" :style="cardWrapperStyle" :class="hoverClass" @click="gotoPath()">
        <slot name="top"></slot>
        <slot name="left"></slot>
        <h1 class="title">{{ title }}</h1>
        <h5 class="title-detail" v-if="titleDetail">{{ titleDetail }}</h5>
        <hr v-if="description || details" />
        <h2 v-if="description" class="description">{{ description }}</h2>
        <ul v-if="details">
            <li v-for="(data, index) of details" :key="index">{{ data }}</li>
        </ul>
        <div class="stacks" v-if="stacks">
            <IconInfo v-for="(stack, index) in stacks" :key="index" :value="stack.name" :icon="stack.icon"
                border-type="line" font-color="var(--gray-font-color)" />
        </div>
        <img v-if="path" src="@/assets/arrow.svg" class="arrow">
        <slot name="right"></slot>
        <slot name="bottom"></slot>
    </div>
</template>

<script>
import IconInfo from "@/components/IconInfo.vue";

export default {
    name: 'CardVue',
    components: {
        IconInfo,
        // MarkdownContent
    },

    props: {
        title: {
            type: String,
            default: 'Title of this card'
        },
        titleDetail: {
            type: String,
        },
        description: {
            type: String,
        },
        details: {
            type: Array,
            // ['First detail','Second detail']
        },
        stacks: { // Temporary, TODO: define Stack class and receive Stack instance to initiate stacks
            type: Array, // [{ name: 'JavaScript', icon: require('@/assets/javascript.svg'), iconType: 'file' }]
        },
        decorationType: {
            type: String,
            default: 'clear'
        },
        path: {
            type: String,
            default: null
        },
    },

    computed: {
        cardWrapperStyle() {
            let style = new Object();
            switch (this.decorationType) {
                case 'shadow':
                    style['boxShadow'] = 'inset 5px 0px 0px var(--blue-color)';
                    break;
                case 'clear':
                    break;
            }
            return style;
        },
        hoverClass() {
            return this.path ? 'card-hover' : '';
        }
    },

    methods: {
        gotoPath() {
            if (this.path != null) {
                this.$function.goto(this.path);
            }
        }
    }
}
</script>

<style scoped>
hr {
    border: none;
    border-top: 1px solid var(--lightgray-color);
    margin: 0.5rem 0;
}

.description {
    font-size: 1.1rem;
    font-weight: 600;
}

.title {
    font-size: 1.15rem;
    font-weight: 500;
}

.title-detail {
    font-size: 0.8rem;
    font-weight: 300;
    color: var(--gray-font-color);
}

.card-wrapper {
    padding: 2rem;
    border: 1px solid var(--lightgray-color);
    border-radius: 16px;
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.card-hover {
    position: relative;
    transition: transform 0.3s ease;
}

.card-hover:hover {
    transform: scale(1.02);
    cursor: pointer;
}

.card-hover:hover .arrow {
    opacity: 1;
}

.arrow {
    position: absolute;
    right: 0.3rem;
    bottom: 0.8rem;
    width: 2rem;
    opacity: 0.1;
    transition: opacity 0.3s ease;
}

.stacks {
    padding: 0.7rem;
    background-color: var(--lightgray-background-color);
    border-radius: 16px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    font-size: 0.8rem;
    gap: 0.5rem;
}

ul {
    padding-top: 0.3rem;
    padding-left: 1.3rem;
    list-style: disc;
}

li {
    padding-bottom: 0.5rem;
}
</style>