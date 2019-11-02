# EC2 instance using CloudFormation, first save CF_Template.json to S3 bucket, 
# update: bucket,Key pair name, tag-name 
region 

#WINDOWS: use ^ (Shift + 6) 
#LINUX: use \ for line continuation.

1. aws cloudformation create-stack --stack-name CodeDeployDemoStack \
--template-url http://s3-us-east-1.amazonaws.com/cftemplates-armchairBitcoinist/CF_Template.json \
--parameters ParameterKey=InstanceCount,ParameterValue=1 \
ParameterKey=InstanceType,ParameterValue=t2.micro \
ParameterKey=KeyPairName,ParameterValue=armchairBitcoinist \
ParameterKey=OperatingSystem,ParameterValue=Linux \
ParameterKey=SSHLocation,ParameterValue=0.0.0.0/0 \
ParameterKey=TagKey,ParameterValue=Name \
ParameterKey=TagValue,ParameterValue=armchairBitcoinist \
--capabilities CAPABILITY_IAM

2) Verify Cloud Formation stack has completed  : 
aws cloudformation describe-stacks --stack-name CodeDeployDemoStack --query "Stacks[0].StackStatus" --output text

3) Log in to instance and check that the CodeDeploy agent has correctly installed:  
sudo service codedeploy-agent status

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