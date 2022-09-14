<template>
  <div class="wrapper">
    <div class="search">
      <div class="search__back iconfont" @click="handleBack">&#xe6db;</div>
      <div class="search__content">
        <span class="search__content__icon iconfont">&#xe6c8;</span>
        <input class="search__content__input" placeholder="请输入商品名称" />
      </div>
    </div>
    <ShopInfo :item="item" :hideBorder="true" v-show="item.imgUrl" />
    <Content :shopName="item.name" />
    <Cart />
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import { get } from '../../utils/request';
import { useBackRouterEffect } from '../../effects/backEffect';
import ShopInfo from '../../components/ShopInfo';
import Content from './Content.vue';
import Cart from './Cart.vue';

const useShopInfoEffect = () => {
  const route = useRoute();
  const data = reactive({ item: {} });

  const getItemData = async () => {
    const result = await get(`/api/shop/${route.params.id}`);
    if (result?.errno === 0 && result?.data) {
      data.item = result.data;
    }
  };

  const { item } = toRefs(data);
  return { item, getItemData };
};

export default {
  name: 'Shop',
  components: { ShopInfo, Content, Cart },
  setup() {
    const { item, getItemData } = useShopInfoEffect();
    const { handleBack } = useBackRouterEffect();

    getItemData();

    return {
      item,
      handleBack
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
.wrapper {
  padding: 0 0.18rem;
}
.search {
  display: flex;
  line-height: 0.32rem;
  margin: 0.14rem 0 0.04rem 0;
  &__back {
    width: 0.3rem;
    font-size: 0.24rem;
    color: #b6b6b6;
    /* background-color: #000; */
  }
  &__content {
    display: flex;
    flex: 1;
    background-color: $search-bgcolor;
    border-radius: 0.16rem;
    &__icon {
      width: 0.44rem;
      text-align: center;
      color: $search-fontcolor;
      /* background-color: blue; */
    }
    &__input {
      display: block;
      height: 0.32rem;
      width: 100%;
      padding-right: 0.2rem;
      font-size: 0.14rem;
      border: none;
      outline: none;
      background: none;
      color: $content-fontcolor;
      &::placeholder {
        color: $content-fontcolor;
      }
    }
  }
}
</style>
