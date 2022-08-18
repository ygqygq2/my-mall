<template>
  <div class="address">
    <div class="address__input">
      所在城市：
      <input type="text" placeholder="如北京市" v-model="city" />
    </div>
    <div class="address__input">
      小区/大厦/学校：
      <input type="text" placeholder="如理工大学国防科技园" v-model="hourse" />
    </div>
    <div class="address__input">
      楼号-门牌号：
      <input type="text" placeholder="A号楼B层" v-model="floor" />
    </div>
    <div class="address__input">
      收货人：
      <input type="text" placeholder="请填写收货人的姓名" v-model="consignee" />
    </div>
    <div class="address__input">
      联系电话：
      <input type="text" placeholder="请填写收货手机号" v-model="phone" />
    </div>
  </div>
</template>

<script>
import { toRefs, watch } from 'vue';
// import { useStore } from 'vuex';
import { useAddressEffect } from './addressEffect';

export default {
  name: 'Address',
  props: ['addressId'],
  emits: ['update-address'],
  setup(props, context) {
    const { address, fillForm, saveEditAddress, updateAddress } =
      useAddressEffect(props, context);

    // 第一次加载表单
    fillForm();

    // 将一次加载的表单数据保存到本地存储
    saveEditAddress();

    // 侦听 address
    watch(address, saveEditAddress);

    const { city, hourse, floor, consignee, phone } = toRefs(address);

    return {
      city,
      hourse,
      floor,
      consignee,
      phone,
      saveEditAddress,
      updateAddress
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
.address {
  margin-top: 0.12rem;
  padding: 0.12rem 0.18rem 0 0.18rem;
  background-color: $bgcolor;
  &__input {
    display: flex;
    align-items: center;
    border-bottom: 0.01rem solid $content-bgcolor;
    flex: 1;
    font-size: 0.14rem;
    height: 0.44rem;
    line-height: 0.2rem;
    color: $medium-fontcolor;
    input {
      border: none;
      outline: none;
    }
  }
}
</style>
