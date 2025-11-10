<script setup lang="ts">
import { onMounted } from 'vue';
import { useProfileStore } from 'stores/profile-store';

const store = useProfileStore();
onMounted(store.load);
</script>

<template>
  <q-page padding>
    <q-form @submit="store.save" @reset="store.reset">
      <q-card flat bordered>
        <q-inner-loading :showing="store.loading" />
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <q-icon name="mdi-account" size="lg" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-h5">Profile</q-item-label>
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
  </q-page>
</template>
