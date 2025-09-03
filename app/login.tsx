import { KeyboardAvoidingView, Platform, View } from 'react-native'


const LoginScreen = () => {

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >

        </KeyboardAvoidingView>
    )
}

export default LoginScreen