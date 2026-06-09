export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                access_key: process.env.WEB3FORMS_ACCESS_KEY,
                name,
                email,
                subject,
                message
            })
        });

        const data = await response.json();

        if (data.success) {
            return res.status(200).json({ success: true });
        } else {
            return res.status(500).json({ error: 'Failed to send message' });
        }
    } catch (err) {
        return res.status(500).json({ error: 'Network error' });
    }
}
