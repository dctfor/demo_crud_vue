<template lang='html'>
  <div class=''>
    <p> {{mensaje}} </p>
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      mensaje: "",
    };
  },
  methods: {
    getMensaje() {},
  },
  created() {
    this.getMensaje();
  },
};
</script>

<style lang='css' scoped>
</style>
