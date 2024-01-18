import createSlice from './buildCreateSlice';
import axios from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/posts';

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        status: 'idle',
        error: null,
        isCreating: false,
        isUpdating: false,
        isGetting: true,
        isDeleting: false,
        total: 0,
    },
    selectors: {
        selectPosts: state => state,
    },
    reducers: create => ({
        editTodo: create.reducer((state, action) => {
            const { id, updatedTodo } = action.payload
            const existingTodo = state.posts.find(todo => todo.id === id)
            if (existingTodo) {
                existingTodo.title = updatedTodo.title
                existingTodo.body = updatedTodo.body
            }
        }),
        fetchTodoData: create.asyncThunk(async ({ page, limit }) => {
            try {
                const response = await axios.get('/', {
                    params: {
                        _page: page,
                        _limit: limit,
                    }
                });
                return response.data;
            } catch (error) {
                throw error;
            }
        }, {
            pending: state => {
                state.isGetting = true;
            },
            fulfilled: (state, action) => {
                state.posts = action.payload;
            },
            settled: state => {
                state.isGetting = false;
            }
        }),
        fetchEditTodo: create.asyncThunk(async ({ id, updatedTodo }) => {
            const response = await axios.put(`/${id}`, updatedTodo);
            return { id, updatedTodo: response.data };
        }, {
            pending: state => {
                state.isUpdating = true;
            },
            fulfilled: (state, action) => {
                const { id, updatedTodo } = action.payload;
                const existingTodoIndex = state.posts.findIndex(todo => todo.id === id);

                if (existingTodoIndex !== -1) {
                    state.posts = [
                        ...state.posts.slice(0, existingTodoIndex),
                        { ...state.posts[existingTodoIndex], ...updatedTodo },
                        ...state.posts.slice(existingTodoIndex + 1),
                    ];
                }
            },
            settled: state => {
                state.isUpdating = false;
            }
        }),
        fetchAddTodo: create.asyncThunk(async (newTodo) => {
            const response = await axios.post('/', newTodo);
            return response.data;
        }, {
            pending: state => {
                state.isCreating = true;
            },
            fulfilled: (state, action) => {
                state.posts.unshift(action.payload);
            },
            settled: state => {
                state.isCreating = false;
            }
        }),
        fetchDeleteTodo: create.asyncThunk(async (id) => {
            await axios.delete(`/${id}`);
            return id;
        }, {
            pending: state => {
                state.isDeleting = true;
            },
            fulfilled: (state, action) => {
                const index = state.posts.findIndex((todo) => todo.id === action.meta.arg);
                state.posts.splice(index, 1);
            },
            settled: state => {
                state.isDeleting = false;
            }

        })
    }),
});

export const { editTodo, fetchEditTodo, fetchAddTodo, fetchTodoData, fetchDeleteTodo } = postsSlice.actions;
export const { selectPosts } = postsSlice.selectors;

export default postsSlice.reducer;
