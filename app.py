from flask import Flask, render_template, jsonify
import os

app = Flask(__name__)

# Portfolio data based on resume
portfolio_data = {
    'name': 'Bharath',
    'title': 'Aspiring LLM Engineer',
    'location': 'Hyderabad,Telangana',
    'phone': '',
    'email': 'janagambharath1107@gmail.com',
    'github': 'https://github.com/janagambharath',
    'linkedin': 'https://www.linkedin.com/in/janagam-bharath-9ab1b235b/',
    'bharath_ai': 'https://bharathai.onrender.com',
    
    'about': {
        'education': 'Diploma in ECE',
        'current_status': '',
        'objective': 'Aspiring LLM Engineer and AI App Developer with a strong foundation in Python, Flask, and J, combined with hands-on experience in web development and creative video editing. Passionate about building intelligent applications using LLMs, APIs, and modern AI tools to solve real-world problems. Eager to contribute to innovative tech teams, continuously learn, and grow into a full-stack AI developer to build impactful and scalable AI-driven solutions.'
    },
    
    'skills': {
        'programming': ['C', , 'Python'],
        'web': ['HTML', 'Flask', 'CSS'],
        'data_structures': ['Arrays', 'Searching', 'Sorting', 'Recursion', 'OOP'],
        'tools': ['Termux', 'AIDE (Android)', 'VS Code', 'Git & GitHub'],
        'os': ['Windows', 'Android']
    },
    
    'projects': [
        {
            'name':'Bharath Ai',
            'language':'Python',
            'description':'It is Bharath's personal portfolio assistance and Ai',
            'tech_stack':['Python','Flask','Deepsake Ai','Render','Json','Api']
        {
            'name': 'Billing System',
            'language': 'C',
            'description': 'Manages item entry, price calculation, and total billing',
            'tech_stack': ['C', 'Console Application']
        },
        {
            'name': 'Banking System',
            'language': 'Java',
            'description': 'Basic banking operations using switch-case logic',
            'tech_stack': ['Java', 'OOP', 'Console Application']
        },
        {
            'name': 'Number Guessing Game',
            'language': 'Python',
            'description': 'Console game using random number generation',
            'tech_stack': ['python', 'Random Generation', 'Game Logic']
        },
        {
            'name': 'Digital Clock',
            'language': 'Python',
            'description': 'Displays current time in digital format',
            'tech_stack': ['Python', 'Time API', 'GUI']
        },
        {
            'name': 'Calculator',
            'language': 'Python',
            'description': 'Performs basic arithmetic operations',
            'tech_stack': ['python', 'Mathematical Operations', 'UI']
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

@app.route('/api/skills')
def get_skills():
    return jsonify(portfolio_data['skills'])

@app.route('/api/contact')
def get_contact():
    contact_info = {
        'phone': portfolio_data['phone'],
        'email': portfolio_data['email'],
        'github': portfolio_data['github'],
        'linkedin': portfolio_data['linkedin'],
        'location': portfolio_data['location']
    }
    return jsonify(contact_info)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=False, host='0.0.0.0', port=port)
