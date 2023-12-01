import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import { theme } from '../components/theme.js'
const SearchInput = () => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Icon name="search" size={20} color={theme.colors.searchIcon} />
                <TextInput style={styles.input} placeholder="Search" maxLength={10} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 30,
    },
    row: {
        backgroundColor: theme.colors.searchBackground,
        flexDirection: 'row',
        borderRadius: 5,
        height: 45,
        paddingHorizontal: 10,
    },
    input: {
        paddingHorizontal: 10,
        fontSize: 15,
        height: 45,
        flex: 1,
        color: theme.colors.searchText,
    },
})

export default SearchInput;
