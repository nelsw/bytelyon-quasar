import { acceptHMRUpdate, defineStore } from 'pinia';
import { type QTreeNode } from 'quasar';
import { api, type AxiosError, type AxiosResponse } from 'boot/axios';
import { ref } from 'vue';
import { BotColor, BotIcon } from 'src/types/base';

const id = 'bot-store';
const options = {
  // persist: {
  //   debug: true,
  //   storage: sessionStorage,
  // },
};

const botIdx = (s: string): number => {
  switch (s) {
    case 'search':
      return 0;
    case 'news':
      return 1;
    case 'sitemap':
      return 2;
    default:
      return -1;
  }
};

const rootNode = (id: string, kids: QTreeNode[]): QTreeNode => {
  return {
    id: id,
    label: id.charAt(0).toUpperCase() + id.substring(1).toLowerCase(),
    icon: BotIcon(id),
    iconColor: BotColor(id),
    children: kids,
  };
};

const setup = () => {
  const model = ref<QTreeNode[]>([
    rootNode('search', []),
    rootNode('news', []),
    rootNode('sitemap', []),
  ]);

  const load = async (t: string) => {
    return await api
      .get<QTreeNode[]>('/prowler', { params: { type: t } })
      .then((res: AxiosResponse<QTreeNode[]>) => {
        // model.value[botIdx(t)] = rootNode(t, res.data);
        model.value[botIdx(t)] =rootNode(t,  [
          {
            id: 'search/bulk dyneema for sale',
            label: 'bulk dyneema for sale',
            noTick: true,
            expandable: true,
            selectable: true,
            children: [
              {
                id: 'search/bulk dyneema for sale/2025-12-29 08:49:50',
                label: '2025-12-29 08:49:50',
                data: {
                  html: 'https://bytelyon-db-prod.s3.us-east-1.amazonaws.com/user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/search/bulk%20dyneema%20for%20sale/01KDMMSAPC6VXKDCWKCS6A9A9K/serp/01KDMMSDXBXT0M2RR6ZFSQXZYR.html?X-Amz-Algorithm=AWS4-HMAC-SHA256\u0026X-Amz-Checksum-Mode=ENABLED\u0026X-Amz-Credential=ASIASAM5DBXJSKSBNALW%2F20260107%2Fus-east-1%2Fs3%2Faws4_request\u0026X-Amz-Date=20260107T050701Z\u0026X-Amz-Expires=1800\u0026X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQCO6WCph1EyLhMirsLHOyHLc3lb7GRPTY7SPVQSAgjuywIhAJ3Y0ihkUoUSbc1NlJu5acLvKXLqXzUz0VEEpL6eZAqfKvQCCG4QBBoMMTM4MzA1Mjc3Mzk1IgwgvEE9gFaAJMu3Diwq0QKTsODXcHLgTIIs29vio0tzg6cn8wW00R5JvoStCYSsGR4mqbAzvU%2B2ACBwbsPHCch77CBAnaoH1ZTm2L3zLyIg3TmCnYuaDn72uASpMXP6aLQuZqpnrZGLkN1JTweNumWQUC%2F98V5uTGE9WM6YXluUIfbntZSEHCdfJk9y0o7Z2PQhkiTaQpn40nEr0aYOF338BKIcJRHrlG9DIPQMpew6xgpuLcpDaw3GKPAyg8Y9cvmm47648YlkUCy5HiMttqPdwbMnv3fksmaz4SpaVeUAoqr95dAeq97mlF7vhfQcfccVFE8RowLgeWAnVTwjexTV8eqxZbys8O5EpsX4DCCMjjiIIUTEjuO3ppYJxcItGU6R7dJES7y9Y0HLIGMbtWuhn0PhiNLIygXebEQDWHofIBOTCnmdoRUd2wBvAaIlhqV5k5bLAxlKIysswcjxps0oMPTT98oGOp0BgW8%2FYW7v90%2BSv9RMOZYy4tz9hp%2B5oYIawDo5dyUx3apbmOX7XDiluquT0LKU7yDDqhv58Fh%2FKCNhOOowDg6oRe1R%2B61ObA3YLzGrxcWPvfmsLi0BfVDnW2kZ7C6hCqZ%2FUo%2BxlDFx8wJ7dpZUStGMyXAu%2FbYlId3NGjjW4J8GIauOfY8ZP6sRBPQxjVGDBy2X4mAMVVj6vhEpTHaLDg%3D%3D\u0026X-Amz-SignedHeaders=host\u0026x-id=GetObject\u0026X-Amz-Signature=6bd20aa6fa3ec9d36f9b48cd03b3f16832ec7994c57d3f732b4c683619935d2a',
                  id: '01KDMMSDXBXT0M2RR6ZFSQXZYR',
                  img: 'https://bytelyon-db-prod.s3.us-east-1.amazonaws.com/user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/search/bulk%20dyneema%20for%20sale/01KDMMSAPC6VXKDCWKCS6A9A9K/serp/01KDMMSDXBXT0M2RR6ZFSQXZYR.png?X-Amz-Algorithm=AWS4-HMAC-SHA256\u0026X-Amz-Checksum-Mode=ENABLED\u0026X-Amz-Credential=ASIASAM5DBXJSKSBNALW%2F20260107%2Fus-east-1%2Fs3%2Faws4_request\u0026X-Amz-Date=20260107T050701Z\u0026X-Amz-Expires=1800\u0026X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQCO6WCph1EyLhMirsLHOyHLc3lb7GRPTY7SPVQSAgjuywIhAJ3Y0ihkUoUSbc1NlJu5acLvKXLqXzUz0VEEpL6eZAqfKvQCCG4QBBoMMTM4MzA1Mjc3Mzk1IgwgvEE9gFaAJMu3Diwq0QKTsODXcHLgTIIs29vio0tzg6cn8wW00R5JvoStCYSsGR4mqbAzvU%2B2ACBwbsPHCch77CBAnaoH1ZTm2L3zLyIg3TmCnYuaDn72uASpMXP6aLQuZqpnrZGLkN1JTweNumWQUC%2F98V5uTGE9WM6YXluUIfbntZSEHCdfJk9y0o7Z2PQhkiTaQpn40nEr0aYOF338BKIcJRHrlG9DIPQMpew6xgpuLcpDaw3GKPAyg8Y9cvmm47648YlkUCy5HiMttqPdwbMnv3fksmaz4SpaVeUAoqr95dAeq97mlF7vhfQcfccVFE8RowLgeWAnVTwjexTV8eqxZbys8O5EpsX4DCCMjjiIIUTEjuO3ppYJxcItGU6R7dJES7y9Y0HLIGMbtWuhn0PhiNLIygXebEQDWHofIBOTCnmdoRUd2wBvAaIlhqV5k5bLAxlKIysswcjxps0oMPTT98oGOp0BgW8%2FYW7v90%2BSv9RMOZYy4tz9hp%2B5oYIawDo5dyUx3apbmOX7XDiluquT0LKU7yDDqhv58Fh%2FKCNhOOowDg6oRe1R%2B61ObA3YLzGrxcWPvfmsLi0BfVDnW2kZ7C6hCqZ%2FUo%2BxlDFx8wJ7dpZUStGMyXAu%2FbYlId3NGjjW4J8GIauOfY8ZP6sRBPQxjVGDBy2X4mAMVVj6vhEpTHaLDg%3D%3D\u0026X-Amz-SignedHeaders=host\u0026x-id=GetObject\u0026X-Amz-Signature=b87a441dbc7ab9d017ab13128027e43af5a27936f39b0124afb785c63852fc77',
                  json: {
                    domain: 'google.com',
                    results: {
                      also_asked: [],
                      article: [],
                      forum: [],
                      more_products: [],
                      organic: [],
                      popular_products: [],
                      related_query: [],
                      sponsored: [],
                      video: [],
                    },
                    targets: {
                      '*': true,
                    },
                    title: 'bulk dyneema for sale - Google Search',
                    url: 'https://www.google.com/search?hl=en\u0026source=hp\u0026biw=\u0026bih=\u0026q=bulk+dyneema+for+sale\u0026iflsig=AOw8s4IAAAAAaVJOwFEjkIknUAh3ePvVc7PXXlN5O92T\u0026gbv=2\u0026oq=bulk+dyneema+for+sale\u0026gs_l=heirloom-hp.3...255.255.0.272.1.1.0.0.0.0.0.0..0.0....0...1..34.heirloom-hp..1.0.0.dIejO8Hqw18\u0026sei=sEBSaaO8NezHkPIPhM74uA8',
                  },
                },
              },
              {
                id: 'search/bulk dyneema for sale/2025-12-29 08:53:26',
                label: '2025-12-29 08:53:26',
                noTick: true,
                expandable: true,
                selectable: true,
                data: {
                  html: 'https://bytelyon-db-prod.s3.us-east-1.amazonaws.com/user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/search/bulk%20dyneema%20for%20sale/01KDMMZWYNCRK583C08QVMQ9J3/serp/01KDMMZZVG6FQ3BA314BKB00S3.html?X-Amz-Algorithm=AWS4-HMAC-SHA256\u0026X-Amz-Checksum-Mode=ENABLED\u0026X-Amz-Credential=ASIASAM5DBXJSKSBNALW%2F20260107%2Fus-east-1%2Fs3%2Faws4_request\u0026X-Amz-Date=20260107T050701Z\u0026X-Amz-Expires=1800\u0026X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQCO6WCph1EyLhMirsLHOyHLc3lb7GRPTY7SPVQSAgjuywIhAJ3Y0ihkUoUSbc1NlJu5acLvKXLqXzUz0VEEpL6eZAqfKvQCCG4QBBoMMTM4MzA1Mjc3Mzk1IgwgvEE9gFaAJMu3Diwq0QKTsODXcHLgTIIs29vio0tzg6cn8wW00R5JvoStCYSsGR4mqbAzvU%2B2ACBwbsPHCch77CBAnaoH1ZTm2L3zLyIg3TmCnYuaDn72uASpMXP6aLQuZqpnrZGLkN1JTweNumWQUC%2F98V5uTGE9WM6YXluUIfbntZSEHCdfJk9y0o7Z2PQhkiTaQpn40nEr0aYOF338BKIcJRHrlG9DIPQMpew6xgpuLcpDaw3GKPAyg8Y9cvmm47648YlkUCy5HiMttqPdwbMnv3fksmaz4SpaVeUAoqr95dAeq97mlF7vhfQcfccVFE8RowLgeWAnVTwjexTV8eqxZbys8O5EpsX4DCCMjjiIIUTEjuO3ppYJxcItGU6R7dJES7y9Y0HLIGMbtWuhn0PhiNLIygXebEQDWHofIBOTCnmdoRUd2wBvAaIlhqV5k5bLAxlKIysswcjxps0oMPTT98oGOp0BgW8%2FYW7v90%2BSv9RMOZYy4tz9hp%2B5oYIawDo5dyUx3apbmOX7XDiluquT0LKU7yDDqhv58Fh%2FKCNhOOowDg6oRe1R%2B61ObA3YLzGrxcWPvfmsLi0BfVDnW2kZ7C6hCqZ%2FUo%2BxlDFx8wJ7dpZUStGMyXAu%2FbYlId3NGjjW4J8GIauOfY8ZP6sRBPQxjVGDBy2X4mAMVVj6vhEpTHaLDg%3D%3D\u0026X-Amz-SignedHeaders=host\u0026x-id=GetObject\u0026X-Amz-Signature=403cf7aff16fd54ab37f9ebc7be2e2f134d5ee39ebb94e065284817f7a9cfd48',
                  id: '01KDMMZZVG6FQ3BA314BKB00S3',
                  img: 'https://bytelyon-db-prod.s3.us-east-1.amazonaws.com/user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/search/bulk%20dyneema%20for%20sale/01KDMMZWYNCRK583C08QVMQ9J3/serp/01KDMMZZVG6FQ3BA314BKB00S3.png?X-Amz-Algorithm=AWS4-HMAC-SHA256\u0026X-Amz-Checksum-Mode=ENABLED\u0026X-Amz-Credential=ASIASAM5DBXJSKSBNALW%2F20260107%2Fus-east-1%2Fs3%2Faws4_request\u0026X-Amz-Date=20260107T050701Z\u0026X-Amz-Expires=1800\u0026X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQCO6WCph1EyLhMirsLHOyHLc3lb7GRPTY7SPVQSAgjuywIhAJ3Y0ihkUoUSbc1NlJu5acLvKXLqXzUz0VEEpL6eZAqfKvQCCG4QBBoMMTM4MzA1Mjc3Mzk1IgwgvEE9gFaAJMu3Diwq0QKTsODXcHLgTIIs29vio0tzg6cn8wW00R5JvoStCYSsGR4mqbAzvU%2B2ACBwbsPHCch77CBAnaoH1ZTm2L3zLyIg3TmCnYuaDn72uASpMXP6aLQuZqpnrZGLkN1JTweNumWQUC%2F98V5uTGE9WM6YXluUIfbntZSEHCdfJk9y0o7Z2PQhkiTaQpn40nEr0aYOF338BKIcJRHrlG9DIPQMpew6xgpuLcpDaw3GKPAyg8Y9cvmm47648YlkUCy5HiMttqPdwbMnv3fksmaz4SpaVeUAoqr95dAeq97mlF7vhfQcfccVFE8RowLgeWAnVTwjexTV8eqxZbys8O5EpsX4DCCMjjiIIUTEjuO3ppYJxcItGU6R7dJES7y9Y0HLIGMbtWuhn0PhiNLIygXebEQDWHofIBOTCnmdoRUd2wBvAaIlhqV5k5bLAxlKIysswcjxps0oMPTT98oGOp0BgW8%2FYW7v90%2BSv9RMOZYy4tz9hp%2B5oYIawDo5dyUx3apbmOX7XDiluquT0LKU7yDDqhv58Fh%2FKCNhOOowDg6oRe1R%2B61ObA3YLzGrxcWPvfmsLi0BfVDnW2kZ7C6hCqZ%2FUo%2BxlDFx8wJ7dpZUStGMyXAu%2FbYlId3NGjjW4J8GIauOfY8ZP6sRBPQxjVGDBy2X4mAMVVj6vhEpTHaLDg%3D%3D\u0026X-Amz-SignedHeaders=host\u0026x-id=GetObject\u0026X-Amz-Signature=47702b7bbdb2346bb59828c6eefff3ee3acfb81f56edd8bf1d14dc271b31e165',
                  json: {
                    domain: 'google.com',
                    results: {
                      also_asked: [],
                      article: [],
                      forum: [],
                      more_products: [],
                      organic: [],
                      popular_products: [],
                      related_query: [],
                      sponsored: [],
                      video: [],
                    },
                    targets: {
                      '*': true,
                    },
                    title: 'bulk dyneema for sale - Google Search',
                    url: 'https://www.google.com/search?hl=en\u0026source=hp\u0026biw=\u0026bih=\u0026q=bulk+dyneema+for+sale\u0026iflsig=AOw8s4IAAAAAaVJPlwzmJHPrf2URjANNAVRP9BxLFdag\u0026gbv=2\u0026oq=bulk+dyneema+for+sale\u0026gs_l=heirloom-hp.3...270.270.0.276.1.1.0.0.0.0.0.0..0.0....0...1..34.heirloom-hp..1.0.0.KpSWNlcJ6vY\u0026sei=h0FSadnuL5TBkPIP1vOCuAs',
                  },
                },
              },
              {
                id: 'search/bulk dyneema for sale/2025-12-29 09:02:24',
                label: '2025-12-29 09:02:24',
                data: {
                  html: 'https://bytelyon-db-prod.s3.us-east-1.amazonaws.com/user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/search/bulk%20dyneema%20for%20sale/01KDMNGAXTTHHEPYRPG4507425/serp/01KDMNGHRR0C25NSFQCQXEA0DX.html?X-Amz-Algorithm=AWS4-HMAC-SHA256\u0026X-Amz-Checksum-Mode=ENABLED\u0026X-Amz-Credential=ASIASAM5DBXJSKSBNALW%2F20260107%2Fus-east-1%2Fs3%2Faws4_request\u0026X-Amz-Date=20260107T050701Z\u0026X-Amz-Expires=1800\u0026X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQCO6WCph1EyLhMirsLHOyHLc3lb7GRPTY7SPVQSAgjuywIhAJ3Y0ihkUoUSbc1NlJu5acLvKXLqXzUz0VEEpL6eZAqfKvQCCG4QBBoMMTM4MzA1Mjc3Mzk1IgwgvEE9gFaAJMu3Diwq0QKTsODXcHLgTIIs29vio0tzg6cn8wW00R5JvoStCYSsGR4mqbAzvU%2B2ACBwbsPHCch77CBAnaoH1ZTm2L3zLyIg3TmCnYuaDn72uASpMXP6aLQuZqpnrZGLkN1JTweNumWQUC%2F98V5uTGE9WM6YXluUIfbntZSEHCdfJk9y0o7Z2PQhkiTaQpn40nEr0aYOF338BKIcJRHrlG9DIPQMpew6xgpuLcpDaw3GKPAyg8Y9cvmm47648YlkUCy5HiMttqPdwbMnv3fksmaz4SpaVeUAoqr95dAeq97mlF7vhfQcfccVFE8RowLgeWAnVTwjexTV8eqxZbys8O5EpsX4DCCMjjiIIUTEjuO3ppYJxcItGU6R7dJES7y9Y0HLIGMbtWuhn0PhiNLIygXebEQDWHofIBOTCnmdoRUd2wBvAaIlhqV5k5bLAxlKIysswcjxps0oMPTT98oGOp0BgW8%2FYW7v90%2BSv9RMOZYy4tz9hp%2B5oYIawDo5dyUx3apbmOX7XDiluquT0LKU7yDDqhv58Fh%2FKCNhOOowDg6oRe1R%2B61ObA3YLzGrxcWPvfmsLi0BfVDnW2kZ7C6hCqZ%2FUo%2BxlDFx8wJ7dpZUStGMyXAu%2FbYlId3NGjjW4J8GIauOfY8ZP6sRBPQxjVGDBy2X4mAMVVj6vhEpTHaLDg%3D%3D\u0026X-Amz-SignedHeaders=host\u0026x-id=GetObject\u0026X-Amz-Signature=ec1466922425b8578f23f877fc0f09f97c247d8e70b483cb0c564e009fb2da9d',
                  id: '01KDMNGHRR0C25NSFQCQXEA0DX',
                  img: 'https://bytelyon-db-prod.s3.us-east-1.amazonaws.com/user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/search/bulk%20dyneema%20for%20sale/01KDMNGAXTTHHEPYRPG4507425/serp/01KDMNGHRR0C25NSFQCQXEA0DX.png?X-Amz-Algorithm=AWS4-HMAC-SHA256\u0026X-Amz-Checksum-Mode=ENABLED\u0026X-Amz-Credential=ASIASAM5DBXJSKSBNALW%2F20260107%2Fus-east-1%2Fs3%2Faws4_request\u0026X-Amz-Date=20260107T050701Z\u0026X-Amz-Expires=1800\u0026X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQCO6WCph1EyLhMirsLHOyHLc3lb7GRPTY7SPVQSAgjuywIhAJ3Y0ihkUoUSbc1NlJu5acLvKXLqXzUz0VEEpL6eZAqfKvQCCG4QBBoMMTM4MzA1Mjc3Mzk1IgwgvEE9gFaAJMu3Diwq0QKTsODXcHLgTIIs29vio0tzg6cn8wW00R5JvoStCYSsGR4mqbAzvU%2B2ACBwbsPHCch77CBAnaoH1ZTm2L3zLyIg3TmCnYuaDn72uASpMXP6aLQuZqpnrZGLkN1JTweNumWQUC%2F98V5uTGE9WM6YXluUIfbntZSEHCdfJk9y0o7Z2PQhkiTaQpn40nEr0aYOF338BKIcJRHrlG9DIPQMpew6xgpuLcpDaw3GKPAyg8Y9cvmm47648YlkUCy5HiMttqPdwbMnv3fksmaz4SpaVeUAoqr95dAeq97mlF7vhfQcfccVFE8RowLgeWAnVTwjexTV8eqxZbys8O5EpsX4DCCMjjiIIUTEjuO3ppYJxcItGU6R7dJES7y9Y0HLIGMbtWuhn0PhiNLIygXebEQDWHofIBOTCnmdoRUd2wBvAaIlhqV5k5bLAxlKIysswcjxps0oMPTT98oGOp0BgW8%2FYW7v90%2BSv9RMOZYy4tz9hp%2B5oYIawDo5dyUx3apbmOX7XDiluquT0LKU7yDDqhv58Fh%2FKCNhOOowDg6oRe1R%2B61ObA3YLzGrxcWPvfmsLi0BfVDnW2kZ7C6hCqZ%2FUo%2BxlDFx8wJ7dpZUStGMyXAu%2FbYlId3NGjjW4J8GIauOfY8ZP6sRBPQxjVGDBy2X4mAMVVj6vhEpTHaLDg%3D%3D\u0026X-Amz-SignedHeaders=host\u0026x-id=GetObject\u0026X-Amz-Signature=83164e6b236a7b58a14171c32bc7c6669cd28159b9e19d1f014c632f51beed7f',
                  json: {
                    domain: 'google.com',
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
                          title:
                            'Dyneema Rope | 1/4 in Width | 250 ft Length | Hercules Bulk Ropes',
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
                          title:
                            'Dyneema Line SK99 Pre-stretched Black 1000m 500kg Vector LYK0750009',
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
                    title: 'bulk dyneema for sale - Google Search',
                    url: 'https://www.google.com/search?q=bulk+dyneema+for+sale\u0026sca_esv=692808820ee644ef\u0026source=hp\u0026ei=okNSaYHqCK7IkPIP7pXEiQ8\u0026iflsig=AOw8s4IAAAAAaVJRstQK9zfipNEyiJaIZip9v6WSdETx\u0026ved=0ahUKEwiBw4OEuOKRAxUuJEQIHe4KMfEQ4dUDCBA\u0026uact=5\u0026oq=bulk+dyneema+for+sale\u0026gs_lp=Egdnd3Mtd2l6IhVidWxrIGR5bmVlbWEgZm9yIHNhbGUyChAAGAMYjwEY6gIyChAAGAMYjwEY6gIyChAAGAMYjwEY6gIyChAAGAMYjwEY6gIyChAAGAMYjwEY6gIyChAAGAMYjwEY6gIyChAAGAMYjwEY6gIyChAAGAMYjwEY6gIyChAAGAMYjwEY6gIyChAAGAMYjwEY6gJIFVAQWBBwAXgAkAEAmAEAoAEAqgEAuAEDyAEA-AEBmAIBoAIFqAIKmAMFkgcBMaAHALIHALgHAMIHAzItMcgHBIAIAQ\u0026sclient=gws-wiz\u0026sei=o0NSaZL3Cq2lkPIPz4vFsQM',
                  },
                },
              },
            ],
            data: {
              user_id: '01K48PC0BK13BWV2CGWFP8QQH0',
              id: 'bulk dyneema for sale',
              type: 'search',
              prowled: '01KDMMSDXBXT0M2RR6ZFSQXZYR',
              frequency: 0,
              duration: 41176241166,
              targets: {
                '*': true,
              },
            },
          },
          {
            id: 'search/indoor bike trainer',
            label: 'indoor bike trainer',
            noTick: true,
            expandable: true,
            selectable: true,
            children: [
              {
                id: 'search/indoor bike trainer/2025-12-29 08:43:51',
                label: '2025-12-29 08:43:51',
                noTick: true,
                expandable: true,
                selectable: true,
                data: {
                  html: 'https://bytelyon-db-prod.s3.us-east-1.amazonaws.com/user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/search/indoor%20bike%20trainer/01KDMMEC8JQR6QNQGVNFSX87K3/serp/01KDMMEFQ8ARHXS1T9CZ9GXWDP.html?X-Amz-Algorithm=AWS4-HMAC-SHA256\u0026X-Amz-Checksum-Mode=ENABLED\u0026X-Amz-Credential=ASIASAM5DBXJSKSBNALW%2F20260107%2Fus-east-1%2Fs3%2Faws4_request\u0026X-Amz-Date=20260107T050701Z\u0026X-Amz-Expires=1800\u0026X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQCO6WCph1EyLhMirsLHOyHLc3lb7GRPTY7SPVQSAgjuywIhAJ3Y0ihkUoUSbc1NlJu5acLvKXLqXzUz0VEEpL6eZAqfKvQCCG4QBBoMMTM4MzA1Mjc3Mzk1IgwgvEE9gFaAJMu3Diwq0QKTsODXcHLgTIIs29vio0tzg6cn8wW00R5JvoStCYSsGR4mqbAzvU%2B2ACBwbsPHCch77CBAnaoH1ZTm2L3zLyIg3TmCnYuaDn72uASpMXP6aLQuZqpnrZGLkN1JTweNumWQUC%2F98V5uTGE9WM6YXluUIfbntZSEHCdfJk9y0o7Z2PQhkiTaQpn40nEr0aYOF338BKIcJRHrlG9DIPQMpew6xgpuLcpDaw3GKPAyg8Y9cvmm47648YlkUCy5HiMttqPdwbMnv3fksmaz4SpaVeUAoqr95dAeq97mlF7vhfQcfccVFE8RowLgeWAnVTwjexTV8eqxZbys8O5EpsX4DCCMjjiIIUTEjuO3ppYJxcItGU6R7dJES7y9Y0HLIGMbtWuhn0PhiNLIygXebEQDWHofIBOTCnmdoRUd2wBvAaIlhqV5k5bLAxlKIysswcjxps0oMPTT98oGOp0BgW8%2FYW7v90%2BSv9RMOZYy4tz9hp%2B5oYIawDo5dyUx3apbmOX7XDiluquT0LKU7yDDqhv58Fh%2FKCNhOOowDg6oRe1R%2B61ObA3YLzGrxcWPvfmsLi0BfVDnW2kZ7C6hCqZ%2FUo%2BxlDFx8wJ7dpZUStGMyXAu%2FbYlId3NGjjW4J8GIauOfY8ZP6sRBPQxjVGDBy2X4mAMVVj6vhEpTHaLDg%3D%3D\u0026X-Amz-SignedHeaders=host\u0026x-id=GetObject\u0026X-Amz-Signature=5d19fa447eabbeda734c669341333cac8da3c688f0385028799b862e827fe015',
                  id: '01KDMMEFQ8ARHXS1T9CZ9GXWDP',
                  img: 'https://bytelyon-db-prod.s3.us-east-1.amazonaws.com/user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/search/indoor%20bike%20trainer/01KDMMEC8JQR6QNQGVNFSX87K3/serp/01KDMMEFQ8ARHXS1T9CZ9GXWDP.png?X-Amz-Algorithm=AWS4-HMAC-SHA256\u0026X-Amz-Checksum-Mode=ENABLED\u0026X-Amz-Credential=ASIASAM5DBXJSKSBNALW%2F20260107%2Fus-east-1%2Fs3%2Faws4_request\u0026X-Amz-Date=20260107T050701Z\u0026X-Amz-Expires=1800\u0026X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQCO6WCph1EyLhMirsLHOyHLc3lb7GRPTY7SPVQSAgjuywIhAJ3Y0ihkUoUSbc1NlJu5acLvKXLqXzUz0VEEpL6eZAqfKvQCCG4QBBoMMTM4MzA1Mjc3Mzk1IgwgvEE9gFaAJMu3Diwq0QKTsODXcHLgTIIs29vio0tzg6cn8wW00R5JvoStCYSsGR4mqbAzvU%2B2ACBwbsPHCch77CBAnaoH1ZTm2L3zLyIg3TmCnYuaDn72uASpMXP6aLQuZqpnrZGLkN1JTweNumWQUC%2F98V5uTGE9WM6YXluUIfbntZSEHCdfJk9y0o7Z2PQhkiTaQpn40nEr0aYOF338BKIcJRHrlG9DIPQMpew6xgpuLcpDaw3GKPAyg8Y9cvmm47648YlkUCy5HiMttqPdwbMnv3fksmaz4SpaVeUAoqr95dAeq97mlF7vhfQcfccVFE8RowLgeWAnVTwjexTV8eqxZbys8O5EpsX4DCCMjjiIIUTEjuO3ppYJxcItGU6R7dJES7y9Y0HLIGMbtWuhn0PhiNLIygXebEQDWHofIBOTCnmdoRUd2wBvAaIlhqV5k5bLAxlKIysswcjxps0oMPTT98oGOp0BgW8%2FYW7v90%2BSv9RMOZYy4tz9hp%2B5oYIawDo5dyUx3apbmOX7XDiluquT0LKU7yDDqhv58Fh%2FKCNhOOowDg6oRe1R%2B61ObA3YLzGrxcWPvfmsLi0BfVDnW2kZ7C6hCqZ%2FUo%2BxlDFx8wJ7dpZUStGMyXAu%2FbYlId3NGjjW4J8GIauOfY8ZP6sRBPQxjVGDBy2X4mAMVVj6vhEpTHaLDg%3D%3D\u0026X-Amz-SignedHeaders=host\u0026x-id=GetObject\u0026X-Amz-Signature=389f52bef2dc5e66b3e1c1b5785999e77bd047f36a0600419cd71dc8c0e7ed7e',
                  json: {
                    domain: 'google.com',
                    results: {
                      also_asked: [],
                      article: [],
                      forum: [],
                      more_products: [],
                      organic: [],
                      popular_products: [],
                      related_query: [],
                      sponsored: [],
                      video: [],
                    },
                    targets: {
                      '*': true,
                    },
                    title: 'indoor bike trainer - Google Search',
                    url: 'https://www.google.com/search?hl=en\u0026source=hp\u0026biw=\u0026bih=\u0026q=indoor+bike+trainer\u0026iflsig=AOw8s4IAAAAAaVJNWQX7D2FB3X3bF4z3-n0nlaVEDYNd\u0026gbv=2\u0026oq=indoor+bike+trainer\u0026gs_l=heirloom-hp.3...388.388.0.392.1.1.0.0.0.0.0.0..0.0....0...1..34.heirloom-hp..1.0.0.WAOVDNgDplk\u0026sei=Sj9Saaq_Dq6wur8PwYyO-Qs',
                  },
                },
              },
              {
                id: 'search/indoor bike trainer/2025-12-29 09:07:13',
                label: '2025-12-29 09:07:13',
                noTick: true,
                expandable: true,
                selectable: true,
                data: {
                  html: 'https://bytelyon-db-prod.s3.us-east-1.amazonaws.com/user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/search/indoor%20bike%20trainer/01KDMNS4MFE5FWAJ8KEYHVBYZZ/serp/01KDMNS7HTP01MCF81M0GJWDVJ.html?X-Amz-Algorithm=AWS4-HMAC-SHA256\u0026X-Amz-Checksum-Mode=ENABLED\u0026X-Amz-Credential=ASIASAM5DBXJSKSBNALW%2F20260107%2Fus-east-1%2Fs3%2Faws4_request\u0026X-Amz-Date=20260107T050701Z\u0026X-Amz-Expires=1800\u0026X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQCO6WCph1EyLhMirsLHOyHLc3lb7GRPTY7SPVQSAgjuywIhAJ3Y0ihkUoUSbc1NlJu5acLvKXLqXzUz0VEEpL6eZAqfKvQCCG4QBBoMMTM4MzA1Mjc3Mzk1IgwgvEE9gFaAJMu3Diwq0QKTsODXcHLgTIIs29vio0tzg6cn8wW00R5JvoStCYSsGR4mqbAzvU%2B2ACBwbsPHCch77CBAnaoH1ZTm2L3zLyIg3TmCnYuaDn72uASpMXP6aLQuZqpnrZGLkN1JTweNumWQUC%2F98V5uTGE9WM6YXluUIfbntZSEHCdfJk9y0o7Z2PQhkiTaQpn40nEr0aYOF338BKIcJRHrlG9DIPQMpew6xgpuLcpDaw3GKPAyg8Y9cvmm47648YlkUCy5HiMttqPdwbMnv3fksmaz4SpaVeUAoqr95dAeq97mlF7vhfQcfccVFE8RowLgeWAnVTwjexTV8eqxZbys8O5EpsX4DCCMjjiIIUTEjuO3ppYJxcItGU6R7dJES7y9Y0HLIGMbtWuhn0PhiNLIygXebEQDWHofIBOTCnmdoRUd2wBvAaIlhqV5k5bLAxlKIysswcjxps0oMPTT98oGOp0BgW8%2FYW7v90%2BSv9RMOZYy4tz9hp%2B5oYIawDo5dyUx3apbmOX7XDiluquT0LKU7yDDqhv58Fh%2FKCNhOOowDg6oRe1R%2B61ObA3YLzGrxcWPvfmsLi0BfVDnW2kZ7C6hCqZ%2FUo%2BxlDFx8wJ7dpZUStGMyXAu%2FbYlId3NGjjW4J8GIauOfY8ZP6sRBPQxjVGDBy2X4mAMVVj6vhEpTHaLDg%3D%3D\u0026X-Amz-SignedHeaders=host\u0026x-id=GetObject\u0026X-Amz-Signature=3b2fba3bcb3366dd45c55e0e539441c9eb96de63c8652d2f3ec196ddff5c461a',
                  id: '01KDMNS7HTP01MCF81M0GJWDVJ',
                  img: 'https://bytelyon-db-prod.s3.us-east-1.amazonaws.com/user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/search/indoor%20bike%20trainer/01KDMNS4MFE5FWAJ8KEYHVBYZZ/serp/01KDMNS7HTP01MCF81M0GJWDVJ.png?X-Amz-Algorithm=AWS4-HMAC-SHA256\u0026X-Amz-Checksum-Mode=ENABLED\u0026X-Amz-Credential=ASIASAM5DBXJSKSBNALW%2F20260107%2Fus-east-1%2Fs3%2Faws4_request\u0026X-Amz-Date=20260107T050701Z\u0026X-Amz-Expires=1800\u0026X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQCO6WCph1EyLhMirsLHOyHLc3lb7GRPTY7SPVQSAgjuywIhAJ3Y0ihkUoUSbc1NlJu5acLvKXLqXzUz0VEEpL6eZAqfKvQCCG4QBBoMMTM4MzA1Mjc3Mzk1IgwgvEE9gFaAJMu3Diwq0QKTsODXcHLgTIIs29vio0tzg6cn8wW00R5JvoStCYSsGR4mqbAzvU%2B2ACBwbsPHCch77CBAnaoH1ZTm2L3zLyIg3TmCnYuaDn72uASpMXP6aLQuZqpnrZGLkN1JTweNumWQUC%2F98V5uTGE9WM6YXluUIfbntZSEHCdfJk9y0o7Z2PQhkiTaQpn40nEr0aYOF338BKIcJRHrlG9DIPQMpew6xgpuLcpDaw3GKPAyg8Y9cvmm47648YlkUCy5HiMttqPdwbMnv3fksmaz4SpaVeUAoqr95dAeq97mlF7vhfQcfccVFE8RowLgeWAnVTwjexTV8eqxZbys8O5EpsX4DCCMjjiIIUTEjuO3ppYJxcItGU6R7dJES7y9Y0HLIGMbtWuhn0PhiNLIygXebEQDWHofIBOTCnmdoRUd2wBvAaIlhqV5k5bLAxlKIysswcjxps0oMPTT98oGOp0BgW8%2FYW7v90%2BSv9RMOZYy4tz9hp%2B5oYIawDo5dyUx3apbmOX7XDiluquT0LKU7yDDqhv58Fh%2FKCNhOOowDg6oRe1R%2B61ObA3YLzGrxcWPvfmsLi0BfVDnW2kZ7C6hCqZ%2FUo%2BxlDFx8wJ7dpZUStGMyXAu%2FbYlId3NGjjW4J8GIauOfY8ZP6sRBPQxjVGDBy2X4mAMVVj6vhEpTHaLDg%3D%3D\u0026X-Amz-SignedHeaders=host\u0026x-id=GetObject\u0026X-Amz-Signature=ed2ad9fa2b3b92b6a9f2790844f991eff63be4ab363ffc0e59755583f13993e3',
                  json: {
                    domain: 'google.com',
                    results: {
                      also_asked: [],
                      article: [],
                      forum: [],
                      more_products: [],
                      organic: [],
                      popular_products: [],
                      related_query: [],
                      sponsored: [],
                      video: [],
                    },
                    targets: {
                      '*': true,
                    },
                    title: 'indoor bike trainer - Google Search',
                    url: 'https://www.google.com/search?hl=en\u0026source=hp\u0026biw=\u0026bih=\u0026q=indoor+bike+trainer\u0026iflsig=AOw8s4IAAAAAaVJS0oeHpPqHCFeeMLu48wkq1EsXzV_5\u0026gbv=2\u0026oq=indoor+bike+trainer\u0026gs_l=heirloom-hp.3...315.315.0.327.1.1.0.0.0.0.0.0..0.0....0...1..34.heirloom-hp..1.0.0.2tsTyy3FZgo\u0026sei=wkRSaaGROcqiur8Pxsr6qAk',
                  },
                },
              },
              {
                id: 'search/indoor bike trainer/2025-12-29 09:08:05',
                label: '2025-12-29 09:08:05',
                noTick: true,
                expandable: true,
                selectable: true,
                data: {
                  html: 'https://bytelyon-db-prod.s3.us-east-1.amazonaws.com/user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/search/indoor%20bike%20trainer/01KDMNTR5MHPVH9WNXQWP85VSW/serp/01KDMNTW3B26M1WQ2SM2EWT8N8.html?X-Amz-Algorithm=AWS4-HMAC-SHA256\u0026X-Amz-Checksum-Mode=ENABLED\u0026X-Amz-Credential=ASIASAM5DBXJSKSBNALW%2F20260107%2Fus-east-1%2Fs3%2Faws4_request\u0026X-Amz-Date=20260107T050701Z\u0026X-Amz-Expires=1800\u0026X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQCO6WCph1EyLhMirsLHOyHLc3lb7GRPTY7SPVQSAgjuywIhAJ3Y0ihkUoUSbc1NlJu5acLvKXLqXzUz0VEEpL6eZAqfKvQCCG4QBBoMMTM4MzA1Mjc3Mzk1IgwgvEE9gFaAJMu3Diwq0QKTsODXcHLgTIIs29vio0tzg6cn8wW00R5JvoStCYSsGR4mqbAzvU%2B2ACBwbsPHCch77CBAnaoH1ZTm2L3zLyIg3TmCnYuaDn72uASpMXP6aLQuZqpnrZGLkN1JTweNumWQUC%2F98V5uTGE9WM6YXluUIfbntZSEHCdfJk9y0o7Z2PQhkiTaQpn40nEr0aYOF338BKIcJRHrlG9DIPQMpew6xgpuLcpDaw3GKPAyg8Y9cvmm47648YlkUCy5HiMttqPdwbMnv3fksmaz4SpaVeUAoqr95dAeq97mlF7vhfQcfccVFE8RowLgeWAnVTwjexTV8eqxZbys8O5EpsX4DCCMjjiIIUTEjuO3ppYJxcItGU6R7dJES7y9Y0HLIGMbtWuhn0PhiNLIygXebEQDWHofIBOTCnmdoRUd2wBvAaIlhqV5k5bLAxlKIysswcjxps0oMPTT98oGOp0BgW8%2FYW7v90%2BSv9RMOZYy4tz9hp%2B5oYIawDo5dyUx3apbmOX7XDiluquT0LKU7yDDqhv58Fh%2FKCNhOOowDg6oRe1R%2B61ObA3YLzGrxcWPvfmsLi0BfVDnW2kZ7C6hCqZ%2FUo%2BxlDFx8wJ7dpZUStGMyXAu%2FbYlId3NGjjW4J8GIauOfY8ZP6sRBPQxjVGDBy2X4mAMVVj6vhEpTHaLDg%3D%3D\u0026X-Amz-SignedHeaders=host\u0026x-id=GetObject\u0026X-Amz-Signature=11dd4243a748db8351bacfe7e7dcaa96e4324ebe036ac2236a3be91e674280e3',
                  id: '01KDMNTW3B26M1WQ2SM2EWT8N8',
                  img: 'https://bytelyon-db-prod.s3.us-east-1.amazonaws.com/user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/search/indoor%20bike%20trainer/01KDMNTR5MHPVH9WNXQWP85VSW/serp/01KDMNTW3B26M1WQ2SM2EWT8N8.png?X-Amz-Algorithm=AWS4-HMAC-SHA256\u0026X-Amz-Checksum-Mode=ENABLED\u0026X-Amz-Credential=ASIASAM5DBXJSKSBNALW%2F20260107%2Fus-east-1%2Fs3%2Faws4_request\u0026X-Amz-Date=20260107T050701Z\u0026X-Amz-Expires=1800\u0026X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQCO6WCph1EyLhMirsLHOyHLc3lb7GRPTY7SPVQSAgjuywIhAJ3Y0ihkUoUSbc1NlJu5acLvKXLqXzUz0VEEpL6eZAqfKvQCCG4QBBoMMTM4MzA1Mjc3Mzk1IgwgvEE9gFaAJMu3Diwq0QKTsODXcHLgTIIs29vio0tzg6cn8wW00R5JvoStCYSsGR4mqbAzvU%2B2ACBwbsPHCch77CBAnaoH1ZTm2L3zLyIg3TmCnYuaDn72uASpMXP6aLQuZqpnrZGLkN1JTweNumWQUC%2F98V5uTGE9WM6YXluUIfbntZSEHCdfJk9y0o7Z2PQhkiTaQpn40nEr0aYOF338BKIcJRHrlG9DIPQMpew6xgpuLcpDaw3GKPAyg8Y9cvmm47648YlkUCy5HiMttqPdwbMnv3fksmaz4SpaVeUAoqr95dAeq97mlF7vhfQcfccVFE8RowLgeWAnVTwjexTV8eqxZbys8O5EpsX4DCCMjjiIIUTEjuO3ppYJxcItGU6R7dJES7y9Y0HLIGMbtWuhn0PhiNLIygXebEQDWHofIBOTCnmdoRUd2wBvAaIlhqV5k5bLAxlKIysswcjxps0oMPTT98oGOp0BgW8%2FYW7v90%2BSv9RMOZYy4tz9hp%2B5oYIawDo5dyUx3apbmOX7XDiluquT0LKU7yDDqhv58Fh%2FKCNhOOowDg6oRe1R%2B61ObA3YLzGrxcWPvfmsLi0BfVDnW2kZ7C6hCqZ%2FUo%2BxlDFx8wJ7dpZUStGMyXAu%2FbYlId3NGjjW4J8GIauOfY8ZP6sRBPQxjVGDBy2X4mAMVVj6vhEpTHaLDg%3D%3D\u0026X-Amz-SignedHeaders=host\u0026x-id=GetObject\u0026X-Amz-Signature=50920318d6d371cd04d22af55c362362e55067ec3372b9ecdc778316e72b172d',
                  json: {
                    domain: 'google.com',
                    results: {
                      also_asked: [],
                      article: [],
                      forum: [],
                      more_products: [],
                      organic: [
                        {
                          link: 'https://www.bicycling.com/bikes-gear/a20050631/how-to-choose-an-indoor-bike-trainer/',
                          position: 0,
                          snippet:
                            "On this list you'll find smart trainers for every budget and power profile, plus one minimalist non-smart trainer that tips the scales at just 14 pounds.",
                          source: 'Bicycling',
                          title: 'The Best Indoor Bike Trainers for Riding All Year Long',
                        },
                        {
                          link: 'https://www.wahoofitness.com/devices/indoor-cycling/view-all',
                          position: 1,
                          snippet:
                            'Browse all indoor cycling products including smart bikes, indoor trainers, GPS bike computers, cycling sensors, and more from Wahoo Fitness.',
                          source: 'Wahoo Fitness',
                          title: 'Indoor Cycling Products - Wahoo Fitness',
                        },
                        {
                          link: 'https://www.garmin.com/en-US/c/sports-fitness/indoor-trainers/',
                          position: 2,
                          snippet:
                            'Garmn Tacx offers a variety of high-quality bike trainers including a basic trainer, a fully interactive smart trainer, bike rollers, and much more.',
                          source: 'Garmin',
                          title: 'Garmin Tacx Indoor Bike Trainers',
                        },
                        {
                          link: 'https://www.amazon.com/bike-trainer/s?k=bike+trainer',
                          position: 3,
                          snippet:
                            'Bike Trainer, Magnetic Bicycle Stationary Stand for Indoor Exercise Riding, 26-29" \u0026 700C Wheels, Quick Release Skewer \u0026 Front Wheel Riser Block Included.',
                          source: 'Amazon.com',
                          title: 'Bike Trainer - Amazon.com',
                        },
                        {
                          link: 'https://www.reddit.com/r/cycling/comments/1kf5u01/recommendation_for_indoor_bike_trainer/',
                          position: 4,
                          snippet:
                            "Some trainer options I've found ... Wahoo Kickr V6 ... Wahoo Kickr Core Zwift One ... Wahoo Fitness Kickr Bike V2 ... Elite Suito T ... Tacx Neo 3M.",
                          source: 'Reddit',
                          title: 'Recommendation for indoor bike trainer : r/cycling - Reddit',
                        },
                        {
                          link: 'https://www.cyclingweekly.com/group-tests/smart-turbo-trainers-buyers-guide-326710',
                          position: 5,
                          snippet:
                            'The Quick List · 1. Wahoo Kickr Core · 2. Tacx Flux S · 3. Elite Zumo · 4. Wahoo Kickr V6 · 5. Tacx Neo 2 · 6. Saris H3 · 7. JetBlack Volt V2 · 8. Elite ...',
                          source: 'Cycling Weekly',
                          title:
                            'Best smart indoor trainers 2025: best direct-drive units reviewed',
                        },
                        {
                          link: 'https://www.outdoorgearlab.com/topics/biking/best-bike-trainer',
                          position: 6,
                          snippet:
                            'We put 10 top bike trainers from TacX, Saris, Zwift, and others to the test to find the perfect trainer for you.',
                          source: 'GearLab',
                          title: 'The Best Bike Trainers of 2025 - Outdoor Gear Lab',
                        },
                        {
                          link: 'https://us.zwift.com/products/wahoo-kickr-core-2',
                          position: 7,
                          snippet:
                            'Quiet, smooth, and consistent—the virtual gearing of the Wahoo KICKR CORE 2 turns your bike into a smart bike.',
                          source: 'Zwift',
                          title: 'Wahoo KICKR CORE 2 with Zwift Cog and Click',
                        },
                        {
                          link: 'https://www.triathlete.com/gear/bike/the-best-bike-trainers-for-triathletes-and-cyclists/',
                          position: 8,
                          snippet:
                            'We look at a wide range of the best bike trainers from entry-level to deluxe, rate them, and provide personal accounts of how they work.',
                          source: 'Triathlete',
                          title: 'The Best Indoor Smart Bike Trainers for Triathletes, Winter ...',
                        },
                      ],
                      popular_products: [],
                      related_query: [],
                      sponsored: [
                        {
                          link: 'https://www.onepeloton.com/shop/refurbished/bike',
                          position: 0,
                          price: 695,
                          snippet: '',
                          source: 'Peloton',
                          title: 'Refurbished Original Peloton Bike',
                        },
                        {
                          link: 'https://www.sunandski.com/p/77540056310002016/saris-fluid2-smart-equipped-bike-trainer?vpc=77540056310002016-000100000',
                          position: 1,
                          price: 349.99,
                          snippet: '',
                          source: 'Sun \u0026 Ski Sports',
                          title:
                            'Saris Fluid2 Smart Equipped Bike Trainer in Black | Sun \u0026 Ski Sports',
                        },
                        {
                          link: 'https://www.trisports.com/product/wahoo-fitness-kickr-rollr-smart-roller-trainer?utm_source=google\u0026utm_medium=organic\u0026utm_campaign=surfaces\u0026utm_content=free%20google%20shopping%20clicks',
                          position: 2,
                          price: 699.99,
                          snippet: '',
                          source: 'Trisports.com',
                          title: 'Wahoo Fitness KICKR ROLLR Smart Roller Trainer',
                        },
                        {
                          link: 'https://www.bowflex.com/product/velocore-22-exercise-bike/100914.html',
                          position: 3,
                          price: 1699,
                          snippet: '',
                          source: 'Bowflex',
                          title:
                            'BowFlex VeloCore Indoor Cycling Bike with 22" HD Touchscreen and Leaning Mode',
                        },
                        {
                          link: 'https://www.johnsonfitness.com/Schwinn-IC4-Indoor-Cycling-Bike-P37857.aspx?utm_source=google\u0026utm_medium=organic\u0026utm_campaign=surfaces-across-google\u0026utm_term=SCHIC4',
                          position: 4,
                          price: 999,
                          snippet: '',
                          source: 'Johnson Fitness \u0026 Wellness',
                          title: 'Schwinn IC4 Indoor Cycling Bike, Backlit LCD metric console',
                        },
                        {
                          link: 'https://www.wahoofitness.com/devices/indoor-cycling/bike-trainers/kickr-rollr-buy',
                          position: 5,
                          price: 699.99,
                          snippet: '',
                          source: 'Wahoo Fitness',
                          title: 'Wahoo Kickr Rollr Smart Bike Roller Trainer',
                        },
                        {
                          link: 'https://rockbrosusa.com/products/rock-bros-bike-trainer-stand-for-indoor-riding-exercise-bicycle-training-stand-magnetic-foldable-mountain-road-bike-trainer-adjustable-resistance?currency=USD\u0026variant=41979315224715\u0026utm_source=google\u0026utm_medium=cpc\u0026utm_campaign=Google%20Shopping\u0026stkn=c285e9d913a3',
                          position: 6,
                          price: 118.99,
                          snippet: '',
                          source: 'rockbrosusa.com',
                          title: 'ROCKBROS Foldable Bike Trainer Stand for Indoor Cycling Exercise',
                        },
                        {
                          link: 'https://us.zwift.com/products/zwift-ride-kickr-core-2?variant=46913668382976',
                          position: 7,
                          price: 999.99,
                          snippet: '',
                          source: 'Zwift US',
                          title: 'Zwift Ride with KICKR CORE 2 | All-in-one indoor cycling setup',
                        },
                        {
                          link: 'https://us.zwift.com/products/wahoo-kickr-core-2?variant=46854387663104',
                          position: 8,
                          price: 549.99,
                          snippet: '',
                          source: 'Zwift US',
                          title: 'Wahoo KICKR CORE 2 | Indoor Cycling Trainer',
                        },
                        {
                          link: 'https://www.crutchfield.com/I-rGPSc18TX/p_150FLUX2/Garmin-Tacx-Flux-2.html',
                          position: 9,
                          price: 700,
                          snippet: '',
                          source: 'Crutchfield',
                          title: 'Garmin Tacx Flux 2 Smart bike trainer',
                        },
                        {
                          link: 'https://merachfit.com/products/s29-heavy-duty-exercise-bike-auto-resistance',
                          position: 10,
                          price: 399.99,
                          snippet: '',
                          source: 'Merach US',
                          title:
                            'MERACH S29 Indoor Cycling Bike – Auto Resistance, Ultra-Quiet System, Comfort Ergonomic Seat, 350 lbs Capacity',
                        },
                        {
                          link: 'https://www.walmart.com/ip/Finihen-Bike-Trainers-for-Indoor-Riding-Folding-Stationary-Bike-Stand-Portable-Folding-Steel-Bicycle-Indoor-Exercise-Training-Stand-Black/8078062265?wmlspartner=wlpa\u0026selectedSellerId=101676824\u0026selectedOfferId=606361C31C613C0CA7932C8B44029101\u0026conditionGroupCode=1',
                          position: 11,
                          price: 53.82,
                          snippet: '',
                          source: 'Walmart',
                          title:
                            'Demifill Bike Trainers for Indoor Riding, Folding Stationary Bike Stand, Portable Folding Steel Bicycle Indoor Exercise Training Stand, Black',
                        },
                        {
                          link: 'https://www.bowflex.com/product/c6-exercise-bike/100894.html?adID=DOFG2BFEED1',
                          position: 12,
                          price: 799,
                          snippet: '',
                          source: 'Bowflex',
                          title:
                            'BowFlex C6 Indoor Stationary Cycling Bike with Magnetic Resistance',
                        },
                        {
                          link: 'https://www.garmin.com/en-US/p/690887/pn/T2980.60/',
                          position: 13,
                          price: 700,
                          snippet: '',
                          source: 'Garmin - United States',
                          title: 'Garmin Tacx FLUX 2 Smart Trainer',
                        },
                        {
                          link: 'https://www.roguefitness.com/concept2-bike-erg',
                          position: 14,
                          price: 1100,
                          snippet: '',
                          source: 'Rogue Fitness',
                          title: 'Concept 2 BikeErg - Indoor Stationary Training Bike',
                        },
                        {
                          link: 'https://www.competitivecyclist.com/b/wahoo-fitness-kickr-core-smart-power-trainer?skid=WHA0011-BK-ONESIZ\u0026CMP_SKU=WHA0011',
                          position: 15,
                          price: 535,
                          snippet: '',
                          source: 'Competitive Cyclist',
                          title: 'Wahoo Fitness KICKR CORE Smart Power Trainer Black, One Size',
                        },
                        {
                          link: 'https://www.rei.com/product/208763/wahoo-fitness-kickr-smart-trainer?sku=2087630001\u0026CAWELAID=120217890015068778',
                          position: 16,
                          price: 599.99,
                          snippet: '',
                          source: 'REI',
                          title: 'Wahoo Fitness KICKR Smart Trainer Black',
                        },
                        {
                          link: 'https://www.nordictrack.com/product/x24-bike',
                          position: 17,
                          price: 2299,
                          snippet: '',
                          source: 'NordicTrack',
                          title: 'NordicTrack NEW X24 Bike',
                        },
                        {
                          link: 'https://xenjoyfitness.com/products/cube-desk-exercise-bike',
                          position: 18,
                          price: 599.99,
                          snippet: '',
                          source: 'Xenjoy',
                          title: 'XENJOY XS30 Compact Home Exercise Bike – Train Anytime, Anywhere',
                        },
                        {
                          link: 'https://www.soletreadmills.com/products/sole-sb900',
                          position: 19,
                          price: 499.99,
                          snippet: '',
                          source: 'SOLE Fitness',
                          title: 'SOLE SB900 Bike',
                        },
                        {
                          link: 'https://www.cyclingkinetics.com/products/stationary-bicycle-exercise-trainer-for-specialized-road-bike',
                          position: 20,
                          price: 179.99,
                          snippet: '',
                          source: 'Cycling Kinetics',
                          title: 'Specialized Allez Road Bike Exercise Trainer',
                        },
                        {
                          link: 'https://www.coospo.com/products/x2max-smart-indoor-bike-trainer?variant=46534733332736',
                          position: 21,
                          price: 372.9,
                          snippet: '',
                          source: 'coospo.com',
                          title: 'COOSPO×ThinkRider X2MAX Smart Indoor Bike Trainer',
                        },
                        {
                          link: 'https://www.wahoofitness.com/devices/indoor-cycling/bike-trainers/kickr-buy',
                          position: 22,
                          price: 599.99,
                          snippet: '',
                          source: 'Wahoo Fitness',
                          title: 'Wahoo Kickr Smart Trainer',
                        },
                        {
                          link: 'https://www.target.com/p/saris-mag-bike-trainer-stand-magnetic-resistance-indoor-bike-trainer/-/A-89254903?TCID=OGS\u0026AFID=google\u0026CPNG=Sports+-+Target+Plus\u0026adgroup=82-1',
                          position: 23,
                          price: 79.99,
                          snippet: '',
                          source: 'Target',
                          title:
                            'Saris Mag Bike Trainer Stand, Zwift App Compatible, Magnetic Resistance Indoor Bike Trainer, Black',
                        },
                        {
                          link: 'https://www.dickssportinggoods.com/p/schwinn-ic4-indoor-cycling-bike-19scwuschwnnc4bkxbks/19scwuschwnnc4bkxbks?sku=20160933',
                          position: 24,
                          price: 799.99,
                          snippet: '',
                          source: "DICK'S Sporting Goods",
                          title: 'Schwinn IC4 Indoor Cycling Bike | Holiday',
                        },
                        {
                          link: 'https://www.sunandski.com/p/77540056310002007/saris-m2-smart-bike-trainer?vpc=77540056310002007-000100000',
                          position: 25,
                          price: 349.99,
                          snippet: '',
                          source: 'Sun \u0026 Ski Sports',
                          title: 'Saris M2 Smart Bike Trainer in Black | Sun \u0026 Ski Sports',
                        },
                        {
                          link: 'https://www.johnsonfitness.com/Schwinn-230-Recumbent-Bike-P15849.aspx?utm_source=google\u0026utm_medium=organic\u0026utm_campaign=surfaces-across-google\u0026utm_term=HRB0119-OS',
                          position: 26,
                          price: 599,
                          snippet: '',
                          source: 'Johnson Fitness \u0026 Wellness',
                          title: 'Schwinn 230 Recumbent Bike, 5.5" LCD display',
                        },
                        {
                          link: 'https://www.buyandsellfitness.com/products/keiser-m3i-indoor-cycle-w-media-tray-refurbished?variant=39269974540333\u0026country=US\u0026currency=USD\u0026utm_medium=product_sync\u0026utm_source=google\u0026utm_content=sag_organic\u0026utm_campaign=sag_organic',
                          position: 27,
                          price: 1399,
                          snippet: '',
                          source: 'Buy And Sell Fitness',
                          title: 'Keiser M3i Indoor Cycle - refurbished',
                        },
                        {
                          link: 'https://us.zwift.com/products/zwift-ride-smart-frame?variant=45155438035200',
                          position: 28,
                          price: 799.99,
                          snippet: '',
                          source: 'Zwift US',
                          title:
                            'Zwift Ride Smart Frame | Smart bike and indoor cycling setup Multi Trainer Zwift Cog',
                        },
                        {
                          link: 'https://www.wahoofitness.com/devices/indoor-cycling/smart-bikes/kickr-bike-shift-buy',
                          position: 29,
                          price: 2039.99,
                          snippet: '',
                          source: 'Wahoo Fitness',
                          title: 'Wahoo Kickr Bike Shift Indoor Bike Trainer',
                        },
                        {
                          link: 'https://www.performancebike.com/garmin-tacx-boost-indoor-trainer-bundle-010-02419-02/p1275610',
                          position: 30,
                          price: 330,
                          snippet: '',
                          source: 'Performance Bicycle',
                          title: 'Garmin Tacx Boost Indoor Trainer Bundle',
                        },
                        {
                          link: 'https://www.bestbuy.com/product/nordictrack-24-studio-bike-for-a-best-in-class-cycling-experience-black/J7G2HRV3T7/sku/6602082?utm_source=feed',
                          position: 31,
                          price: 999,
                          snippet: '',
                          source: 'Best Buy',
                          title:
                            'NordicTrack - 24 Studio Bike for a Best-In-Class Cycling Experience - Black',
                        },
                        {
                          link: 'https://www.horizonfitness.com/products/horizon-5-0-r-recumbent-bike?adID=DOFG2BFEED1',
                          position: 32,
                          price: 649,
                          snippet: '',
                          source: 'Horizon Fitness',
                          title:
                            'Horizon 5.0R Recumbent Exercise Bike with Bluetooth FTMS App Connectivity and Tablet Holder',
                        },
                        {
                          link: 'https://www.wahoofitness.com/devices/indoor-cycling/bike-trainer-bundles/zwift-bundles/kickr-core-2-zwift-ride-buy',
                          position: 33,
                          price: 999.99,
                          snippet: '',
                          source: 'Wahoo Fitness',
                          title: 'Wahoo Zwift Ride With Kickr Core 2',
                        },
                        {
                          link: 'https://www.backcountry.com/b/garmin-tacx-boost-trainer-bundle?CMP_SKU=GRMF054\u0026MER=0406\u0026skid=GRMF054-BLABLU-ONESIZ',
                          position: 34,
                          price: 330,
                          snippet: '',
                          source: 'Backcountry.com',
                          title: 'Garmin Tacx Boost Trainer Bundle Black/Blue, One Size',
                        },
                        {
                          link: 'https://merachfit.com/products/s26-magnetic-resistance-exercise-bike-with-dumbbell-rack',
                          position: 35,
                          price: 239,
                          snippet: '',
                          source: 'Merach US',
                          title:
                            'MERACH S26 Indoor Cycling Bike with Magnetic Resistance - Adjustable Seat, Dumbbell Rack, Compatible with Zwift \u0026 Kinomap',
                        },
                        {
                          link: 'https://www.nordictrack.com/product/s24-studio-bike',
                          position: 36,
                          price: 1799,
                          snippet: '',
                          source: 'NordicTrack',
                          title: 'NordicTrack NEW S24 Studio Bike',
                        },
                        {
                          link: 'https://www.temu.com/kuiper/un9/shopping-gmc-a-psurl.html?_bg_fs=1\u0026_p_jump_id=962\u0026_x_vst_scene=adg\u0026goods_id=602689857494997\u0026sku_id=40967545574556\u0026adg_ctx=a-839f11b9~c-b1e8ab1c\u0026_x_ads_sub_channel=shopping\u0026_p_rfs=1\u0026_x_ns_prz_type=-1\u0026locale_override=211~en~USD\u0026_x_ns_sku_id=40967545574556\u0026_x_ns_gid=602689857494997\u0026mrk_rec=1\u0026_x_ads_channel=google\u0026_x_gmc_account=5347809690\u0026_x_login_type=Google',
                          position: 37,
                          price: 77.07,
                          snippet: '',
                          source: 'Temu',
                          title:
                            'Stationary bike stand, Bike exercise Foldable Indoor Bike Trainer Magnetic Resistance Bicycle Sturdy, Bike stand for exercise, Metal Construction 265',
                        },
                        {
                          link: 'https://merachfit.com/products/s29-heavy-duty-exercise-bike-auto-resistance',
                          position: 38,
                          price: 399.99,
                          snippet: '',
                          source: 'Merach US',
                          title:
                            'MERACH S29 Indoor Cycling Bike – Self-Powered, Auto Resistance, Ultra-Quiet Magnetic System, Ergonomic Seat',
                        },
                      ],
                      video: [],
                    },
                    targets: {
                      '*': true,
                    },
                    title: 'indoor bike trainer - Google Search',
                    url: 'https://www.google.com/search?q=indoor+bike+trainer\u0026sca_esv=692808820ee644ef\u0026source=hp\u0026ei=9kRSacmzOqm_kPIP8JvLmA4\u0026iflsig=AOw8s4IAAAAAaVJTBpACpAtgBpNksBKShegu1GQwC3IP\u0026ved=0ahUKEwjJhsWmueKRAxWpH0QIHfDNEuMQ4dUDCBY\u0026uact=5\u0026oq=indoor+bike+trainer\u0026gs_lp=Egdnd3Mtd2l6IhNpbmRvb3IgYmlrZSB0cmFpbmVyMgoQABgDGOoCGI8BMgoQABgDGOoCGI8BMgoQABgDGOoCGI8BMgoQABgDGOoCGI8BMgoQABgDGOoCGI8BMgoQLhgDGOoCGI8BMgoQABgDGOoCGI8BMgoQABgDGOoCGI8BMgoQABgDGOoCGI8BMgoQABgDGOoCGI8BSBFQDVgNcAF4AJABAJgBAKABAKoBALgBA8gBAPgBAZgCAaACBKgCCpgDBPEF7oJMLtMNTWmSBwExoAcAsgcAuAcAwgcDMi0xyAcDgAgA\u0026sclient=gws-wiz\u0026sei=90RSabLkMZqfkPIPi92fuAs',
                  },
                },
              },
            ],
            data: {
              user_id: '01K48PC0BK13BWV2CGWFP8QQH0',
              id: 'indoor bike trainer',
              type: 'search',
              prowled: '01KDMP0Y8K3GMGBGEQN8PBEN9R',
              frequency: 0,
              duration: 205160875750,
              targets: {
                '*': true,
              },
            },
          },
          {
            id: 'search/jeep wrangler for sale tampa fl',
            label: 'jeep wrangler for sale tampa fl',
            noTick: true,
            expandable: true,
            selectable: true,
            data: {
              user_id: '01K48PC0BK13BWV2CGWFP8QQH0',
              id: 'jeep wrangler for sale tampa fl',
              type: 'search',
              prowled: '00000000000000000000000000',
              frequency: 604800000000000,
              duration: 0,
              targets: {
                '*': true,
                'farts.com': false,
              },
            },
          },
          {
            id: 'search/might max collectible',
            label: 'might max collectible',
            noTick: true,
            expandable: true,
            selectable: true,
            children: [
              {
                id: 'search/might max collectible/2025-12-29 08:47:01',
                label: '2025-12-29 08:47:01',
                noTick: true,
                expandable: true,
                selectable: true,
                data: {
                  html: 'https://bytelyon-db-prod.s3.us-east-1.amazonaws.com/user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/search/might%20max%20collectible/01KDMMM53P3A6DXYJKMGXY9G0V/serp/01KDMMMAWNBCF43SN672DH83FZ.html?X-Amz-Algorithm=AWS4-HMAC-SHA256\u0026X-Amz-Checksum-Mode=ENABLED\u0026X-Amz-Credential=ASIASAM5DBXJSKSBNALW%2F20260107%2Fus-east-1%2Fs3%2Faws4_request\u0026X-Amz-Date=20260107T050701Z\u0026X-Amz-Expires=1800\u0026X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQCO6WCph1EyLhMirsLHOyHLc3lb7GRPTY7SPVQSAgjuywIhAJ3Y0ihkUoUSbc1NlJu5acLvKXLqXzUz0VEEpL6eZAqfKvQCCG4QBBoMMTM4MzA1Mjc3Mzk1IgwgvEE9gFaAJMu3Diwq0QKTsODXcHLgTIIs29vio0tzg6cn8wW00R5JvoStCYSsGR4mqbAzvU%2B2ACBwbsPHCch77CBAnaoH1ZTm2L3zLyIg3TmCnYuaDn72uASpMXP6aLQuZqpnrZGLkN1JTweNumWQUC%2F98V5uTGE9WM6YXluUIfbntZSEHCdfJk9y0o7Z2PQhkiTaQpn40nEr0aYOF338BKIcJRHrlG9DIPQMpew6xgpuLcpDaw3GKPAyg8Y9cvmm47648YlkUCy5HiMttqPdwbMnv3fksmaz4SpaVeUAoqr95dAeq97mlF7vhfQcfccVFE8RowLgeWAnVTwjexTV8eqxZbys8O5EpsX4DCCMjjiIIUTEjuO3ppYJxcItGU6R7dJES7y9Y0HLIGMbtWuhn0PhiNLIygXebEQDWHofIBOTCnmdoRUd2wBvAaIlhqV5k5bLAxlKIysswcjxps0oMPTT98oGOp0BgW8%2FYW7v90%2BSv9RMOZYy4tz9hp%2B5oYIawDo5dyUx3apbmOX7XDiluquT0LKU7yDDqhv58Fh%2FKCNhOOowDg6oRe1R%2B61ObA3YLzGrxcWPvfmsLi0BfVDnW2kZ7C6hCqZ%2FUo%2BxlDFx8wJ7dpZUStGMyXAu%2FbYlId3NGjjW4J8GIauOfY8ZP6sRBPQxjVGDBy2X4mAMVVj6vhEpTHaLDg%3D%3D\u0026X-Amz-SignedHeaders=host\u0026x-id=GetObject\u0026X-Amz-Signature=d3d1a873368fd8a3277c86e2c381c51cc5f9676a63ec27ec3b5fecc22d1b6424',
                  id: '01KDMMMAWNBCF43SN672DH83FZ',
                  img: 'https://bytelyon-db-prod.s3.us-east-1.amazonaws.com/user/01K48PC0BK13BWV2CGWFP8QQH0/prowler/search/might%20max%20collectible/01KDMMM53P3A6DXYJKMGXY9G0V/serp/01KDMMMAWNBCF43SN672DH83FZ.png?X-Amz-Algorithm=AWS4-HMAC-SHA256\u0026X-Amz-Checksum-Mode=ENABLED\u0026X-Amz-Credential=ASIASAM5DBXJSKSBNALW%2F20260107%2Fus-east-1%2Fs3%2Faws4_request\u0026X-Amz-Date=20260107T050701Z\u0026X-Amz-Expires=1800\u0026X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQCO6WCph1EyLhMirsLHOyHLc3lb7GRPTY7SPVQSAgjuywIhAJ3Y0ihkUoUSbc1NlJu5acLvKXLqXzUz0VEEpL6eZAqfKvQCCG4QBBoMMTM4MzA1Mjc3Mzk1IgwgvEE9gFaAJMu3Diwq0QKTsODXcHLgTIIs29vio0tzg6cn8wW00R5JvoStCYSsGR4mqbAzvU%2B2ACBwbsPHCch77CBAnaoH1ZTm2L3zLyIg3TmCnYuaDn72uASpMXP6aLQuZqpnrZGLkN1JTweNumWQUC%2F98V5uTGE9WM6YXluUIfbntZSEHCdfJk9y0o7Z2PQhkiTaQpn40nEr0aYOF338BKIcJRHrlG9DIPQMpew6xgpuLcpDaw3GKPAyg8Y9cvmm47648YlkUCy5HiMttqPdwbMnv3fksmaz4SpaVeUAoqr95dAeq97mlF7vhfQcfccVFE8RowLgeWAnVTwjexTV8eqxZbys8O5EpsX4DCCMjjiIIUTEjuO3ppYJxcItGU6R7dJES7y9Y0HLIGMbtWuhn0PhiNLIygXebEQDWHofIBOTCnmdoRUd2wBvAaIlhqV5k5bLAxlKIysswcjxps0oMPTT98oGOp0BgW8%2FYW7v90%2BSv9RMOZYy4tz9hp%2B5oYIawDo5dyUx3apbmOX7XDiluquT0LKU7yDDqhv58Fh%2FKCNhOOowDg6oRe1R%2B61ObA3YLzGrxcWPvfmsLi0BfVDnW2kZ7C6hCqZ%2FUo%2BxlDFx8wJ7dpZUStGMyXAu%2FbYlId3NGjjW4J8GIauOfY8ZP6sRBPQxjVGDBy2X4mAMVVj6vhEpTHaLDg%3D%3D\u0026X-Amz-SignedHeaders=host\u0026x-id=GetObject\u0026X-Amz-Signature=65218cff79a449fe6da775bde5875a4667f80e5d9a32a1e72a6ee0e59006b182',
                  json: {
                    domain: 'google.com',
                    results: {
                      also_asked: [],
                      article: [],
                      forum: [],
                      more_products: [],
                      organic: [
                        {
                          link: 'https://www.ebay.com/str/mightymaxtoys',
                          position: 0,
                          snippet:
                            'Welcome to our eBay shop specializing in the Mighty Max toyline. The toys are of a high-quality standard with unique settings for the micro figurines that ...',
                          source: 'eBay',
                          title: 'Mighty Max | eBay Stores',
                        },
                        {
                          link: 'https://en.wikipedia.org/wiki/Mighty_Max_(toyline)',
                          position: 1,
                          snippet:
                            'Mighty Max was a series of toys that were manufactured by Bluebird Toys PLC in the UK in 1992. The toys were similar to the earlier Polly Pocket toyline.',
                          source: 'Wikipedia',
                          title: 'Mighty Max (toyline) - Wikipedia',
                        },
                        {
                          link: 'https://www.etsy.com/market/mighty_max_vintage_toy',
                          position: 2,
                          snippet:
                            'May include: Three plastic toy figures, a blue skull, a green dinosaur head. Vintage Mighty Max pocket toys bluebird 90s lot of ...',
                          source: 'Etsy',
                          title: 'Mighty Max Vintage Toy - Etsy',
                        },
                        {
                          link: 'https://www.facebook.com/groups/1307673536269196/',
                          position: 3,
                          snippet:
                            'A vintage original 1992 Mighty Max trapped in Skull Mountain play set from Bluebird Toys. In very good overall condition with no broken parts but missing ...',
                          source: 'Facebook',
                          title: 'Mighty Max Buy / Sell | Facebook',
                        },
                        {
                          link: 'https://toysack.toys/collections/mighty-max-collection?srsltid=AfmBOorhdl9_-nLsIFFw3F1tOe7XrKjb2t9wkaTPh-SArmqdhi9Su6Va',
                          position: 4,
                          snippet:
                            'Our Mighty Max Collection spans various themes, ensuring a diverse selection of miniature adventures for every taste. From dungeons and monsters to futuristic ...',
                          source: 'ToySack',
                          title: 'Mighty Max Collection | ToySack – ToysAaack',
                        },
                        {
                          link: 'https://mikestoybox.net/2017/12/01/best-and-worst-of-mighty-max/',
                          position: 5,
                          snippet:
                            'Which of the Mighty Max toys were objectively the best and worst as far as design, aesthetic, and functionality goes.',
                          source: "Mike's Toybox",
                          title: "Best and Worst of Mighty Max - Mike's Toybox",
                        },
                        {
                          link: 'https://www.90stoys.com/action-figures/mighty-max-toys/',
                          position: 6,
                          snippet:
                            'Mighty Max is a series of miniature toys from the 90s with a horror theme. Take a look back at all the sets - from Doom Zones to Horror Heads.',
                          source: 'Rediscover 90s Toys',
                          title: 'His Fate Is in Your Hand: Mighty Max Toys, Playsets and ...',
                        },
                        {
                          link: 'https://blackbirdattic.com/products/mighty-max-lot-90s-toys-please-read-description/25478919/',
                          position: 7,
                          snippet:
                            'Selling a bulk lot of Mighty Max playsets, not interested in selling sets separately at this time. From what I could find online, ...',
                          source: 'blackbirdattic.com',
                          title: 'Mighty Max Lot 90s Toys PLEASE READ DESCRIPTION',
                        },
                      ],
                      popular_products: [],
                      related_query: [],
                      sponsored: [],
                      video: [
                        {
                          link: 'https://www.youtube.com/watch?v=GYCpAPDApQY',
                          position: 0,
                          snippet:
                            'Remember your old toys from the 1990s? Do you remember vintage Mighty Max playsets? Well here is the Toy History of MIGHTY MAX by The Toy ...',
                          source: 'YouTube',
                          title: "The Toy Scavenger's Toy History of MIGHTY MAX",
                        },
                        {
                          link: 'https://www.tiktok.com/@cpjcollectibles/video/7543753343403871495',
                          position: 1,
                          snippet:
                            '1664 Likes, 31 Comments. TikTok video from CPJ Collectibles (@cpjcollectibles): “Explore the legendary Mighty Max set from 1993, ...',
                          source: 'TikTok',
                          title: 'Discover the 1993 Mighty Max Man Eater Set',
                        },
                        {
                          link: 'https://www.youtube.com/watch?v=iXOPBKcitFU',
                          position: 2,
                          snippet:
                            'Here I pan across my current Mighty Max collection. Note though that this does not include a rather big box if duplicates, many of which are ...',
                          source: 'YouTube',
                          title: 'My Mighty Max Collection So Far - March 2025 Edition',
                        },
                        {
                          link: 'https://www.youtube.com/watch?v=1PCGXI7ZDgM',
                          position: 3,
                          snippet:
                            'I picked up a Huge collection of Mighty Max Toys and figures, including Doom Zones, Horror Heads, Playsets, and Battle Warriors!',
                          source: 'YouTube',
                          title: 'I Got a Suitcase full of Vintage MIGHTY MAX - The Toy ...',
                        },
                      ],
                    },
                    targets: {
                      '*': true,
                    },
                    title: 'might max collectible - Google Search',
                    url: 'https://www.google.com/search?q=might+max+collectible\u0026sca_esv=692808820ee644ef\u0026source=hp\u0026ei=BkBSaZaEJ7nGkPIPqpmOkQE\u0026iflsig=AOw8s4IAAAAAaVJOFkhABF4tNICjs9bvpOkthCfA1bh0\u0026ved=0ahUKEwiWn9XLtOKRAxU5I0QIHaqMIxIQ4dUDCBY\u0026uact=5\u0026oq=might+max+collectible\u0026gs_lp=Egdnd3Mtd2l6IhVtaWdodCBtYXggY29sbGVjdGlibGUyChAAGAMYjwEY6gIyChAAGAMYjwEY6gIyChAuGAMYjwEY6gIyChAAGAMYjwEY6gIyChAAGAMYjwEY6gIyChAAGAMYjwEY6gIyChAAGAMYjwEY6gIyChAAGAMYjwEY6gIyChAuGAMYjwEY6gIyChAuGAMYjwEY6gJIF1ASWBJwAXgAkAEAmAEAoAEAqgEAuAEDyAEA-AEBmAIBoAIGqAIKmAMGkgcBMaAHALIHALgHAMIHAzItMcgHBIAIAQ\u0026sclient=gws-wiz\u0026sei=B0BSadboIvqtur8Pyp7bsAw',
                  },
                },
              },
            ],
            data: {
              user_id: '01K48PC0BK13BWV2CGWFP8QQH0',
              id: 'might max collectible',
              type: 'search',
              prowled: '01KDMMNV0VPAA0K17GDVE3KZBB',
              frequency: 0,
              duration: 4680226125,
              targets: {
                '*': true,
              },
            },
          },
          {
            id: 'search/toyhauler for sale tampa fl',
            label: 'toyhauler for sale tampa fl',
            noTick: true,
            expandable: true,
            selectable: true,
            data: {
              user_id: '01K48PC0BK13BWV2CGWFP8QQH0',
              id: 'toyhauler for sale tampa fl',
              type: 'search',
              prowled: '00000000000000000000000000',
              frequency: 3600000000000,
              duration: 0,
              targets: {
                '*': true,
              },
            },
          },
        ]);
        return res.data;
      })
      .catch((err: AxiosError) => {
        console.error(err);
        return [] as QTreeNode[];
      });
  };

  const loadAll = async () => {
    const p3 = load('search');
    const p1 = load('news');
    const p2 = load('sitemap');
    return await Promise.all([p1, p2, p3])
      .then(() => {
        console.debug('✅ Nodes Loaded');
        return true;
      })
      .catch((err: AxiosError) => {
        console.error(err);
        return false;
      });
  };

  const find = (type: string, id?: string, date?: string): QTreeNode | null => {
    const nodes: QTreeNode[] = model.value[botIdx(type)]?.children as QTreeNode[];
    let node: QTreeNode | null = null;
    if (id) {
      node = nodes?.find((n) => n.label === id) as QTreeNode;
      if (date) {
        node = node?.children?.find((n) => n.label === date) as QTreeNode;
      }
    }
    return node;
  };

  const Delete = async (id: string) => {
    return await api
      .delete(`/prowler`, { params: { id: id } })
      .then(() => true)
      .catch((err: AxiosError) => {
        console.error(err);
        return false;
      });
  };

  const Save = async (o: object) => {
    return await api
      .put(`/prowler`, o)
      .then(()=>true)
      .catch((err: AxiosError) => {
        console.error(err);
        return false;
      });
  }

  return {
    model,
    load,
    find,
    loadAll,
    Delete,
    Save,
  };
};

export const useBotStore = defineStore(id, setup, options);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBotStore, import.meta.hot));
}
