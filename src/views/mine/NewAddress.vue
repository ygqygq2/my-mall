<template>
  <AddressTitle addressAction="new" />
  <div class="content">
    <Address />
  </div>
</template>

<script>
import AddressTitle from './AddressTitle.vue';
import Address from './Address.vue';

export default {
  name: 'NewAddress',
  components: {
    AddressTitle,
    Address
  },
  setup() {}
};
</script>

<style lang="scss" scoped>
@import '../../style/mixins.scss';
.content {
  @include backgroud;
}
</style>
