pipeline {
  agent any

  environment {
      REPO_URL = 'https://github.com/Pucho1/formApp-AnG16.git'
      SCANNER_SONAR = tool "SonarScanner"
      // NODE_ENV = "production"
  }




  stages {
    stage('Clean Workspace') {
      steps {
          echo 'Cleaning up the workspace to ensure a fresh start...'
          // Borra todo el contenido del workspace.
          // Esto fuerza un 'git clone' limpio, eliminando problemas de permisos.
          deleteDir()
      }
    }
    stage('Fix Git Context') {
      steps {
          dir("${env.WORKSPACE}") {
              sh 'git rev-parse --is-inside-work-tree'
          }
      }
    }
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
                docker.build("mi-app:${env.BUILD_NUMBER}")
            }
        }
    }
  }
}
