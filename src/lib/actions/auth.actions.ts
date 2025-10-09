'use server';

import { inngest } from "../inngest/client";
import { auth } from "../better-auth/auth";
import { headers } from "next/headers";

export const signUpWithEmail = async ({email, password, fullName, riskTolerance, country, investmentGoals, preferredIndustry}: SignUpFormData) => {
    try {
        const response = await (await auth).api.signUpEmail({
            body: {
                email,
                password,
                name: fullName,
            }
        })

        if (response) {
            await inngest.send({
                name: "app/user.created",
                data: { email, name: fullName, country, investmentGoals, riskTolerance, preferredIndustry }
            })
        }
    
        return { success: true, data: response }
    } catch (e) {
        console.log(e);
        return { success:false, error: 'Sign up failed' }
    }
}

export const signInWithEmail = async ({email, password}: SignInFormData) => {
    try {
        const response = await auth.api.signInEmail({
            body: {
                email,
                password,
            }
        })
    
        return { success: true, data: response }
    } catch (e) {
        console.log(e);
        return { success:false, error: 'Sign in failed' }
    }
}

export const signOut = async () => {
    try {
        await auth.api.signOut({ headers: await headers() });
    } catch (e) {
        console.log('Sign out error', e);
        return { success: false, error: 'Sign out failed' };
    }
}