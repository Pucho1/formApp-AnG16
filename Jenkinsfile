pipeline {
    agent any

    environment {
        REPO_URL = 'https://github.com/Pucho1/formApp-AnG16.git'
        SCANNER_SONAR = tool "SonarScanner"
        // NODE_ENV = "production"
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                git branch: 'main',
                credentialsId: 'GitCredentials',
                url: REPO_URL
            }
        }

        stage('Build') {
            steps {
                echo 'Building....'
                sh 'npm ci || npm install'
            }
        }

        stage('Test') {
            steps {
                echo 'Testing...'
                sh 'npm run test'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                echo 'Running SonarQube analysis...'
                withSonarQubeEnv('SonarQube') {
                    sh "${SCANNER_SONAR}/bin/sonar-scanner"
                }
            }
        }

        stage('Snyk Test') {
          steps {
            snykSecurity(
                snykInstallation: 'Snyk_config',
                snykTokenId: 'Snyk_Credential',
                // otros parámetros opcionales
            )
          }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying...'
            }
        }
    }
}
