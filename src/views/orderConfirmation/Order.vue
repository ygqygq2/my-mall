<template>
  <div class="order">
    <div class="order__price">
      实付金额&nbsp;
      <b>&yen;{{ calculations.price }}</b>
    </div>
    <div class="order__btn" @click="() => handleSubmitClick(true)">
      提交订单
    </div>
  </div>
  <div class="mask" v-show="showConfirm" @click="() => handleSubmitClick(true)">
    <div class="mask__content">
      <h3 class="mask__content__title">确认要离开收银台？</h3>
      <p class="mask__content__desc">请尽快完成支付，否则将被取消</p>
      <div class="mask__content__btns">
        <div
          class="mask__content__btn mask__content__btn--first"
          @click="() => handleConfirmOrder(true)"
        >
          取消订单
        </div>
        <div
          class="mask__content__btn mask__content__btn--last"
          @click="() => handleConfirmOrder(false)"
        >
          确认支付
        </div>
        <Toast v-if="show" :message="toastMessage" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { post } from '../../utils/request';
import Toast, { useToastEffect } from '../../components/Toast';
import { useCommonCartEffect } from '../../effects/cartEffects';

const useMakeOrderEffect = (shopId, shopName, productList) => {
  const router = useRouter();
  const store = useStore();

  const { showToast } = useToastEffect();

  const showConfirm = ref(false);

  const handleSubmitClick = (status) => {
    showConfirm.value = status;
  };

  const getAddressId = () => {
    // 从 localStorage 中获取 orderAddress
    const { orderAddress } = localStorage;
    const addressId = JSON.parse(orderAddress)._id;
    return addressId;
  };

  const handleConfirmOrder = async (isCanceled) => {
    const addressId = getAddressId();
    const products = [];
    for (const i in productList.value) {
      const product = productList.value[i];
      products.push({
        id: product._id,
        num: product.count
      });
    }

    try {
      const result = await post('/api/order', {
        addressId: addressId,
        shopId,
        shopName: shopName.value,
        isCanceled,
        products
      });
      if (result?.errno === 0) {
        store.commit('clearCartData', shopId);
        router.push({ name: 'OrderList' });
      }
    } catch (e) {
      showToast('下单失败');
    }
  };

  return { handleConfirmOrder, showConfirm, handleSubmitClick };
};

export default {
  name: 'Order',
  components: { Toast },
  props: ['shopId'],
  setup() {
    const route = useRoute();

    const shopId = route.params.id;
    const { calculations, shopName, productList } = useCommonCartEffect(shopId);
    const { show, toastMessage } = useToastEffect();
    const { showConfirm, handleConfirmOrder, handleSubmitClick } =
      useMakeOrderEffect(shopId, shopName, productList);

    return {
      show,
      toastMessage,
      calculations,
      handleConfirmOrder,
      showConfirm,
      handleSubmitClick
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
.order {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  height: 0.49rem;
  line-height: 0.49rem;
  background-color: $bgcolor;
  &__price {
    flex: 1;
    text-indent: 0.24rem;
    font-size: 0.14rem;
    color: $content-fontcolor;
  }
  &__btn {
    width: 0.98rem;
    background-color: #4fb0f9;
    color: $bgcolor;
    text-align: center;
    font-size: 0.14rem;
  }
}
.mask {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3rem;
    height: 1.56rem;
    background-color: $bgcolor;
    text-align: center;
    border-radius: 0.04rem;
    &__title {
      margin: 0.24rem 0 0 0rem;
      line-height: 0.26rem;
      font-size: 0.18rem;
      color: $content-fontcolor;
    }
    &__desc {
      margin: 0.08rem 0 0 0;
      font-size: 0.14rem;
      color: $medium-fontcolor;
    }
    &__btns {
      display: flex;
      margin: 0.24rem 0.58rem 0 0.58rem;
    }
    &__btn {
      flex: 1;
      width: 0.8rem;
      line-height: 0.32rem;
      border-radius: 0.16rem;
      font-size: 0.14rem;
      &--first {
        border: 0.01rem solid #4fb0f9;
        color: #4fb0f9;
        margin-right: 0.12rem;
      }
      &--last {
        margin-left: 0.12rem;
        background-color: #4fb0f9;
        color: $bgcolor;
      }
    }
  }
}
</style>
