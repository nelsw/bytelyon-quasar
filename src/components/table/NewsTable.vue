<!--<script setup lang="ts">-->
<!--import { useNewsStore } from 'stores/news-store';-->
<!--import { onMounted } from 'vue';-->
<!--import DeleteBtn from 'components/btn/DeleteBtn.vue';-->
<!--import { date, type QTableColumn, useQuasar } from 'quasar';-->
<!--import NewsDialog from 'components/dialog/NewsDialog.vue';-->
<!--import { type Job, type JobProps } from 'src/types/job';-->
<!--const $q = useQuasar();-->
<!--const store = useNewsStore();-->

<!--const columns: Array<QTableColumn<JobProps>> = [-->
<!--  {-->
<!--    name: 'worked_at',-->
<!--    label: 'Updated',-->
<!--    field: (row: JobProps) => row.worked_at,-->
<!--    align: 'left',-->
<!--    sort: (a, b) => Date.parse(a) - Date.parse(b),-->
<!--  },-->
<!--  {-->
<!--    name: 'name',-->
<!--    label: 'Name',-->
<!--    field: (row) => row.name,-->
<!--    align: 'left',-->
<!--  },-->
<!--  {-->
<!--    name: 'description',-->
<!--    label: 'Description',-->
<!--    field: (row) => row.description,-->
<!--    align: 'left',-->
<!--  },-->
<!--  {-->
<!--    name: 'frequency',-->
<!--    label: 'Frequency',-->
<!--    field: (row) => row.frequency,-->
<!--    align: 'center',-->
<!--  },-->
<!--  {-->
<!--    name: 'keywords',-->
<!--    label: 'Keywords',-->
<!--    field: (row) => row.keywords,-->
<!--    align: 'left',-->
<!--  },-->
<!--  {-->
<!--    name: 'articles',-->
<!--    label: 'Articles',-->
<!--    field: (row) => row.items,-->
<!--    align: 'left',-->
<!--  },-->

<!--  {-->
<!--    name: 'delete',-->
<!--    label: 'Edit | Delete',-->
<!--    field: () => {},-->
<!--  },-->
<!--];-->
<!--const showDialog = (job: Job | undefined = undefined): void => {-->
<!--  $q.dialog({ component: NewsDialog, componentProps: { job } }).onOk(store.save);-->
<!--};-->
<!--onMounted(store.fetch);-->
<!--</script>-->

<!--<template>-->
<!--  <q-table-->
<!--    :columns="columns"-->
<!--    :fullscreen="false"-->
<!--    :loading="store.loading"-->
<!--    :pagination="{ sortBy: 'worked_at' }"-->
<!--    :rows="store.items"-->
<!--    bordered-->
<!--    color="primary"-->
<!--    :row-key="(row) => row.worked_at"-->
<!--    flat-->
<!--  >-->
<!--    <template v-slot:loading>-->
<!--      <q-inner-loading showing color="primary" />-->
<!--    </template>-->
<!--    <template v-slot:top-left>-->
<!--      <q-icon name="mdi-newspaper" size="md" />-->
<!--      <span class="text-h5 q-ml-sm q-mt-xs"> News Feeds </span>-->
<!--    </template>-->
<!--    <template v-slot:top-right>-->
<!--      <q-btn icon="mdi-plus" color="positive" flat dense @click="showDialog()" />-->
<!--    </template>-->
<!--    <template v-slot:body="props">-->
<!--      <q-tr :props="props">-->
<!--        <q-td auto-width>-->
<!--          {{ new Date(props.row.worked_at).toLocaleString() }}-->
<!--        </q-td>-->
<!--        <q-td auto-width>-->
<!--          {{ props.row.name }}-->
<!--        </q-td>-->
<!--        <q-td auto-width>-->
<!--          {{ props.row.description }}-->
<!--        </q-td>-->
<!--        <q-td auto-width style="text-align: center">-->
<!--          {{ props.row.frequency.value + props.row.frequency.unit }}-->
<!--        </q-td>-->
<!--        <q-td auto-width>-->
<!--          <q-chip-->
<!--            v-for="(label, key) in props.row.keywords"-->
<!--            :key="key"-->
<!--            :label="label"-->
<!--            color="primary"-->
<!--            dense-->
<!--            outline-->
<!--            square-->
<!--          />-->
<!--        </q-td>-->
<!--        <q-td auto-width>-->
<!--          <q-btn dense flat @click="props.expand = !props.expand">-->
<!--            <q-icon-->
<!--              :name="props.expand ? 'mdi-chevron-down' : 'mdi-chevron-up'"-->
<!--              color="primary"-->
<!--              size="xs"-->
<!--            />-->
<!--            <span style="font-size: 13px; padding-right: 5px">{{ props.row?.items?.length ?? 0 }}</span>-->
<!--          </q-btn>-->
<!--        </q-td>-->
<!--        <q-td auto-width style="direction: rtl">-->
<!--          <DeleteBtn id=""/>-->
<!--          <q-btn-->
<!--            size="sm"-->
<!--            flat-->
<!--            round-->
<!--            color="warning"-->
<!--            icon="mdi-pencil"-->
<!--            @click="showDialog(props.row)"-->
<!--          />-->
<!--        </q-td>-->
<!--      </q-tr>-->
<!--      <q-tr v-show="props.expand" :props="props">-->
<!--        <q-td colspan="100%">-->
<!--          <q-table-->
<!--            :columns="[-->
<!--              {-->
<!--                name: 'published',-->
<!--                label: 'Published',-->
<!--                field: (row) => row.published,-->
<!--                format: (val) => new Date(val).toDateString(),-->
<!--                align: 'left',-->
<!--                sort: (a, b) => Date.parse(a) - Date.parse(b),-->
<!--              },-->
<!--              {-->
<!--                name: 'source',-->
<!--                label: 'Source',-->
<!--                field: (row) => row.title,-->
<!--                align: 'left',-->
<!--              },-->
<!--            ]"-->
<!--            :fullscreen="false"-->
<!--            :rows="props.row?.items"-->
<!--            dense-->
<!--            flat-->
<!--            hide-header-->
<!--            :pagination="{ sortBy: 'published', descending: true }"-->
<!--            :rows-per-page-options="[10, 50, 100, 0]"-->
<!--            :row-key="(row) => row.published"-->
<!--          >-->
<!--            <template v-slot:body="props">-->
<!--              <q-tr :props="props" v-if="props.row.source">-->
<!--                <q-td auto-width>-->
<!--                  {{ date.formatDate(props.row.published, 'MM/DD/YYYY') }}-->
<!--                </q-td>-->
<!--                <q-td auto-width>-->
<!--                  <q-btn dense flat target="_blank" :href="props.row.link" no-caps size="sm">-->
<!--                    <q-icon name="mdi-open-in-new" color="primary" size="xs" class="q-mr-sm" />-->
<!--                    <span style="font-size: 13px">-->
<!--                      {{-->
<!--                        props.row.title.lastIndexOf(' - ') < 0-->
<!--                          ? props.row.title-->
<!--                          : props.row.title.substring(0, props.row.title.lastIndexOf(' - '))-->
<!--                      }}-->
<!--                    </span>-->
<!--                  </q-btn>-->
<!--                </q-td>-->
<!--              </q-tr>-->
<!--            </template>-->
<!--          </q-table>-->
<!--        </q-td>-->
<!--      </q-tr>-->
<!--    </template>-->
<!--  </q-table>-->
<!--</template>-->
