import { View, KeyboardAvoidingView, Platform } from 'react-native'
import tw from 'twrnc'
import { TextInput, SegmentedButtons, Button, Text } from 'react-native-paper'
import { useState } from 'react'
import { createSafeDate, createSubscription, isValidDate } from '../../lib/actions'
import { useRouter } from 'expo-router'

const AddSubscriptionScreen = () => {

    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [lastDate, setLastDate] = useState<string>('')
    const [price, setPrice] = useState<string>('')
    const [frequency, setFrequency] = useState<'Monthly' | 'Yearly'>('Monthly')
    const [error, setError] = useState<string>('')

    const router = useRouter()

    const handleAddingSubscription = async () =>{
        if (!title || !description || !lastDate || !price || !frequency){
            setError('Please fill all fields')
            return
        }

        if (!isValidDate(lastDate)){
            setError('Please set a valid date')
            return
        }

        const res = await createSubscription({
            title,
            description,
            frequency,
            price: Number(price),
            last_paid_at: createSafeDate(lastDate)
        })

        if (!res || 'error' in res){
            setError(res.error)
            return
        }

        setTitle('')
        setDescription('')
        setFrequency('Monthly')
        setLastDate('')
        setPrice('')
        router.replace('/')
    }

    return (
        <KeyboardAvoidingView
            style={tw`flex-1 bg-[#353434]`}
            behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        >
            <View style={tw`flex-1 flex flex-col justify-center items-center`}>
                <View style={tw`w-full flex flex-col justify-center items-center gap-2 p-4`}>
                    <TextInput
                        style={tw`w-80`}
                        label={'Title'}
                        value={title}
                        onChangeText={setTitle}
                    />
                    <TextInput
                        style={tw`w-80`}
                        label={'Description'}
                        value={description}
                        onChangeText={setDescription}
                    />
                    <View style={tw`w-full flex flex-row justify-center items-center gap-2`}>
                        <TextInput
                            style={tw`w-49`}
                            label={'Last Paid Date'}
                            placeholder='mm/dd/yyyy'
                            keyboardType='number-pad'
                            value={lastDate}
                            onChangeText={setLastDate}
                        />
                        <TextInput
                            style={tw`w-29`}
                            label={'Price'}
                            keyboardType='number-pad'
                            value={price}
                            onChangeText={setPrice}
                        />
                    </View>
                    <SegmentedButtons
                        value={frequency}
                        onValueChange={setFrequency}
                        buttons={[
                            {
                                value: 'Monthly',
                                label: 'Monthly',
                            },
                            {
                                value: 'Yearly',
                                label: 'Yearly',
                            },
                        ]}
                        style={tw`w-80 py-1`}
                        theme={{
                            colors: {
                                onSurface: 'white',
                            }
                        }}
                    />
                    {error &&
                        <View>
                            <Text style={tw`text-red-500 font-bold mb-2 text-center`}>{error}</Text>
                        </View>
                    }
                    <Button
                        mode='contained'
                        style={tw`w-80`}
                        onPress={handleAddingSubscription}
                    >
                        Add Subscription
                    </Button>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default AddSubscriptionScreen