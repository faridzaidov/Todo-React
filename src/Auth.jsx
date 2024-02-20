// import { getUserInfo, selectUser } from './store/user';
// import { useSelector } from 'react-redux';
import { Spin, Flex } from 'antd';
import { useGetUserInfoQuery } from './store/user/userApi';
// import { selectUser } from './store/user';
// import { selectAuth } from './pages/login/store/auth';
import Utils from './common/utils';

const Auth = ({ children }) => {
   // const dispatch = useDispatch();
   const { isLoading: isLoadingUserInfo } = useGetUserInfoQuery(undefined, {
      skip: !Utils.getAccessToken(),
   });
   console.log(useGetUserInfoQuery());
   // useEffect(() => {
   //     if (Utils.getAccessToken() && isLogged) {
   //         dispatch(getUserInfo())
   //     }
   // }, [dispatch, isLogged]);

   if (isLoadingUserInfo) {
      return (
         <Flex align='center' justify='center' style={{ height: '100vh' }}>
            <Spin />
         </Flex>
      );
   }

   return <>{children}</>;
};

export default Auth;
