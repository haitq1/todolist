import * as types from '../constants/Home.const';
import {LOGIN_SUCCESSED} from '../constants/Login.const';
import produce from 'immer';
import {AsyncStorage} from 'react-native';

interface Props {
  isAuthenticated: boolean;
  toDoList: Array<{id: number; status: string}>;
  isComplete: boolean;
}

const initialState: Props = {
  isAuthenticated: false,
  toDoList: [],
  isComplete: false,
};
export const homeReducer = (state = initialState, action: any) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.LOGOUT:
        AsyncStorage.removeItem('token');
        draft.isAuthenticated = false;
        break;
      case LOGIN_SUCCESSED:
        draft.isAuthenticated = true;
        break;
      case types.ADD_TODO:
        if (state.toDoList.length === 0) {
          draft.toDoList = [
            {
              id: 0,
              status: action.status,
            },
          ];
        } else {
          const lastId = state.toDoList[state.toDoList.length - 1].id;
          let list = [{id: lastId + 1, status: action.status}];
          draft.toDoList = state.toDoList.concat(list);
        }
        break;
      case types.DELETE_TODO:
        if (state.toDoList.length === 0) {
          draft.toDoList = [];
        } else {
          draft.toDoList = state.toDoList.filter((id) => id.id != action.id);
        }
        break;
      case types.EDIT_TODO:
        if (state.toDoList.length === 0) {
          draft.toDoList = [];
        } else {
          let list5 = state.toDoList.filter((id) => id.id != action.id);
          let list4 = [{id: action.id, status: action.status2}];
          draft.toDoList = list5.concat(list4);
        }
        break;
      case types.COMPLETE_TODO:
        draft.isComplete = true;
        break;
      default:
        return state;
    }
  });
