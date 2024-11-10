def COLOR_MAP = [
    'SUCCESS': 'good',
    'FAILURE': 'danger'
]

def getBuildTrigger() {
    def userCause = currentBuild.rawBuild.getCause(hudson.model.Cause.UserIdCause)
    def scmCause = currentBuild.rawBuild.getCause(hudson.model.Cause.SCMTriggerCause)

    if (userCause) {
        return "manual by ${userCause.getUserId()}"
    } else if (scmCause) {
        return "due to a push to GitHub"
    } else {
        return "by another cause"
    }
}

pipeline {
    agent any
    environment {
        FRONTEND_DIR = 'vitacocina'
        BACKEND_DIR = '.'
        GITHUB_REPO = 'https://github.com/Equipo3INF331S2/VitaCocina.git'
        BUILD_TRIGGER = ''
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
                    sh 'nohup npx serve -s build -l 3000 > frontend.log 2>&1 &'
                }
            }
        }
        stage('Build Backend') {
            steps {
                dir(BACKEND_DIR) {
                    sh 'nohup npm start > backend.log 2>&1 &'
                }
            }
        }
    }

    post {
        always {
            script {
                BUILD_TRIGGER = getBuildTrigger()
            }

            slackSend(
                channel: 'bots',
                color: COLOR_MAP[currentBuild.currentResult],
                message: "*${currentBuild.currentResult}:* job ${env.JOB_NAME} build ${env.BUILD_NUMBER} triggered ${BUILD_TRIGGER}"
            )
        }
    }
}
