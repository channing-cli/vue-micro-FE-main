<template>
  <div id="main_app">
    <BasicLayout />
  </div>
</template>

<script>
import BasicLayout from "@/layouts/BasicLayout";
export default {
  name: "APP",
  components: {
    BasicLayout
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
    logs() {
      return this.$store.state.logs;
    }
  },
  created() {
    console.log(process.env);
  }
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
