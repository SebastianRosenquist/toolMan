//Import af Pages og Components
import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    Alert,
    ScrollView,
    SafeAreaView,
    Dimensions,
    Image
} from 'react-native';
import { GlobalStyles, BrandColors } from '../../styles/GlobalStyles';

const { width } = Dimensions.get('window');

const SearchTool = (props) => {


    return (
        <SafeAreaView style={styles.container}>
            <Text style={GlobalStyles.header}>
                Search Page
            </Text>
            <Text style={{ margin: 8 }}>
                This page would be where we implement a search function with our map-view. As of now this is
                not implemented, but we hope to have this feature complete with our next iteration. We have
                included a temporary mock-up to show how we imagine this feature to look like in the future.
                Feel free to give us feedback if you have any.
            </Text>
            <ScrollView style={styles.scrollView}>
                { <Image
                    style={styles.image}
                    source={require('../../assets/SearchFunctionPics/Search1.png')}
                />}
                { <Image
                    style={styles.image}
                    source={require('../../assets/SearchFunctionPics/Search2.png')}
                />}
                { <Image
                    style={styles.image}
                    source={require('../../assets/SearchFunctionPics/Search3.png')}
                />}
                { <Image
                    style={styles.image}
                    source={require('../../assets/SearchFunctionPics/Search4.png')}
                />}
                { <Image
                    style={styles.image}
                    source={require('../../assets/SearchFunctionPics/Search5.png')}
                />}
            </ScrollView>
        </SafeAreaView>
    );
}

export default SearchTool;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: width * 0.63,
        height: width * 0.63 * 2.16,

    }
});