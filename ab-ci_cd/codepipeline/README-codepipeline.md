# EC2 instance using CloudFormation, first save CF_Template.json to S3 bucket, 
# update: bucket,Key pair name, tag-name, region 
# WINDOWS: use ^ (Shift + 6) 
# LINUX: use \ for line continuation. 
CodePipeline #1:
1. S3: upload cloudformation template
2. Add # CloudFormation Custom Policy for IAM & EC2, below
3. aws configure ... codedeploy-user; aws iam get-user; aws configure list
4. # CF create-stack
5. Verify cloudformation in progress:: 
aws cloudformation describe-stacks --stack-name armchairBitcoinistStack --query "Stacks[0].StackStatus" --output text
6. Make bucket armchairbitcoinist-codepipeline; *All versions must be in same bucket!!
------ec2-user@xx.xxx.xx.xx
7. Log in to instance and check that the CodeDeploy agent has correctly installed:  
sudo service codedeploy-agent status
-------console 
9. codedeploy: -->applicationss-->deployment groups-->create dg-->choose role-->env: ec2-instances
-->tag: find the appName: armchairBitcoinist -->uncheck load balancer ...create
10. codedeploy: -->deployments --.... create 

CodePipeline #2:
1. S3: upload v2 (same name)
2. CodePipeline: Create pipeline; let CP make new service role, then defaults
2b.  source provider bucket, name of file, amazon cloudwatchevent 
2c.  deploy provider: codedeploy

CodePipeline #3:
1. upload s3 version 3....
Donezo - automatic trigger!


FINALLY:: TERMINATE INSTANCE!! (make EBS snapshot & delete EBS Volume...)

# CF create-stack
aws cloudformation create-stack --stack-name armchairBitcoinistStack \
--template-url https://cftemplates-armchairbitcoinist.s3.amazonaws.com/CF-Template.json \
--parameters ParameterKey=InstanceCount,ParameterValue=1 \
ParameterKey=InstanceType,ParameterValue=t2.micro \
ParameterKey=KeyPairName,ParameterValue=armchairBitcoinist \
ParameterKey=OperatingSystem,ParameterValue=Linux \
ParameterKey=SSHLocation,ParameterValue=0.0.0.0/0 \
ParameterKey=TagKey,ParameterValue=Name \
ParameterKey=TagValue,ParameterValue=armchairBitcoinist \
--capabilities CAPABILITY_IAM
 
 

----------------------
# CloudFormation Custom Policy for IAM & EC2: 
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": "cloudformation:*",
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": "iam:*",
            "Resource": "*"
        },
        {
            "Action": "ec2:*",
            "Effect": "Allow",
            "Resource": "*"
        }
    ]
}
-------------------------
APPENDIX
<!-- -------------------------
Manual code deploy::::
---------
-------console-----
1. AMI:create service role for EC2 to access s3-FULLACCESS
2. AMI: ""                   for CodeDeploy to access EC2
3. EC2: MUST: TagName: k:AppName, v:armchairBitcoinist
3b. EC2: MUST: add http-80
4. ssh -i ~/.ssh/armchairBitcoinist.pem ec2-user@3.89.121.232

---------EC2--------
# CodeDeploy agent Installation on EC2 instance: (check region!!!)
sudo yum update
sudo yum install ruby
sudo yum install wget
cd /home/ec2-user
wget https://aws-codedeploy-us-east-1.s3.amazonaws.com/latest/install
# CodeDeploy agent Installation on EC2 instance:
chmod +x ./install  
sudo ./install auto   
sudo service codedeploy-agent status

--------console-----
1. IAM: make cd-user (with progr access); add codedeployFull + S3Full policies
2. S3: make codedeploy bucket to upload app.zip

------cli--------------
1. aws configure ... with codedeploy-user
2. aws deploy create-application --application-name armchairBitcoinist
3. ensure appfiles.zip in folder (appspec.yml, index + scripts/install.sh, start.sh, stop.sh)
#Create application.zip /load into CodeDeploy:
3. aws deploy push --application-name armchairBitcoinist --s3-location s3://armchairbitcoinist-cd/armchairBitcoinist.zip --ignore-hidden-files
4. ensure .zip in s3 bucket...

----console----
1. codedeploy->  apps-> deployment groups->create dg-- choose role
2. env: ec2-instances
3. tag: find the appName: armchairBitcoinist
4. uncheck load balancer
  
FINALLY:: TERMINATE INSTANCE!! (make EBS snapshot & delete EBS Volume...) -->

