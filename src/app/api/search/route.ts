import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json()

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      )
    }

    // Prepare the system prompt for information search
    const systemPrompt = `You are an intelligent search assistant that provides accurate, comprehensive, and well-structured information. Your goal is to:

1. Provide clear, factual answers to user questions
2. Structure responses with headings, bullet points, or numbered lists when appropriate
3. Include relevant context and background information
4. Cite sources when possible (though you may not have real-time data)
5. If uncertain, clearly state limitations
6. Keep responses concise but complete
7. Use a helpful and professional tone

Format your responses to be easily readable with proper structure and organization.`

    // Make API call to the AI service
    const aiResponse = await fetch('https://oi-server.onrender.com/chat/completions', {
      method: 'POST',
      headers: {
        'customerId': 'scouaua@gmail.com',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer xxx'
      },
      body: JSON.stringify({
        model: 'openrouter/claude-sonnet-4',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: query
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    })

    if (!aiResponse.ok) {
      throw new Error(`AI API error: ${aiResponse.status}`)
    }

    const aiData = await aiResponse.json()
    
    // Extract the response content
    const aiContent = aiData.choices?.[0]?.message?.content || 'No response received'

    // Return structured response
    return NextResponse.json({
      query,
      response: aiContent,
      timestamp: new Date().toISOString(),
      model: 'Claude Sonnet 4',
      success: true
    })

  } catch (error) {
    console.error('Search API error:', error)
    
    return NextResponse.json(
      {
        error: 'Failed to process search request',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        success: false
      },
      { status: 500 }
    )
  }
}