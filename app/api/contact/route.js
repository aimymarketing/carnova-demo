export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return Response.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    console.log('Contact form submission:', {
      name,
      email,
      phone,
      message,
      timestamp: new Date().toISOString(),
    });

    return Response.json(
      { success: true, message: 'Contact form submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return Response.json(
      { error: 'Failed to process contact form' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return Response.json({ message: 'Contact API endpoint is active' }, { status: 200 });
}
