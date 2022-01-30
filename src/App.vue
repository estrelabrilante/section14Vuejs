<template>
  <div class="container">
    <div class="block" :class="{ animate: animatedBlock }"></div>
    <button @click="animateBlock">Animate</button>
  </div>
  <div class="container">
    <transition
      name="para"
      @before-enter="beforeEnter"
      @enter="enter"
      @before-leave="beforeLeave"
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="afterLeave"
      @enter-cancelled="enterCancelled"
      @leave-cancelled="leaveCancelled"
    >
      <p v-if="paraIsVisible">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    </transition>
  </div>
  <div class="container">
    <transition name="fade-button" mode="out-in">
      <button @click="showUser()" v-if="!usersAreVisible">Show users</button>
      <button @click="hideUser()" v-else>Hide users</button>
    </transition>
  </div>
  <div class="container">
    <button @click="togglePara()">Toggle Paragraph</button>
  </div>
  <base-modal @close="hideDialog" :open="dialogIsVisible">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.!
    </p>
    <button @click="hideDialog">Close it!</button>
  </base-modal>
  <div class="container">
    <button @click="showDialog">Show Dialog</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogIsVisible: false,
      animatedBlock: false,
      paraIsVisible: false,
      usersAreVisible: false,
      enterInterval: null,
      leaveInterval: null,
    };
  },
  methods: {
    enterCancelled() {
      clearInterval(this.enterInterval);
    },
    leaveCancelled() {
      clearInterval(this.leaveInterval);
    },

    beforeEnter(el) {
      console.log('before enter');
      console.log(el);
      el.style.opacity = 0;
    },
    enter(el, done) {
      console.log(' enter');
      console.log(el);
      let round = 1;
      this.enterInterval = setInterval(() => {
        el.style.opacity = round * 0.01;
        round++;
        if (round > 100) {
          clearInterval(this.enterInterval);
          done();
        }
      }, 20);
    },
    beforeLeave(el) {
      console.log('before leave');
      console.log(el);
      el.style.opacity = 1;
    },
    afterEnter(el) {
      console.log('after enter');
      console.log(el);
      el.style.opacity = 1;
    },
    leave(el, done) {
      console.log('leave');
      console.log(el);
      let round = 1;
      this.leaveInterval = setInterval(() => {
        // el.style.opacity = round / 0.01;
        el.style.opacity = 1 - round * 0.01;
        round++;
        // round--;
        if (round > 100) {
          clearInterval(this.leaveInterval);
          done();
        }
      }, 20);
    },
    afterLeave(el) {
      console.log('after leave');
      console.log(el);
      el.style.opacity = 0;
    },
    showUser() {
      this.usersAreVisible = true;
    },
    hideUser() {
      this.usersAreVisible = false;
    },
    showDialog() {
      this.dialogIsVisible = true;
    },
    hideDialog() {
      this.dialogIsVisible = false;
    },
    animateBlock() {
      this.animatedBlock = true;
    },
    togglePara() {
      this.paraIsVisible = !this.paraIsVisible;
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}
html {
  font-family: sans-serif;
}
body {
  margin: 0;
}
button {
  font: inherit;
  padding: 0.5rem 2rem;
  border: 1px solid #810032;
  border-radius: 30px;
  background-color: #810032;
  color: white;
  cursor: pointer;
}
button:hover,
button:active {
  background-color: #a80b48;
  border-color: #a80b48;
}
.animate {
  /* transform: translateX(-150px); */
  animation: slide-scale 0.3s ease-out forwards;
}
.block {
  width: 8rem;
  height: 8rem;
  background-color: #290033;
  margin-bottom: 2rem;
  /* transition: transform 0.3s ease-out; */
}
.container {
  max-width: 40rem;
  margin: 2rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  border: 2px solid #ccc;
  border-radius: 12px;
}
@keyframes slide-scale {
  0% {
    transform: translateX(0) scale(1);
  }
  60% {
    transform: translateX(-120px) scale(1.1);
  }
  100% {
    transform: translateX(-160px) scale(1);
  }
}
/*
.para-enter-from {
  opacity: 0;
  transform: translateY(-30px); 
}
.para-enter-active {
   transition: all 0.3s ease-out; 
  animation: slide-scale 0.3s ease-out;
}
.para-enter-to {
   opacity: 1;
  transform: translateY(0); 
}
.para-leave-from {
   opacity: 1;
  transform: translateY(0);
}
.para-leave-active {
   transition: all 0.3s ease-in; 
  animation: slide-scale 0.3s ease-out;
}
.para-leave-to {
  opacity: 0;
  transform: translateY(30px); 
}
*/
.fade-button-enter-from,
.fade-button-leave-to {
  opacity: 0;
}
.fade-button-enter-to,
.fade-button-leave-from {
  opacity: 1;
}
.fade-button-enter-active {
  /* transition: all 0.3s ease-out; */
  transition: opacity 0.3s ease-out;
}

.fade-button-leave-active {
  /* transition: all 0.3s ease-in; */
  animation: slide-scale 0.3s ease-in;
}
</style>
