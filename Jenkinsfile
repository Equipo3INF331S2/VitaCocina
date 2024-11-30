def COLOR_MAP = [
    'SUCCESS': 'good',
    'FAILURE': 'danger'
]

pipeline {
    agent any
    environment {
        FRONTEND_DIR = 'vitacocina'
        SELENIUM_TEST_DIR = 'vitacocina/test'
        BACKEND_DIR = '.'
        GITHUB_REPO = 'https://github.com/Equipo3INF331S2/VitaCocina.git'
        BUILD_TRIGGER = ''
        CAUSE = "${currentBuild.getBuildCauses()[0].shortDescription}"
        DISPLAY = ':99' // Necesario para ejecutar Chrome sin un servidor gráfico
        PATH = "$PATH:/usr/local/bin" // Incluye la ruta de ChromeDriver
        XDG_RUNTIME_DIR = 'tmp/runtime-jenkins' // Necesario para Chrome en Jenkins
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
                    sh 'lsof -ti:3000 | xargs kill -9 || true'
                    sh 'CI=false npm run build'
                    sh 'JENKINS_NODE_COOKIE=dontKillMe nohup npx serve -s build -l 3000 > frontend.log 2>&1 &'
                }
            }
        }
        stage('Build Backend') {
            steps {
                dir(BACKEND_DIR) {
                    sh 'lsof -ti:5000 | xargs kill -9 || true'
                    sh 'JENKINS_NODE_COOKIE=dontKillMe nohup npm start > backend.log 2>&1 &'
                }
            }
        }
        stage('Selenium Testing') {
            steps {
                dir(SELENIUM_TEST_DIR) {
                    sh 'npm cache clean --force'
                    sh 'node testsRunner.js'
                }
            }
        }
    }

    post {
        always {
            slackSend(
                channel: 'bots',
                color: COLOR_MAP[currentBuild.currentResult],
                message: "*${currentBuild.currentResult}:* job ${env.JOB_NAME} build ${env.BUILD_NUMBER} \n ${CAUSE}"
            )
        }
    }
}
