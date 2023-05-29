# luapetshop

## Steps to take after each git pull that modifies the SQL Database
(it should not be that often)

### Reset SQL database

#### Delete original database

1. Open DBeaver, which should have a connection called _localhost_ or similar
1. Go to the directory called _databases_ and locate the database you were working with.
1. Delete it.

#### Create new database with same name

1. Open the corresponding CLI (e.g. MySQL 8.0 Command Line Client)
1. Log into root account (or the one you were using as developer)
1. Enter the following command: (Check the name of the database you were using)
    ```SQL
    show databases;
    ```
1. Now enter this command:
    ```SQL
    create database NAME_OF_DATABASE;
    ```

------

### Re-run the scripts for that database

__NOTE__: _MAYBE_ you don't need to re-build the entre project, you could just refresh the whole project or the directiories you know were modified and maybe everything works fine!

* Go to DBeaver again, and load the new SQL script, that you could do in two ways:
1. Right click in your database; _SQL Editor_; _Open Script_; then select your new SQL Script
1. Right click in your database; _SQL Editor_; _New Script_; then copy the content of the new SQL script and paste it into this new script
* Then execute the whole SQL script (e.g. select all; _ctrl + enter_)

### Re-build the Spring Project

1. Open Eclipse IDE
1. Make sure you have the right project loaded
1. Go to the _Project_ tab in the upper menu; clean...
1. Select the project you are using for this repo (you can also use the _clean all_ if there's only one)

That should ensure everything refreshes properly and you can execute the app correctly.