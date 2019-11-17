<?php

    // Date to be set 

    //date_default_timezone_set('    America/Albuquerque');
    date_default_timezone_set('    America/Denver');


    // Find out what the issues are:
    ini_set('display_errors',1);
    ini_set('display_startup_errors',1);
    error_reporting(-1);

    require '/var/www/html/vendor/autoload.php';
    use Aws\DynamoDb\DynamoDbClient;

    $client = DynamoDbClient::factory(array( 
        'region' => 'us-east-1',  //       Variable region 
        'version' => '2012-08-10' // Now needs a version
    ));

    # Setup local variables for dates

    date_default_timezone_set('UTC');

    $oneDayAgo = date('Y-m-d H:i:s', strtotime('-1 days'));
    $sevenDaysAgo = date('Y-m-d H:i:s', strtotime('-7 days'));
    $fourteenDaysAgo = date('Y-m-d H:i:s', strtotime('-14 days'));
    $twentyOneDaysAgo = date('Y-m-d H:i:s', strtotime('-21 days'));

    $tableName = 'ArmchairPortfolio';
    echo "Adding data to the $tableName table..." . PHP_EOL;

    $response = $client->batchWriteItem(array(
        'RequestItems' => array(
            $tableName => array( 
                array(
                    'PutRequest' => array(
                        'Item' => array(
                            'Id'              => array('S' => '11'),
                            'Uid'              => array('S' => 'ui3d'),
                            'Username'     => array('S' => 'user11'),
                            'IsActive'     => array('B' => 'isActive'),
                            'Firstname'           => array('S' => 'firstname'),
                            'Lastname'           => array('S' => 'lastname'),
                            'DateOfBirth'           => array('S' => 'dateOfBirth'),
                            'ContactType'     => array('S' => 'contactType'),
                            'Phone'           => array('N' => 'phone'),
                            'Email'           => array('S' => 'email'),
                            'UserGroup'          => array('S' => 'userGroup'), 
                            'PhotoPath' => array('S' => 'photoPath')
                        )
                    ),
                ),
                array(
                    'PutRequest' => array(
                        'Item' => array(
                            'Id'              => array('S' => '12'),
                            'Uid'              => array('S' => 'u3id'),
                            'Username'     => array('S' => 'user12'),
                            'IsActive'     => array('B' => 'isActive'),
                            'Firstname'           => array('S' => 'firstname'),
                            'Lastname'           => array('S' => 'lastname'),
                            'DateOfBirth'           => array('S' => 'dateOfBirth'),
                            'ContactType'     => array('S' => 'contactType'),
                            'Phone'           => array('N' => 'phone'),
                            'Email'           => array('S' => 'email'),
                            'UserGroup'          => array('S' => 'userGroup'), 
                            'PhotoPath' => array('S' => 'photoPath')
                        )
                    ),
                ),
                array(
                    'PutRequest' => array(
                        'Item' => array(
                            'Id'              => array('S' => '13'),
                            'Uid'              => array('S' => 'ui3d'),
                            'Username'     => array('S' => 'user13'),
                            'IsActive'     => array('B' => 'isActive'),
                            'Firstname'           => array('S' => 'firstname'),
                            'Lastname'           => array('S' => 'lastname'),
                            'DateOfBirth'           => array('S' => 'dateOfBirth'),
                            'ContactType'     => array('S' => 'contactType'),
                            'Phone'           => array('N' => 'phone'),
                            'Email'           => array('S' => 'email'),
                            'UserGroup'          => array('S' => 'userGroup'), 
                            'PhotoPath' => array('S' => 'photoPath')
                        )
                    ),
                ),
                array(
                    'PutRequest' => array(
                        'Item' => array(
                            'Id'              => array('S' => '14'),
                            'Uid'              => array('S' => 'ui4d'),
                            'Username'     => array('S' => 'user14'),
                            'IsActive'     => array('B' => 'isActive'),
                            'Firstname'           => array('S' => 'firstname'),
                            'Lastname'           => array('S' => 'lastname'),
                            'DateOfBirth'           => array('S' => 'dateOfBirth'),
                            'ContactType'     => array('S' => 'contactType'),
                            'Phone'           => array('N' => 'phone'),
                            'Email'           => array('S' => 'email'),
                            'UserGroup'          => array('S' => 'userGroup'), 
                            'PhotoPath' => array('S' => 'photoPath')
                        )
                    ),
                ),
            ),
        ),
    ));

    echo "done." . PHP_EOL;



    $tableName = 'Forum';
    echo "Adding data to the $tableName table..." . PHP_EOL;

    $response = $client->batchWriteItem(array(
        'RequestItems' => array(
            $tableName => array(
                array(
                    'PutRequest' => array(
                        'Item' => array(
                            'Name'     => array('S' => 'Amazon DynamoDB'),
                            'Category' => array('S' => 'Amazon Web Services'),
                            'Threads'  => array('N' => '0'),
                            'Messages' => array('N' => '0'),
                            'Views'    => array('N' => '1000')
                        )
                    )
                ),
                array(
                    'PutRequest' => array(
                        'Item' => array(
                            'Name'     => array('S' => 'Amazon S3'),
                            'Category' => array('S' => 'Amazon Web Services'),
                            'Threads'  => array('N' => '0')
                        )
                    )
                ),
            )
        )
    ));

    echo "done." . PHP_EOL;


    $tableName = 'Reply';
    echo "Adding data to the $tableName table..." . PHP_EOL;

    $response = $client->batchWriteItem(array(
        'RequestItems' => array(
            $tableName => array(
                array(
                    'PutRequest' => array(
                        'Item' => array(
                            'Id'            => array('S' => 'Amazon DynamoDB#DynamoDB Thread 1'),
                            'ReplyDateTime' => array('S' => $fourteenDaysAgo),
                            'Message'       => array('S' => 'DynamoDB Thread 1 Reply 2 text'),
                            'PostedBy'      => array('S' => 'User B')
                        )
                    )
                ),
                array(
                    'PutRequest' => array(
                        'Item' => array(
                            'Id'            => array('S' => 'Amazon DynamoDB#DynamoDB Thread 2'),
                            'ReplyDateTime' => array('S' => $twentyOneDaysAgo),
                            'Message'       => array('S' => 'DynamoDB Thread 2 Reply 3 text'),
                            'PostedBy'      => array('S' => 'User B')
                        )
                    )
                ),
                array(
                    'PutRequest' => array(
                        'Item' => array(
                            'Id'            => array('S' => 'Amazon DynamoDB#DynamoDB Thread 2'),
                            'ReplyDateTime' => array('S' => $sevenDaysAgo),
                            'Message'       => array('S' => 'DynamoDB Thread 2 Reply 2 text'),
                            'PostedBy'      => array('S' => 'User A')
                        )
                    )
                ),
                array(
                    'PutRequest' => array(
                        'Item' => array(
                            'Id'            => array('S' => 'Amazon DynamoDB#DynamoDB Thread 2'),
                            'ReplyDateTime' => array('S' => $oneDayAgo),
                            'Message'       => array('S' => 'DynamoDB Thread 2 Reply 1 text'),
                            'PostedBy'      => array('S' => 'User A')
                        )
                    )
                )
            ),
        )
    ));

    echo "done." . PHP_EOL;
