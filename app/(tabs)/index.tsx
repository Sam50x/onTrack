import { Link, useRouter } from 'expo-router'
import { getAllSubscriptions, signOut } from '../../lib/actions'
import { View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import tw from 'twrnc'
import { useEffect, useState } from 'react'
import { Subscription } from '../../lib/types/subscription.type'
import SubscriptionTicket from '../../components/SubscriptionTicket'

const HomeScreen = () => {

    const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
    const [error, setError] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const router = useRouter()

    const handleSignOut = async () => {
        const res = await signOut()

        console.log(res)

        router.replace('/login')
    }

    useEffect(() => {
        const fetchSubscriptions = async () => {
            setIsLoading(true)
            const res = await getAllSubscriptions()

            if (!res || 'error' in res) {
                setError(res.error)
                return
            }

            console.log(res)
            setSubscriptions(res)
            setIsLoading(false)
        }

        fetchSubscriptions()
    }, [])

    const subscriptionTicketsItems = subscriptions.map((sub, index) => {
        const {
            frequency, due_date, last_paid_at, price, title, description
        } = sub
        return (
            <SubscriptionTicket
                key={index}
                frequency={frequency}
                due_date={due_date}
                last_paid_at={last_paid_at}
                price={price}
                title={title}
                description={description}
            />
        )
    })

    return (
        <View style={tw`flex-1 bg-[#353434]`}>
            <View style={tw`flex-1 flex flex-col justify-center items-center`}>
                <View style={tw`w-full flex flex-row justify-between items-center gap-2 p-4`}>
                    <Text
                        style={tw`text-white text-xl font-bold`}
                    >
                        Your Subscriptions
                    </Text>
                    <Button
                        mode='contained'
                        onPress={handleSignOut}
                    >
                        Sign Out
                    </Button>
                </View>
                <View style={tw`w-full flex flex-col justify-start items-center gap-2 py-4 px-4 flex-1`}>
                    {
                        error ? (
                            <View style={tw`absolute top-4 left-center w-full`}>
                                <Text style={tw`text-red-500 w-full text-center font-bold`}>{error}</Text>
                                <Text style={tw`text-white w-full text-center font-bold`}>Try again later</Text>
                            </View>
                        ) :
                            isLoading ? (
                                <View style={tw`absolute top-4 left-center w-full`}>
                                    <Text
                                        style={tw`text-white w-full text-center font-bold`}
                                    >Loading...</Text>
                                </View>
                            ) :
                                subscriptions.length ? (
                                    <View>
                                        {subscriptionTicketsItems}
                                    </View>
                                ) : (
                                    <View style={tw`absolute top-4 left-center w-full`}>
                                        <Link
                                            href={'/AddSubscription'}
                                            style={tw`text-white w-full text-center font-bold`}
                                        >Add Subscriptions to start</Link>
                                    </View>
                                )
                    }
                </View>
            </View>
        </View>
    )
}

export default HomeScreen