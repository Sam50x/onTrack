export type Subscription = {
    user_id?: string,
    frequency: 'Monthly' | 'Yearly',
    title: string,
    description: string,
    last_paid_at: Date,
    due_date?: Date,
    price: number,
    created_at?: Date,
    id?: string,
}