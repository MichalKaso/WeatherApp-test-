<template>
  <div id="app">
    <div class="app" :class="period">
      <WeatherApp :class="period"></WeatherApp>
    </div>
  </div>
</template>

<script>
import WeatherApp from './components/WeatherApp'

export default {
  name: 'App',

  components: {
    WeatherApp,
  },

  data() {
    return {
      date: new Date
    }
  },

  computed: {
    year() {
      return this.date.getFullYear();
    },

    period() {
      let hour = this.date.getHours();

      return (hour > 5 && hour < 18)? 'app--day': 'app--night';
    }
  }
}
</script>

<style>

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: rgba(255, 255, 255, 0.9);
}

a {
  text-decoration: none;
  color: inherit;
  transition: color .2s ease-in;
}


.app {
  height: 100vh;
  width: 100vw;

  display: flex;
  justify-content: center;
  align-items: center;
}

.app--day {
  background-color: #b8fd6ea3;
}

.app--night {
  background-color: #b8fd6ea3;
}

.app--day a:hover {
  color: rgba(6, 6, 6, 0.9);
}

.app--night a:hover {
  color: #b8fd6ea3;
}
</style>
