pipeline {
    agent any
    environment {
        FRONTEND_DIR = 'vitacocina'
        BACKEND_DIR = '.'
        GITHUB_REPO = 'https://github.com/Equipo3INF331S2/VitaCocina.git'
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: "${GITHUB_REPO}"
            }
        }
        stage('Build Frontend') {
            steps {
                dir(FRONTEND_DIR) {
                    sh 'npm install'
                    sh 'npm start'
                }
            }
        }
        stage('Build Backend') {
            steps {
                dir(BACKEND_DIR) {
                    sh 'npm install'
                    sh 'npm start'
                }
            }
        }
    }
}
