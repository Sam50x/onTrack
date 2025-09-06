import { View, Text } from 'react-native'
import tw from 'twrnc'

const AppHeader = () => {
    return (
        <View style={[
            tw`h-12 flex justify-center items-center py-12 px-20 rounded-b-xl border border-white/20 border-t-0`,
            {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 10,
                elevation: 5,
            }
        ]}>
            <Text style={tw`text-4xl font-bold text-white`}>
                on<Text style={tw`text-red-600`}>T</Text>rack
            </Text>
        </View>
    )
}

export default AppHeader