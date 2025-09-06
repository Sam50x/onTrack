import AppHeader from '../components/AppHeader'
import { KeyboardAvoidingView, Platform, View, Text } from 'react-native'
import tw from 'twrnc'

const LoginScreen = () => {

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={tw`flex-1`}
        >
            <View style={tw`h-fit pb-4 flex flex-col justify-center items-center`}>
                <AppHeader />
            </View>
            <View style={tw`flex-1 justify-center items-center px-6`}>

            </View>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen