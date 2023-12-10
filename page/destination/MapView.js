import React from 'react';
import { WebView } from 'react-native-webview';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';

const MapView = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { embed_map } = route.params;
    const { name } = route.params;

    const htmlContent = `
    <html>
    <head>
        <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width">
    </head>
    <body>
        <style>
            body {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
            }
            #map-container {
                height: 100vh;
                width: 100vw;
            }
            .header {
                color: #333;
                font-size: 18px;
            }
            .link {
                text-decoration: none;
                color: blue;
            }
        </style>
        <div id="map-container">
            <iframe
                src="${embed_map}zoom=100"
                width="100%" height="100%" frameborder="0" allowfullscreen style="border:0;" aria-hidden="false"
                tabindex="0">
            </iframe>
        </div>
    </body>
    </html>`;

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-back" size={25} color="#1e2c3a" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Map: {name}</Text>
            </View>
            <WebView
                originWhitelist={['*']}
                source={{ html: htmlContent }}
                style={styles.fullScreen}
                javaScriptEnabled={true}
                allowsInlineMediaPlayback={true}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#dddddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
    },
    backButton: {
        color: '#0084FF',
        fontSize: 16,
        marginRight: 10,
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
    },
    container: {
        flex: 1,
    },
    fullScreen: {
        flex: 1,
    },
});

export default MapView;
