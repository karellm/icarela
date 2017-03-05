#!/bin/bash

rm .env.example
rm deploy.js
rm README.md
rm serve.js
rm setup.js
rm -r ./src/
cp -a ./build/. ./
rm -r ./build/