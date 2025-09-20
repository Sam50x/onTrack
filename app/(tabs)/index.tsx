import { Link, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import tw from 'twrnc'
import SubscriptionTicket from '../../components/SubscriptionTicket'
import SubscriptionTicketModal from '../../components/SubscriptionTicketModal'
import { getAllSubscriptions, signOut } from '../../lib/actions'
import supabase from '../../lib/supabase'
import { Subscription } from '../../lib/types/subscription.type'

const HomeScreen = () => {

    const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
    const [error, setError] = useState<string | undefined>('')
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [subscriptionToEdit, setSubscriptionToEdit] = useState<Subscription | null>(null)

    const router = useRouter()

    const handleSignOut = async () => {
        const res = await signOut()

        if (res || 'error' in res) {
            setError(res.error)
            return
        }

        router.replace('/login')
    }

    const handleOpenModal = (subscription: Subscription) => {
        setIsModalOpen(true)
        setSubscriptionToEdit(subscription)
    }

    useEffect(() => {
        const fetchSubscriptions = async () => {
            setIsLoading(true)
            const res = await getAllSubscriptions()

            if (!res || 'error' in res) {
                setError(res.error)
                return
            }

            setSubscriptions(res)
            setIsLoading(false)
        }

        fetchSubscriptions()
    }, [])

    useEffect(() => {
        const subscriptionsListener = supabase
            .channel("public:subscriptions")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "subscriptions" },
                async (payload) => {
                    console.log("Change received!", payload);

                    const res = await getAllSubscriptions()

                    if (res && !('error' in res)) {
                        setSubscriptions(res)
                    }
                }
            )
            .subscribe();

        return () => {
            subscriptionsListener.unsubscribe();
        };
    }, []);


    const subscriptionTicketsItems = subscriptions.map((sub, index) => {
        return (
            <SubscriptionTicket
                key={index}
                subscription={sub}
                openModal={handleOpenModal}
            />
        )
    })

    return (
        <View style={tw`flex-1 bg-[#353434]`}>
            {isModalOpen && (
                <View>
                    <SubscriptionTicketModal subscription={subscriptionToEdit!} isVisible={isModalOpen} onClose={() => setIsModalOpen(false)} />
                </View>
            )
            }
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
                <View style={tw`w-full flex-1`}>
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
                                    <ScrollView 
                                    style={tw`flex-1 flex flex-col px-4 py-6`}
                                    contentContainerStyle={tw`gap-4 items-center justify-center pb-12`}
                                    >
                                        {subscriptionTicketsItems}
                                    </ScrollView>
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