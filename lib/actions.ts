import supabase from "./supabase"

export const signUp = async (email: string, password: string) => {

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    })

    if (error) {
        console.error(error)
        return { error }
    }

    return { data }
}

export const signIn = async (email: string, password: string) => {

    let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        console.error(error)
        return { error }
    }

    return { data }
}

export const signOut = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
        console.log(error)
        return { error }
    }

    return { data: 'User signed out successfully' }
}

export const getUser = async () => {
    const { data: user, error } = await supabase.auth.getUser()

    if (error) {
        return null
    }

    return user
}

export const getAllSubscriptions = async () => {

}

export const getOneSubscription = async () => {

}

export const createSubscription = async () => {

}

export const updateSubscription = async () => {

}

export const paySubscription = async () => {

}

export const deleteSubscription = async () => {

}

