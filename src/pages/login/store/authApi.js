import emptySplitApi from '../../../store/empty-slice-api';
import history from '../../../common/history';
import Utils from '../../../common/utils';
import { logOut } from '../../../store/user';
import userApi from '../../../store/user/userApi';

const tagType = 'Auth';
const authApi = emptySplitApi.enhanceEndpoints({ addTagTypes: [tagType] }).injectEndpoints({
   endpoints: build => ({
      signIn: build.mutation({
         query: ({ username, password }) => ({
            url: '/auth/sign-in',
            method: 'POST',
            data: { username, password },
         }),
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            try {
               const { data } = await queryFulfilled;
               Utils.setAccessToken(data.accessToken);
               dispatch(userApi.endpoints.getUserInfo.initiate());
               history.push('/');
            } catch {
               console.log('error');
            }
         },
      }),
      userSignOut: build.mutation({
         query: () => ({
            url: '/auth/sign-out',
            method: 'POST',
         }),
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            try {
               await queryFulfilled;
               Utils.removeAccessToken();
               dispatch(logOut());
               history.replace('/login');
            } catch {
               console.log('error');
            }
         },
      }),
   }),
});
export const { useSignInMutation, useUserSignOutMutation } = authApi;
export default authApi;
