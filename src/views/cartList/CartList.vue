<template>
  <div class="wrapper">
    <div class="title">我的全部购物车</div>
    <div class="carts">
      <div class="cart" v-for="(item, index) in list" :key="index">
        <div class="cart__title">
          {{ item.shopName }}
        </div>
        <div class="cart__content">
          <template
            v-for="(innerItem, innerIndex) in item.product"
            :key="innerIndex"
          >
            <div class="cart__content__item">
              <img class="cart__content__img" :src="innerItem.imgUrl" />
              <div class="cart__content__data">
                <div class="cart__content__name">
                  {{ innerItem.name }}
                </div>
                <div class="cart__content__info">
                  <div class="cart__content__price">
                    &yen;{{ innerItem.price }} x {{ innerItem.count }}
                  </div>
                  <div class="cart__content__total" >&yen; {{ (innerItem.price * innerItem.count).toFixed(2) }}</div>
                </div>
              </div>
            </div>
          </template>
          <div class="cart__content__count">
            共计 {{ item.product.length }} 件/7.0kg
            <!-- <span class="iconfont">&#xe613;</span> -->
          </div>
        </div>
      </div>
    </div>
  </div>
  <Docker :currentIndex="1" />
</template>

<script>
import { reactive, toRefs } from 'vue';
import { get } from '../../utils/request';
import Docker from '../../components/Docker.vue';

// 处理购物车逻辑
const useCartListEffect = () => {
  const data = reactive({ list: {} });

  const getCartList = async () => {
    const result = await get('/api/cart/list');
    if (result?.errno === 0 && result?.data?.length) {
      data.list = result.data;
    }
  };

  getCartList();
  const { list } = toRefs(data);
  return { list };
};

export default {
  name: 'CartList',
  components: { Docker },
  setup() {
    const { list } = useCartListEffect();

    return { list };
  }
};
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
@import '../../style/mixins.scss';
.wrapper {
  @include wrapper;
  background-color: rgb(248, 248, 248);
}

.title {
  line-height: 0.44rem;
  font-size: 0.16rem;
  background-color: $bgcolor;
  text-align: center;
  color: $content-fontcolor;
}

.cart {
  margin: 0.16rem 0.18rem;
  padding: 0.16rem;
  background-color: $bgcolor;
  &__title {
    margin-bottom: 0.16rem;
    line-height: 0.22rem;
    font-size: 0.16rem;
    color: $content-fontcolor;
  }
  &__content {
    &__item {
      display: flex;
    }
    &__img {
      width: 0.46rem;
      height: 0.46rem;
      margin-right: 0.16rem;
    }
    &__data {
      flex: 1;
    }
    &__name {
      font-size: 0.14rem;
      color: $content-fontcolor;
      margin-bottom: 0.06rem;
    }
    &__info {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &__price {
      margin-bottom: 0.04rem;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $hightlight-fontcolor;
    }
    &__total {
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $dark-fontcolor;
    }
    &__count {
      height: 0.28rem;
      font-size: 0.14rem;
      line-height: 0.28rem;
      color: $light-fontcolor;
      text-align: center;
      background-color: $search-bgcolor;
      .iconfont {
        font-size: 0.18rem;
        margin-left: 0.08rem;
      }
    }
  }
}
</style>
