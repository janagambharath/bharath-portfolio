from flask import Flask, render_template, jsonify
import os

app = Flask(__name__)

# Portfolio data based on resume
portfolio_data = {
    'name': 'Bharath',
    'title': 'Aspiring LLM Engineer',
    'location': 'Hyderabad, Telangana',
    'phone': '',
    'email': 'janagambharath1107@gmail.com',
    'github': 'https://github.com/janagambharath',
    'linkedin': 'https://www.linkedin.com/in/janagam-bharath-9ab1b235b/',
    'bharath_ai': 'https://bharathai.onrender.com',
    
    'about': {
        'education': 'Diploma in ECE',
        'current_status': '',
        'objective': 'Aspiring LLM Engineer and AI Developer with a strong foundation in Python, Flask, C, combined with hands-on experience in web development, chatbot creation, and creative problem-solving. Passionate about building AI-driven applications and scalable solutions by leveraging LLMs, APIs, and modern development tools. Dedicated to continuous learning, contributing to innovative projects, and growing into a full-stack AI engineer capable of delivering impactful solutions to real-world challenges.'
    },
    
    'skills': {
        'programming': ['C', 'Python'],
        'web': ['HTML', 'Flask', 'CSS'],
        'data_structures': ['Arrays', 'Searching', 'Sorting', 'Recursion', 'OOP'],
        'tools': ['Termux', 'AIDE (Android)', 'VS Code', 'Git & GitHub'],
        'os': ['Windows', 'Android']
    },
    
    'projects': [
        {
            'name': 'Bharath AI',
            'language': 'Python',
            'description': 'It is Bharath\'s personal portfolio assistant and AI.',
            'tech_stack': ['Python', 'Flask', 'DeepSeek AI', 'Render', 'JSON', 'API']
        },
        {
            'name': 'Billing System',
            'language': 'C',
            'description': 'Manages item entry, price calculation, and total billing.',
            'tech_stack': ['C', 'Console Application']
        },
        {
            'name': 'Banking System',
            'language': 'Java',
            'description': 'Basic banking operations using switch-case logic.',
            'tech_stack': ['Java', 'OOP', 'Console Application']
        },
        {
            'name': 'Number Guessing Game',
            'language': 'Python',
            'description': 'Console game using random number generation.',
            'tech_stack': ['Python', 'Random Generation', 'Game Logic']
        },
        {
            'name': 'Digital Clock',
            'language': 'Python',
            'description': 'Displays current time in digital format.',
            'tech_stack': ['Python', 'Time API', 'GUI']
        },
        {
            'name': 'Calculator',
            'language': 'Python',
            'description': 'Performs basic arithmetic operations.',
            'tech_stack': ['Python', 'Mathematical Operations', 'UI']
        }
    ],
    
    'strengths': [
        'Project-based learner with practical understanding',
        'Strong discipline (no social media distractions)',
        'Fast learner with self-driven motivation',
        'Clear goals and strong work ethic'
    ]
}

@app.route('/')
def home():
    return render_template('index.html', data=portfolio_data)

@app.route('/api/projects')
def get_projects():
    return jsonify(portfolio_data['projects'])

if __name__ == '__main__':
    app.run(debug=True)
