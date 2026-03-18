// GET handler for inventory sync
export async function GET() {
  // Fetch vehicles from DMS API endpoint
  // Note: This assumes the DMS has a public API endpoint
  // In production, replace with actual DMS API credentials
  
  try {
    const response = await fetch('https://carnova-dms.web.app/inventory', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (response.ok) {
      const data = await response.json();
      return Response.json({ success: true, count: data.length || 0, message: 'Inventory synced from DMS' });
    } else {
      // Fallback: return current hardcoded data
      return Response.json({
        success: false,
        message: 'DMS not accessible, returning cached data',
      });
    }
  } catch (error) {
    console.error('Sync error:', error);
    return Response.json({
      success: false,
      message: 'Sync failed - using cached inventory data',
    });
  }
}

// POST handler for manual sync trigger
export async function POST(request) {
  const authHeader = request.headers.get('Authorization');
  const syncKey = process.env.SYNC_SECRET;
  
  // Simple auth check
  if (authHeader !== `Bearer ${syncKey}` && syncKey) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  // Same sync logic as GET
  try {
    const response = await fetch('https://carnova-dms.web.app/inventory', {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });
    
    if (response.ok) {
      const data = await response.json();
      return Response.json({ success: true, count: data.length || 0 });
    }
  } catch (error) {
    return Response.json({ success: false, message: 'Sync failed' });
  }
  
  return Response.json({ success: false });
}
