#!/usr/bin/env node

const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const shell = require("shelljs");
const tx=require('./transaction.js')

const askQuestions = () => {
    const questions = [
      {
        name: "Network",
        type: "list",
        choices: ["Mainnet", "Rinkeby", "Kovan", "Ropsten"],
        message: "Please choose the name of Ethereum Network "
      },
      {
        type: "input",
        name: "PrivateKey",
        message: "Please paste your private Key here"
      
      },
      {
        type: "input",
        name: "DestinationAdress",
        message: "Please paste your destination address here"
      
      },
      {
        type: "input",
        name: "Amount",
        message: "Please enter the amount you want to send"
      
      }

    ];
    return inquirer.prompt(questions);
  };

const init = () => {
    console.log(
      chalk.green(
        figlet.textSync("Ethereum transaction", {
          font: "Standard",
          horizontalLayout: "default",
          verticalLayout: "default"
        })
      )
    );
  }

  const success = (filepath) => {
    console.log(
      chalk.white.bgGreen.bold(`Transaction id is ${filepath}`)
    );
  };
  
  const run = async () => {
    // show script introduction
    init();

    const answers = await askQuestions();
    const { Network, PrivateKey, DestinationAdress, Amount} = answers;
    let txID=await tx.web3(Network,PrivateKey,DestinationAdress,Amount);
    
    success(txID);
  
    // ask questions
    // create the file
    // show success message
  };

  run();


