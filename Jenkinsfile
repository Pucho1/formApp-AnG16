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
            sh 'which git' // <-- Línea de diagnóstico
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
        withCredentials([string(credentialsId: 'Snik_credentials', variable: 'SNYK_TOKEN')]) {
          // snyk auth <tu_token> ----> Autentica Jenkins (el agente) con tu cuenta de Snyk usando tu token personal.
          // snyk test ----> Ejecuta un análisis de seguridad en el proyecto actual.
          sh '''
            npm install snyk --no-save
            npx snyk auth $SNYK_TOKEN
            npx snyk test
            npx snyk monitor
            npx snyk test --severity-threshold=high
          '''
        }
        // Alternativamente, si tienes el plugin de Snyk instalado en Jenkins y no falla, puedes usar:
        // snykSecurity(
        //     snykInstallation: 'Snyk_config',
        //     snykTokenId: 'Snik_credentials',
        //     // otros parámetros opcionales pueden ser añadidos aquí
        // )
      }
    }

    stage('Build Docker Image') {
        steps {
            script {
                docker.build("pucho1/form-app:${env.BUILD_NUMBER}")
                docker.build("pucho1/form-app:latest")
            }
        }
    }

    stage('Push Docker image') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerHub_credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          script {
            sh """
                echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                docker push $DOCKER_USER/form-app:${BUILD_NUMBER}
                docker push $DOCKER_USER/form-app:latest
            """
          }
        }
      }
    }

    stage('Trigger DigitalOcean Redeploy') {
      steps {
        withCredentials([string(credentialsId: 'Digital-Ocean-Key', variable: 'DO_TOKEN')]) {
          sh '''
            echo "🚀 Triggering redeploy on DigitalOcean..."
            curl -X POST \
              -H "Authorization: Bearer ${DO_TOKEN}" \
              -H "Content-Type: application/json" \
              "https://api.digitalocean.com/v2/apps/2f15fe79-e741-4419-a297-a72e55ef12e1/deployments"
          '''
        }
      }
    }

  }
}
