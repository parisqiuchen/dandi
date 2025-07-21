import { NextResponse } from 'next/server'
import { getAllUsers } from '../../../lib/userManager'

// GET - Fetch all users (for testing)
export async function GET() {
  try {
    const users = await getAllUsers()
    
    // Remove sensitive information for the response
    const safeUsers = users.map(user => ({
      id: user.id,
      email: user.email,
      name: user.name,
      provider: user.provider,
      created_at: user.created_at,
      last_login: user.last_login
    }))

    return NextResponse.json({
      users: safeUsers,
      count: users.length
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
} 