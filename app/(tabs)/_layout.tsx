import { Tabs } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabsLayout() {
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarStyle: {
                backgroundColor: 'green',
                borderTopWidth: 0,
                elevation: 0,
                shadowOpacity: 0,
                height: 55,
            },
            tabBarActiveTintColor: '#6200ee',
            tabBarInactiveTintColor: '#666666',
        }}>
            <Tabs.Screen name="index" options={
                {
                    title: "Subscriptions", tabBarIcon: ({ color }) => {
                        return (
                            <MaterialIcons name="subscriptions" size={24} color={color} />
                        )
                    }
                }
            } />
            <Tabs.Screen name="AddSubscription" options={
                {
                    title: "Add Subscription", tabBarIcon: ({ color }) => {
                        return (
                            <MaterialIcons name="library-add" size={24} color={color} />
                        )
                    }
                }
            } />
        </Tabs>
    )
}
