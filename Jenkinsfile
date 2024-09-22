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
    //     stage('Deploy to Heroku'){
    //         steps{
    //             withCredentials([usernameColonPassword(credentialsId: '46a17513-9c50-4c1e-aaae-fbd37c40a96b', variable: 'HEROKU_CREDENTIALS')]) {
    //             sh 'git push https://${HEROKU_CREDENTIALS}@git.heroku.com/gallercluster.git master' }
    //        }
    //    }

        stage('Deploy to Render') {
            steps {
                script {
                    // Make sure you replace `your-render-service-id` with the Render service ID you want to deploy to.
                    sh """
                    curl -X POST "https://api.render.com/v1/services/your-render-service-id/deploys" \
                    -H "Authorization: Bearer ${RENDER_API_TOKEN}" \
                    -H "Content-Type: application/json" \
                    -d '{}'
                    """
                }
            }
        }
    }
}

