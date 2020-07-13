<template>
  <div id="app">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M35.85 60.718c-.464 1.137-1.653 2.182-2.866 2.692.383 2.526.952 4.668 1.77 4.804.812.135 3.93.203 5.297.325.579.052 1.24.147 1.806.27.67.144 1.133.982 1.516 1.621.175.293.216.606.216.606-.723-.158-.382-.391-.946-.373-.739.33-1.354.124-2.09-.035-1.294-.276-3.79-.288-3.79-.288s4.112 1.384 4.914 1.204c1.439-.322 3.98.322 5.036 1.33.672.637.764 1.737.294 2.493-.253-1.157-1.442-1.42-1.442-1.42 0-.001-1.761.17-2.988 0-1.044-.149-2.444-.865-3.756-1.028-1.047-.132-2.251-.39-3.303-.499 1.888.857 1.918 3.263.645 4.581 0 0-.248-1.169-.742-1.844-1.978-2.714-3.538-2.4-4.571-3.393-.708-.68-1.187-2.251-.697-5.034.148-.82-.032-1.975-.349-3.238a5.442 5.442 0 01-1.46-.738c-1.065 1.614-2.81 4.272-4.243 5.25.385 3.706 1.09 7.615 2.249 7.81.882.147 4.27.22 5.753.354.63.055 1.347.159 1.961.293.727.155 1.23 1.066 1.648 1.76.189.316.233.657.233.657-.784-.172-.415-.425-1.028-.404-.802.355-1.471.133-2.268-.04-1.406-.3-4.115-.312-4.115-.312s2.244 1.153 5.569 1.337c1.563-.35 4.087.322 5.235 1.415.73.691.83 1.885.319 2.707-.275-1.257-1.568-1.54-1.568-1.54 0-.002-1.91.183-3.242-.001-1.135-.162-2.655-.94-4.08-1.118-1.137-.143-2.444-.423-3.589-.542 2.054.93 2.085 3.544.703 4.976 0 0-.27-1.268-.806-2.001-2.149-2.948-3.842-2.609-4.966-3.686-.768-.738-1.287-2.445-.755-5.466.224-1.242-.246-3.19-.84-5.184-2.57.101-5.93-1.14-8.385-7.002-10.529-4.463-14-14.299-11.2-22.76 2.63-7.948 10.384-15.1 20.963-16.827 16.18-2.644 23.147 6.48 29.635 2.18 3.844-2.549 4.078-6.276 6.644-8.234 6.12-4.668 13.867.866 14.837 7.501C81.965 31.561 93.261 38.424 100 46.691c-8.687-6.16-20.994-13.96-29.447-16.964-4.383 3.006-9.728-.554-12.292 10.01-1.606 6.615-4.677 11.427-9.521 15.338-3.47 2.804-7.576 4.784-12.89 5.643zm31.9-38.79a1.173 1.173 0 011.172 1.172 1.173 1.173 0 01-1.172 1.172 1.172 1.172 0 010-2.343z" clip-rule="evenodd" fill-rule="evenodd"/></svg>
    <form class="form" v-if="formVisible" @submit.prevent="createUrl()">
      <div v-if="error" class="error">
        {{error}}
      </div>
      <input class="input" type="text" v-model="url" name="url" id="url" placeholder="Link">
      <input class="input" type="text" v-model="slug" name="slug" id="slug" placeholder="Slug" v-slugify>
      <button type="submit" class="create">create</button>
    </form>
    <div v-if="created">
      <p class="created">Your short url is: <a :href="created">{{created}}</a></p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        url: '',
        slug: '',
        error: '',
        formVisible: true,
        created: null,
      }
    },
    methods: {
      async createUrl() {
        this.error = '';
        const response = await fetch('/url', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            url: this.url,
            slug: this.slug || undefined,
          }),
        });
        if (response.ok) {
          const result = await response.json();
          this.formVisible = false;
          this.created = `http://oli.kiwi/${result.slug}`;
        } else if (response.status === 429) {
          this.error = 'You are sending too many requests. Try again in 30 seconds.';
        } else {
          const result = await response.json();
          this.error = result.message;
        }
      },
    },
  }
</script>

<style>
  svg {
    fill: transparent;
    stroke: white;
    stroke-width: 0.5px;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 4rem;
    max-width: calc(100% - 1rem);
    margin: 0 auto;
  }

  @media (max-width: 600px) {
    #app {
      grid-template-columns: 1fr;
      grid-gap: 1rem;
    }
  }
</style>
