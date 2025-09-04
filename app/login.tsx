import { KeyboardAvoidingView, Platform, View, Text } from 'react-native'
import tw from 'twrnc'

const LoginScreen = () => {

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={tw`flex-1`}
        >
            <View style={tw`flex-1 justify-center items-center px-6 bg-green-700`}>
                <Text style={tw`font-bold text-2xl text-red-600 mb-4 bg-black px-12 py-4 rounded-xl`}>
                    Welcome Back
                </Text>
                <Text style={tw`font-bold text-2xl text-yellow-600 mb-4 bg-black px-12 py-4 rounded-xl`}>
                    Welcome Back
                </Text>
                <Text style={tw`font-bold text-2xl text-green-600 mb-4 bg-black px-12 py-4 rounded-xl`}>
                    Welcome Back
                </Text>
            </View>
            
        </KeyboardAvoidingView>
    )
}

export default LoginScreen