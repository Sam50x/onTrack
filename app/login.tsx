import AppHeader from '../components/AppHeader'
import { KeyboardAvoidingView, Platform, View } from 'react-native'
import tw from 'twrnc'
import { Button, Text, TextInput } from 'react-native-paper'
import { useState } from 'react'
import { signIn, signUp } from '../lib/actions'
import { useRouter } from 'expo-router'

const LoginScreen = () => {
    const [isSignUp, setIsSignUp] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const router = useRouter()

    const handleChangeAuthMode = () => {
        setIsSignUp(!isSignUp)
        setError('')
    }

    const handleAuth = async () => {
        setError('')

        if (!email || !password) {
            setError('Please fill all fields')
            return
        }
        if (password.length < 6) {
            setError('Passwords are at least 6 characters')
            return
        }
        try {

            let res

            if (isSignUp) {
                res = await signUp(email, password)
            }
            else {
                res = await signIn(email, password)
            }

            if (!res || 'error' in res){
                setError(res.error)
                return
            }

            router.replace('/')
        }
        catch (e) {
            if (e instanceof Error) {
                setError(e.message)
            }
            setError('An Error occurred, Try again later')
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
            style={tw`flex-1`}
        >
            <View style={tw`h-fit pb-4 mb-18 flex flex-col justify-center items-center`}>
                <AppHeader />
            </View>
            <View style={tw`flex-1 flex flex-col justify-center mb-28 items-center px-6`}>
                <View style={tw`p-2`}>
                    <Text style={tw`font-bold text-3xl text-white text-center`}>{isSignUp ? `Create Account` : `Welcome Back`}</Text>
                </View>
                <View style={tw`w-full flex flex-col justify-center items-center gap-2 p-4`}>
                    <TextInput
                        label={'Email'}
                        mode='outlined'
                        style={tw`w-80`}
                        activeOutlineColor='red'
                        onChangeText={setEmail}
                        autoCapitalize='none'
                    />
                    <TextInput
                        label={'Password'}
                        mode='outlined'
                        style={tw`w-80`}
                        secureTextEntry
                        activeOutlineColor='red'
                        onChangeText={setPassword}
                        autoCapitalize='none'
                    />
                </View>
                {error &&
                    <View>
                        <Text style={tw`text-red-500 font-bold mb-2 text-center`}>{error}</Text>
                    </View>
                }
                <View style={tw`flex flex-col justify-center items-center gap-2`}>
                    <Button
                        mode='contained'
                        style={tw`w-80`}
                        buttonColor='red'
                        onPress={handleAuth}
                    >{isSignUp ? 'Sign Up' : 'Sign In'}</Button>
                    <Button
                        mode='text'
                        style={tw`w-80`}
                        textColor='white'
                        onPress={handleChangeAuthMode}
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