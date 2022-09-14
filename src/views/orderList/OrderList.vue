<template>
  <div class="wrapper">
    <div class="title">我的订单</div>
    <div class="orders">
      <div class="order" v-for="(item, index) in list" :key="index">
        <div class="order__title">
          {{item.shopName}}
          <span class="order__status">{{item.isCanceled ? '已取消': '已下单'}}</span>
        </div>
        <div class="order__content">
          <div class="order__content__imgs">
            <template v-for="(innerItem, innerIndex) in item.products" :key="innerIndex">
              <img class="order__content__img" :src="innerItem.product.imgUrl" />
            </template>
          </div>
          <div class="order__content__info">
            <div class="order__content__price">&yen; 36.88</div>
            <div class="order__content__count">共 {{item.products.length}} 件</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Docker :currentIndex="2" />
</template>

<script>
import { reactive, toRefs } from 'vue';
import { get } from '../../utils/request';
import Docker from '../../components/Docker.vue';

// 处理订单列表逻辑
const useOrderListEffect = () => {
  const data = reactive({ list: [] });
  const getNearbyList = async () => {
    const result = await get('/api/order');
    if (result?.errno === 0 && result?.data?.length) {
      data.list = result.data;
    }
  };

  getNearbyList();
  const { list } = toRefs(data);
  return { list };
};

export default {
  name: 'OrderList',
  components: { Docker },
  setup() {
    const { list } = useOrderListEffect();
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
.order {
  margin: 0.16rem 0.18rem;
  padding: 0.16rem;
  background-color: $bgcolor;
  &__title {
    margin-bottom: 0.16rem;
    line-height: 0.22rem;
    font-size: 0.16rem;
    color: $content-fontcolor;
  }
  &__status {
    float: right;
    font-size: 0.14rem;
    color: $light-fontcolor;
  }
  &__content {
    display: flex;
    &__imgs {
      flex: 1;
    }
    &__img {
      width: 0.4rem;
      height: 0.4rem;
      margin-right: 0.12rem;
    }
    &__info {
      width: 0.7rem;
    }
    &__price {
      margin-bottom: 0.04rem;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $hightlight-fontcolor;
      text-align: right;
    }
    &__count {
      font-size: 0.12rem;
      line-height: 0.14rem;
      color: $content-fontcolor;
      text-align: right;
    }
  }
}
</style>
