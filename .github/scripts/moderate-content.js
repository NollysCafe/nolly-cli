import fetch from 'node-fetch'

const { PERSPECTIVE_API_KEY, PAYLOAD } = process.env

if (!PERSPECTIVE_API_KEY) {
	console.error('❌ Perspective API key is missing.')
	process.exit(1)
}

if (!PAYLOAD) {
	console.error('❌ GitHub event payload is missing.')
	process.exit(1)
}

// Parse the GitHub event payload
const eventPayload = JSON.parse(PAYLOAD)

// Extract the discussion content
const discussion = eventPayload?.discussion
if (!discussion || !discussion.body) {
	console.error('❌ Discussion body is not available in the event payload.')
	process.exit(1)
}

const content = discussion.body

// Predefined list of inappropriate words
const inappropriateWords = ['spam', 'harassment', 'abuse']

// Check against predefined word list
if (inappropriateWords.some((word) => content.toLowerCase().includes(word))) {
	console.error('❌ Inappropriate content detected based on word list.')
	process.exit(1)
}

// Use Perspective API to analyze toxicity
async function checkToxicity(text) {
	try {
		const response = await fetch(
			`https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${PERSPECTIVE_API_KEY}`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					comment: { text },
					languages: ['en'],
					requestedAttributes: { TOXICITY: {} },
				}),
			}
		)

		if (!response.ok) {
			console.error(`❌ Failed to call Perspective API: ${response.statusText}`)
			process.exit(1)
		}

		const responseData = await response.json()
		const toxicityScore = responseData.attributeScores.TOXICITY.summaryScore.value

		if (toxicityScore >= 0.8) {
			console.error('❌ Inappropriate content detected based on toxicity score.')
			process.exit(1)
		}

		console.log('✅ Content passed moderation.')
	} catch (error) {
		console.error(`❌ Error during moderation check: ${error.message}`)
		process.exit(1)
	}
}

checkToxicity(content)
