<!--
 * @Author: Lee
 * @Date: 2022-01-13 14:17:41
 * @LastEditors: Lee
 * @LastEditTime: 2022-01-13 14:20:27
-->
<template>
  <img alt="Vue logo" src="./assets/logo.png" />
</template>

<script>
export default {
  name: 'App',
  mounted() {
    const a = 10;
    const b = 20;
    console.log(a);
    const c = 30;
    console.log(b);
    const sum = a + b;
    // signle comment...
    // @lg-noremove
    console.log('sum：', sum);
    a + b + c;
    console.log('Hello, vue.js!');
    console.log("I'm studing!"); // @lg-noremove
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
