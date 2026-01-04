<script setup lang="ts">
import type { QTree, QTreeNode } from 'quasar';
import { onMounted, ref, useTemplateRef } from 'vue';
// import { useProwlerStore } from 'stores/prowler-store';
// import { type ProwlerNews } from 'src/types/prowler';
// import { decodeTime } from 'ulid';
// import { NewsIcon } from 'src/types/base';
defineProps<{
  color: string;
}>();

// const store = useProwlerStore();
const filter = defineModel<string>('filter');
const nodes = ref<QTreeNode[]>([
  {
    id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/corsair marine 970',
    label: 'corsair marine 970',
    noTick: true,
    expandable: true,
    selectable: false,
    children: [
      {
        id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/corsair marine 970/2025-12-28',
        label: '2025-12-28',
        noTick: true,
        expandable: true,
        selectable: false,
        children: [
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/corsair marine 970/01KDHT71S0CKMNK9B2RE0QFPJE.json',
            label: 'Corsair RX Titan for LGA1200',
            noTick: true,
            expandable: true,
            selectable: true,
            data: {
              url: 'https://forum.corsair.com/forums/topic/194135-corsair-rx-titan-for-lga1200/',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/corsair marine 970/01KDJ8GT70C6PG6A4X8JT1CPA8.json',
            label: 'Corsair Virtuoso blinking red, not turning on',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://forum.corsair.com/forums/topic/159712-corsair-virtuoso-blinking-red-not-turning-on/',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/corsair marine 970/01KDHVTAD00XTZ9TDNZRBCZ2XZ.json',
            label: 'Download hundreds of FREE Corsair iCUE profiles ... - Corsair Community',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://forum.corsair.com/forums/topic/189081-download-hundreds-of-free-corsair-icue-profiles-this-is-the-largest-rgb-profile-library-that-im-still-updating/',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/corsair marine 970/01KDJ4VM7027ZDE909A2PK4A0G.json',
            label: 'Forums - Corsair Community',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://forum.corsair.com/forums',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/corsair marine 970/01KDJFG6N05Y11ENFKGYPXT5CP.json',
            label: 'Home - Corsair Community',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://forum.corsair.com/',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/corsair marine 970/01KDJF3CG0GPJPRRT08HWJZ87D.json',
            label: "iCue can't repair or uninstall - Corsair Community",
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://forum.corsair.com/forums/topic/185756-icue-cant-repair-or-uninstall/',
            },
          },
        ],
      },
      {
        id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/corsair marine 970/2025-12-27',
        label: '2025-12-27',
        noTick: true,
        expandable: true,
        selectable: false,
        children: [
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/corsair marine 970/01KDH0T250RQ49MKCQFZKGGTDV.json',
            label: 'Choosing New Memory for Your System - Corsair Community',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://forum.corsair.com/blog/memory/choosing-new-memory-for-your-system/',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/corsair marine 970/01KDHBVER0JDX59WFG2WY44K01.json',
            label: 'GPU watercooler block - which 5090 card to choose? - Corsair Community',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://forum.corsair.com/forums/topic/192880-gpu-watercooler-block-which-5090-card-to-choose/',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/corsair marine 970/01KDHEA690XQ57W9DB8EVV8XNE.json',
            label: 'RX titan 360 Screen Setup no longer showing up - Corsair Community',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://forum.corsair.com/forums/topic/193634-rx-titan-360-screen-setup-no-longer-showing-up/',
            },
          },
        ],
      },
      {
        id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/corsair marine 970/2017-09-11',
        label: '2017-09-11',
        noTick: true,
        expandable: true,
        selectable: false,
        children: [
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/corsair marine 970/01BSQVSNC0ESTERXGG4P7T2K9W.json',
            label: 'Best Boats Nominees 2018 - Sail Magazine',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://sailmagazine.com/boats/best-boats-nominees-2018/',
            },
          },
        ],
      },
    ],
    data: {
      user_id: '01K48PC0BK13BWV2CGWFP8QQH0',
      id: 'corsair marine 970',
      type: 'news',
      prowled: '01KDJFG6N05Y11ENFKGYPXT5CP',
      frequency: 0,
      duration: 3864843667,
    },
  },
  {
    id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/corsair marine 880',
    label: 'corsair marine 880',
    noTick: true,
    expandable: true,
    selectable: false,
    children: [
      {
        id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/corsair marine 880/2025-12-28',
        label: '2025-12-28',
        noTick: true,
        expandable: true,
        selectable: false,
        children: [
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/corsair marine 880/01KDHT71S0CKMNK9B2RE0QFPJE.json',
            label: 'Corsair RX Titan for LGA1200',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://forum.corsair.com/forums/topic/194135-corsair-rx-titan-for-lga1200/',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/corsair marine 880/01KDJ8GT70C6PG6A4X8JT1CPA8.json',
            label: 'Corsair Virtuoso blinking red, not turning on',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://forum.corsair.com/forums/topic/159712-corsair-virtuoso-blinking-red-not-turning-on/',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/corsair marine 880/01KDHVTAD00XTZ9TDNZRBCZ2XZ.json',
            label: 'Download hundreds of FREE Corsair iCUE profiles ... - Corsair Community',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://forum.corsair.com/forums/topic/189081-download-hundreds-of-free-corsair-icue-profiles-this-is-the-largest-rgb-profile-library-that-im-still-updating/',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/corsair marine 880/01KDJ4VM7027ZDE909A2PK4A0G.json',
            label: 'Forums - Corsair Community',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://forum.corsair.com/forums',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/corsair marine 880/01KDJFG6N05Y11ENFKGYPXT5CP.json',
            label: 'Home - Corsair Community',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://forum.corsair.com/',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/corsair marine 880/01KDJF3CG0GPJPRRT08HWJZ87D.json',
            label: "iCue can't repair or uninstall - Corsair Community",
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://forum.corsair.com/forums/topic/185756-icue-cant-repair-or-uninstall/',
            },
          },
        ],
      },
      {
        id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/corsair marine 880/2025-12-27',
        label: '2025-12-27',
        noTick: true,
        expandable: true,
        selectable: false,
        children: [
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/corsair marine 880/01KDH0T250RQ49MKCQFZKGGTDV.json',
            label: 'Choosing New Memory for Your System - Corsair Community',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://forum.corsair.com/blog/memory/choosing-new-memory-for-your-system/',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/corsair marine 880/01KDHBVER0JDX59WFG2WY44K01.json',
            label: 'GPU watercooler block - which 5090 card to choose? - Corsair Community',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://forum.corsair.com/forums/topic/192880-gpu-watercooler-block-which-5090-card-to-choose/',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/corsair marine 880/01KDHEA690XQ57W9DB8EVV8XNE.json',
            label: 'RX titan 360 Screen Setup no longer showing up - Corsair Community',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://forum.corsair.com/forums/topic/193634-rx-titan-360-screen-setup-no-longer-showing-up/',
            },
          },
        ],
      },
      {
        id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/corsair marine 880/2025-05-22',
        label: '2025-05-22',
        noTick: true,
        expandable: true,
        selectable: false,
        children: [
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/corsair marine 880/01JVVCNBC01W6Q8HHP5ZQNGZ1X.json',
            label: 'Corsair 880 review: Fantastic, sporty, trailable trimaran - Yachting Monthly',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.yachtingmonthly.com/reviews/yacht-reviews/corsair-880-review-fantastic-sporty-trailable-trimaran',
            },
          },
        ],
      },
      {
        id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/corsair marine 880/2024-09-10',
        label: '2024-09-10',
        noTick: true,
        expandable: true,
        selectable: false,
        children: [
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/corsair marine 880/01J7DBPSC03RZRDN97MQM1GZSQ.json',
            label: 'A Shipload of Corsair 880’s Arrive in Australia - Marine Business News',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.marinebusinessnews.com.au/2024/09/a-shipload-of-corsair-880s-arrive-in-australia/',
            },
          },
        ],
      },
      {
        id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/corsair marine 880/2023-06-01',
        label: '2023-06-01',
        noTick: true,
        expandable: true,
        selectable: false,
        children: [
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/corsair marine 880/01H1TW34C06Z9PV0A0QFDJSJXB.json',
            label:
              'Three is the perfect number! Corsair 880 (8.8 m), the trimaran with folding wings - Giornale della Vela',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.giornaledellavela.com/2023/06/01/three-is-the-perfect-number-corsair-880-the-trimaran-with-folding-wings/?lang=en',
            },
          },
        ],
      },
      {
        id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/corsair marine 880/2022-08-19',
        label: '2022-08-19',
        noTick: true,
        expandable: true,
        selectable: false,
        children: [
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/corsair marine 880/01GATEDJC02QZPZ5DHJT3A77WM.json',
            label: 'Sailing The Corsair 880 Sport Trimaran - Mysailing',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.mysailing.com.au/sailing-the-corsair-880-sport-trimaran/',
            },
          },
        ],
      },
      {
        id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/corsair marine 880/2022-06-24',
        label: '2022-06-24',
        noTick: true,
        expandable: true,
        selectable: false,
        children: [
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/corsair marine 880/01G6A85AC0ZBE7XARHMVRP5YN5.json',
            label: 'Corsair 880 debuts at Sydney International Boat Show - Mysailing',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.mysailing.com.au/corsair-880-debuts-at-sydney-international-boat-show/',
            },
          },
        ],
      },
      {
        id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/corsair marine 880/2021-11-08',
        label: '2021-11-08',
        noTick: true,
        expandable: true,
        selectable: false,
        children: [
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/corsair marine 880/01FKZ8ZA00EP898T2NJS3QM4F5.json',
            label: 'Boat Review: Corsair 880 - Sail Magazine',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://sailmagazine.com/boats/boat-review-corsair-880/',
            },
          },
        ],
      },
      {
        id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/corsair marine 880/2021-04-14',
        label: '2021-04-14',
        noTick: true,
        expandable: true,
        selectable: false,
        children: [
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/corsair marine 880/01F37JVYC081SVZKWHS8Q8ST7H.json',
            label: 'The Corsair Nationals 2021 recap - Sail-World.com',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.sail-world.com/news/236703/The-Corsair-Nationals-2021-recap',
            },
          },
        ],
      },
      {
        id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/corsair marine 880/2020-12-08',
        label: '2020-12-08',
        noTick: true,
        expandable: true,
        selectable: false,
        children: [
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/corsair marine 880/01ES0NTH00FYWJ1P9QVHMBESS3.json',
            label: 'Corsair 880: Best Sport Boat - Cruising World Magazine',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.cruisingworld.com/story/sailboats/corsair-880-best-sport-boat-2021-boty/',
            },
          },
        ],
      },
      {
        id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/corsair marine 880/2019-06-01',
        label: '2019-06-01',
        noTick: true,
        expandable: true,
        selectable: false,
        children: [
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/corsair marine 880/01DC8XD1C0AMKXQJT43RR9VM93.json',
            label: 'Corsair 880 trimaran Development Update 2 - Sail World Cruising',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.sailworldcruising.com/news/218021/Corsair-880-trimaran-Development-Update-2',
            },
          },
        ],
      },
    ],
    data: {
      user_id: '01K48PC0BK13BWV2CGWFP8QQH0',
      id: 'corsair marine 880',
      type: 'news',
      prowled: '01KDJFG6N05Y11ENFKGYPXT5CP',
      frequency: 0,
      duration: 7224326667,
    },
  },
  {
    id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today',
    label: 'silver price today',
    noTick: true,
    expandable: true,
    selectable: false,
    children: [
      {
        id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/2026-01-03',
        label: '2026-01-03',
        noTick: true,
        expandable: true,
        selectable: false,
        children: [
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KE171XR0H1TBK0883JJQXYN8.json',
            label: 'Seeking Alpha - Will The Silver Boom Raise The Price Of Tech?',
            noTick: true,
            expandable: true,
            selectable: true,
            data: {
              url: 'https://seekingalpha.com/article/4856936-will-silver-boom-raise-price-of-tech',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KE1TCTE0G9T0VAPPSFJA6DZ7.json',
            label:
              'Times of India - Gold \u0026 silver price prediction: Will gold touch Rs 2 lakh/10 grams \u0026 silver Rs 3 lakh/kg in 2026?',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://timesofindia.indiatimes.com/business/india-business/gold-silver-price-prediction-will-gold-touch-rs-2-lakh/10-grams-silver-rs-3-lakh/kg-in-2026/articleshow/126321365.cms',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KE1K7FJ85JVV1PMEN5WN80MQ.json',
            label:
              'livemint.com - US attacks Venezuela: What does it mean for gold, silver, crude oil prices and the Indian stock market?',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.livemint.com/market/stock-market-news/us-attacks-venezuela-what-does-it-mean-for-gold-silver-crude-oil-prices-and-the-indian-stock-market-11767431944349.html',
            },
          },
        ],
      },
      {
        id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/2026-01-02',
        label: '2026-01-02',
        noTick: true,
        expandable: true,
        selectable: false,
        children: [
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDZTR8GG7FS4ZNPRWZ3SVR59.json',
            label: 'CBS News - What is a good amount of silver to own in 2026?',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.cbsnews.com/news/what-is-a-good-amount-of-silver-to-own-in-2026/',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDZHH36GFCVR4D08MSJP5KPH.json',
            label:
              'CCN.com - Silver at $130 While Screens Say $71 — Could Physical Repricing Break Banks and Crash Bitcoin?',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.ccn.com/education/crypto/silver-130-vs-71-physical-repricing-banks-collapse-bitcoin-crash/',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDYWNHW0CNJS6GXZJ7QJ0EV8.json',
            label:
              'FXEmpire - Gold (XAUUSD) \u0026 Silver Price Forecast: XAU Near $4,400, XAG Eyes $76 as Momentum Stabilizes',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.fxempire.com/forecasts/article/gold-xauusd-silver-price-forecast-xau-near-4400-xag-eyes-76-as-momentum-stabilizes-1570693',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDZMRDV0QTZZPCK8VNRS5BGT.json',
            label: 'FXEmpire - Silver Price Outlook – Silver Continues to Consolidate',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.fxempire.com/forecasts/article/silver-price-outlook-silver-continues-to-consolidate-5-1570770',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDZQGAB0A770QMGGWR5JZBYV.json',
            label: 'FXEmpire - Silver Price Outlook – Silver Sees Volatile Week',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.fxempire.com/forecasts/article/silver-price-outlook-silver-sees-volatile-week-1570774',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDZ15H9GGM7E0NV6M1NZEY10.json',
            label: 'FXStreet - Silver price today: rises on January 2',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.fxstreet.com/news/silver-price-today-silver-rises-according-to-fxstreet-data-202601020938',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDZT9260V1E98065C4VQQAKG.json',
            label: 'Fox Business - Gold, silver shined in 2025, can the luster hold in 2026?',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.foxbusiness.com/markets/gold-soars-66-record-year-experts-eye-ambitious-5000-per-ounce-target-2026',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KE01GJCGHWAZMEH3WSD6YR9Q.json',
            label: 'KITCO - Gold and silver have topped, but look for dip-buying next week',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.kitco.com/news/article/2026-01-02/gold-and-silver-have-topped-look-dip-buying-next-week',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDYMB4FGGGV5R0Q0C4TTTSEY.json',
            label:
              'MSN - Silver rate today jumps 2% amid bullish global cues - Will the rally continue in 2026?',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.msn.com/en-in/money/markets/silver-rate-today-jumps-2-amid-bullish-global-cues-will-the-rally-continue-in-2026/ar-AA1TqOpC',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KE0S30Z059YFCWFNXS0AZ6FX.json',
            label: 'Meyka - Silver Today, January 03: Prices Rebound on Safe-Haven Demand',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://meyka.com/blog/silver-today-january-03-prices-rebound-on-safe-haven-demand-0301/',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDZBYN7RVBWKHTE9JKGY9G0Q.json',
            label: 'Meyka - Silver and Gold Today, January 02: Safe‑Haven Bid Lifts Prices Again',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://meyka.com/blog/silver-and-gold-today-january-02-safehaven-bid-lifts-prices-again-0201/',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDZD0G8073S4NMX03CCKSS5F.json',
            label:
              'Nevada Current - The price of gold skyrocketed in 2025. Silver outperformed it, and it wasn’t close.',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://nevadacurrent.com/2026/01/02/the-price-of-gold-skyrocketed-in-2025-silver-outperformed-it-and-it-wasnt-close/',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KE1091A8E00E079BGCWWAJ5E.json',
            label:
              'News18 - Gold, Silver Prices Rise Today: Check 24K And 22K Gold Rates In Your City On January 3',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.news18.com/business/savings-and-investments/gold-silver-prices-rise-today-check-24k-and-22k-gold-rates-in-your-city-on-january-3-ws-l-9806891.html',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KE09CVM8AZPHAS69A1WWC8Z3.json',
            label:
              "Seeking Alpha - $80 Silver Is Still A Grossly Overvalued Sell, It's Not A Buy(NYSEARCA:SLV)",
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://seekingalpha.com/article/4856875-80-silver-is-still-a-grossly-overvalued-sell-its-not-a-buy',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDZCZD302TCK2G5FNYDRDHZ4.json',
            label: 'Seeking Alpha - 5 Predictions For 2026: Gold, Silver, Bitcoin, AI, Geopolitics',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://seekingalpha.com/article/4856778-5-predictions-for-2026-gold-silver-bitcoin-ai-geopolitics',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDZV9F9GKQ05YA0M2CW6B3SV.json',
            label:
              'Seeking Alpha - Silver: Naked Longs Get Taken Out On COMEX Default Theories (NYSEARCA:SLV)',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://seekingalpha.com/article/4856833-silver-naked-longs-get-taken-out-on-comex-default-theories',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KE0S1YS8CMX2HYB25C321QCP.json',
            label:
              'livemint.com - Gold-silver ratio jumps to 60; is it the right time to invest in gold?',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.livemint.com/market/commodities/gold-rate-today-silver-rate-today-gold-silver-ratio-jumps-to-60-is-it-the-right-time-to-invest-in-gold-11767404071525.html',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KE102Y08Z9EQCZPH1GQCDA5H.json',
            label: 'livemint.com - Silver rate today: White metal may crash 60% if..., say experts',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.livemint.com/market/commodities/silver-rate-today-white-metal-may-crash-60-if-say-experts-11767411897408.html',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KE01JYJ0TR4NJ3TBS1A28RQP.json',
            label:
              'ts2.tech - Silver price stock today: SLV ticks higher as bullion firms, miners lag',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://ts2.tech/en/silver-price-stock-today-slv-ticks-higher-as-bullion-firms-miners-lag/',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDZMDK58K026ZRSK1BN0K2PT.json',
            label:
              'ts2.tech - Silver price today: SLV jumps 4% as spot silver rallies again in early 2026 trade',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://ts2.tech/en/silver-price-today-slv-jumps-4-as-spot-silver-rallies-again-in-early-2026-trade/',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDZCCTBRCT6SR93B42S5HX6K.json',
            label:
              'ts2.tech - Silver price today: SLV jumps in premarket as bullion rebounds on Fed rate-cut bets',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://ts2.tech/en/silver-price-today-slv-jumps-in-premarket-as-bullion-rebounds-on-fed-rate-cut-bets/',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KE0BJH403Y3VM8HME4TCR8HA.json',
            label:
              'ts2.tech - Silver price today: SLV rises after-hours as spot silver steadies near $72 on Fed-cut bets',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://ts2.tech/en/silver-price-today-slv-rises-after-hours-as-spot-silver-steadies-near-72-on-fed-cut-bets/',
            },
          },
        ],
      },
      {
        id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/2026-01-01',
        label: '2026-01-01',
        noTick: true,
        expandable: true,
        selectable: false,
        children: [
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDX8A4K0FKGCBE6GM67S4NTD.json',
            label:
              "Seeking Alpha - Comex Liquidation: Why CME's $25K Margin Hike Is Bailout, Not Crash - China Ban Decoupling",
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://seekingalpha.com/article/4856704-comex-liquidation-cme-25k-margin-hike-bailout-not-crash-china-ban-decoupling',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDXF038RXX5RQF56AE4PY56P.json',
            label:
              "Yahoo Finance - Peter Schiff Says Silver Investors Are In 'Denial' As Mining Stocks Continue To Lag: 'Should Have Doubled' In December",
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://finance.yahoo.com/news/peter-schiff-says-silver-investors-190151460.html',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDYCS5A8F48P3A68RTZV3Z7H.json',
            label:
              'livemint.com - Silver rate today jumps 2% amid bullish global cues - Will the rally continue in 2026?',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.livemint.com/market/commodities/silver-rate-today-jumps-2-amid-bullish-global-cues-will-the-silver-price-rally-continue-in-2026-11767324932269.html',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDVZTXAGJNVMDNZGZ2A1ZZ45.json',
            label:
              'livemint.com - Silver rate today remains flat on MCX after a record run in 2025 - Will the silver price rally continue in 2026?',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.livemint.com/market/commodities/silver-rate-today-remain-flat-on-mcx-after-a-record-run-in-2025-will-the-silver-price-rally-continue-in-2026-11767238745037.html',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDXMCAZRSF5PTHJH9N41BFYJ.json',
            label:
              'ts2.tech - Silver price forecast 2026: What comes next after the $80 breakout and 161% surge',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://ts2.tech/en/silver-price-forecast-2026-what-comes-next-after-the-80-breakout-and-161-surge/',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDXBY0K879GX19YP72EVG8P5.json',
            label:
              'ts2.tech - Silver price today: SLV slides as CME margin hike and China export rules shake silver stocks',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://ts2.tech/en/silver-price-today-slv-slides-as-cme-margin-hike-and-china-export-rules-shake-silver-stocks/',
            },
          },
        ],
      },
      {
        id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/2025-12-31',
        label: '2025-12-31',
        noTick: true,
        expandable: true,
        selectable: false,
        children: [
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDT1QPG875VCM4PKGD2B89RY.json',
            label: 'BBC - Gold and silver see rollercoaster end to blockbuster year',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.bbc.com/news/articles/cp393nz95y5o',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDT7QAB0E9KTG3G76NRWYW94.json',
            label: "Barron's - Silver Prices Plummet After Record Surge. The Rally Is Dangerous.",
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.barrons.com/articles/silver-prices-fall-gold-rally-51084361?gaa_at=eafs\u0026gaa_n=AWEtsqcvU7Vmby4ZjR8bVKgCWwcq2626_Zb4oiSyjI4B8oGg1y-ywkMDasWF\u0026gaa_ts=695933a4\u0026gaa_sig=lB7WqODkF9jWOlXy6A7pXziWmcYHKd0SdWGcQUsEvhEbvwzfONj-diBuOiNK-FWDq8JAtA-Bv6rYqHprKo-Z1Q%3D%3D',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDT6PRB8KR98QM8J1GB7A3E0.json',
            label: 'BullionVault - Record Gold Price Ends 2025 Up 65%, Silver Jumps 144%',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.bullionvault.com/gold-news/gold-price-news/gold-silver-2025-record-price-123120251',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDSVQRX0GYA5M9Y4CQP12VCX.json',
            label:
              'Finance Magnates - Why Silver Is Falling With Gold and Why Robert Kiyosaki Predicts a $200 Price by 2026',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.financemagnates.com/trending/why-silver-is-falling-with-gold-and-why-robert-kiyosaki-predicts-a-200-price-by-2026/',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDT9V2A01VHV2GQV92DK2G7C.json',
            label: 'Fortune - Current price of silver as of Wednesday, December 31, 2025',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://fortune.com/article/current-price-of-silver-12-31-2025/',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDTWAG309TAJAT7DSJS4VS5Z.json',
            label: 'Gulfshore Business - Price surge of gold and silver spikes investor demand',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.gulfshorebusiness.com/news/gold-and-silver-prices-skyrocket-in-southwest-florida/article_bd6020f2-eec2-4eaf-be06-4a18ff0ddb03.html',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDT0Z890T8JEXRCV6T37YF18.json',
            label: 'KITCO - Gold price down, silver strongly down amid extreme volatility',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.kitco.com/news/article/2025-12-31/gold-price-down-silver-strongly-down-amid-extreme-volatility',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDTDYX20DRN04CQZK7PFH514.json',
            label: 'KITCO - Selling pressure in gold, silver; Friday’s trade may be key',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.kitco.com/news/article/2025-12-31/selling-pressure-gold-silver-fridays-trade-may-be-key',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDTJ6D006NWKDM7BDTHP6CC1.json',
            label:
              'Newsweek - Gold and Silver Price Predictions for 2026 After Huge Gains This Year',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.newsweek.com/gold-and-silver-price-predictions-for-2026-after-huge-gains-this-year-11289726',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDTDQFR8D9AXGSANTSASQVV1.json',
            label:
              'Seeking Alpha - Shorting Silver: Quick Trade To Start The New Year (Rating Downgrade) (XAGUSD:CUR)',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://seekingalpha.com/article/4856548-shorting-silver-quick-trade-to-start-the-new-year-rating-downgrade',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDVPXY60CG2DABCH30SPWE9P.json',
            label: 'The Wall Street Journal - Silver Price Slides After CME Hikes Margins Again',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.wsj.com/livecoverage/stock-market-today-dow-sp-500-nasdaq-12-31-2025/card/silver-other-metal-prices-slide-after-cme-hikes-margins-again-MUk07KsA63vETAh2NWQU?gaa_at=eafs\u0026gaa_n=AWEtsqeKUSRp2WlSdzKx0E_eRymsNV1kwcKlnbINE9KIgU6SJI1P6SXZHFz0\u0026gaa_ts=695933a4\u0026gaa_sig=SCeCypKVF_ZbbanNcn6Vfo0LQlUsyR6ZbGiE_iUsnKwFTl_uXY-dAtq050fTt-UlczmDdhFgbXjmeam8mA3kyQ%3D%3D',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDVXZ5706PEY8X352A7YM9HY.json',
            label:
              "Times of India - Gold \u0026 silver price prediction: What's the outlook for gold, silver in the New Year? Top things to know",
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://timesofindia.indiatimes.com/business/india-business/gold-silver-price-prediction-today-what-is-the-gold-rate-outlook-for-january-01-2026-should-you-buy-or-sell-mcx-gold-mcx-silver/articleshow/126276504.cms',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDSFMEC0K5E2ZRTA80JMF1M2.json',
            label:
              "Times of India - Silver price crash today: White metal plunges Rs 15,000 — what's the outlook?",
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://timesofindia.indiatimes.com/business/india-business/silver-price-crash-today-white-metal-plunges-rs-15000-whats-the-outlook/articleshow/126264595.cms',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDV3ZMT86S8BBJ9DMMBGXRMM.json',
            label:
              "Yahoo Finance - 'We're in a metals war': Gold, silver track their best year since 1970s as volatility grips trade",
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://finance.yahoo.com/news/were-in-a-metals-war-gold-silver-track-their-best-year-since-1970s-as-volatility-grips-trade-211053662.html',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDTD0CG0DQXD9CA51EYTPT6C.json',
            label:
              "thestreet.com - Analyst eyes 'calm before storm' as gold and silver hit record highs",
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.thestreet.com/crypto/markets/analyst-eyes-calm-before-storm-as-gold-and-silver-hit-record-highs',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDSV3BJRXAGRMMHKGJN1VWD4.json',
            label:
              'ts2.tech - Silver price stock today: SLV in focus as spot silver drops 7% from record highs',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://ts2.tech/en/silver-price-stock-today-slv-in-focus-as-spot-silver-drops-7-from-record-highs/',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDTW6WVGQP0T90W52PJ9411M.json',
            label:
              'ts2.tech - Silver price today: SLV slides as year-end profit-taking hits the metal',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://ts2.tech/en/silver-price-today-slv-slides-as-year-end-profit-taking-hits-the-metal/',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDSMDCX0FHXEBZAWBPWN02VR.json',
            label: 'vocal.media - Why People Are Paying Attention to Silver Prices Today',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://vocal.media/trader/why-people-are-paying-attention-to-silver-prices-today',
            },
          },
        ],
      },
      {
        id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/2025-12-30',
        label: '2025-12-30',
        noTick: true,
        expandable: true,
        selectable: false,
        children: [
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDRAACD81EAPZTT50837XJTQ.json',
            label: "ABC News - What's driving the rollercoaster in gold and silver prices?",
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://abcnews.go.com/Business/driving-rollercoaster-gold-silver-prices/story?id=128778017',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDR9G7G0AXZ51JS7GR81PXYK.json',
            label:
              "CBS News - Silver is rebounding after its worst trading day in four years. Here's what is behind the move.",
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.cbsnews.com/news/why-silver-gold-prices-have-soared-in-2025/',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDQR11Y8TN6ABQYCZHCYJ9XR.json',
            label: 'Fortune - Current price of silver as of Tuesday, December 30, 2025',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://fortune.com/article/current-price-of-silver-12-30-2025/',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDQKQ6T04GEHQHPY7S565WS2.json',
            label: 'Investing.com - Silver: Physical Demand Killing Price Manipulation',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.investing.com/analysis/silver-physical-demand-killing-price-manipulation-200672511',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDQCP3P0Z9S2762MQJ69A1KT.json',
            label: 'KITCO - Strong price rebounds for gold, silver',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.kitco.com/news/article/2025-12-30/strong-price-rebounds-gold-silver',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDR1CYM082R8DNXFVVCDW7ZA.json',
            label:
              'MarketWatch - Why silver’s surge relative to oil should be a warning sign for investors',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.marketwatch.com/story/why-silvers-surge-relative-to-oil-should-be-a-warning-sign-for-investors-2255c89a?gaa_at=eafs\u0026gaa_n=AWEtsqeN8idFmTnjeeHZSw9mXYe8s7NkRjUm3D-d1UAAwhz6J7uBkXIveLz3\u0026gaa_ts=695933a4\u0026gaa_sig=9Xud-FdO3foHUkFxGH2D1R5dN1WX58ax0ED8Lv7tXgmxkpPGqXeQ1dfC-a0Yn4rA31EBbhZRiHAlACgTjhaeiw%3D%3D',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDR7GBHRYZF934NJV5RFRCAZ.json',
            label: 'NBC News - Gold, silver head for biggest annual gains in over 40 years',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.nbcnews.com/business/markets/gold-silver-prices-soar-rcna251490',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDR1GRP85BYST8PXAVZWHQWY.json',
            label: "Seeking Alpha - Silver's Blow-Off Risk Is Growing, Even With Tight Supply",
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://seekingalpha.com/article/4856389-silver-blow-off-risk-is-growing-even-with-tight-supply',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDQ3FA30J45PXQ7T9CMZ2F26.json',
            label:
              'Times of India - Gold \u0026 silver price prediction: Where are gold \u0026 silver headed in 2026? Here’s the outlook',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://timesofindia.indiatimes.com/business/india-business/gold-silver-price-prediction-where-are-gold-silver-headed-in-2026-heres-the-outlook/articleshow/126246875.cms',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDSBJE70M40FKZQ4ZEEE8P94.json',
            label:
              'Times of India - Gold price prediction today: What’s the outlook for gold, silver prices in the coming days?What you shoul',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://timesofindia.indiatimes.com/business/india-business/gold-price-prediction-today-india-where-is-gold-silver-rate-headed-on-december-31-2025-mcx-gold-futures-outlook/articleshow/126263234.cms',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDQXCF9GPSHJERXQDCXVM06Q.json',
            label:
              'ts2.tech - Silver price rebounds after margin shock; SLV jumps as China export list and Fed minutes loom',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://ts2.tech/en/silver-price-rebounds-after-margin-shock-slv-jumps-as-china-export-list-and-fed-minutes-loom/',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDR9SJAGGNCV5QM19TVMTBC5.json',
            label:
              'ts2.tech - Silver price today: SLV jumps nearly 7% as silver rebounds after record-high rout',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://ts2.tech/en/silver-price-today-slv-jumps-nearly-7-as-silver-rebounds-after-record-high-rout/',
            },
          },
        ],
      },
      {
        id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/2025-12-29',
        label: '2025-12-29',
        noTick: true,
        expandable: true,
        selectable: false,
        children: [
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDMV57A018FW164ZP1SP0V2H.json',
            label: 'Bloomberg.com - Why Silver Price Has Been Surging Even More Than Gold',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.bloomberg.com/news/articles/2025-12-29/silver-price-hits-record-high-why-it-has-been-surging-even-more-than-gold',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDNCA5Q02TWSETBW8ZYZG8D4.json',
            label:
              "Business Insider - Inside the Chinese retail-trading frenzy that's pushed silver prices to record highs",
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.businessinsider.com/silver-price-today-record-high-china-arbitrage-precious-metals-speculation-2025-12',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDP4BA0RNMXF6RJSFA9581AN.json',
            label: 'Forbes - Silver Price Today Overtakes NVIDIA And Crypto In Brief Historic Flip',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.forbes.com/sites/digital-assets/2025/12/29/silver-price-today-overtakes-nvidia-and-crypto-in-brief-historic-flip/',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDNA232G2RDNM0M9C5PHVGNH.json',
            label: 'Fortune - Current price of silver as of Monday, December 29, 2025',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://fortune.com/article/current-price-of-silver-12-29-2025/',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDP0DDPGR3QQK7J7AGJVRAAF.json',
            label:
              "Investopedia - Gold and Silver Prices Plunged Monday After Last Week's Big Rally. Here's Why.",
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.investopedia.com/gold-and-silver-prices-plunged-monday-after-big-rally-here-is-why-precious-metals-11877050',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDMTD1W09H2MT9ZSJ4YZP08V.json',
            label: 'KITCO - Profit-taking price pressure on gold, silver',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.kitco.com/news/article/2025-12-29/profit-taking-price-pressure-gold-silver',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDPSY2GGTAB5V5R1QP1MB02X.json',
            label:
              'MSN - Silver rate today rebounds after a sharp one-day fall: Why the silver price rally is structural, not just a bubble',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.msn.com/en-in/money/markets/silver-rate-today-rebounds-after-a-sharp-one-day-fall-why-the-silver-price-rally-is-structural-not-just-a-bubble/ar-AA1TfNOJ',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDMGVQBRT1N91S13MVZKXSBA.json',
            label:
              'The Economic Times - Silver price crashes Rs 21,000 in an hour as overheated rally cools after breaching Rs 2.5 lakh/kg',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://m.economictimes.com/markets/commodities/news/silver-price-crashes-by-rs-21000-in-1-hour-as-sanity-prevails-after-overheated-rally/articleshow/126227208.cms',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDN1RC4RGDVXKHJ57T204QS4.json',
            label:
              'The Economic Times - Silver price today: Why did silver prices fall sharply after hitting record high above $80? Key reasons ex',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://m.economictimes.com/news/international/us/silver-price-today-why-did-silver-prices-fall-sharply-after-record-high-above-80-key-reasons-explained/articleshow/126232406.cms',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDPPPZP0T3QX8DJVP2D5AJAN.json',
            label:
              'The Wall Street Journal - Silver Prices Suffer Biggest One-Day Fall Since 2021, Gold Also Drops',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.wsj.com/livecoverage/stock-market-today-dow-sp-500-nasdaq-12-29-2025/card/gold-and-silver-prices-slump-after-cme-raises-margin-requirements-azxLt8PlUdh8MQxh1OoC?gaa_at=eafs\u0026gaa_n=AWEtsqfjuZhQzq8SZykayDrvMM5nsv8jDI9j9pv9LvIVSJGnP6koZ3UEocXI\u0026gaa_ts=695933a4\u0026gaa_sig=mBq3wogjBbBB8O_kbiU5Wyum87WdogLcX6Eth9V3yE76Zjg1S2cPx3-uCKuAC4otoeV-rHUo0TVXGYjL4jwrEQ%3D%3D',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDPPJK204E38TPWQATB5SW5K.json',
            label:
              'livemint.com - Silver rate today rebounds after a sharp one-day fall: Why the Silver price rally is structural, not just a bubble',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.livemint.com/market/commodities/silver-rate-today-rebounds-after-a-sharp-one-day-fall-why-the-silver-price-rally-is-structural-not-just-a-bubble-11767064885600.html',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDNJP42RV8CGW0Y2BJYHQNYT.json',
            label:
              'thestreet.com - Silver price surges to $100 in China as retailers seek new ways to exposure',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.thestreet.com/crypto/markets/silver-price-surges-to-100-in-china',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDP25MH0TYRB167M41TWTA5A.json',
            label:
              'ts2.tech - Silver price today: SLV sinks after-hours as margin hike fuels sharp metal selloff',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://ts2.tech/en/silver-price-today-slv-sinks-after-hours-as-margin-hike-fuels-sharp-metal-selloff/',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDNDHNCGC1MQVH9X56YF2EYF.json',
            label:
              'vocal.media - Silver Price Today: Why Everyone Is Watching the Market Right Now',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://vocal.media/trader/silver-price-today-why-everyone-is-watching-the-market-right-now',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDNA5Q98H4K4C1GMFZGQ08AP.json',
            label:
              'www.israelhayom.com - Silver price today: Silver prices retreat from record high',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.israelhayom.com/2025/12/29/silver-price-today-silver-rate-today-beats-nvidia/',
            },
          },
        ],
      },
      {
        id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/2025-12-28',
        label: '2025-12-28',
        noTick: true,
        expandable: true,
        selectable: false,
        children: [
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDJJ9XR07G0B7BAVW162G19H.json',
            label:
              'FXEmpire - Silver Price Forecast – Breakout Momentum and Fed Liquidity Set Stage for $100 Test in 2026',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.fxempire.com/forecasts/article/silver-price-forecast-breakout-momentum-and-fed-liquidity-set-stage-for-100-test-in-2026-1567881',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDJZF2A05XPND092QA2NMNEC.json',
            label:
              'ts2.tech - Silver Price Today Holds Near $79 Record High as Fed Rate-Cut Bets and China Export Rules Stir Supply Fears',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://ts2.tech/en/silver-price-today-holds-near-79-record-high-as-fed-rate-cut-bets-and-china-export-rules-stir-supply-fears/',
            },
          },
        ],
      },
      {
        id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/2025-12-26',
        label: '2025-12-26',
        noTick: true,
        expandable: true,
        selectable: false,
        children: [
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDCTQX00NSH88RW2BHGVT8MA.json',
            label:
              'The Economic Times - Gold and silver price today, prediction and forecast: Why precious metals rates are rising and should you',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://m.economictimes.com/news/international/us/gold-and-silver-price-today-prediction-and-forecast-why-precious-metals-rates-are-rising-and-should-you-buy-or-wait-for-now-heres-full-analysis-platinum-palladium/articleshow/126188987.cms',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDDKJJP0AVFQCDV4EZ4KV27Y.json',
            label:
              'ts2.tech - Silver Price Today at 10:14 a.m. EST (26.12.2025): Silver Breaks $75/oz as Rate-Cut Bets and Supply Tightness Fuel a New Record Run',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://ts2.tech/en/silver-price-today-at-1014-a-m-est-26-12-2025-silver-breaks-75-oz-as-rate-cut-bets-and-supply-tightness-fuel-a-new-record-run/',
            },
          },
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDEBZ56GPY87QQ9AJQ15G73N.json',
            label:
              'ts2.tech - Silver Price Today: Spot Silver Hits Fresh Record Near $79 as Fed Rate-Cut Bets and Tight Supply Supercharge the Rally',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://ts2.tech/en/silver-price-today-spot-silver-hits-fresh-record-near-79-as-fed-rate-cut-bets-and-tight-supply-supercharge-the-rally/',
            },
          },
        ],
      },
      {
        id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/2025-12-25',
        label: '2025-12-25',
        noTick: true,
        expandable: true,
        selectable: false,
        children: [
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KDA8B6003ZB2J3FMK5K2GZG2.json',
            label:
              'ts2.tech - Silver Price Today (Dec 25, 2025): Spot Silver Holds Near $72 After Fresh Record High — What’s Driving XAG/USD Now',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://ts2.tech/en/silver-price-today-dec-25-2025-spot-silver-holds-near-72-after-fresh-record-high-whats-driving-xag-usd-now/',
            },
          },
        ],
      },
      {
        id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/2025-12-24',
        label: '2025-12-24',
        noTick: true,
        expandable: true,
        selectable: false,
        children: [
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KD7NYF00KD2NXEAYCS09N4AG.json',
            label: 'CBS News - What is the silver price forecast for 2026?',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.cbsnews.com/news/expert-driven-silver-price-forecast-for-2026/',
            },
          },
        ],
      },
      {
        id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/2025-12-23',
        label: '2025-12-23',
        noTick: true,
        expandable: true,
        selectable: false,
        children: [
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KD53HR00HDPR93GG634F9V56.json',
            label: 'MSN - Silver price hits record high, up 141% in 2025',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://www.msn.com/en-in/money/topstories/silver-price-hits-record-high-up-141-in-2025/ar-AA1SSH4a',
            },
          },
        ],
      },
      {
        id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/2025-12-22',
        label: '2025-12-22',
        noTick: true,
        expandable: true,
        selectable: false,
        children: [
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KD2H51001FGTHWM2PX46CACK.json',
            label: 'ABC News - Why are gold and silver prices hitting record highs?',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://abcnews.go.com/Business/gold-silver-prices-hitting-record-highs/story?id=128616073',
            },
          },
        ],
      },
      {
        id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/2025-12-19',
        label: '2025-12-19',
        noTick: true,
        expandable: true,
        selectable: false,
        children: [
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KCTSYW00XDQJM502TF60DWGX.json',
            label: 'Fortune - Current price of silver as of Friday, December 19, 2025',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://fortune.com/article/current-price-of-silver-12-19-2025/',
            },
          },
        ],
      },
      {
        id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/2025-12-18',
        label: '2025-12-18',
        noTick: true,
        expandable: true,
        selectable: false,
        children: [
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KCR7J500BKBPW4NGMCQPJBAE.json',
            label: 'Fortune - Current price of silver as of Thursday, December 18, 2025',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://fortune.com/article/current-price-of-silver-12-18-2025/',
            },
          },
        ],
      },
      {
        id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/2025-12-16',
        label: '2025-12-16',
        noTick: true,
        expandable: true,
        selectable: false,
        children: [
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KCK2RQ009YXBKW9W2CSKVH32.json',
            label: 'Fortune - Current price of silver as of Tuesday, December 16, 2025',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://fortune.com/article/current-price-of-silver-12-16-2025/',
            },
          },
        ],
      },
      {
        id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/2025-12-12',
        label: '2025-12-12',
        noTick: true,
        expandable: true,
        selectable: false,
        children: [
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KC8S5V005GT8ZF1V4WF91JQ9.json',
            label: 'Fortune - Current price of silver as of Friday, December 12, 2025',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://fortune.com/article/current-price-of-silver-12-12-2025/',
            },
          },
        ],
      },
      {
        id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/2025-12-11',
        label: '2025-12-11',
        noTick: true,
        expandable: true,
        selectable: false,
        children: [
          {
            id: 'user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/news/silver price today/01KC66S400KJ9RAHV258EZ295J.json',
            label: 'Fortune - Current price of silver as of Thursday, December 11, 2025',
            noTick: true,
            expandable: true,
            selectable: false,
            data: {
              url: 'https://fortune.com/article/current-price-of-silver-12-11-2025/',
            },
          },
        ],
      },
    ],
    data: {
      user_id: '01K48PC0BK13BWV2CGWFP8QQH0',
      id: 'silver price today',
      type: 'news',
      prowled: '00000000000000000000000000',
      frequency: 0,
      duration: 2018246417,
    },
  },
]);
const selected = ref<string>('');
const expanded = ref<string[]>([]);
const ticked = ref<string[]>([]);
const tree = useTemplateRef<QTree>('tree');
const handleSelection = (label: string) => {
  const node = tree.value?.getNodeByKey(label);
  console.debug('handle tree node selection', label, JSON.stringify(node, null, 2));
};

