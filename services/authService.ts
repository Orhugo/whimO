import { supabase } from "@lib/supabase";

export const authService = {
    async login(email: string, password: string) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.error('Login error:', error.message);
        }

        return { data, error };
    },

    async register(username: string, email: string, password: string) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    username
                },
            }
        });

        if (error) {
            console.error('Register error:', error.message);
            return { data, error };
        }

        return { data, error };
    },

    async logout() {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error('Logout error:', error.message);
        }

        return { error };
    },

    async getCurrentUser() {
        const { data: { user }, error } = await supabase.auth.getUser();
        return { user, error };
    },

    async resetPassword(email: string) {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email);
        return { data, error };
    }
}