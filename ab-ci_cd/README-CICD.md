## armchair-bitcoinist-repo

# CodePipeline:
* Stage 1: Source > CodeCommit  
    + Action Grp: armchair-bitcoinist-repo
    + git config --global credential.helper '!aws codecommit credential-helper $@'
    + git config --global credential.useHttpPath true
    + git clone https://git-codecommit.us-east-1.amazonaws.com/v1/repos/xyz-repo
* Stage 2: Build > CodeBuild
    + Action Grp: TestForArmchairString
        1. Artifact: Source ARtifact: 
        2. Ouput Artifact: OutputOfTest
* Stage 3: Deploy: Elastic Beanstalk  
    + Action Grp: Armchairbitcoinist2Beanstalk-env
    + http://armchairbitcoinist2beanstalk-env.gy33275zez.us-east-1.elasticbeanstalk.com./
* Stage 4: Deploy-to-Prod
    + Action Grp: Manual Approval
    + ACtion Grp: DeployTo > Armchairbitcoinist2Beanstalk-production
    1. http://armchairbitcoinist2beanstalk-production.us-east-1.elasticbeanstalk.com/
    
### RESOURCES
0. https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/tutorials.html
1. AWS Elastic Beanstalk overview
2. AWS Elastic Beanstalk concepts
3. Deploy an Express Application to AWS Elastic Beanstalk
4. Deploy an Express Application with Amazon ElastiCache to AWS Elastic Beanstalk
5. Deploy a Geddy Application with Amazon ElastiCache to AWS Elastic Beanstalk
6. Customizing and Configuring a Node.js Container
7. Working with Logs

