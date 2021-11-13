const fs = require('fs');
const chalk = require('chalk');
const inquirer = require('inquirer');

function del(yargs) {
    yargs.command({
        command: 'delete',
        description: 'Remove person',
        builder: {
            name: {
                describe: 'Name',
                demandOption: true,
                type: 'string'
            }
        },
        handler(argv) {
            deletePerson(argv.name);
        }
    });
};

function deletePerson(name) {
    const peopleJSON = fs.readFileSync('./people.json', 'utf-8'),
        people = JSON.parse(peopleJSON);
    
    const personToDelete = people.filter(person => person.name === name);

    if(!personToDelete.length) {
        console.log(chalk.red.bold(`"${name}" non esiste!`));
        return
    }

    if(personToDelete.length === 1) {
        let index = people.indexOf(personToDelete[0]);
        people.splice(index, 1);
    
        printSuccess(name, people);
    } else {        
        inquirer.prompt([
            {
                type: 'list',
                name: 'choiced_people',
                message: 'Esiste più di un risultato, quale vuoi eliminare?',
                choices: personToDelete.map(el => `${el.name} - ${el.email} - index: ${people.indexOf(el)}`)
            }
        ]).then((answer) => {
            const userChoice = answer.choiced_people,
                index = userChoice.split('index: ')[1];
            
            let deletedPersonName = people[index].name;
            people.splice(index, 1);
            
            printSuccess(deletedPersonName, people);
        })
    }
}

function printSuccess(name, array) {
    fs.writeFileSync('people.json', JSON.stringify(array));
    console.log(chalk.green.underline(`"${name}" è stato tolto correttamente!`));
}

module.exports = del;