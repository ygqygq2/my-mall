import { useRouter } from 'vue-router';

export const useBackRouterEffect = () => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return { handleBack };
};
