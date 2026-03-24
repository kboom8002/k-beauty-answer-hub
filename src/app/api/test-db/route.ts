import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const brandId = user?.user_metadata?.brand_id || '33333333-3333-3333-3333-333333333331' 

    const { count: productsCount, error: err1 } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('brand_id', brandId)

    const { data: recentAssets, error: err2 } = await supabase
      .from('answer_assets')
      .select('*, product:products(name)')
      .eq('brand_id', brandId)
      .order('updated_at', { ascending: false })
      .limit(3)

    if (err1) throw new Error(err1.message)
    if (err2) throw new Error(err2.message)

    return NextResponse.json({
      success: true,
      message: "API Route hit",
      user: user ? user.email : "NO_USER",
      productsCount,
      recentAssets
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message,
      stack: error.stack
    }, { status: 500 })
  }
}
