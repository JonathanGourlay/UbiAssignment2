
import React from "react";
import { View, StyleSheet, Dimensions, FlatList, Text } from "react-native";
import firebase from "firebase";
import "firebase/firestore";
import { MealCard } from '../Components/MealCard';
import { MealModal } from '../Components/MealModal';
import { FirebaseAuthConsumer } from "@react-firebase/auth";
import { ThemeSwitch } from "../Scripts/GlobalState";


export const MealRotation = () => {
    const [state, setState] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(false)
    const [selectedMeal, setSelectedMeal] = React.useState();
    let themeSwitch = ThemeSwitch.useContainer();
    const mealArray = [];

    // run once on inital render
    React.useEffect(() => {
        (async () => {
            const result = await firebase.firestore().collection('/meals/').get()
            result.forEach((meal) => { mealArray.push(meal.data()) }); setState(mealArray)
        })();
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <FirebaseAuthConsumer>
                {({ isSignedIn }) => {
                    return isSignedIn ? (
                        <View style={{ flexDirection: 'column', alignSelf: 'stretch' }}>
                            <FlatList
                                style={styles.container}
                                horizontal={false}
                                data={state}

                                renderItem={({ item, index }) => {
                                    return (
                                        <MealCard
                                            mealObject={item}
                                            key={index}
                                            keyExtractor={index + (index / 0.2)}
                                            onPress={() => {
                                                setModalVisible(true)
                                                setSelectedMeal(item)
                                            }}
                                        ></MealCard>

                                    )
                                }}
                            />

                            <MealModal
                                selectedMeal={selectedMeal}
                                visible={modalVisible}
                                setModalVisible={setModalVisible}
                            />
                        </View>
                    ) : (
                            <View>
                                <Text
                                    style={{ textAlign: 'center' }}
                                >Please Login to use the application</Text>
                            </View>
                        )
                }}
            </FirebaseAuthConsumer>



        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: "#f9c2ff",
        padding: 20,
        marginVertical: 8
    },
    header: {
        fontSize: 32,
        backgroundColor: "#fff",
        width: Dimensions.get('screen').width
    },
    title: {
        fontSize: 24
    }
});
