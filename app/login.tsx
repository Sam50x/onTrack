import AppHeader from '../components/AppHeader'
import { KeyboardAvoidingView, Platform, View } from 'react-native'
import tw from 'twrnc'
import { Button, Text, TextInput } from 'react-native-paper'
import { useState } from 'react'

const LoginScreen = () => {
    const [isSignUp, setIsSignUp] = useState<boolean>(false)

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
            style={tw`flex-1`}
        >
            <View style={tw`h-fit pb-4 flex flex-col justify-center items-center`}>
                <AppHeader />
            </View>
            <View style={tw`flex-1 flex flex-col justify-center items-center px-6`}>
                <View style={tw`p-4`}>
                    <Text style={tw`font-bold text-3xl text-white text-center`}>{isSignUp ? `Create Account` : `Welcome Back`}</Text>
                </View>
                <View style={tw`w-full flex flex-col justify-center items-center gap-2 p-4 mb-1`}>
                    <TextInput
                        label={'Email'}
                        mode='outlined'
                        style={tw`w-80`}
                        activeOutlineColor='red'
                    />
                    <TextInput
                        label={'Password'}
                        mode='outlined'
                        style={tw`w-80`}
                        secureTextEntry
                        activeOutlineColor='red'
                    />
                </View>
                <View style={tw`flex flex-col justify-center items-center gap-2`}>
                    <Button
                        mode='contained'
                        style={tw`w-80`}
                        buttonColor='red'
                    >{isSignUp ? 'Sign Up' : 'Sign In'}</Button>
                    <Button
                        mode='text'
                        style={tw`w-80`}
                        textColor='white'
                    >{isSignUp ?
                        'Have an account? Sign In' :
                        'Need an account? Sign Up'}
                    </Button>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen