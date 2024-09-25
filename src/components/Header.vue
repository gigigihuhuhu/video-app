<!-- src/components/Header.vue -->
<template>
    <header>
        <nav class="nav-bar">
            <ul class="nav-links">
                <li>
                    <div>
                        <router-link to="/" exact><img class="logo" src="@/assets/logo.png" alt="Logo"></router-link>
                    </div>
                </li>
                <li>
                    <DropdownMenu title="데모 프로젝트" :items="demoProjects" />
                </li>
                <li>
                    <button class="button transparent contact">
                        <router-link to="/contact">연락처</router-link>
                    </button>
                </li>
            </ul>
            <div class="login-container">
                <button class="button blue">로그인</button>
                <button class="button white register">가입</button>
            </div>
        </nav>

    </header>
</template>
  
<script>
import DropdownMenu from './DropdownMenu.vue';
export default {
    name: 'HeaderVue',
    components: { DropdownMenu },
    data() {
        return {
            demoProjects: [
                {
                    categoryName: '통합',
                    submenus: [
                        { displayName: '화상채팅', path: 'video' },
                        { displayName: '캘린더', path: 'calendar' },
                        { displayName: '차트', path: 'chart' },
                    ]
                },
                {
                    categoryName: '기술 스택',
                    submenus: [
                        { displayName: '서브메뉴1', path: 'sub1' },
                        { displayName: '서브메뉴2', path: 'sub2' },
                        { displayName: '서브메뉴3', path: 'sub3' },
                        { displayName: '서브메뉴4', path: 'sub4' }
                    ]
                },
                {
                    categoryName: '기술 스택',
                    submenus: [
                        { displayName: '서브메뉴1', path: 'sub1' },
                        { displayName: '서브메뉴2', path: 'sub2' },
                        { displayName: '서브메뉴3', path: 'sub3' },
                        { displayName: '서브메뉴4', path: 'sub4' }
                    ]
                }
            ]
        }
    }
};
</script>
  
<style scoped>
header {
    margin: auto;
    height: 72px;
    border-bottom: 1px solid rgba(91, 94, 110, 0.1);
    box-shadow: 0px 1px 2px rgba(91, 94, 110, 0.1);
}

.nav-bar {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 30px;
    margin-right: 30px;
}

.nav-links {
    display: flex;
    align-items: center;
    gap: 15px;
}

.logo {
    height: 60px;
    padding-right: 1rem;
}

.login-container {
    display: flex;
    gap: 15px;
}

@media (max-width: 1024px) {
    .register {
        display: none;
    }
}

@media (max-width: 650px) {
    .contact {
        display: none;
    }
}

@media (max-width: 550px) {
    .projects {
        display: none;
    }
}
</style>
  