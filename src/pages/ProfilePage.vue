<script setup lang="ts">
import { onMounted } from 'vue';
import { useProfileStore } from 'stores/profile-store';

const store = useProfileStore();
onMounted(store.load);
</script>

<template>
  <div>
    <q-card flat square>
      <q-img src="https://bytelyon-public.s3.amazonaws.com/guest-bg.gif" :ratio="58 / 12" />

      <q-card-section>
        <q-avatar
          size="50px"
          class="absolute"
          style="top: 0; right: 12px; transform: translateY(-50%)"
        >
        </q-avatar>
      </q-card-section>

      <q-separator />
    </q-card>
    <q-form @submit="store.save" @reset="store.reset" class="q-ma-md">
      <q-card flat bordered>
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <img src="~assets/guest-avatar.png" alt="Guest Avatar" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-h5">User Profile</q-item-label>
          </q-item-section>

          <q-item-section side>
            <div class="row q-gutter-sm">
              <div class="col">
                <q-btn label="Reset" color="primary" type="reset" flat />
              </div>
              <div class="col">
                <q-btn label="Save" color="primary" type="submit" class="text-weight-bold" />
              </div>
            </div>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-card-section>
          <q-input v-model="store.proxy.name" label="Name" class="col" autofocus />
        </q-card-section>
      </q-card>
    </q-form>
    <q-inner-loading :showing="store.loading" />
  </div>
</template>
