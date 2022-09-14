<template>
  <AddressTitle addressAction="edit" :addressId="addressId" />
  <div class="content">
    <Address :addressId="addressId" @update-address="updateAddress" />
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import AddressTitle from './AddressTitle.vue';
import Address from './Address.vue';
import { useAddressEffect } from './addressEffect';

export default {
  name: 'NewAddress',
  components: {
    AddressTitle,
    Address
  },
  setup(props, context) {
    const route = useRoute();
    const addressId = route.params.id;

    const { updateAddress } = useAddressEffect(props, context);

    return {
      addressId,
      updateAddress
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../style/mixins.scss';
.content {
  @include backgroud;
}
</style>
