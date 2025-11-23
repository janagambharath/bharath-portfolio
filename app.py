from flask import Flask, render_template, jsonify
import os

app = Flask(__name__)

# Updated portfolio data based on your actual resume
portfolio_data = {
    'name': 'Janagam Bharath',
    'title': 'AI / LLM Engineer · NLP & Flask Developer',
    'location': 'Hyderabad, India',
    'phone': '',
    'email': 'janagambharath1107@gmail.com',
    'github': 'https://github.com/janagambharath',
    'linkedin': 'https://www.linkedin.com/in/janagam-bharath-9ab1b235b/',
    'portfolio': 'https://janagambharath.github.io',
    'bharath_ai': 'https://bharathai.onrender.com',
    'youtube': 'https://youtube.com/@Bharath-ai',
    
    'about': {
        'education': 'Diploma in Electronics & Communication (ECE), 3rd Year',
        'current_status': 'Planning to pursue B.Tech in CSE via ECET',
        'summary': 'Ambitious AI / LLM Engineer skilled in developing, fine-tuning, and deploying real-world NLP and RAG systems. Experienced in integrating Hugging Face models, building Flask backends, and deploying AI applications on Render and Hugging Face Spaces. Strong foundation in vector databases, embeddings, text processing, and chatbot systems.',
        'achievement': 'Developed and deployed three live AI applications before turning 18, demonstrating practical expertise in modern AI technologies.'
    },
    
    'skills': {
        'languages': ['Python', 'C'],
        'ai_ml': ['Hugging Face', 'PyTorch', 'TensorFlow'],
        'web': ['Flask', 'HTML', 'CSS', 'JavaScript'],
        'nlp': ['RAG', 'Vector DB', 'Embeddings', 'TF-IDF', 'Tokenization'],
        'deployment': ['Render', 'Hugging Face Spaces'],
        'tools': ['Google Colab', 'VS Code', 'Git', 'Postman']
    },
    
    'projects': [
        {
            'name': 'Rythu AI - Crop Disease Detection System',
            'language': 'Python',
            'category': 'AI',
            'description': 'Built smart AI tool that detects crop diseases from leaf images using deep learning (MobileNet) and provides actionable farming advice.',
            'tech_stack': ['Python', 'MobileNet', 'Deep Learning', 'Flask', 'Hugging Face Spaces'],
            'live_demo': 'https://bharath1108-rythuai.hf.space',
            'features': ['Image Classification', 'Real-time Detection', 'Farming Advice', 'Deployed on HF Spaces']
        },
        {
            'name': 'Memory to Lyrics Generator',
            'language': 'Python',
            'category': 'AI',
            'description': 'Generates song lyrics from personal memories or emotions in Telugu, Hindi, and English using text-generation models.',
            'tech_stack': ['Python', 'NLP', 'Text Generation', 'Flask', 'Hugging Face'],
            'live_demo': 'https://memory-to-lyrics.onrender.com',
            'features': ['Multilingual Support', 'Creative Text Synthesis', 'LLM Integration', 'Flask Integration']
        },
        {
            'name': 'Bharath AI - Portfolio Chatbot',
            'language': 'Python',
            'category': 'AI',
            'description': 'AI-powered portfolio chatbot that introduces projects, answers questions, and simulates an interactive resume.',
            'tech_stack': ['Python', 'Flask', 'Hugging Face API', 'Prompt Engineering', 'Render'],
            'live_demo': 'https://bharathai.onrender.com',
            'features': ['Interactive Resume', 'Project Showcase', 'Real-time Responses', 'Chatbot Workflow']
        },
        {
            'name': 'Flask Portfolio Website',
            'language': 'Python',
            'category': 'Web',
            'description': 'Dark-themed, modern personal portfolio featuring project showcase, resume download, and smooth animations.',
            'tech_stack': ['Python', 'Flask', 'HTML', 'CSS', 'JavaScript', 'Render'],
            'live_demo': 'https://janagambharath.onrender.com',
            'features': ['Responsive Design', 'Smooth Animations', 'Mobile Optimization', 'Project Showcase']
        }
    ],
    
    'achievements': [
        'Developed and deployed 3 live AI applications before turning 18',
        'Created "Bharath AI" YouTube channel teaching AI and LLM concepts',
        'Former gaming YouTuber with video editing expertise',
        'Specialized in Generative AI, LLM architectures, and AI-based creativity tools'
    ],
    
    'learning': [
        'NLP Fundamentals: TF-IDF, Word Embeddings, Tokenization, RAG, Vector Databases',
        'DSA in C: Arrays, recursion, sorting, linked lists',
        'Self-learning: Fine-tuning, embedding-based retrieval, chatbot development'
    ],
    
    'strengths': [
        'Strong foundation in modern AI technologies',
        'Practical expertise in deploying AI applications',
        'Fast learner with self-driven motivation',
        'Clear goals and strong work ethic',
        'Project-based learner with hands-on experience'
    ]
}

@app.route('/')
def home():
    return render_template('index.html', data=portfolio_data)

@app.route('/api/projects')
def get_projects():
    return jsonify(portfolio_data['projects'])

@app.route('/api/skills')
def get_skills():
    return jsonify(portfolio_data['skills'])

if __name__ == '__main__':
    # Get port from environment variable for Render deployment
    # If PORT is not set (local development), default to 5000
    port = int(os.environ.get('PORT', 5000))
    
    # Bind to 0.0.0.0 to make the server accessible externally
    # debug=False for production deployment
    app.run(host='0.0.0.0', port=port, debug=False)
