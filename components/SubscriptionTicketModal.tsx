import { Subscription } from '../lib/types/subscription.type'
import { View, TouchableOpacity, Modal } from 'react-native'
import { Button, Text } from 'react-native-paper'
import tw from 'twrnc'

type props = {
    subscription: Subscription,
    isVisible: boolean,
    onClose: () => void,
}

const SubscriptionTicketModal = ({ subscription, isVisible, onClose }: props) => {

    const {
        id,

    } = subscription

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <TouchableOpacity 
                style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}
                activeOpacity={1}
                onPress={onClose}
            >
                <Text style={tw`text-white bg-green-800 p-8`}>{id}</Text>
            </TouchableOpacity>
        </Modal>
    )
}

export default SubscriptionTicketModal