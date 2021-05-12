<template>
  <div>
      <my-input v-model="val"></my-input>
  </div>
</template>

<script>
import MyInput from '@/components/MyInput'
export default {
    name: "Home",
    data() {
        return{
            val: "我是谁"
        }
    },
    components: {
        MyInput
    }
}
</script>

<style scoped>

</style>