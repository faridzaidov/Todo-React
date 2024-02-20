import emptySplitApi from '../../../store/empty-slice-api';
import Utils from '../../../common/utils';
import { setLogged } from '../../../store/user';

const tagType = 'Auth';
const authApi = emptySplitApi.enhanceEndpoints({ addTagTypes: [tagType] }).injectEndpoints({
   endpoints: build => ({
      signUp: build.mutation({
         query: ({ username, password, name, passwordConfirmation }) => ({
            url: '/auth/sign-up',
            method: 'POST',
            data: { username, password, name, passwordConfirmation },
         }),
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            try {
               const { data } = await queryFulfilled;
               Utils.setAccessToken(data.accessToken);
               dispatch(setLogged());
            } catch {
               console.log('error');
            }
         },
      }),
   }),
});

export const { useSignUpMutation } = authApi;
