from flask import Flask, render_template, jsonify

app = Flask(__name__)

# Portfolio data based on resume
portfolio_data = {
    'name': 'Janagam Bharath',
    'title': 'Aspiring Software Developer',
    'location': 'Hyderabad, Telangana',
    'phone': '+91-7995854994',
    'email': 'janagambharath1107@gmail.com',
    'github': 'https://github.com/janagambharath',
    'linkedin': 'https://www.linkedin.com/in/janagam-bharath-9ab1b235b/',
    
    'about': {
        'education': 'Diploma in Electronics and Communication Engineering at Annamacharya Institute of Technology',
        'current_status': 'Currently in 6th Semester, planning to transition into B.Tech CSE via ECET',
        'objective': 'Passionate and highly motivated aspiring software developer with strong programming skills, committed to building real-world applications and securing a developer role in a top-tier tech company.'
    },
    
    'skills': {
        'programming': ['C', 'Java', 'Python'],
        'web': ['HTML', 'Flask', 'Java Spring Boot'],
        'data_structures': ['Arrays', 'Searching', 'Sorting', 'Recursion', 'OOP'],
        'tools': ['Termux', 'AIDE (Android)', 'VS Code', 'Git & GitHub'],
        'os': ['Windows', 'Android']
    },
    
    'projects': [
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
            'language': 'Java',
            'description': 'Console game using random number generation',
            'tech_stack': ['Java', 'Random Generation', 'Game Logic']
        },
        {
            'name': 'Digital Clock',
            'language': 'Java',
            'description': 'Displays current time in digital format',
            'tech_stack': ['Java', 'Time API', 'GUI']
        },
        {
            'name': 'Calculator',
            'language': 'Java',
            'description': 'Performs basic arithmetic operations',
            'tech_stack': ['Java', 'Mathematical Operations', 'UI']
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

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
