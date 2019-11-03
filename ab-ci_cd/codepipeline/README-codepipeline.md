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
6. Log in to instance and check that the CodeDeploy agent has correctly installed:  
sudo service codedeploy-agent status


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