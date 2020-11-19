import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../Home/Home.sty';
function Header({ submit }: any) {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>To Do List</Text>
            <TouchableOpacity onPress={submit}>
                <Icon name="log-out-outline" style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
}
export default Header