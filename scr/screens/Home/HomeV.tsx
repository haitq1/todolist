import React, {useState, useCallback, useMemo} from 'react';
import {View, FlatList, AsyncStorage, Alert, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Header from '../components/Header';
import ToDoItem from '../components/ToDoItem';
import AddToDo from '../components/AddToDo';
import styles from './Home.sty';
import i18n from '../../localization/i18n';
import { Switch } from 'react-native-switch';
import {
  Add,
  Delete,
  Edit,
  Complete,
  logout,
} from '../../redux/actions/Home.act';
import {number} from 'yup';
import SwitchSelector from 'react-native-switch-selector';

const useConnect = () => {
  const toDoList = useSelector((state: any) => state.home.toDoList);
  const mapState = {
    toDoList,
  };
  const dispatch = useDispatch();
  const mapDispatch = useMemo(
    () => ({
      onAdd: (value: string) => dispatch(Add(value)),
      onRemove: (id: number) => dispatch(Delete(id)),
      onComplete: (id: number) => dispatch(Complete(id)),
      onEdit: (id: number, value2: string) => dispatch(Edit(id, value2)),
    }),
    [dispatch],
  );
  return {
    ...mapState,
    ...mapDispatch,
  };
};
const ToDoList = () => {
  const {toDoList, onAdd, onRemove, onEdit, onComplete} = useConnect();
  const [status, setStatus] = useState('');
  const [status2, setStatus2] = useState('');
  const dispatch = useDispatch();
  const submit = () => {
    dispatch(logout());
    AsyncStorage.removeItem('token');
  };
  const AddSubmit = useCallback(() => {
    if (status.length > 0) {
      onAdd(status);
      setStatus('');
    }
  }, [onAdd, status]);
  const RemoveSubmit = useCallback(
    (id: number) => {
      onRemove(id);
    },
    [onRemove],
  );
  const EditSubmit = useCallback(
    (id: number) => {
      if (status2.length > 0) {
        setStatus2('');
        onEdit(id, status2);
      }
    },
    [onEdit, status2],
  );
  const handleItem = (status: string) => {
    setStatus(status);
  };
  const handleItem2 = (status2: string) => {
    setStatus2(status2);
  };
  const CompleteSubmit = useCallback(
    (id: number) => {
      onComplete(id);
    },
    [onComplete],
  );
  const options = [
    { label: "01:00", value: "1" },
    { label: "01:30", value: "1.5" },
    { label: "02:00", value: "2" }
  ];

  return (
    <View style={styles.container}>
      <Header submit={submit} />
      <View style={styles.content}>
        <AddToDo handleItem={handleItem} AddSubmit={AddSubmit} value={status} />
        <View style={styles.container}>
        <SwitchSelector
  options={options}
  initial={0}
  onPress={(value: any) => console.log(`Call onPress with value: ${value}`)}
/>
    </View>
        <View style={styles.list}>
          <FlatList
            data={toDoList}
            renderItem={({item}) => (
              <ToDoItem
                item={item}
                RemoveSubmit={RemoveSubmit}
                CompleteSubmit={CompleteSubmit}
                EditSubmit={EditSubmit}
                value2={status2}
                handleItem2={handleItem2}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    </View>
  );
};

export default ToDoList;
