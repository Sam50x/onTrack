import supabase from "./supabase"
import { Subscription } from "./types/subscription.type"

export const signUp = async (email: string, password: string) => {

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    })

    if (error) {
        return { error: error?.message as string || 'Error while Signing up' }
    }

    return data
}

export const signIn = async (email: string, password: string) => {

    let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return { error: error?.message || 'Error while Signing in' }
    }

    return data
}

export const signOut = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
        return { error: error?.message as string || 'Error while Signing out' }
    }

    return { data: 'User signed out successfully' }
}

export const getUser = async () => {
    const { data, error } = await supabase.auth.getUser()

    if (error) {
        return null
    }

    return data.user
}

export const getAllSubscriptions = async () => {
    const user = await getUser()

    if (!user || !user.id) {
        return { error: 'No user session found' }
    }

    const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .order('due_date', { ascending: true })

    if (error) {
        return { error: error?.message as string || 'Error while getting subscriptions' }
    }

    return data
}

export const getOneSubscription = async (id: string) => {
    const user = await getUser()

    if (!user || !user.id) {
        return { error: 'No user session found' }
    }

    if (!id) {
        return { error: 'Subscription ID is required' }
    }

    const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('id', id)
        .single()

    if (error) {
        return { error: error?.message as string || 'Error while getting subscription' }
    }

    return data
}

export const createSubscription = async (inputData: Subscription) => {
    const {
        frequency,
        title,
        description,
        last_paid_at,
        price,
    } = inputData

    const user = await getUser()

    if (!user || !user.id) {
        return { error: 'No user session found' }
    }

    let daysToAdd

    if (frequency === 'Monthly') daysToAdd = 30
    else daysToAdd = 365

    const newDueDate = new Date(
        last_paid_at.getTime() + daysToAdd * 24 * 60 * 60 * 1000
    )

    const { data, error } = await supabase
        .from('subscriptions')
        .insert([
            {
                frequency,
                title,
                description,
                last_paid_at: new Date(last_paid_at),
                due_date: new Date(newDueDate),
                price,
                user_id: user.id
            },
        ])
        .select()
        .single()

    if (error) {
        return { error: error?.message as string || 'Error while creating subscription' }
    }

    return data
}

export const updateSubscription = async (inputData: Partial<Subscription>) => {
    const {
        frequency,
        title,
        description,
        price,
        id,
    } = inputData ?? {}

    const user = await getUser()

    if (!user || !user.id) {
        return { error: 'No user session found' }
    }

    if (!id) {
        return { error: 'Subscription ID is required' }
    }

    const props: Partial<Subscription> = {}

    if (frequency) props.frequency = frequency
    if (title) props.title = title
    if (description) props.description = description
    if (price) props.price = price

    const { data, error } = await supabase
        .from('subscriptions')
        .update(props)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single()

    if (error) {
        return { error: error?.message as string || 'Error while updating subscription' }
    }

    return data
}

export const paySubscription = async (inputData: Partial<Subscription>) => {
    const {
        id,
        last_paid_at,
    } = inputData

    const user = await getUser()

    if (!user || !user.id) {
        return { error: 'No user session found' }
    }

    if (!id || !last_paid_at) {
        return { error: 'Subscription ID and Last Paid Date are required' }
    }

    const subscription = await getOneSubscription(id)

    if ('error' in subscription) {
        console.log(subscription.error)
        return subscription.error
    }

    let daysToAdd

    if (subscription.frequency === 'Monthly') daysToAdd = 30
    else daysToAdd = 365

    const newDueDate = new Date(
        last_paid_at.getTime() + daysToAdd * 24 * 60 * 60 * 1000
    )

    const { data, error } = await supabase
        .from('subscriptions')
        .update({
            'last_paid_at': new Date(last_paid_at),
            'due_date': new Date(newDueDate),
        })
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single()

    if (error) {
        return { error: error?.message as string || 'Error while paying subscription' }
    }

    return data
}

export const deleteSubscription = async (id: string) => {
    const user = await getUser()

    if (!user || !user.id) {
        return { error: 'No user session found' }
    }

    if (!id) {
        return { error: 'Subscription ID is required' }
    }

    const { data, error } = await supabase
        .from('subscriptions')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single()

    if (error) {
        return { error: error?.message as string || 'Error while deleting subscription' }
    }

    return data
}

export const createSafeDate = (dateInput: string | Date) => {
    if (dateInput instanceof Date) {
        const date = new Date(dateInput)
        date.setHours(12, 0, 0, 0)
        return date
    }

    const parts = dateInput.split(/[-\/]/)
    if (parts.length !== 3) return new Date(NaN)

    let [month, day, year] = parts.map(Number)
    if (year < 100) year += 2000

    const date = new Date(year, month - 1, day, 12, 0, 0, 0)
    return date
}

export const isValidDate = (date: string) => {
    const regex = /^(0?[1-9]|1[0-2])[-\/](0?[1-9]|[12][0-9]|3[01])[-\/](\d{2}|\d{4})$/;
    return regex.test(date);
}