<template>
  <div class="title">
    <span class="title__icon iconfont">&#xe7bc;</span>
    <div class="title__userinfo">
      <div class="title__avatar iconfont">
        <img class="title__avatar__img" src="https://avatars.githubusercontent.com/u/17672440?v=4" alt />
      </div>
      <span class="title__userinfo__name">热心市民杨先生</span>
      <div class="title__userinfo__star">
        <span class="title__userinfo__star__icon iconfont">&#xe65c;</span>
        <span class="title__userinfo__star__num">16</span>
      </div>
      <div class="title__userinfo__id">ID: 1069643013</div>
    </div>
  </div>
  <div class="resources">
    <div class="resources__box resources__packet">
      <div class="resources__box__name">红包</div>
      <div class="resources__box__num">218</div>
    </div>
    <div class="resources__box resources__ticket">
      <div class="resources__box__name">优惠券</div>
      <div class="resources__box__num">12张</div>
    </div>
    <div class="resources__box resources__beans">
      <div class="resources__box__name">鲜豆</div>
      <div class="resources__box__num">88</div>
    </div>
    <div class="resources__box resources__iou">
      <div class="resources__box__name">白条</div>
      <div class="resources__box__num">1000</div>
    </div>
  </div>
  <div class="services">
    <div class="services__item services__wallet">
      <div class="services__item__left">
        <span class="services__item__icon services__wallet__icon iconfont">&#xe635;</span>
        <span class="services__item__name">我的钱包</span>
      </div>
      <div class="services__item__right">
        <router-link :to="{name: 'Home'}">
        <span class="services__item__right__icon iconfont">&#xe6aa;</span>
        </router-link>
      </div>
    </div>
    <div class="services__item services__address">
      <div class="services__item__left">
        <span class="services__item__icon services__address__icon iconfont">&#xe619;</span>
        <span class="services__item__name">收货地址</span>
      </div>
      <div class="services__item__right">
        <router-link :to="{name: 'ManageAddress'}">
        <span class="services__item__right__icon iconfont">&#xe6aa;</span>
        </router-link>
      </div>
    </div>
    <div class="services__item services__help">
      <div class="services__item__left">
        <span class="services__item__icon services__help__icon iconfont">&#xe608;</span>
        <span class="services__item__name">客服与帮助</span>
      </div>
      <div class="services__item__right">
        <router-link :to="{name: 'Home'}">
        <span class="services__item__right__icon iconfont">&#xe6aa;</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Mine',
  setup() {
  }
};
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
@import '../../style/mixins.scss';
.title {
  position: relative;
  height: 2.17rem;
  width: 100%;
  background-image: linear-gradient(239deg, #3a6ff3 0%, #50c7fb 100%);
  border-bottom-left-radius: 90% 40%;
  border-bottom-right-radius: 90% 40%;
  &__icon {
    position: absolute;
    top: 0.3rem;
    right: 0.18rem;
    font-size: 0.25rem;
    color: $bgcolor;
  }
  &__avatar {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0.94rem;
    height: 0.94rem;
    &__img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  &__userinfo {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1.26rem;
    margin: 0 0.18rem;
    border-bottom: 0.01rem solid $content-bgcolor;
    border-radius: 8px;
    background-color: $bgcolor;
    &__name {
      position: absolute;
      top: 0.59rem;
      left: 50%;
      width: 2rem;
      transform: translateX(-50%);
      display: inline-block;
      font-size: 24px;
      color: #262628;
      text-align: center;
      line-height: 36px;
      @include ellipsis;
    }
    &__star {
      position: absolute;
      top: 0.7rem;
      right: 0.37rem;
      display: flex;
      justify-content: center;
      text-align: center;
      width: 0.35rem;
      height: 0.15rem;
      background-image: linear-gradient(180deg, #bee700 0%, #8aca00 100%);
      border-radius: 0.1rem;
      &__icon,
      &__num {
        font-size: 0.12rem;
        transform: scale(0.83333);
        transform-origin: center center;
      }
      &__icon {
        margin-right: 0.02rem;
        color: #ffc700;
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
      }
      &__num {
        margin-left: 0.02rem;
        color: $bgcolor;
      }
    }
    &__id {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 0.12rem;
      width: 1.62rem;
      height: 0.17rem;
      font-size: 0.14rem;
      color: #c1c0c9;
      text-align: center;
    }
  }
}
.resources {
  display: flex;
  justify-content: space-around;
  text-align: center;
  height: 0.76rem;
  margin: 0 0.18rem;
  background-color: #fff;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.08);
  &__box {
    flex: 1;
    &__name {
      margin: 0.12rem 0 0.1rem 0;
      font-size: 0.12rem;
      color: #c1c0c9;
    }
    &__num {
      font-size: 0.2rem;
      color: #262628;
    }
  }
}
.services {
  display: flex;
  flex-direction: column;
  height: 1.46rem;
  margin: 0 0.18rem;
  background-color: $bgcolor;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.08);
  &__item {
    flex: 1;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: space-between;
    &__icon {
      display: inline-block;
      box-sizing: border-box;
      padding: 0.04rem;
      margin: 0 0.12rem 0 0.16rem;
      width: 0.22rem;
      height: 0.22rem;
      color: $bgcolor;
      border-radius: 0.08rem;
      font-size: 0.14rem;
    }
    &__name {
      font-size: 0.14rem;
      color: #262626;
    }
    &__right {
      &__icon {
        display: inline-block;
        width: 0.07rem;
        height: 0.12rem;
        margin-right: 0.16rem;
        color: #c2c4ca;
        font-size: 0.14rem;
      }
    }
  }
  &__wallet {
    &__icon {
      background-color: #ed4a47;
    }
  }
  &__address {
    &__icon {
      background-color: #32c5ff;
    }
  }
  &__help {
    &__icon {
      background-color: #9013fe;
    }
  }
}
</style>
