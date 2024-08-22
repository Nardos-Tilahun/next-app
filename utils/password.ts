// passwordUtils.ts (Server-Side Only)
import argon2 from 'argon2';

// Function to salt and hash a password
export async function saltAndHashPassword(password: string) {
    try {
        const hashedPassword = await argon2.hash(password);
        return hashedPassword;
    } catch (error) {
        throw new Error('Error hashing password');
    }
}

// Function to verify a password against a hashed password
export async function verifyPassword(password: string, hashedPassword: string) {
    try {
        return await argon2.verify(hashedPassword, password);
    } catch (error) {
        throw new Error('Error verifying password');
    }
}
