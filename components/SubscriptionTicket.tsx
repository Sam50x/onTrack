import Entypo from '@expo/vector-icons/Entypo';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import tw from 'twrnc';
import { Subscription } from '../lib/types/subscription.type';

type props = {
    subscription: Subscription,
    openModal: (subscription: Subscription) => void,
}

const SubscriptionTicket = ({ subscription, openModal }: props) => {

    const { frequency, due_date, price, title, description } = subscription

    return (
        <View
            style={tw`w-99/100 bg-[#4F4D4D] px-6 py-6 gap-6 rounded-xl flex flex-col justify-start items-start`}
        >
            <View style={tw`absolute top-4 right-4`}>
                <Entypo name="dots-two-vertical" size={24} color="white" onPress={() => openModal(subscription)}/>
            </View>
            <View style={tw`flex flex-col`}>
                <Text style={tw`font-bold text-xl text-white`}>{title}</Text>
                <Text style={tw`text-md text-white/70`}>{description}</Text>
            </View>
            <View style={tw`w-full flex flex-row justify-between`}>
                {due_date && <Text style={tw`bg-white rounded-full px-4 py-2`}>{new Date(due_date).toISOString().split('T')[0]}</Text>}
                <Text style={tw`bg-white rounded-full px-4 py-2`}>{price}</Text>
                <Text style={tw`bg-white rounded-full px-4 py-2`}>{frequency}</Text>
            </View>
        </View>
    )
}

export default SubscriptionTicket