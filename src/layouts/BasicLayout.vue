<template>
  <a-layout id="components-layout-demo-top" class="BasicLayout_container">
    <a-layout-header class="BasicLayout_header">
      <transition name="menu_fade" mode="out-in">
        <div v-if="!isCollapsed" key="0">
          <a-menu
            theme="light"
            mode="horizontal"
            :selectedKeys="[activeRule]"
            class="BasicLayout_header-menu"
            @select="handleSelect"
          >
            <a-menu-item v-for="app in apps" :key="app.activeRule">
              <router-link :to="app.activeRule">
                <span>{{ app.$meta.title }}</span>
              </router-link>
            </a-menu-item>
          </a-menu>
        </div>

        <a-dropdown v-else key="1">
          <a class="ant-dropdown-link" @click="e => e.preventDefault()">
            {{ currentTitle }} <a-icon type="down" />
          </a>
          <a-menu
            slot="overlay"
            selectable
            @select="handleSelect"
            :selectedKeys="[activeRule]"
          >
            <a-menu-item v-for="app in apps" :key="app.activeRule">
              <router-link :to="app.activeRule">
                <span>{{ app.$meta.title }}</span>
              </router-link>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </transition>
    </a-layout-header>

    <a-layout-content class="BasicLayout_content">
      {{ screenWidth }}
      <div id="subApp">
        Micro App
        <router-view />
      </div>
    </a-layout-content>

    <a-layout-footer class="BasicLayout_footer">
      <!--      Created By Channing-->
      {{ screenWidth }}{{ isCollapsed }}
    </a-layout-footer>
  </a-layout>
</template>
<script>
import apps from "@/shared/microApps";
import { throttle } from "@/shared/util";

export default {
  data() {
    return {
      apps,
      activeRule: void 0,
      ruleMap: new Map(),
      screenWidth: document.body.clientWidth,
      isCollapsed: false
    };
  },
  computed: {
    currentTitle() {
      return this.activeRule
        ? this.ruleMap.get(this.activeRule)
        : apps[0].$meta.title;
    }
  },
  methods: {
    handleSelect(e) {
      this.activeRule = e.key;
    }
  },
  created() {
    this.apps.forEach(app => {
      this.ruleMap.set(app.activeRule, app.$meta.title);
    });
    this.activeRule = "/" + this.$route.path.split("/")[1];
  },
  watch: {
    screenWidth(newVal) {
      this.isCollapsed = newVal < 800;
    }
  },
  mounted() {
    this.isCollapsed = this.screenWidth < 800;
    // window.onresize = debounce(callback, 500, true);
    // window.onresize = debounce(callback, 500, false);
    // window.onresize = throttle(callback, 500, true);
    window.onresize = throttle(
      () => {
        this.screenWidth = document.body.clientWidth;
      },
      800,
      false
    );
  }
};
</script>
<style>
.menu_fade-enter,
.menu_fade-leave-to {
  opacity: 0;
  //transform: translate3d(0px, -0px, 100px);
  transform: perspective(500px) translateZ(100px);
}
.menu_fade-enter-active,
.menu_fade-leave-active {
  position: absolute;
  transition: all 0.5s ease;
}
</style>
<style lang="scss" scoped>
.BasicLayout_container {
  //background: #42b983;
  height: 100vh;

  .BasicLayout_header {
    background: #fff;
    display: flex;
    justify-content: center;
    .BasicLayout_header-menu {
      line-height: 64px;
    }
  }

  .BasicLayout_content {
    padding: 16px;
    #subApp {
      overflow: auto;
      height: 100%;
      background: #fff;
      padding: 24px;
    }
  }

  .BasicLayout_footer {
    text-align: center;
  }
}
</style>
