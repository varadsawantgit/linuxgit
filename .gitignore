#!/bin/bash

set -e   # exit on error

echo "Updating server"
sudo apt update -y

echo "Installing Apache"
sudo apt install apache2 -y

echo "Installing Git"
sudo apt install git -y

echo "Cleaning web root"
sudo rm -rf /var/www/html/*

echo "Permission Set"
sudo chmod 777 /var/www/html

echo "Cloning website"
git clone https://github.com/varadsawantgit/linuxgit.git /var/www/html

echo "Starting Apache"
sudo systemctl start apache2
sudo systemctl enable apache2

echo "Deployment complete"
