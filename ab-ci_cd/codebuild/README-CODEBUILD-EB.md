## armchairBitcoinist-EB-Pipeline-Build
## armchairBitcoinist-EB-Pipeline-Build:2412dcbf-37d2-4c38-8a7b-84749adef8e4
### CODEBUILD CONFIG
#### NAME: armchairBitcoinist-EB-Pipeline-Build
#### DESC: going to test for: PRODUCTION VERSION - 2 with load balancers/auto-scaling/4 instances
#### SOURCE: CodeCommit
#### REPO: armchair-bitcoinist-repo
#### ENV: AWS-Managed Docker Image
#### OS: Ubuntu
#### Runtime: Standard
#### IMAGE: standard 2.0
#### TIMEOUT: not 1 hour, set for 5 mins
#### LOGS: CloudWatch, not S3
#### Finally: Add BuildSpec.yaml 
* -- test by running grep -Fq "Armchair" index.html

### CodePipeline
* Stage 2: Build > CodeBuild
    + Action Grp: TestForArmchairString
        1. Artifact: Source ARtifact: 
        2. Ouput Artifact: OutputOfTest