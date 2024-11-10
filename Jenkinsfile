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
        stage('Install Dependencies') {
            steps {
                parallel(
                    "Install Frontend Dependencies": {
                        dir(FRONTEND_DIR) {
                            sh 'npm install'
                        }
                    },
                    "Install Backend Dependencies": {
                        dir(BACKEND_DIR) {
                            sh 'npm install'
                        }
                    }
                )
            }
        }
        stage('Testing') {
            steps {
                dir(FRONTEND_DIR) {
                    sh 'npm test . --watchAll=false'
                }
            }
        }
        stage('Build Frontend') {
            steps {
                dir(FRONTEND_DIR) {
                    sh 'CI=false npm run build'
                    sh 'npx serve -s build -l 3000 &'
                }
            }
        }
        stage('Build Backend') {
            steps {
                dir(BACKEND_DIR) {
                    sh 'npm start &'
                }
            }
        }
    }
}
