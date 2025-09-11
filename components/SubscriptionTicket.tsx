import { Subscription } from '../lib/types/subscription.type'
import { View } from 'react-native'
import { Text } from 'react-native-paper'

const SubscriptionTicket = ({ frequency, due_date, last_paid_at, price, title, description }: Subscription) => {
    return (
        <View>
            <Text>{title}</Text>
        </View>
    )
}

export default SubscriptionTicket