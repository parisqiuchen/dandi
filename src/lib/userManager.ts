import { supabaseAdmin } from './supabase'

export interface User {
  id: string
  email: string
  name: string | null
  image: string | null
  provider: string
  provider_id: string | null
  created_at: string
  updated_at: string
  last_login: string
}

export interface CreateUserData {
  email: string
  name?: string | null
  image?: string | null
  provider?: string
  provider_id?: string | null
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching user:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error in getUserByEmail:', error)
    return null
  }
}

/**
 * Create a new user
 */
export async function createUser(userData: CreateUserData): Promise<User | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .insert({
        email: userData.email,
        name: userData.name,
        image: userData.image,
        provider: userData.provider || 'google',
        provider_id: userData.provider_id,
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating user:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error in createUser:', error)
    return null
  }
}

/**
 * Update user's last login and optionally profile info
 */
export async function updateUserLogin(
  userId: string, 
  profileData?: { name?: string | null; image?: string | null }
): Promise<User | null> {
  try {
    const updateData: any = {
      last_login: new Date().toISOString()
    }

    if (profileData?.name !== undefined) {
      updateData.name = profileData.name
    }
    if (profileData?.image !== undefined) {
      updateData.image = profileData.image
    }

    const { data, error } = await supabaseAdmin
      .from('users')
      .update(updateData)
      .eq('id', userId)
      .select()
      .single()

    if (error) {
      console.error('Error updating user login:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error in updateUserLogin:', error)
    return null
  }
}

/**
 * Get or create user (used in auth flow)
 */
export async function getOrCreateUser(userData: CreateUserData): Promise<User | null> {
  // First try to get existing user
  const existingUser = await getUserByEmail(userData.email)
  
  if (existingUser) {
    // Update last login and profile info
    return await updateUserLogin(existingUser.id, {
      name: userData.name,
      image: userData.image
    })
  } else {
    // Create new user
    return await createUser(userData)
  }
}

/**
 * Get all users (admin function)
 */
export async function getAllUsers(): Promise<User[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching all users:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error in getAllUsers:', error)
    return []
  }
} 