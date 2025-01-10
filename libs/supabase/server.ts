'use server';

import {
  NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_SUPABASE_URL,
} from '@/constants/env';
import { Database } from '@/types/database';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const createSupabaseServerClient = async () => {
  const cookieStore = await cookies();
  return createServerClient<Database>(
    NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          const value = cookieStore.get(name)?.value;
          console.log('createSupabaseServerClient get:', name, value);
          return value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
            console.log('createSupabaseServerClient set:', name, value);
          } catch (error) {}
        },
        remove(name: string, options: CookieOptions) {
          try {
            console.log('createSupabaseServerClient remove:', name);
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {}
        },
      },
    }
  );
};
