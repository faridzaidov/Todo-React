import { useEffect } from 'react';
import Utils from './common/utils';
import { useDispatch } from 'react-redux';
import { getUserInfo, selectUser } from './store/user';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';
import { Flex } from 'antd';

const Auth = ({ children }) => {
    const dispatch = useDispatch();
    const { isGetting, isLogged } = useSelector(selectUser);

    useEffect(() => {
        if (Utils.getAccessToken()) {
            dispatch(getUserInfo())
        }
    }, [dispatch, isLogged])

    if (isGetting) {
        return (
            <Flex align='center' justify='center' style={{ height: '100vh' }}>
                <Spin />
            </Flex>
        )
    }

    return (
        <>{children}</>
    )
}

export default Auth