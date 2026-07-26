<script setup lang="ts">
import CustomerTable from 'components/table/CustomerTable.vue';
import { onMounted, ref } from 'vue';
import { api } from 'boot/axios';
import OrderTable from 'components/table/OrderTable.vue';
import type { Customer, Order } from 'src/types/model';
import { type AxiosResponse } from 'axios';
import { useRouter } from 'vue-router';
import useNotifier from 'src/composable/useNotifier';
import { useUserStore } from 'src/stores/user';

interface model {
  customers: Customer[];
  orders: Order[];
}

const $notify = useNotifier();
const $user = useUserStore();
const $router = useRouter();

const busy = ref<boolean>(true);
const model = ref<model>({
  customers: [],
  orders: [],
});

onMounted(async () => {
  if ($user.auth.IsGuest) {
    $notify.MembersOnly();
    await $router.push({ path: '/' });
    return;
  }
  await api
    .get<model>('/shopify')
    .then((res: AxiosResponse) => (model.value = res.data))
    .catch((err) => console.log(err))
    .finally(() => (busy.value = false));
});
</script>

<template>
  <div class="q-ma-md q-gutter-y-md">
    <CustomerTable v-model="model.customers" :busy="busy" />
    <OrderTable v-model="model.orders" :busy="busy" />
  </div>
</template>
