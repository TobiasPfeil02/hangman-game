<script setup lang="ts"></script>

<template>
  <div class="home-screen">
    <header class="header">
      <h1>Hangman Challenge</h1>
      <p>Can you guess the word before time runs out?</p>
    </header>

    <div class="main-content">
      <nav class="nav-buttons">
        <router-link to="/game" class="btn btn-primary">Start Game</router-link>
        <router-link to="/settings" class="btn btn-secondary">Settings</router-link>
        <router-link to="/scoreboard" class="btn btn-secondary">Scoreboard</router-link>
      </nav>
    </div>

    <footer class="footer">
      <p>Tip: Use jokers to reveal letters or remove wrong options!</p>
    </footer>
  </div>
</template>

<style scoped>
.home-screen {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.header {
  margin-top: 20px;
}

.header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
}

.header p {
  font-size: 1.2rem;
  color: #34495e;
}

.illustration {
  width: 200px;
  height: auto;
  margin: 20px 0;
}

.nav-buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.footer {
  margin-bottom: 20px;
  font-size: 0.9rem;
  color: #7f8c8d;
}
</style>
