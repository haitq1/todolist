import *as types from '../constants/Home.const'
export const logout = () => ({
    type: types.LOGOUT

})
export const Add = (status: string) => ({
    type: types.ADD_TODO,
    status
})
export const Delete = (id: number) => ({
    type: types.DELETE_TODO,
    id
})
export const Complete = (id: number) => ({
    type: types.COMPLETE_TODO,
    id
})
export const Edit = (id: number, status2: string) => ({
    type: types.EDIT_TODO,
    id,
    status2
})
