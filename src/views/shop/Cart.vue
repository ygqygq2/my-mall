<template>
  <div class="mask" v-if="showCart && calculations.total > 0" @click="handleCartShowChange"></div>
  <div class="cart">
    <div class="product" v-if="showCart && calculations.total > 0">
      <div class="product__header">
        <div class="product__header__all" @click="() => setCartItemsChecked(shopId)">
          <span class="product__header__icon iconfont" v-html="calculations.allChecked ? '&#xe70f;' : '&#xe61a;'"></span>
          全选
        </div>
        <div class="product__header__clear">
          <span @click="() => cleanCartProducts(shopId)" class="product_header__clear__btn">清空购物车</span>
        </div>
      </div>
      <div class="product__item" v-for="item in productList" :key="item._id">
        <div class="product__item__checked iconfont" v-html="item.check ? '&#xe70f;' : '&#xe61a;'" @click="() => changeCartItemCheck(shopId, item._id)"></div>
        <img :src="item.imgUrl" alt class="product__item__img" />
        <div class="product__item__detail">
          <h4 class="product__item__title">{{ item.name }}</h4>
          <p class="product__item__price">
            <span class="product__item__yen">&yen;{{ item.price }}</span>
            <span class="product__item__origin">&yen;{{ item.oldPrice }}</span>
          </p>
        </div>
        <div class="product__number">
          <span class="product__number__minus iconfont" @click="
                () => {
                  changeCartItemInfo(shopId, item._id, item, -1);
                }
              ">&#xe780;</span>
          {{ item.count || 0 }}
          <span class="product__number__plus iconfont" @click="
                () => {
                  changeCartItemInfo(shopId, item._id, item, 1);
                }
              ">&#xe653;</span>
        </div>
      </div>
    </div>
    <div class="check">
      <div class="check__icon">
        <img src="http://www.dell-lee.com/imgs/vue3/basket.png" alt class="check__icon__img" @click="handleCartShowChange" />
        <div class="check__icon__tag">{{ calculations.total }}</div>
      </div>
      <div class="check__info">
        总计：
        <span class="check__info__price">&yen; {{ calculations.price }}</span>
      </div>
      <div class="check__btn" v-show="calculations.total > 0">
        <router-link :to="{ path: `/orderConfirmation/${shopId}` }">去结算</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { useCommonCartEffect } from '../../effects/cartEffects';

// 获取购物车信息逻辑
const useCartEffect = (shopId) => {
  const store = useStore();
  const { productList, calculations, changeCartItemInfo } =
    useCommonCartEffect(shopId);

  const changeCartItemCheck = (shopId, productId) => {
    store.commit('changeCartItemChecked', {
      shopId,
      productId
    });
  };

  const cleanCartProducts = (shopId) => {
    store.commit('cleanCartProducts', {
      shopId
    });
  };

  const setCartItemsChecked = (shopId) => {
    store.commit('setCartItemsChecked', {
      shopId
    });
  };

  return {
    calculations,
    changeCartItemInfo,
    productList,
    changeCartItemCheck,
    cleanCartProducts,
    setCartItemsChecked
  };
};

// 展示/隐藏购物车逻辑
const toggleCartEffect = () => {
  const showCart = ref(false);
  const handleCartShowChange = () => {
    showCart.value = !showCart.value;
  };

  return {
    showCart,
    handleCartShowChange
  };
};

export default {
  name: 'Cart',
  setup() {
    const route = useRoute();
    const shopId = route.params.id;

    const {
      calculations,
      changeCartItemInfo,
      productList,
      changeCartItemCheck,
      cleanCartProducts,
      setCartItemsChecked
    } = useCartEffect(shopId);

    const { showCart, handleCartShowChange } = toggleCartEffect();

    return {
      calculations,
      showCart,
      handleCartShowChange,
      shopId,
      productList,
      changeCartItemInfo,
      changeCartItemCheck,
      cleanCartProducts,
      setCartItemsChecked
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
@import '../../style/mixins.scss';
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
.cart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background-color: $bgcolor;
}
.product {
  overflow-y: scroll;
  flex: 1;
  background-color: $bgcolor;
  &__header {
    display: flex;
    line-height: 0.52rem;
    border-bottom: 0.01rem solid$content-bgcolor;
    font-size: 0.14rem;
    color: $content-fontcolor;
    &__all {
      width: 0.64rem;
      margin-left: 0.15rem;
    }
    &__icon {
      display: inline-block;
      margin-right: 0.02rem;
      vertical-align: top;
      color: $btn-bgcolor;
      font-size: 0.2rem;
    }
    &__clear {
      flex: 1;
      margin-right: 0.16rem;
      text-align: right;
      &__btn {
        display: inline-block;
      }
    }
  }
  &__item {
    position: relative;
    display: flex;
    padding: 0.12rem 0;
    margin: 0 0.16rem;
    border-bottom: 0.01rem solid $content-bgcolor;
    &__checked {
      margin-right: 0.2rem;
      line-height: 0.5rem;
      color: $btn-bgcolor;
      font-size: 0.2rem;
    }
    &__detail {
      overflow: hidden;
    }
    &__img {
      width: 0.46rem;
      height: 0.46rem;
      margin-right: 0.16rem;
    }
    &__title {
      margin: 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $content-fontcolor;
      @include ellipsis;
    }
    &__sales {
      margin: 0.06rem 0;
      font-size: 0.12rem;
      color: $content-fontcolor;
    }
    &__price {
      margin: 0.06rem 0 0 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $hightlight-fontcolor;
    }
    &__yen {
      font-size: 0.12rem;
    }
    &__origin {
      margin-left: 0.06rem;
      line-height: 0.2rem;
      font-size: 0.12rem;
      color: $light-fontcolor;
      text-decoration: line-through;
    }

    .product__number {
      position: absolute;
      right: 0rem;
      bottom: 0.26rem;
      &__minus {
        color: $medium-fontcolor;
        margin-right: 0.05rem;
      }
      &__plus {
        color: $btn-bgcolor;
        margin-left: 0.05rem;
      }
    }
  }
}
.check {
  display: flex;
  height: 0.49rem;
  border-top: 0.01rem solid $content-bgcolor;
  line-height: 0.49rem;
  &__icon {
    position: relative;
    width: 0.84rem;
    &__img {
      display: block;
      margin: 0.12rem auto;
      width: 0.28rem;
      height: 0.26rem;
    }
    &__tag {
      position: absolute;
      left: 0.46rem;
      right: 0.2rem;
      top: 0.04rem;
      padding: 0 0.04rem;
      min-width: 0.2rem;
      height: 0.2rem;
      line-height: 0.2rem;
      background-color: $hightlight-fontcolor;
      border-radius: 0.1rem;
      font-size: 0.12rem;
      text-align: center;
      color: $bgcolor;
      transform: scale(0.5);
      transform-origin: left center;
    }
  }
  &__info {
    flex: 1;
    color: $content-fontcolor;
    font-size: 0.12rem;
    &__price {
      color: $hightlight-fontcolor;
      font-size: 0.18rem;
    }
  }
  &__btn {
    width: 0.98rem;
    line-height: 0.49rem;
    background-color: #4fb0f9;
    color: $bgcolor;
    font-size: 0.14rem;
    text-align: center;
    a {
      color: $bgcolor;
      text-decoration: none;
    }
  }
}
</style>
