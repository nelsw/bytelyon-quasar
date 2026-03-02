import { onMounted, watch, defineModel } from 'vue';
import { useRoute } from 'vue-router';
const useTokenizer = () => {

const route = useRoute();
const model = defineModel<boolean>({ required: false, default: false });

  watch(
    () => route.query.tkn,
    (newModalValue) => {
      console.debug(route.query.tkn, newModalValue);
    },
  );
  onMounted(() => {
    if (route.query.tkn !== '') {
      console.log('jackpot')
      model.value = true;
    } else {
      model.value = false;
    }
  });

  return {
    model,
  }
}

export default useTokenizer
