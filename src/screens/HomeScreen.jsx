/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { StatusBar } from "expo-status-bar";
import { View, ScrollView, Image, Text } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline"
import { TextInput } from "react-native";
import Categories from "../components/categories";
import { useEffect, useState } from "react";
import axios from "axios";
import Recipes from "../components/recipes";

export default function HomeScreen() {

    const [activeCategory, setActiveCategory] = useState("Beef")
    const [categories, setCategories] = useState([])
    const [meals, setMeals] = useState([])

    useEffect(() => {
        getCategories();
        getRecipes();
    }, [])

    const handleChangeCategory = category => {
        getRecipes(category);
        setActiveCategory(category)
        setMeals([])
    }
    const getCategories = async () => {
        try {
            const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');

            if (response && response.data) {
                setCategories(response.data.categories)
            }

        }
        catch (error) {
            console.log("error: ", error.message)
        }
    }

    const getRecipes = async (category = "Beef") => {
        try {
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
            if (response && response.data) {
                setMeals(response.data.meals)
            }
        }
        catch (error) {
            console.log("error: ", error.message)
        }
    }


    return (
        <>
            <View className="bg-white flex-1">
                <StatusBar style="dark" />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 50 }}
                    className="space-y-6 pt-14"
                >
                    {/* avatar */}
                    <View className="mx-4 flex-row justify-between items-center mb-2">
                        <Image
                            source={require("../../assets/images/avatar.png")}
                            style={{ height: hp(5), width: hp(5.5) }}
                        />
                        <BellIcon size={hp(4)} color="gray" />
                    </View>

                    {/* gretting */}
                    <View className="mx-4 space-y-2 mb-2">
                        <Text
                            style={{ fontSize: hp(1.7) }}
                            className="text-neutral-600">
                            Hello, Renato Fujimoto
                        </Text>
                        <View>
                            <Text
                                style={{ fontSize: hp(3.8) }}
                                className="font-semibold text-neutral-600">
                                Make your own food
                            </Text>
                        </View>
                        <Text
                            style={{ fontSize: hp(3.8) }}
                            className="font-semibold text-neutral-600">
                            stay at
                            <Text className="text-amber-400"> home</Text>
                        </Text>
                    </View>

                    {/* search bar */}

                    <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
                        <TextInput
                            placeholder="Search any recipe"
                            placeholderTextColor={"gray"}
                            style={{ fontSize: hp(1.7) }}
                            className="flex-1 text-base mb-1 pl-3 tracking-wider"
                        />
                        <View className="bg-white rounded-full p-3">
                            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
                        </View>
                    </View>

                    {/* categories */}
                    <View>
                        {categories.length > 0 &&
                            <Categories
                                categories={categories}
                                activeCategory={activeCategory}
                                handleChangeCategory={handleChangeCategory}

                            />}
                    </View>

                    {/* recipes */}

                    <View>
                        <Recipes meals={meals} categories={categories} />
                    </View>
                </ScrollView>
            </View>
        </>
    )
}