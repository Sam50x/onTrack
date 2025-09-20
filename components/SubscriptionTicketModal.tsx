import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import { Button, SegmentedButtons, Text, TextInput } from 'react-native-paper';
import tw from 'twrnc';
import { createSafeDate, deleteSubscription, isValidDate, paySubscription, updateSubscription } from '../lib/actions';
import { Subscription } from '../lib/types/subscription.type';

type props = {
    subscription: Subscription,
    isVisible: boolean,
    onClose: () => void,
}

const SubscriptionTicketModal = ({ subscription, isVisible, onClose }: props) => {


    const [title, setTitle] = useState<string>(subscription.title)
    const [description, setDescription] = useState<string>(subscription.description)
    const [lastDate, setLastDate] = useState<string>(new Date(subscription.last_paid_at).toLocaleDateString('en-US'))
    const [price, setPrice] = useState<string>(String(subscription.price))
    const [frequency, setFrequency] = useState<'Monthly' | 'Yearly'>(subscription.frequency)
    const [error, setError] = useState<string>('')

    const handleUpdatingSubscription = async () => {
        if (!title || !description || !lastDate || !price || !frequency) {
            setError('Please fill all fields')
            return
        }

        if (!isValidDate(lastDate)) {
            setError('Please set a valid date')
            return
        }

        let res = await updateSubscription({
            title,
            description,
            frequency,
            price: Number(price),
            id: subscription.id,
        })

        if (!res || 'error' in res) {
            setError(res.error)
            return
        }

        res = await paySubscription({
            id: subscription.id,
            last_paid_at: createSafeDate(lastDate),
        })

        if (!res || 'error' in res) {
            setError(res.error)
            return
        }

        onClose()
    }

    const handleDeletingSubscription = async () => {
        const res = await deleteSubscription(subscription.id!)

        if (!res || 'error' in res) {
            setError(res.error)
            return
        }

        onClose()
    }

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
                <TouchableOpacity
                    onPress={(e) => e.stopPropagation()}
                    activeOpacity={1}
                    style={tw`max-w-full w-80 rounded-xl p-6 m-4 flex flex-col items-center justify-center bg-white`}
                >
                    <View style={tw`flex flex-row justify-between items-center w-full`}>
                        <Text style={tw`font-bold text-lg`}>Edit Subscription</Text>
                        <View>
                            <Ionicons name="close" size={24} color="black" onPress={onClose} />
                        </View>
                    </View>
                    <View style={tw`w-full flex flex-col justify-center items-center`}>
                        <View style={tw`w-full flex flex-col justify-center items-center gap-2 py-4`}>
                            <TextInput
                                style={tw`w-full`}
                                label={'Title'}
                                value={title}
                                onChangeText={setTitle}
                            />
                            <TextInput
                                style={tw`w-full`}
                                label={'Description'}
                                value={description}
                                onChangeText={setDescription}
                            />
                            <View style={tw`w-full flex flex-row justify-center items-center gap-2`}>
                                <TextInput
                                    style={tw`w-[65%]`}
                                    label={'Last Paid Date'}
                                    placeholder='mm/dd/yyyy'
                                    keyboardType='number-pad'
                                    value={lastDate}
                                    onChangeText={setLastDate}
                                />
                                <TextInput
                                    style={tw`w-[32%]`}
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
                                style={tw`w-full py-1`}
                                theme={{
                                    colors: {
                                        onSurface: 'black',
                                    }
                                }}
                            />
                            {error &&
                                <View>
                                    <Text style={tw`text-red-500 font-bold mb-2 text-center`}>{error}</Text>
                                </View>
                            }
                            <View style={tw`w-full flex flex-row gap-3 justify-end items-center`}>
                                <Button
                                    mode='outlined'
                                    style={tw`flex-1 border-red-400 border`}
                                    onPress={handleDeletingSubscription}
                                    textColor='red'

                                >
                                    Delete
                                </Button>
                                <Button
                                    mode='contained'
                                    style={tw`flex-1`}
                                    onPress={handleUpdatingSubscription}
                                >
                                    Edit
                                </Button>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    )
}

export default SubscriptionTicketModal