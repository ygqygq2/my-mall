<template>
  <div class="wrapper">
    <StaticPart />
    <Nearby />
  </div>
  <Docker :currentIndex="0" />
</template>

<script>
import StaticPart from './StaticPart';
import Nearby from './Nearby';
import Docker from '../../components/Docker';
export default {
  name: 'Home',
  components: {
    StaticPart,
    Nearby,
    Docker
  }
};
</script>

<style lang="scss" scoped>
@import '../../style/mixins.scss';
.wrapper {
  @include wrapper;
}
</style>
