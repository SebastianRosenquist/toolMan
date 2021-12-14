// Importing modules and components
import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { GlobalStyles, BrandColors } from '../../styles/GlobalStyles';

const InfoScreen = () => {
    return (
        <ScrollView>
            <View style={GlobalStyles.container}>
                <Text style={GlobalStyles.header}>Info screen</Text>
                <Text style={{ color: BrandColors.Primary, margin: 5 }}>
                    Hello and welcome to our App ToolMan
                </Text>
                <Text style={{ margin: 5 }}>
                    In this app you will be able to rent and rent-out tools to your local community.
                </Text>
                <View>
                    <Text style={GlobalStyles.ul}>
                        {'\u2B24'} For the Tools that you rent out, you can update rent time and .
                    </Text>
                    <Text style={GlobalStyles.ul}>
                        {'\u2B24'} For Tools rented out by others, you can ask to rent them or
                        cancel your rental.
                    </Text>
                    <Text style={GlobalStyles.ul}>
                        {'\u2B24'} A new tool is created by longpressing on where you wish to rent out the tool.
                    </Text>
                    <Text style={GlobalStyles.ul}>
                        {'\u2B24'} Info about Tools for rental can be accessed by pressing the pins on the
                        map.
                    </Text>
                </View>
                <View style={GlobalStyles.collumnView}>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        {<Image
                            style={GlobalStyles.pin}
                            source={require('../../assets/PurplePin.png')}
                        />}
                        <Text style={GlobalStyles.pinText}>
                            The Purple Pin is shown for all Tools created by you. These can
                            either be deleted or you can edit it by pressing on it.
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {<Image
                            style={GlobalStyles.pin}
                            source={require('../../assets/GreenPin.png')}
                        />}
                        <Text style={GlobalStyles.pinText}>
                            The Green Pin is shown for all Tools for rent created by other users. These
                            can be rented if they are available, otherwise they will not
                            appear on the map, UNLESS if you rented the Tool.
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        { <Image
                            style={GlobalStyles.pin}
                            source={require('../../assets/OrangePin.png')}
                        />}
                        <Text style={GlobalStyles.pinText}>
                            The Orange Pin is the location of certain companies
                            which have special tools for rental.
                            These are currently manually added in the database for each
                            new group.
                            THIS IS A BETA FEATURE. When and if we get the companies on board,
                            they can be added.
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                       { <Image
                            style={GlobalStyles.pin}
                            source={require('../../assets/YellowPin.png')}
                        />}
                        <Text style={GlobalStyles.pinText}>
                            The Yellow Pin is a temporary pin. It only shows up, if a Tool modal
                            was activated (by longpressing) but not created (by pressing
                            rent-out Tool). This is mostly a test feature.
                        </Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default InfoScreen;