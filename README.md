# mgm

This is a complete rewrite of MGM with a new look at security and performance.  It is aimed at new MOSES deployments using the halcyon codebase in place of Opensimulator.

While Halcyon supports oar files, not everything works perfectly.

Halcyon does not support IAR files at this time, and there is no workaround.

# Upgrading

This branch does not perform any MySQL migration, use at your own risk.

# Installation

npm install -g typescript typings webpack
npm i

typings install
npm install
cp settings.js.example settings.js && vim settings.js
gulp && node dist/mgm.js

to manually create users on the command line:
node dist/cli.js createUser FNAME LNAME PASSWORD [EMAIL] [GODLEVEL]

Initialize the mgm database by applying the sql files under doc in order.

# Other Information

This mgm installation is written against a similar branch for mgmNode, which has been rolled back to tag 1.0 for better windows support and to undo all python twisted modifications.

This node application should be behind an nginx instance that serves the contents of the html folder, and proxies all calls for the router /server to the node process.

bots.ts/bots.js
this is a simple script to create/delete a lot of bots.  It operates over a text file called users.txt, which is composed of a series of json records, one per line.  The records should take the form:

{
  fname: 'firstName',
  lname: 'lastName',
  password: 'desiredPassword',
  email: 'emailAddress'
}

Note that unlike on simiangrid, emailAddresses do not need to be unique.
