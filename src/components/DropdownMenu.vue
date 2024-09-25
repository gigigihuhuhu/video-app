<template>
    <div class="dropdown" @mouseenter="toggleDropdown" @mouseleave="toggleDropdown">
        <button class="button transparent dropdown-button">
            <span>{{ title }}</span>
            <img class="arrow" src="@/assets/arrow.svg" width="20" height="auto">
        </button>
        <div :style="categoryStyle" class="dropdown-menu" v-if="isOpen">
            <ul :style="categoryListStyle" class="category-list">
                <li class="category" v-for="(item, index) in items" :key="index">{{ item.categoryName }}
                    <ul class="submenu-list">
                        <li class="submenu" v-for="(submenu, submenuIndex) in item.submenus" :key="submenuIndex">
                            {{ submenu.displayName }}
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>
  
<script>
//TODO : items.submenus.type 생성하여 type이 button 인 경우 클릭 시 route 가능하도록, dropdown 인 경우 또 다시 drop down 가능하도록 구현
export default {
    name: 'DropdownMenu',
    props: {
        title: {
            type: String,
            default: '메뉴'
        },
        items: {
            type: Array,
            default: () => [
                {
                    categoryName: '카테고리1',
                    submenus: [
                        { displayName: '서브메뉴1', path: 'sub1' },
                        { displayName: '서브메뉴2', path: 'sub2' },
                        { displayName: '서브메뉴3', path: 'sub3' }
                    ]
                },
                {
                    categoryName: '카테고리2',
                    submenus: [
                        { displayName: '서브메뉴1', path: 'sub1' },
                        { displayName: '서브메뉴2', path: 'sub2' },
                        { displayName: '서브메뉴3', path: 'sub3' }
                    ]
                }]
        }
    },

    computed: {
        categoryListStyle(){
            return {
                gridTemplateColumns: 'repeat('+this.items.length+', 1fr)',
            }
        },
        categoryStyle(){
            return {
                width: this.items.length * 150+'px',
            }
        }
    },

    data() {
        return {
            isOpen: false
        };
    },
    methods: {
        toggleDropdown() {
            this.isOpen = !this.isOpen;
        }
    }
};
</script>
  
<style scoped>
.dropdown {
    position: relative;
}

.dropdown-menu {
    width: 300px;
    position: absolute;
    top: 100%;
    background-color: white;
    border-radius: 5px;
    padding: 0.7rem;
    border-bottom: 1px solid rgba(91, 94, 110, 0.1);
    box-shadow:
        5px 5px 5px rgba(91, 94, 110, 0.1),
        -5px -5px 5px rgba(91, 94, 110, 0.1);
    z-index: 1;
}

.category-list {
    display: grid;
    gap: 20px;
}

.category {
    font-size: 0.9rem;
    font-weight: bold;
    text-align: left;
    padding: 7px
}

.submenu-list {
    margin-top: 7px;
}

.submenu {
    font-size: 0.8rem;
    font-weight: normal;
    text-align: left;
    display: block;
    padding: 7px;
    margin-left: -7px;
    border-radius: 5px;
}

.submenu:hover {
    background-color: var(--white-hover-color);
}

.arrow {
    transform: rotate(90deg);
}
</style>