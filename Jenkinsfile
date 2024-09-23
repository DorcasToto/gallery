
environment {
        SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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'
        RENDER_URL = 'https://gallery-pxpp.onrender.com'
        EMAIL_RECIPIENT = 'dorcas.cherono1@student.moringaschool.com'
    }

pipeline {
    agent any
    tools {
        nodejs 'node'
    }
    stages {
        stage('Check Node Version') {
            steps {
                sh 'node --version'
            }
        }
        stage('Clone Repository') {
            steps {  
                git(
                   url: "https://github.com/DorcasToto/gallery.git",
                   branch: "master"
                )
            }
        }
        stage('Install Node Packages') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                script {
                    def testFailed = false
                    try {
                        sh 'npm test'
                    } catch (Exception e) {
                        testFailed = true
                        currentBuild.result = 'FAILURE' // Mark build as failed
                        error("Tests failed!")
                    }
                }
            }
        }
        stage('Deploy to Render') {
            steps {
                withCredentials([string(credentialsId: 'Render-Hook', variable: 'GALLERY_DEPLOY')]) { 
                    sh """
                    curl -X POST "${GALLERY_DEPLOY}" 
                    """
                } 
            }
        }
        stage('Notify Slack') {
            steps {
                script {
                     if (currentBuild.result == 'SUCCESS') {
                        def message = """
                        {
                            "text": "Deployment Successful! :tada: \nBuild ID: ${env.BUILD_ID} \nView it here: ${RENDER_URL}"
                        }
                        """
                        sh "curl -X POST -H 'Content-type: application/json' --data '${message}' ${SLACK_WEBHOOK_URL}"
                    } else if (currentBuild.result == 'FAILURE') {
                        emailext subject: "Build #${env.BUILD_NUMBER} - Tests Failed",
                                body: """<p>Hi,</p>
                                         <p>The tests for Build #${env.BUILD_NUMBER} failed.</p>
                                         <p>Please check the Jenkins logs for more details.</p>""",
                                to: "${env.EMAIL_RECIPIENT}"
                    }
                }
            }
        }
    }
}


