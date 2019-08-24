const express = require("express");
const app = express();

let reader = require('./src/view/inputReader')
reader.readLines()