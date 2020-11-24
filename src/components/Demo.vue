<template>
  <div>{{res2}}</div>
</template>

<script>
/* eslint-disable */
import res from "./res.jsonn";
export default {
  props: {},
  data() {
    return {
      res: res,
      res2: "22",
    };
  },
  computed: {},
  created() {},
  mounted() {
    var res = this.res2?.a;
    res = 444;
    this.res2 += 1;
  },
  methods: {},
  components: {},
};
</script>

<style scoped lang="scss">
</style>
