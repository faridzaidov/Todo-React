import createSlice from '../buildCreateSlice';
import axios from '../../store/axios';
import { serialize } from 'object-to-formdata';

const initialState = {
    user: null,
    isGetting: false,
    userUpdate: null,
    isLogged: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    selectors: {
        selectUser: state => state,
    },
    reducers: create => ({
        logOut: () => initialState,
        setLogged: (state) => {
            state.isLogged = true;
        },
        getUserInfo: create.asyncThunk(async (_, thunkApi) => {
            try {
                const response = await axios.get('/user');
                return response.data;
            } catch (err) {
                throw thunkApi.rejectWithValue({
                    error: 'Oh no, not again!',
                })
            }
        }, {
            pending: state => {
                state.isGetting = true;
            },
            fulfilled: (state, action) => {
                state.user = action.payload;
                state.isLogged = false;
            },
            settled: state => {
                state.isGetting = false;
            }
        }),
        updateUser: create.asyncThunk(async (body, thunkApi) => {
            await axios.put(`/user/update`, body)
            return body;
        }, {
            pending: state => {
                state.isUpdating = true;
            },
            fulfilled: (state, action) => {
                state.user.name = action.payload.name;
            },
            settled: state => {
                state.isUpdating = false;
            }

        }),
        updateUserPhoto: create.asyncThunk(async (body, thinkApi) => {
            await axios.patch("/user/picture", serialize(body));
            return body;
        }, {
            pending: state => {
                state.isCreating = true;
            },
            fulfilled: (state, action) => {
                state.user.picturePath = URL.createObjectURL(action.payload.picture);
            },
            settled: state => {
                state.isCreating = false;
            }
        }),
        updateCoverPhoto: create.asyncThunk(async (body, thinkApi) => {
            await axios.patch("/user/cover", serialize(body));
            return body;
        }, {
            pending: state => {
                state.isCreating = true;
            },
            fulfilled: (state, action) => {
                state.user.coverPath = URL.createObjectURL(action.payload.picture);
            },
            settled: state => {
                state.isCreating = false;
            }
        }),

    }),
});

export const { getUserInfo, editUser, updateUser, updateUserPhoto, logOut, setLogged, updateCoverPhoto } = userSlice.actions;
export const { selectUser } = userSlice.selectors;

export default userSlice.reducer;
