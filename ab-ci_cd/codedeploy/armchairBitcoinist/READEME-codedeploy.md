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
1. codedeploy--> apps--> deployment groups-->create dg--> choose role
1. env: ec2-instances
2. tag: find the appName: armchairBitcoinist
3. uncheck load balancer
  
FINALLY:: TERMINATE INSTANCE!! (make EBS snapshot & delete EBS Volume...)

