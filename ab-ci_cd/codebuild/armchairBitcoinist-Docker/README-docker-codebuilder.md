I. connect to codecommit repo for local clone: Credential Helper
git config --global credential.helper '!aws codecommit credential-helper $@'
git config --global credential.UseHttpPath true

II.
git clone https://git-codecommit.us-east-1.amazonaws.com/v1/repos/armchairbitcoinistrepo
 
 