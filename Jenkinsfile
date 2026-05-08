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
                echo 'Deploying Application with Docker Compose...'
                // Menggunakan docker compose untuk menjalankan container di background
                sh 'docker compose down'
                sh 'docker compose up -d'
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
