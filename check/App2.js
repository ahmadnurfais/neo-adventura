import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');
console.log(width);
console.log(height);

const WelcomeScreen = (props) => {
    return (
        <Swiper
            style={styles.wrapper}
            dot={<View style={styles.dot} />}
            activeDot={<View style={styles.activeDot} />}
            loop={false}
        >
            <LinearGradient colors={['#3498db', '#2980b9']} style={styles.slide}>
                <Icon name="globe-outline" size={100} color="#FFFFFF" />
                <Text style={styles.title}>Explore Destinations</Text>
                <Text style={styles.text}>
                    Discover and explore fascinating tourist destinations around the world.
                </Text>
            </LinearGradient>
            <LinearGradient colors={['#3498db', '#2980b9']} style={styles.slide}>
                <Icon name="star-outline" size={100} color="#FFFFFF" />
                <Text style={styles.title}>Trusted Reviews</Text>
                <Text style={styles.text}>
                    Get insights from genuine traveler reviews to make informed choices.
                </Text>
            </LinearGradient>
            <LinearGradient colors={['#3498db', '#2980b9']} style={styles.slide}>
                <Icon name="airplane-outline" size={100} color="#FFFFFF" />
                <Text style={styles.title}>Join Us Now!</Text>
                <Text style={styles.text}>
                    Dive into the world of travel and adventure. Let's begin your journey!
                </Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => props.navigation.navigate('Login')}
                >
                    <Text style={styles.buttonText}>Start Exploring</Text>
                </TouchableOpacity>
            </LinearGradient>
        </Swiper>
    );
};

const styles = StyleSheet.create({
    wrapper: {},
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: '#FFFFFF',
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    text: {
        color: '#FFFFFF',
        fontSize: 16,
        paddingHorizontal: 40,
        textAlign: 'center',
        marginBottom: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    button: {
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    buttonText: {
        color: '#3498db',
        fontSize: 16,
    },
    dot: {
        backgroundColor: 'rgba(255,255,255,.3)',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
    },
    activeDot: {
        backgroundColor: '#FFFFFF',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
    },
});

export default WelcomeScreen;
