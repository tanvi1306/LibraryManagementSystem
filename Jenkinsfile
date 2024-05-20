pipeline {
	agent any
	tools {
		maven 'maven'
	      }
	stages {
		
        stage('Git Pull') {
            steps {
                // git credentialsId: 'e261986b-ee1d-4dda-bb39-a1e2cd880ebf', url: 'https://github.com/nikki00011/SPE-MAJORPROJECT.git\'
		checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[credentialsId: 'e261986b-ee1d-4dda-bb39-a1e2cd880ebf', url: 'https://github.com/nikki00011/SPE-MAJORPROJECT.git']])
                  }
         }
		stage('Frontend Build') {
            steps {
                dir('./frontend') {
			sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        stage('Maven Build') {
            steps {
                dir('./Backend') {
                    sh 'mvn clean install -DskipTests'
                }
            }
        }
        
        stage('Build Docker Image') {
    		steps {
        
		        dir('./frontend') {
		            sh 'docker build -t nikki00011/libmntsys-frontend .'
		        }
			dir('./Backend') {
			    sh 'docker build -t nikki00011/libmntsys-backend .'
			}
                      }
         }

        stage('Push Image to Hub') {
	    steps {
		script {
		    withCredentials([string(credentialsId: 'dockerspe', variable: 'dockerspe')]) {
			sh "docker login -u nikki00011 -p ${dockerspe}"
		    }
		    
		    sh 'docker push nikki00011/libmntsys-frontend'
			// sh 'docker push nikki00011/libmntsys-backend'
		       }
                }
	}
	// stage('Ansible Pull & Deploy') {
 //            steps {
 //               ansiblePlaybook colorized: true, disableHostKeyChecking: true, installation: 'Ansible', inventory: 'deploy-docker/inventory', playbook: 'deploy-docker/libSys-deploy.yml'
 //            }
 //        }
	}
}
