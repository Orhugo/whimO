import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native'
import {createClient} from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const storage =
    Platform.OS === 'web'
        ? typeof window !== 'undefined'
            ? window.localStorage
            : undefined
        : AsyncStorage

export const supabase = createClient(
    process.env.EXPO_PUBLIC_SUPABASE_URL ?? '',
    process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '', {
        auth: {
            storage: storage,
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: false,
        },
    })
