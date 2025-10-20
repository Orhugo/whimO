import { AuthContext } from '@/hooks/use-auth-context';
import { supabase } from '@lib/supabase';
import type { Session } from '@supabase/supabase-js';
import { PropsWithChildren, useEffect, useState } from 'react';

export default function AuthProvider({ children }: PropsWithChildren) {
    const [session, setSession] = useState<Session | undefined | null>(undefined);
    const [profile, setProfile] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Obtener sesión inicial y suscribirse a cambios
    useEffect(() => {
        console.log('[AuthProvider] Initializing...');

        const fetchSession = async () => {
            try {
                console.log('[AuthProvider] Fetching initial session...');
                const { data: { session }, error } = await supabase.auth.getSession();

                if (error) {
                    console.error('[AuthProvider] Error fetching session:', error);
                }

                console.log('[AuthProvider] Initial session:', session ? 'Found' : 'Not found');
                setSession(session);
            } catch (error) {
                console.error('[AuthProvider] Unexpected error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSession();

        // Suscribirse a cambios de autenticación
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                console.log('[AuthProvider] Auth state changed:', event, session ? 'Session exists' : 'No session');
                setSession(session);
            }
        );

        return () => {
            console.log('[AuthProvider] Cleaning up subscription');
            subscription.unsubscribe();
        };
    }, []);

    // Obtener perfil cuando cambia la sesión
    useEffect(() => {
        const fetchProfile = async () => {
            if (!session?.user) {
                console.log('[AuthProvider] No session, clearing profile');
                setProfile(null);
                return;
            }

            try {
                console.log('[AuthProvider] Fetching profile for user:', session.user.id);
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();

                if (error) {
                    console.error('[AuthProvider] Error fetching profile:', error.message);
                    // No bloqueamos si no hay perfil, solo usamos los datos del user
                    setProfile({ username: session.user.user_metadata?.username });
                } else {
                    console.log('[AuthProvider] Profile loaded:', data);
                    setProfile(data);
                }
            } catch (error) {
                console.error('[AuthProvider] Unexpected error fetching profile:', error);
            }
        };

        fetchProfile();
    }, [session]);

    const isLoggedIn = session !== null && session !== undefined;

    console.log('[AuthProvider] Current state:', {
        isLoading,
        isLoggedIn,
        hasSession: !!session
    });

    return (
        <AuthContext.Provider
            value={{
                session,
                profile,
                isLoading,
                isLoggedIn,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}