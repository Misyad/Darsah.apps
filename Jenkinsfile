pipeline {
    agent any

    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
        APP_NAME = 'islamic-super-app'
    }

    stages {
        stage('Checkout') {
            steps {
                // Jenkins biasanya melakukan checkout otomatis jika dikoneksikan ke Git
                echo 'Checking out source code...'
            }
        }

        stage('Build & Test Backend') {
            steps {
                dir('islamic-super-app-backend') {
                    echo 'Building Backend Image...'
                    sh 'docker build -t ${APP_NAME}-backend:latest .'
                }
            }
        }

        stage('Build & Test Frontend') {
            steps {
                dir('darsah-apps') {
                    echo 'Building Frontend Image...'
                    sh 'docker build -t ${APP_NAME}-frontend:latest .'
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying Application...'
                sh '''
                    if command -v docker-compose >/dev/null 2>&1; then
                        echo "Using docker-compose (V1)"
                        docker-compose down || true
                        docker-compose up -d
                    elif docker compose version >/dev/null 2>&1; then
                        echo "Using docker compose (V2)"
                        docker compose down || true
                        docker compose up -d
                    else
                        echo "WARNING: Docker Compose not found. Falling back to manual docker run..."
                        docker stop ${APP_NAME}-backend ${APP_NAME}-frontend || true
                        docker rm ${APP_NAME}-backend ${APP_NAME}-frontend || true
                        docker run -d --name ${APP_NAME}-backend -p 4001:3000 ${APP_NAME}-backend:latest
                        docker run -d --name ${APP_NAME}-frontend -p 80:80 ${APP_NAME}-frontend:latest
                    fi
                '''
            }
        }
    }

    post {
        always {
            echo 'Cleaning up workspace...'
            // Opsional: Hapus image lama yang tidak terpakai
            sh 'docker image prune -f'
        }
        success {
            echo 'Deployment Successful!'
        }
        failure {
            echo 'Deployment Failed. Please check logs.'
        }
    }
}
