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
                sh 'npm install mongodb'
                sh 'npm install -g webpack'
           }
       }
       stage('Build') {
            steps {
                echo 'Running the build...'
                sh 'npm run build'
            }
       }
        stage('Deploy to Heroku'){
            steps{
                withCredentials([usernameColonPassword(credentialsId: '46a17513-9c50-4c1e-aaae-fbd37c40a96b', variable: 'HEROKU_CREDENTIALS')]) {
                sh 'git push https://${HEROKU_CREDENTIALS}@git.heroku.com/gallercluster.git master' }
           }
       }
    }
}