const onExpand = (node: QTreeNode) => {
  console.debug('onExpand', node);
};

onMounted(() => {
  // const data: void | ProwlerNews[] = await store.loadNews();
  // if (!data) return;
  // nodes.value = [
  //   {
  //     id: 'News',
  //     label: 'News',
  //     icon: NewsIcon,
  //     expandable: true,
  //     selectable: false,
  //     noTick: true,
  //     children: data.map((p: ProwlerNews): QTreeNode => {
  //       return {
  //         expandable: true,
  //         selectable: false,
  //         noTick: true,
  //         id: p.id,
  //         label: p.id,
  //         updated: new Date(decodeTime(p.prowled)).toLocaleString(),
  //         frequency: p.frequency > 0 ? p.frequency / 60000000000 : 0,
  //         duration: p.frequency > 0 ? p.frequency / 60000000000 : 0,
  //         children: p.sessions.map((result): QTreeNode => {
  //           return {
  //             id: result.id,
  //             label: result.title,
  //             url: result.url,
  //             created: new Date(decodeTime(p.prowled)).toLocaleString(),
  //           };
  //         }),
  //       };
  //     }),
  //   },
  // ];
});
</script>

<template>
  <q-tree
    :color="color"
    ref="tree"
    v-model:selected="selected"
    v-model:expanded="expanded"
    v-model:ticked="ticked"
    :nodes="nodes"
    :filter="filter"
    node-key="id"
    accordion
    tick-strategy="strict"
    @update:selected="handleSelection"
    @update:expanded="onExpand"
    dense
  />
</template>
