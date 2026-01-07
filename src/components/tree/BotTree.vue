<script setup lang="ts">
import type { QTreeNode } from 'quasar';
import { QTree } from 'quasar';
import { ref, useTemplateRef } from 'vue';
import { optionLabel, SearchColor, SearchIcon } from 'src/types/base';

defineProps<{
  filter?: string;
}>();
const tree = useTemplateRef<QTree>('my-tree');
const expanded = ref<string[]>([]);
const selected = ref<string>('');
const loading = ref<boolean>(false);
const fn = (n: QTreeNode) => {
  const x = tree.value?.isExpanded(n.path);
  console.log('n=', n.path, x);
  if (!x) {
    tree.value?.setExpanded(n.path, true);
  } else {
    tree.value?.setExpanded(n.path, false);
  }
};
const nodes: QTreeNode[] = [
  {
    label: 'Search',
    header: 'bot',
    body: 'bot',
    path: 'search',
    handler: fn,
    children: [
      {
        handler: fn,
        label: 'bulk dyneema for sale',
        header: 'query',
        body: 'query',
        path: 'search/bulk+dyneema+for+sale',
        frequency: 0,
        targets: {
          '*': true,
        },
        children: [
          {
            icon: 'mdi-repeat',
            iconColor: 'yellow-5',
            label: 'Repeat: Never',
            path: 'dfdea',
            handler: fn,
          },
          {
            icon: 'mdi-play',
            iconColor: 'green-13',
            label: 'Follow: All',
            path: 'dfdee',
            handler: fn,
          },
          {
            icon: 'mdi-stop',
            iconColor: 'red-13',
            label: 'Ignore: None',
            path: 'dfdeh',
            handler: fn,
          },
          {
            handler: fn,
            label: '2025-12-29 08:49:50',
            header: 'datetime',
            body: 'datetime',
            path: 'search/bulk+dyneema+for+sale/2025-12-29+08:49:50',
            html: 'https://bytelyon-db-prod.s3.us-east-1.amazonaws.com/user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/search/bulk%20dyneema%20for%20sale/01KDMMSAPC6VXKDCWKCS6A9A9K/serp/01KDMMSDXBXT0M2RR6ZFSQXZYR.html?X-Amz-Algorithm=AWS4-HMAC-SHA256\u0026X-Amz-Checksum-Mode=ENABLED\u0026X-Amz-Credential=ASIASAM5DBXJSKSBNALW%2F20260107%2Fus-east-1%2Fs3%2Faws4_request\u0026X-Amz-Date=20260107T050701Z\u0026X-Amz-Expires=1800\u0026X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQCO6WCph1EyLhMirsLHOyHLc3lb7GRPTY7SPVQSAgjuywIhAJ3Y0ihkUoUSbc1NlJu5acLvKXLqXzUz0VEEpL6eZAqfKvQCCG4QBBoMMTM4MzA1Mjc3Mzk1IgwgvEE9gFaAJMu3Diwq0QKTsODXcHLgTIIs29vio0tzg6cn8wW00R5JvoStCYSsGR4mqbAzvU%2B2ACBwbsPHCch77CBAnaoH1ZTm2L3zLyIg3TmCnYuaDn72uASpMXP6aLQuZqpnrZGLkN1JTweNumWQUC%2F98V5uTGE9WM6YXluUIfbntZSEHCdfJk9y0o7Z2PQhkiTaQpn40nEr0aYOF338BKIcJRHrlG9DIPQMpew6xgpuLcpDaw3GKPAyg8Y9cvmm47648YlkUCy5HiMttqPdwbMnv3fksmaz4SpaVeUAoqr95dAeq97mlF7vhfQcfccVFE8RowLgeWAnVTwjexTV8eqxZbys8O5EpsX4DCCMjjiIIUTEjuO3ppYJxcItGU6R7dJES7y9Y0HLIGMbtWuhn0PhiNLIygXebEQDWHofIBOTCnmdoRUd2wBvAaIlhqV5k5bLAxlKIysswcjxps0oMPTT98oGOp0BgW8%2FYW7v90%2BSv9RMOZYy4tz9hp%2B5oYIawDo5dyUx3apbmOX7XDiluquT0LKU7yDDqhv58Fh%2FKCNhOOowDg6oRe1R%2B61ObA3YLzGrxcWPvfmsLi0BfVDnW2kZ7C6hCqZ%2FUo%2BxlDFx8wJ7dpZUStGMyXAu%2FbYlId3NGjjW4J8GIauOfY8ZP6sRBPQxjVGDBy2X4mAMVVj6vhEpTHaLDg%3D%3D\u0026X-Amz-SignedHeaders=host\u0026x-id=GetObject\u0026X-Amz-Signature=6bd20aa6fa3ec9d36f9b48cd03b3f16832ec7994c57d3f732b4c683619935d2a',
            png: 'https://bytelyon-db-prod.s3.us-east-1.amazonaws.com/user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/search/bulk%20dyneema%20for%20sale/01KDMMSAPC6VXKDCWKCS6A9A9K/serp/01KDMMSDXBXT0M2RR6ZFSQXZYR.png?X-Amz-Algorithm=AWS4-HMAC-SHA256\u0026X-Amz-Checksum-Mode=ENABLED\u0026X-Amz-Credential=ASIASAM5DBXJSKSBNALW%2F20260107%2Fus-east-1%2Fs3%2Faws4_request\u0026X-Amz-Date=20260107T050701Z\u0026X-Amz-Expires=1800\u0026X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQCO6WCph1EyLhMirsLHOyHLc3lb7GRPTY7SPVQSAgjuywIhAJ3Y0ihkUoUSbc1NlJu5acLvKXLqXzUz0VEEpL6eZAqfKvQCCG4QBBoMMTM4MzA1Mjc3Mzk1IgwgvEE9gFaAJMu3Diwq0QKTsODXcHLgTIIs29vio0tzg6cn8wW00R5JvoStCYSsGR4mqbAzvU%2B2ACBwbsPHCch77CBAnaoH1ZTm2L3zLyIg3TmCnYuaDn72uASpMXP6aLQuZqpnrZGLkN1JTweNumWQUC%2F98V5uTGE9WM6YXluUIfbntZSEHCdfJk9y0o7Z2PQhkiTaQpn40nEr0aYOF338BKIcJRHrlG9DIPQMpew6xgpuLcpDaw3GKPAyg8Y9cvmm47648YlkUCy5HiMttqPdwbMnv3fksmaz4SpaVeUAoqr95dAeq97mlF7vhfQcfccVFE8RowLgeWAnVTwjexTV8eqxZbys8O5EpsX4DCCMjjiIIUTEjuO3ppYJxcItGU6R7dJES7y9Y0HLIGMbtWuhn0PhiNLIygXebEQDWHofIBOTCnmdoRUd2wBvAaIlhqV5k5bLAxlKIysswcjxps0oMPTT98oGOp0BgW8%2FYW7v90%2BSv9RMOZYy4tz9hp%2B5oYIawDo5dyUx3apbmOX7XDiluquT0LKU7yDDqhv58Fh%2FKCNhOOowDg6oRe1R%2B61ObA3YLzGrxcWPvfmsLi0BfVDnW2kZ7C6hCqZ%2FUo%2BxlDFx8wJ7dpZUStGMyXAu%2FbYlId3NGjjW4J8GIauOfY8ZP6sRBPQxjVGDBy2X4mAMVVj6vhEpTHaLDg%3D%3D\u0026X-Amz-SignedHeaders=host\u0026x-id=GetObject\u0026X-Amz-Signature=b87a441dbc7ab9d017ab13128027e43af5a27936f39b0124afb785c63852fc77',
            json: '',
            targets: {
              '*': true,
            },
            children: [
              {
                icon: 'mdi-image-outline',
                label: 'Open Screenshot',
                iconColor: 'purple',
                path: 'dfde',
                handler: fn,
              },
              {
                icon: 'mdi-language-html5',
                label: 'Download HTML',
                iconColor: 'deep-orange',
                path: 'dfdw',
                handler: fn,
              },
              {
                icon: 'mdi-table-large',
                label: 'Export CSV',
                iconColor: 'light-green-10',
                path: 'dfdw123',
                handler: fn,
              },
              {
                icon: 'mdi-code-json',
                label: 'Copy JSON',
                iconColor: 'teal',
                path: 'dfdq',
                handler: fn,
              },
            ],
          },

          {
            handler: fn,
            label: '2025-12-29 09:02:24',
            header: 'datetime',
            body: 'datetimes',
            path: 'search/bulk+dyneema+for+sale/2025-12-29+10:02:24',
            html: 'https://bytelyon-db-prod.s3.us-east-1.amazonaws.com/user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/search/bulk%20dyneema%20for%20sale/01KDMNGAXTTHHEPYRPG4507425/serp/01KDMNGHRR0C25NSFQCQXEA0DX.html?X-Amz-Algorithm=AWS4-HMAC-SHA256\u0026X-Amz-Checksum-Mode=ENABLED\u0026X-Amz-Credential=ASIASAM5DBXJSKSBNALW%2F20260107%2Fus-east-1%2Fs3%2Faws4_request\u0026X-Amz-Date=20260107T050701Z\u0026X-Amz-Expires=1800\u0026X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQCO6WCph1EyLhMirsLHOyHLc3lb7GRPTY7SPVQSAgjuywIhAJ3Y0ihkUoUSbc1NlJu5acLvKXLqXzUz0VEEpL6eZAqfKvQCCG4QBBoMMTM4MzA1Mjc3Mzk1IgwgvEE9gFaAJMu3Diwq0QKTsODXcHLgTIIs29vio0tzg6cn8wW00R5JvoStCYSsGR4mqbAzvU%2B2ACBwbsPHCch77CBAnaoH1ZTm2L3zLyIg3TmCnYuaDn72uASpMXP6aLQuZqpnrZGLkN1JTweNumWQUC%2F98V5uTGE9WM6YXluUIfbntZSEHCdfJk9y0o7Z2PQhkiTaQpn40nEr0aYOF338BKIcJRHrlG9DIPQMpew6xgpuLcpDaw3GKPAyg8Y9cvmm47648YlkUCy5HiMttqPdwbMnv3fksmaz4SpaVeUAoqr95dAeq97mlF7vhfQcfccVFE8RowLgeWAnVTwjexTV8eqxZbys8O5EpsX4DCCMjjiIIUTEjuO3ppYJxcItGU6R7dJES7y9Y0HLIGMbtWuhn0PhiNLIygXebEQDWHofIBOTCnmdoRUd2wBvAaIlhqV5k5bLAxlKIysswcjxps0oMPTT98oGOp0BgW8%2FYW7v90%2BSv9RMOZYy4tz9hp%2B5oYIawDo5dyUx3apbmOX7XDiluquT0LKU7yDDqhv58Fh%2FKCNhOOowDg6oRe1R%2B61ObA3YLzGrxcWPvfmsLi0BfVDnW2kZ7C6hCqZ%2FUo%2BxlDFx8wJ7dpZUStGMyXAu%2FbYlId3NGjjW4J8GIauOfY8ZP6sRBPQxjVGDBy2X4mAMVVj6vhEpTHaLDg%3D%3D\u0026X-Amz-SignedHeaders=host\u0026x-id=GetObject\u0026X-Amz-Signature=ec1466922425b8578f23f877fc0f09f97c247d8e70b483cb0c564e009fb2da9d',
            png: 'https://bytelyon-db-prod.s3.us-east-1.amazonaws.com/user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/search/bulk%20dyneema%20for%20sale/01KDMNGAXTTHHEPYRPG4507425/serp/01KDMNGHRR0C25NSFQCQXEA0DX.png?X-Amz-Algorithm=AWS4-HMAC-SHA256\u0026X-Amz-Checksum-Mode=ENABLED\u0026X-Amz-Credential=ASIASAM5DBXJSKSBNALW%2F20260107%2Fus-east-1%2Fs3%2Faws4_request\u0026X-Amz-Date=20260107T050701Z\u0026X-Amz-Expires=1800\u0026X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQCO6WCph1EyLhMirsLHOyHLc3lb7GRPTY7SPVQSAgjuywIhAJ3Y0ihkUoUSbc1NlJu5acLvKXLqXzUz0VEEpL6eZAqfKvQCCG4QBBoMMTM4MzA1Mjc3Mzk1IgwgvEE9gFaAJMu3Diwq0QKTsODXcHLgTIIs29vio0tzg6cn8wW00R5JvoStCYSsGR4mqbAzvU%2B2ACBwbsPHCch77CBAnaoH1ZTm2L3zLyIg3TmCnYuaDn72uASpMXP6aLQuZqpnrZGLkN1JTweNumWQUC%2F98V5uTGE9WM6YXluUIfbntZSEHCdfJk9y0o7Z2PQhkiTaQpn40nEr0aYOF338BKIcJRHrlG9DIPQMpew6xgpuLcpDaw3GKPAyg8Y9cvmm47648YlkUCy5HiMttqPdwbMnv3fksmaz4SpaVeUAoqr95dAeq97mlF7vhfQcfccVFE8RowLgeWAnVTwjexTV8eqxZbys8O5EpsX4DCCMjjiIIUTEjuO3ppYJxcItGU6R7dJES7y9Y0HLIGMbtWuhn0PhiNLIygXebEQDWHofIBOTCnmdoRUd2wBvAaIlhqV5k5bLAxlKIysswcjxps0oMPTT98oGOp0BgW8%2FYW7v90%2BSv9RMOZYy4tz9hp%2B5oYIawDo5dyUx3apbmOX7XDiluquT0LKU7yDDqhv58Fh%2FKCNhOOowDg6oRe1R%2B61ObA3YLzGrxcWPvfmsLi0BfVDnW2kZ7C6hCqZ%2FUo%2BxlDFx8wJ7dpZUStGMyXAu%2FbYlId3NGjjW4J8GIauOfY8ZP6sRBPQxjVGDBy2X4mAMVVj6vhEpTHaLDg%3D%3D\u0026X-Amz-SignedHeaders=host\u0026x-id=GetObject\u0026X-Amz-Signature=83164e6b236a7b58a14171c32bc7c6669cd28159b9e19d1f014c632f51beed7f',
            json: '{}',
            targets: {
              '*': true,
            },
            children: [
              {
                label: 'Sponsored',
                path: 'search/bulk+dyneema+for+sale/2025-12-29+10:02:24/sponsored',
                children: [
                  {
                    label: 'Dyneema® Composite Fabric - Ripstop by the Roll',
                    path: 'search/bulk+dyneema+for+sale/2025-12-29+10:02:24/organic/dyneema®+composite+fabric+ripstop+by+the+roll',
                    position: 0,
                    link: 'https://ripstopbytheroll.com/collections/dyneema-composite-fabric?srsltid=AfmBOopbsz4v6VFK5mUrp_YAzIGml9xxNypcCTlJmKKbpn2OVSR5w6AH',
                    snippet:
                      'A patented, high-end laminate fabric constructed from non-woven composites utilizing Dyneema fibers. Dyneema offers an unmatched strength to weight ratio.',
                    source: 'Ripstop by the Roll',
                    html: '',
                    png: '',
                  },
                ],
              },
              {
                label: 'Organic',
                path: 'search/bulk+dyneema+for+sale/2025-12-29+10:02:24/organic',
                children: [
                  {
                    label: 'Dyneema® Composite Fabric - Ripstop by the Roll',
                    path: 'search/bulk+dyneema+for+sale/2025-12-29+10:02:24/organic/dyneema®+composite+fabric+ripstop+by+the+roll',
                    position: 0,
                    link: 'https://ripstopbytheroll.com/collections/dyneema-composite-fabric?srsltid=AfmBOopbsz4v6VFK5mUrp_YAzIGml9xxNypcCTlJmKKbpn2OVSR5w6AH',
                    snippet:
                      'A patented, high-end laminate fabric constructed from non-woven composites utilizing Dyneema fibers. Dyneema offers an unmatched strength to weight ratio.',
                    source: 'Ripstop by the Roll',
                    html: '',
                    png: '',
                  },
                ],
              },
            ],

            data: {
              path: '01KDMNGHRR0C25NSFQCQXEA0DX',
              json: {
                results: {
                  also_asked: [],
                  article: [],
                  forum: [],
                  more_products: [],
                  organic: [
                    {
                      link: 'https://ripstopbytheroll.com/collections/dyneema-composite-fabric?srsltid=AfmBOopbsz4v6VFK5mUrp_YAzIGml9xxNypcCTlJmKKbpn2OVSR5w6AH',
                      position: 0,
                      snippet:
                        'A patented, high-end laminate fabric constructed from non-woven composites utilizing Dyneema fibers. Dyneema offers an unmatched strength to weight ratio.',
                      source: 'Ripstop by the Roll',
                      title: 'Dyneema® Composite Fabric - Ripstop by the Roll',
                    },
                    {
                      link: 'https://dutchwaregear.com/product-category/fabrics/dyneema-composite/?srsltid=AfmBOoo3ImcS-blVbmWlaZhIquiS7PitdlJrDtJXpP2Dq-W2uZYXbysh',
                      position: 1,
                      snippet:
                        'DutchWare supplies Dynema® Composite Fabrics (DCFs), previously known as Cuben Fiber. These lightweight, durable, and waterproof materials work well for ...',
                      source: 'DutchWare',
                      title: 'Shop Dyneema Composite Fabrics by the Half Yard | DutchWare',
                    },
                    {
                      link: 'https://www.dyneema.com/design-with-dyneema/buy-dyneema',
                      position: 2,
                      snippet:
                        "Want to buy a small quantity of Dyneema® fiber or Dyneema® composites? If your order doesn't meet our minimum order requirements, it's no problem.",
                      source: 'Dyneema',
                      title: 'Buy Dyneema',
                    },
                    {
                      link: 'https://www.canwiltextiles.com/dyneema-composite-fabric/',
                      position: 3,
                      snippet:
                        "It's strong, lightweight and durable — making it a great choice for your next project. If you're looking for wholesale Dyneema for commercial use, we can help!",
                      source: 'Canwil Textiles',
                      title: 'Dyneema Composite Fabric - Canwil Textiles',
                    },
                    {
                      link: 'https://www.dyneema.com/sectors/sports-and-consumer-products/dyneema-composite-fabric-proudly-made-in-the-usa',
                      position: 4,
                      snippet:
                        'Dyneema® supports customers worldwide with Dyneema® Composite Fabric, proudly made in the USA at our Mesa facility. Find out more today.',
                      source: 'Dyneema',
                      title: 'Dyneema® Composite Fabric: Proudly made in the USA',
                    },
                    {
                      link: 'https://ripstopbytheroll.com/collections/all-full-rolls/products/0-8-oz-dyneema-composite-fabric-ct2e-08-full-rolls?srsltid=AfmBOor-DRqnitgG16UfxpGqS0r3MVeEZy2wbpl6s0qdNmLO1gyax-_q',
                      position: 5,
                      snippet:
                        "Ultralight Dyneema Composite Fabric (formerly Cuben Fiber) from DSM. DCF is a non-woven, laminate fabric that's stronger than steel but lighter than ...",
                      source: 'Ripstop by the Roll',
                      title: '0.8 oz Dyneema®/Cuben Fiber Fabric | CT2E.08 | Wholesale',
                    },
                    {
                      link: 'https://www.sourceoffabric.com/buy-dyneema-fabric/',
                      position: 6,
                      snippet:
                        "If you're on the hunt for a fabric that combines strength, durability, and lightweight properties, Dyneema wholesale fabric is your go-to choice.",
                      source: 'SOFI Enterprises Inc.',
                      title: 'Buy Dyneema Fabric Ultra-Strong \u0026 Lightweight Material',
                    },
                    {
                      link: 'https://www.reddit.com/r/myog/comments/gb7jnz/buying_dyneema/',
                      position: 7,
                      snippet:
                        "I'm looking to buy a 6' x 8' sheet of cuben fiber/dyneema, .5 thickness. To all those who have done diy gear projects with dyneema, where did you order from?",
                      source: 'Reddit',
                      title: 'Buying Dyneema : r/myog - Reddit',
                    },
                    {
                      link: 'https://makospearguns.com/south-african-dyneema-wishbone-cordage-in-bulk/',
                      position: 8,
                      snippet:
                        'South African made material is the absolute best and strongest, abrasion resistant dyneema cordage. Only 0.070 inches in diameter.',
                      source: 'MAKO Spearguns',
                      title: 'South African Dyneema Wishbone Cordage In Bulk',
                    },
                    {
                      link: 'https://www.rope.com/collections/dyneema-rope?srsltid=AfmBOopzcSXtdOK7G2FbVBOa_RrHqfrxJ5edNaGwG41kfV0tnbSVN-2Z',
                      position: 9,
                      snippet:
                        'Coated dyneema throw line in neon colors for easy visible through trees. Original Price $73.31. Starting from $60.85. View details.',
                      source: 'ROPE.com',
                      title: 'Dyneema Rope | ROPE.com',
                    },
                  ],
                  popular_products: [],
                  related_query: [],
                  sponsored: [
                    {
                      link: 'https://fullpullrope.com/products/samson-amsteel%C2%AE-blue-12-strand-dyneema-sk-78-synthetic-line-1?variant=44045398671539\u0026country=US\u0026currency=USD\u0026utm_medium=product_sync\u0026utm_source=google\u0026utm_content=sag_organic\u0026utm_campaign=sag_organic',
                      position: 0,
                      price: 0.22,
                      snippet: '',
                      source: 'Full Pull Rope',
                      title:
                        'Samson AmSteel -Blue 12-Strand Dyneema SK-78 Synthetic Line (All Colors) 7/64" / Foot / Silver',
                    },
                    {
                      link: 'https://sregear.com/products/samson-amsteel-blue-synthetic-rope?variant=44338191073532\u0026country=US\u0026currency=USD\u0026utm_medium=product_sync\u0026utm_source=google\u0026utm_content=sag_organic\u0026utm_campaign=sag_organic',
                      position: 1,
                      price: 0.75,
                      snippet: '',
                      source: 'SRE Outdoors',
                      title:
                        'Samson Amsteel-Blue 12 Strand Dyneema Rope - SRE Outdoors 3/16" / Foot / Silver',
                    },
                    {
                      link: 'https://www.bulkropes.com/products/dyneema-rope?variant=46675024052453\u0026country=US\u0026currency=USD\u0026utm_medium=product_sync\u0026utm_source=google\u0026utm_content=sag_organic\u0026utm_campaign=sag_organic',
                      position: 2,
                      price: 270,
                      snippet: '',
                      source: 'Hercules Bulk Ropes',
                      title: 'Dyneema Rope | 1/4 in Width | 250 ft Length | Hercules Bulk Ropes',
                    },
                    {
                      link: 'https://www.rocket-fibers.com/products/uhmwpe-cord?currency=USD\u0026variant=46720529662272\u0026utm_source=google\u0026utm_medium=cpc\u0026utm_campaign=Google%20Shopping\u0026stkn=bffefd9da572',
                      position: 3,
                      price: 89.98,
                      snippet: '',
                      source: 'Rocket-Fibers',
                      title: 'UHMWPE Braid, 140 lb - Black / 1000',
                    },
                    {
                      link: 'https://fullpullrope.com/products/samson-amsteel%C2%AE-blue-12-strand-dyneema-sk-78-synthetic-line-1?variant=44045398638771\u0026country=US\u0026currency=USD\u0026utm_medium=product_sync\u0026utm_source=google\u0026utm_content=sag_organic\u0026utm_campaign=sag_organic',
                      position: 4,
                      price: 0.22,
                      snippet: '',
                      source: 'Full Pull Rope',
                      title:
                        'Samson AmSteel -Blue 12-Strand Dyneema SK-78 Synthetic Line (All Colors) 7/64" / Foot / Blue',
                    },
                    {
                      link: 'https://www.rocket-fibers.com/products/technora%C2%AE?currency=USD\u0026variant=46237036446016\u0026utm_source=google\u0026utm_medium=cpc\u0026utm_campaign=Google%20Shopping\u0026stkn=bffefd9da572',
                      position: 5,
                      price: 429.97,
                      snippet: '',
                      source: 'Rocket-Fibers',
                      title: 'Technora Fiber, 1500BK / Factory (5.0 lb)',
                    },
                    {
                      link: 'https://www.knotandrope.com/products/amsteel-blue-dyneema?variant=21710114488368\u0026country=US\u0026currency=USD\u0026utm_medium=product_sync\u0026utm_source=google\u0026utm_content=sag_organic\u0026utm_campaign=sag_organic',
                      position: 6,
                      price: 0.25,
                      snippet: '',
                      source: 'Knot \u0026 Rope Supply',
                      title: 'AmSteel-Blue Dyneema Black / 7/64"',
                    },
                    {
                      link: 'https://fullpullrope.com/products/samson-amsteel%C2%AE-blue-12-strand-dyneema-sk-78-synthetic-line-1?variant=44045398704307\u0026country=US\u0026currency=USD\u0026utm_medium=product_sync\u0026utm_source=google\u0026utm_content=sag_organic\u0026utm_campaign=sag_organic',
                      position: 7,
                      price: 0.22,
                      snippet: '',
                      source: 'Full Pull Rope',
                      title:
                        'Samson AmSteel -Blue 12-Strand Dyneema SK-78 Synthetic Line (All Colors) 7/64" / Foot / Black',
                    },
                    {
                      link: 'https://www.rocket-fibers.com/products/uhmwpe-cord?currency=USD\u0026variant=45587035062592\u0026utm_source=google\u0026utm_medium=cpc\u0026utm_campaign=Google%20Shopping\u0026stkn=bffefd9da572',
                      position: 8,
                      price: 277.98,
                      snippet: '',
                      source: 'Rocket-Fibers',
                      title: 'UHMWPE Cord, 260 lbs - Black / 5000 FT',
                    },
                    {
                      link: 'https://www.rocket-fibers.com/products/uhmwpe-cord?currency=USD\u0026variant=45594697302336\u0026utm_source=google\u0026utm_medium=cpc\u0026utm_campaign=Google%20Shopping\u0026stkn=bffefd9da572',
                      position: 9,
                      price: 92.98,
                      snippet: '',
                      source: 'Rocket-Fibers',
                      title: 'UHMWPE Cord, 275 lbs - White / 1000 FT',
                    },
                    {
                      link: 'https://www.alibaba.com/product-detail/33gsm-66gsm-130gsm-200gsm-High-Strength_1601274677550.html?mark=google_shopping\u0026pcy=us_en',
                      position: 10,
                      price: 425,
                      snippet: '',
                      source: 'Alibaba.com',
                      title:
                        'Wholesale UHMWPE Fabric Cut proof Fabric high trength Fabric Dyneemas woven fabric,50 Meters',
                    },
                    {
                      link: 'https://www.ebay.com/itm/166519405090?chn=ps\u0026mkevt=1\u0026mkcid=28\u0026var=466157685859\u0026google_free_listing_action=view_item',
                      position: 11,
                      price: 12.74,
                      snippet: '',
                      source: 'eBay',
                      title: '1000lb2000lb Dyneema String Braided Uhmwpe Cord Outdoor Repair',
                    },
                    {
                      link: 'https://movesea.com/products/dyneema-line-sk99-pre-stretched-black-1000m-500kg-vector-lyk0750009?variant=51707048755476\u0026country=US\u0026currency=USD\u0026utm_medium=product_sync\u0026utm_source=google\u0026utm_content=sag_organic\u0026utm_campaign=sag_organic',
                      position: 12,
                      price: 1015.55,
                      snippet: '',
                      source: 'Movesea COM',
                      title: 'Dyneema Line SK99 Pre-stretched Black 1000m 500kg Vector LYK0750009',
                    },
                    {
                      link: 'https://sregear.com/products/samson-amsteel-blue-synthetic-rope?variant=44338190287100\u0026country=US\u0026currency=USD\u0026utm_medium=product_sync\u0026utm_source=google\u0026utm_content=sag_organic\u0026utm_campaign=sag_organic',
                      position: 13,
                      price: 684,
                      snippet: '',
                      source: 'SRE Outdoors',
                      title:
                        'Samson Amsteel-Blue 12 Strand Dyneema Rope - SRE Outdoors 7/64" / Spool / Blue',
                    },
                    {
                      link: 'https://fullpullrope.com/products/samson-amsteel%C2%AE-blue-12-strand-dyneema-sk-78-synthetic-line-1?variant=44045398737075\u0026country=US\u0026currency=USD\u0026utm_medium=product_sync\u0026utm_source=google\u0026utm_content=sag_organic\u0026utm_campaign=sag_organic',
                      position: 14,
                      price: 0.22,
                      snippet: '',
                      source: 'Full Pull Rope',
                      title:
                        'Samson AmSteel -Blue 12-Strand Dyneema SK-78 Synthetic Line (All Colors) 7/64" / Foot / Red',
                    },
                    {
                      link: 'https://geronimotackle.com/products/330-1-7mm-dyneema-outrigger-line?variant=51438491566372\u0026country=US\u0026currency=USD\u0026utm_medium=product_sync\u0026utm_source=google\u0026utm_content=sag_organic\u0026utm_campaign=sag_organic',
                      position: 15,
                      price: 82,
                      snippet: '',
                      source: 'Geronimo Tackle',
                      title: "330' 1.7mm Dyneema Outrigger Line Orange",
                    },
                    {
                      link: 'https://www.rocket-fibers.com/products/uhmwpe-cord?currency=USD\u0026variant=45587035259200\u0026utm_source=google\u0026utm_medium=cpc\u0026utm_campaign=Google%20Shopping\u0026stkn=bffefd9da572',
                      position: 16,
                      price: 229.98,
                      snippet: '',
                      source: 'Rocket-Fibers',
                      title: 'UHMWPE Braid, 150 lb - White / 5000',
                    },
                    {
                      link: 'https://benthicoceansports.com/products/1-4mm-stiff-dyneema?variant=39436913737830\u0026country=US\u0026currency=USD\u0026utm_medium=product_sync\u0026utm_source=google\u0026utm_content=sag_organic\u0026utm_campaign=sag_organic',
                      position: 17,
                      price: 0.34,
                      snippet: '',
                      source: 'Benthic Ocean Sports',
                      title: '1.4mm Stiff Dyneema Green',
                    },
                    {
                      link: 'https://sregear.com/products/samson-amsteel-blue-synthetic-rope?variant=44338190090492\u0026country=US\u0026currency=USD\u0026utm_medium=product_sync\u0026utm_source=google\u0026utm_content=sag_organic\u0026utm_campaign=sag_organic',
                      position: 18,
                      price: 0.22,
                      snippet: '',
                      source: 'SRE Outdoors',
                      title:
                        'Samson Amsteel-Blue 12 Strand Dyneema Rope - SRE Outdoors 7/64" / Foot / Blue',
                    },
                    {
                      link: 'https://fullpullrope.com/products/samson-amsteel%C2%AE-blue-12-strand-dyneema-sk-78-synthetic-line-1?variant=44045399654579\u0026country=US\u0026currency=USD\u0026utm_medium=product_sync\u0026utm_source=google\u0026utm_content=sag_organic\u0026utm_campaign=sag_organic',
                      position: 19,
                      price: 0.75,
                      snippet: '',
                      source: 'Full Pull Rope',
                      title:
                        'Samson AmSteel -Blue 12-Strand Dyneema SK-78 Synthetic Line (All Colors) 3/16" / Foot / Orange',
                    },
                    {
                      link: 'https://sregear.com/products/samson-amsteel-blue-synthetic-rope?variant=44338190156028\u0026country=US\u0026currency=USD\u0026utm_medium=product_sync\u0026utm_source=google\u0026utm_content=sag_organic\u0026utm_campaign=sag_organic',
                      position: 20,
                      price: 0.22,
                      snippet: '',
                      source: 'SRE Outdoors',
                      title:
                        'Samson Amsteel-Blue 12 Strand Dyneema Rope - SRE Outdoors 7/64" / Foot / Orange',
                    },
                    {
                      link: 'https://fullpullrope.com/products/samson-amsteel%C2%AE-blue-12-strand-dyneema-sk-78-synthetic-line-1?variant=44045398802611\u0026country=US\u0026currency=USD\u0026utm_medium=product_sync\u0026utm_source=google\u0026utm_content=sag_organic\u0026utm_campaign=sag_organic',
                      position: 21,
                      price: 0.22,
                      snippet: '',
                      source: 'Full Pull Rope',
                      title:
                        'Samson AmSteel -Blue 12-Strand Dyneema SK-78 Synthetic Line (All Colors) 7/64" / Foot / Yellow',
                    },
                  ],
                  video: [],
                },
                targets: {
                  '*': true,
                },
              },
            },
          },
        ],
      },
    ],
  },
];
</script>

