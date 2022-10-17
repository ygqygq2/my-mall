<template>
  <div class="content">
    <div class="category">
      <div :class="{
          category__item: true,
          'category__item--active': currentTab === item.tab
        }" v-for="item in categories" :key="item.name" @click="() => handleTabClick(item.tab)">{{ item.name }}</div>
    </div>
    <div class="product">
      <div class="product__item" v-for="item in list" :key="item._id">
        <img :src="item.imgUrl" alt class="product__item__img" />
        <div class="product__item__detail">
          <h4 class="product__item__title">{{ item.name }}</h4>
          <p class="product__item__sales">月售：{{ item.sales }}</p>
          <p class="product__item__price">
            <span class="product__item__yen">&yen;{{ item.price }}</span>
            <span class="product__item__origin">&yen;{{ item.oldPrice }}</span>
          </p>
        </div>
        <div class="product__number">
          <span class="product__number__minus iconfont" @click="
              () => {
                changeCartItem(shopId, item._id, item, -1, shopName);
              }
            ">&#xe780;</span>
          {{ getProductCartCount(shopId, item._id)}}
          <span class="product__number__plus iconfont" @click="
              () => {
                changeCartItem(shopId, item._id, item, 1, shopName);
              }
            ">&#xe653;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { get } from '../../utils/request';
import { useCommonCartEffect } from '../../effects/cartEffects';

const categories = [
  {
    name: '全部商品',
    tab: 'all'
  },
  {
    name: '秒杀',
    tab: 'seckill'
  },
  {
    name: '新鲜水果',
    tab: 'fruit'
  }
];

// 和 tab 切换相关的逻辑
const useTabEffect = () => {
  const currentTab = ref(categories[0].tab);
  const handleTabClick = (tab) => {
    currentTab.value = tab;
  };

  return { currentTab, handleTabClick };
};

// 和商品列表相关的逻辑
const useCurrentListEffect = (currentTab, shopId) => {
  const content = reactive({ list: [] });
  const getContentData = async () => {
    const result = await get(`/api/shop/${shopId}/products`, {
      tab: currentTab.value
    });
    if (result?.errno === 0) {
      content.list = result.data;
    }
  };
  watchEffect(() => {
    getContentData();
  });
  const { list } = toRefs(content);
  return { list };
};

// 和购物车相关的逻辑
const useCartEffect = () => {
  const store = useStore();

  const { changeCartItemInfo, cartList } = useCommonCartEffect();

  const changeShopName = (shopId, shopName) => {
    store.commit('changeShopName', {
      shopId,
      shopName
    });
  };

  const changeCartItem = (shopId, productId, item, num, shopName) => {
    changeCartItemInfo(shopId, productId, item, num);
    changeShopName(shopId, shopName);
  };

  const getProductCartCount = (shopId, productId) => {
    return cartList?.[shopId]?.productList?.[productId]?.count || 0;
  };

  return { cartList, changeCartItem, getProductCartCount };
};

export default {
  name: 'Content',
  props: ['shopName'],
  setup() {
    const route = useRoute();
    const shopId = route.params.id;
    const { currentTab, handleTabClick } = useTabEffect();
    const { list } = useCurrentListEffect(currentTab, shopId);
    const { cartList, changeCartItem, getProductCartCount } = useCartEffect();

    return {
      categories,
      list,
      currentTab,
      handleTabClick,
      shopId,
      changeCartItem,
      cartList,
      getProductCartCount
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
@import '../../style/mixins.scss';
.content {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 1.5rem;
  bottom: 0.5rem;
}
.category {
  overflow-y: scroll;
  width: 0.76rem;
  background-color: $search-bgcolor;
  height: 100%;
  &__item {
    line-height: 0.4rem;
    text-align: center;
    font-size: 0.14rem;
    color: $content-fontcolor;
    &--active {
      background-color: $bgcolor;
    }
  }
}
.product {
  overflow-y: scroll;
  flex: 1;
  &__item {
    position: relative;
    display: flex;
    padding: 0.12rem 0;
    margin: 0 0.16rem;
    border-bottom: 0.01rem solid $content-bgcolor;
    &__detail {
      overflow: hidden;
    }
    &__img {
      width: 0.68rem;
      height: 0.68rem;
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
      margin: 0;
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
      bottom: 0.12rem;
      line-height: 0.16rem;
      font-size: .14rem;
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
</style>
