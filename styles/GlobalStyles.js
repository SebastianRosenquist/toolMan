import { StyleSheet } from 'react-native';

// Et online style sheet template som vi har benyttet os af. Vi har ændret farverne ved brug af bla. https://coolors.co/
export const BrandColors = {
    //60%
    PrimaryDark: '#333333', // Text color: All whites, Two lightest secondary
    Primary: '#C2B3A6', // Text color: Two lightest whites, lightest secondary
    PrimaryLight: '#FEE9D7', // Text color: Lightest whites, darkest greys

    //30%
    SecondaryDark: '#5F5954', // Text color: Ligthest white, darkest greys, darkest primary
    Secondary: '#A68F7C', // Text color: Darkest primary, darkest grey
    SecondaryLight: '#FCB77C', // Text color: Two darkest primaries, two darkest greys

    //10%
    GreyDark: '#1F2224', // Text color: All whites, two ligthestes secondaries, ligthest primary
    Grey: '#776F69', // Text color: ligthest white, two lightest secondaries
    GreyLight: '#636B73', // Text color: Ligthest secondary, lightest white

    //10%
    WhiteDark: '#B3C1C9', // Text color: Darkest primary, darkest grey
    White: '#D8DFE3', // All primaries, darkest grey
    WhiteLight: '#f0f3f5', // All primaries, two darkest greys
};

export const GlobalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BrandColors.WhiteLight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        borderWidth: 1,
        padding: 5,
        width: 200,
    },
    label: {
        fontWeight: 'bold',
        width: 100,
    },
    header: {
        alignItems: 'center',
        fontWeight: 'bold',
        paddingBottom: 20,
        fontSize: 30,
        color: BrandColors.Primary,
    },
    logo: {
        width: 114,
        height: 16,
        marginLeft: 10,
    },
    logout: { marginRight: 10 },
    ul: {
        fontSize: 12,
        margin: 5,
        textAlign: 'center'
    },

    columnView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pin: {},
    pinText: {
        fontSize: 12,
        width: '80%',
        paddingLeft: 5,
        paddingVertical: 15,
    },
});
