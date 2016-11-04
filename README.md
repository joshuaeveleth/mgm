# mgm

This is a complete rewrite of MGM with a new look at security and performance.  It is aimed at new MOSES deployments using the halcyon codebase in place of Opensimulator.

While Halcyon supports oar files, not everything works perfectly.

Halcyon does not support IAR files at this time, and there is no workaround.

# Working
Connect and run mgmNode against this instance.  Log into this instance.  Basic region and estate management.

# Not Working
Assign region to a host.  Start/Stop region.  Content Management.  React do-not-render shortcuts on immutable updates.

# Upgrading

This branch does not perform any MySQL migration, use at your own risk.

# Installation

sudo npm install -g typescript typings
npm install
sudo npm link typescript
typings install

~~~~!~!~!~!!!~~~~~~
typings install
npm install
cp settings.js.example settings.js && vim settings.js

Initialize the mgm database by applying the sql files under doc in order.

# Building

Compile the html client using the following:
npm run build-client

build the server by using:
npm run build-server

# Other Information

This mgm installation is written against a similar branch for mgmNode, which has been rolled back to tag 1.0 for better windows support and to undo all python twisted modifications.

This node application should be behind an nginx instance that serves the contents of the html folder, and proxies calls to the node application.

Note that unlike on simiangrid, emailAddresses do not need to be unique.
