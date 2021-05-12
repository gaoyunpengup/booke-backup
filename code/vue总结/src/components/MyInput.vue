<template>
  <div>
      <span>请输入内容:</span>
      <input type="text" v-model="vModel">
  </div>
</template>

<script>
export default {
    name: "MyInput",
    props: {
        value: String
    },
    computed: {
        vModel: {
            set (val) {
                this.$emit("input", val);
            },
            get () {
                return this.value;
            }
        }
    }
}
</script>

<style scoped>

</style>