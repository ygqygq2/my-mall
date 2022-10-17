<template>
  <div class="wrapper">
    <img src="../../assets/images/login/user.png" alt class="wrapper__img" />
    <div class="wrapper__input">
      <input type="text" class="wrapper__input__content" placeholder="请输入用户名" v-model="username" />
    </div>
    <div class="wrapper__input">
      <input type="password" class="wrapper__input__content" placeholder="请输入密码" v-model="password" />
    </div>
    <div class="wrapper__input">
      <input type="password" class="wrapper__input__content" placeholder="请确认密码" v-model="confirmPassword" />
    </div>
    <div class="wrapper__register-button" @click="handleRegister">注册</div>
    <div class="wrapper__register-link" @click="handleLogin">已有帐号去登录</div>
    <Toast v-if="show" :message="toastMessage" />
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { post } from '../../utils/request';
import Toast, { useToastEffect } from '../../components/Toast';

const useRegisterEffect = (showToast) => {
  const router = useRouter();
  const data = reactive({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const handleRegister = async () => {
    const { username, password, confirmPassword } = data;
    if (!username.trim()) {
      showToast('请输入用户名');
      return;
    } else if (!password.trim()) {
      showToast('请输入密码');
      return;
    } else if (password !== confirmPassword) {
      showToast('两次密码不一致');
      return;
    }
    try {
      const result = await post('/api/user/register', {
        username: data.username,
        password: data.password,
        confirmPassword: data.confirmPassword
      });
      if (result?.errno === 0) {
        router.push({ name: 'Login' });
      } else {
        showToast('注册失败');
      }
    } catch (e) {
      showToast('请求失败');
    }
  };

  const { username, password, confirmPassword } = toRefs(data);

  return { username, password, confirmPassword, handleRegister };
};

const handleLoginEffect = () => {
  const router = useRouter();
  const handleLogin = () => {
    router.push({ name: 'Login' });
  };
  return { handleLogin };
};

export default {
  name: 'Register',
  components: {
    Toast
  },
  setup() {
    const { show, toastMessage, showToast } = useToastEffect();
    const { username, password, confirmPassword, handleRegister } =
      useRegisterEffect(showToast);
    const { handleLogin } = handleLoginEffect();

    return {
      show,
      toastMessage,
      showToast,
      username,
      password,
      confirmPassword,
      handleRegister,
      handleLogin
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../style/variables';
.wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  &__img {
    display: block;
    margin: 0 auto 0.4rem auto;
    width: 0.66rem;
    height: 0.66rem;
  }
  &__input {
    margin-top: 0.12rem;
    line-height: 0.22rem;
    margin: 0 0.4rem 0.16rem 0.4rem;
    padding: 0 0.16rem;
    background-color: #f9f9f9;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 0.06rem;
    &__content {
      line-height: 0.48rem;
      border: none;
      outline: none;
      width: 100%;
      background: none;
      &::placeholder {
        color: rgba(0, 0, 0, 0.5);
      }
      font-size: 0.16rem;
      color: $content-notice-fontcolor;
    }
  }
  &__register-button {
    margin: 0.32rem 0.4rem 0.16rem 0.4rem;
    background: #0091ff;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 146, 255, 0.32);
    border-radius: 0.04rem;
    line-height: 0.48rem;
    font-size: 0.16rem;
    text-align: center;
  }
  &__register-link {
    font-size: 0.14rem;
    color: $content-notice-fontcolor;
    text-align: center;
  }
}
</style>