<template>
  <q-tree
    ref="my-tree"
    v-if="!loading"
    :nodes="nodes"
    :filter="filter"
    node-key="path"
    dark
    accordion
    v-model:selected="selected"
    v-model:expanded="expanded"
  >
    <template #header-bot="prop">
      <div class="row items-center">
        <q-icon :name="SearchIcon" :color="SearchColor" />
        <div class="q-ml-xs">
          {{ prop.node.label }}
        </div>
      </div>
    </template>

    <template #header-query="prop">
      <div class="row items-center">
        <q-icon name="mdi-format-quote-open" :color="SearchColor" />
        {{ prop.node.label }}
      </div>
    </template>

    <template #header-datetime="prop">
      <div class="row items-center">
        <q-icon name="mdi-table-clock" :color="SearchColor" class="q-mr-xs" />
        {{ prop.node.label }}
      </div>
    </template>

    <template #header-results="prop">
      <div class="row items-center">
        <q-icon name="mdi-page-layout-header-footer" :color="SearchColor" />
        {{ prop.node.label }}
      </div>
    </template>

    <template #body-querys="prop">
      <div class="row items-center">
        <q-icon name="mdi-replay" color="cyan-13" />
        <q-separator vertical class="q-mx-xs" />
        <q-icon name="mdi-repeat" color="yellow-5" />
        {{ optionLabel(prop.node.frequency) }}
        <q-separator vertical class="q-mx-xs" />
        <q-icon name="mdi-play" color="green-13" />
        All
        <q-separator vertical class="q-mx-xs" />
        <q-icon name="mdi-stop" color="red-13" />
        None
      </div>
    </template>

    <!--    <template #body-datetimes="prop">-->
    <!--      <div class="row items-center">-->
    <!--        <view-img-btn :title="prop.node.path" :url="prop.node.png" color="yellow-5" dark />-->
    <!--        <download-html-btn :url="prop.node.html" color="amber-10" dark />-->
    <!--        <view-json-btn :title="prop.node.path" :content="prop.node.json" color="yellow-10" dark />-->
    <!--      </div>-->
    <!--    </template>-->
  </q-tree>
  <q-inner-loading :showing="loading" :color="SearchColor" />
</template>
