<template>
  <transition-group tag="ul" name="user-lists">
    <li v-for="user in users" :key="user" @click="removeUser(user)">
      {{ user }}
    </li>
  </transition-group>
  <div>
    <input type="text" ref="userNameInput" />
    <button @click="addUser()">Add new user</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      users: ['Max', 'Angela', 'Shynu', 'Mary', 'Varghese'],
    };
  },
  methods: {
    removeUser(user) {
      this.users = this.users.filter((usr) => usr !== user);
    },
    addUser() {
      const enteredUserName = this.$refs.userNameInput.value;
      this.users.unshift(enteredUserName);
    },
  },
};
</script>
<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
li {
  border: 1px solid #ccc;
  padding: 1 rem;
  text-align: center;
}
.user-lists-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.user-lists-enter-active {
  transition: all 1s ease-out;
}
.user-lists-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.user-lists-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.user-lists-leave-active {
  transition: all 1s ease-in;
  position: absolute;
}
.user-lists-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.user-lists-move {
  transition: transform 0.8s ease;
}
</style>
