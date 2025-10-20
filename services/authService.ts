import { supabase } from "@lib/supabase";

export const authService = {
    async login(email: string, password: string) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        return { data, error };
    },

    async register(username: string,email: string, password: string) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { username },
            }
        });
        return { data, error };
    },

    async logout() {
        const { error } = await supabase.auth.signOut();
        return { error };
    }
}