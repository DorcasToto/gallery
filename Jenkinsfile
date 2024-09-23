pipeline {
    agent any
    tools {
        nodejs 'node'
    }
    stages {
        stage ('Check Node Version'){
            steps {
                sh 'node --version'
            }
        }
        stage ('Clone Repository'){
            steps {  
                git(
                   url: "https://github.com/DorcasToto/gallery.git",
                   branch: "master"
               )

            }
        }
        stage('Install node packages'){
            steps{
                sh 'npm install'

           }
       }

        stage('Run Tests') {
            steps {
                script {
                    try {
                        sh 'npm test'
                    } catch (Exception e) {
                        TEST_FAILED = true
                        error("Tests failed!")
                    }
                }
            }
        }
        stage('Deploy to Render') {
            steps {
                withCredentials([string(credentialsId: 'Render-Hook', variable: 'GALLERY_DEPLOY')]) {
                    sh """
                    curl -X POST ${GALLERY_DEPLOY}
                    """
                } 
            }
    }
}

