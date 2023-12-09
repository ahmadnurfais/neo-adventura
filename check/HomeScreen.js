import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

function HomeScreen() {
    const navigation = useNavigation(); // Get the navigation object

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details')} // Use the navigation object
            />
        </View>
    );
}

export default HomeScreen;
