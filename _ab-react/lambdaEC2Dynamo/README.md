# dynamodb & PHP
### SDK to create DynamoDB tables and populate them.
### The scripts intended to be run from an EC2 instance --must use EC2 service role allowing DynamoDB FullAccess
     
1. IAM-> service role -For EC2:  Dynamodb Full access
2. EC2=> security group inbound 22 + 80 port
3. EC2 -> use dd Role, 
4. paste text Script "EC2-PHP": (or make script.txt --> chmod +x script.txt --> ./script.txt)
		#!/bin/bash
		yum update -y
		yum install httpd php git -y
		service httpd start
		chkconfig httpd on
		cd /var/www/html
		echo "<?php phpinfo();?>" > test.php
		git clone https://github.com/thomasm1/dynamodbEC2.git
5. ssh -i armchair..pem ec2-user@xx.xx  
6.-in EC2::
    $ a) sudo su, b) ls, c) confirm installs,
7.in EC2::   (from html folder) ########### Install Composer and AWS SDK for PHP:
```sh
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "if (hash_file('sha384', 'composer-setup.php') === 'a5c698ffe4b8e849a443b120cd5ba38043260d5c4023dbf93e1558871f1f07f58274fc6f4c93bcfd858c6bd0775cd8d1') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
php composer-setup.php
php -r "unlink('composer-setup.php');"
```
8. in EC2:: 
```sh
php -d memory_limit=-1 composer.phar require aws/aws-sdk-php
```
9. go to:   http://3.85.162.192/dynamodbEC2/createtables.php
10. 
aws dynamodb get-item --table-name ProductCatalog --region us-east-1 --key '{"Id" : {"N":"205"}}'
### MEMORY PROBS?  enable swap  
/bin/dd if=/dev/zero of=/var/swap.1 bs=1M count=1024
/sbin/mkswap /var/swap.1
/sbin/swapon /var/swap.1
 
## armchair_users
array(
    'PutRequest' => array(
        'Item' => array(
            'id'  => array('S' => 'id'),
            'uid'              => array('S' => 'uid'),
            'username'     => array('S' => 'username'),
            'isActive'     => array('B' => 'isActive'),
            'firstname'           => array('S' => 'firstname'),
            'lastname'           => array('S' => 'lastname'),
            'dateOfBirth'           => array('S' => 'dateOfBirth'),
            'contactType'     => array('S' => 'contactType'),
            'phone'           => array('N' => 'phone'),
            'email'           => array('S' => 'email'),
            'userGroup'          => array('S' => 'userGroup'), 
            'photoPath' => array('S' => 'photoPath')
        )
    ),
),
## coin_portfolios
array(
    'PutRequest' => array(
        'Item' => array(
            'Id'              => array('S' => 'id'),
            'PortfolioId'     => array('S' => 'portfolioId'),
            'Username'        => array('S' => 'username'),
            'Lastname'        => array('S' => 'lastname'),
            'CoinPortfolio'   => array('S' => 'coinPortfolio'),
            'UserGroup'           => array('S' => '3'),
            'IsActive'           => array('B' => 'false'),
            'groupsAccess'          => array('SS' => array('2','3','5')), 
            'CoinPortfolio'    => array('SS' => array('BTC', 'ETH')) 
        )
    ),
),
### https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html


 
##########################################################
GET COMPOSER PHP    Windows Installer
```sh 
Download Composer Latest: v1.9.1
Windows Installer
The installer will download composer for you and set up your PATH environment variable so you can simply call composer from any directory.

Download and run Composer-Setup.exe - it will install the latest composer version whenever it is executed.

Command-line installation
To quickly install Composer in the current directory, run the following script in your terminal. To automate the installation, use the guide on installing Composer programmatically.
``` 
// his installer script will simply check some php.ini settings, warn you if they are set incorrectly, and then download the latest composer.phar in the current directory. The 4 lines above will, in order:
/*
Download the installer to the current directory
```sh
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "if (hash_file('sha384', 'composer-setup.php') === 'a5c698ffe4b8e849a443b120cd5ba38043260d5c4023dbf93e1558871f1f07f58274fc6f4c93bcfd858c6bd0775cd8d1') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
php composer-setup.php
php -r "unlink('composer-setup.php');"
```
Verify the installer SHA-384, which you can also cross-check here
Run the installer
Remove the installer
WARNING: Please do not redistribute the install code. It will change with every version of the installer. Instead, please link to this page or check how to install Composer programmatically.
*/
```

```sh
Installer Options
--install-dir
You can install composer to a specific directory by using the --install-dir option and providing a target directory. Example:

php composer-setup.php --install-dir=bin
--filename
You can specify the filename (default: composer.phar) using the --filename option. Example:

php composer-setup.php --filename=composer
--version
You can install composer to a specific release by using the --version option and providing a target release. Example:

php composer-setup.php --version=1.0.0-alpha8
Preview / Snapshot Releases
By default the installer and composer self-update will download stable versions only. If you would like to help test pre-release versions you can use the --preview flag on either installer or self-update. For snapshot builds which are done from the latest Composer commit, you can use the --snapshot flag.

Manual Download
If you prefer to download the phar manually, here are the available versions:


######################  ERRRORS BELOW   ##########################
https://getcomposer.org/doc/articles/troubleshooting.md#proc-open-fork-failed-errors

proc_open(): fork failed errors#
If composer shows proc_open() fork failed on some commands:

PHP Fatal error: Uncaught exception 'ErrorException' with message 'proc_open(): fork failed - Cannot allocate memory' in phar

This could be happening because the VPS runs out of memory and has no Swap space enabled.

free -m

total used free shared buffers cached
Mem: 2048 357 1690 0 0 237
-/+ buffers/cache: 119 1928
Swap: 0 0 0 
proc_open(): failed to open stream errors (Windows)#
If composer shows proc_open(NUL) errors on Windows:

proc_open(NUL): failed to open stream: No such file or directory

This could be happening because you are working in a OneDrive directory and using a version of PHP that does not support the file system semantics of this service. The issue was fixed in PHP 7.2.23 and 7.3.10.

Alternatively it could be because the Windows Null Service is not enabled. For more information, see this issue.