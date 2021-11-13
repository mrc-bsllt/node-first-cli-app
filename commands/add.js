const fs = require('fs');
const chalk = require('chalk');

function add(yargs) {
    yargs.command({
        command: 'add',
        description: 'Add a new person',
        builder: {
            name: {
                describe: 'Name of the person',
                demandOption: true,
                type: 'string'
            },
            email: {
                describe: 'Email of the person',
                demandOption: false,
                default: 'default@mail.com',
                type: 'string'
            },
            telephone: {
                describe: 'Telephone of the person',
                demandOption: false,
                default: '111-1111111',
                type: 'string'
            }
        },
        handler(argv) {
           addPerson(argv);
           console.log(chalk.green.underline(`${argv.name} è stato/a aggiunta con sucesso!`));
        }
    });
};

function addPerson({ name, email, telephone }) {
    const peopleJSON = fs.readFileSync('./people.json', 'utf-8'),
        people = JSON.parse(peopleJSON);
    
    people.push({ name, email, telephone });
    fs.writeFileSync('./people.json', JSON.stringify(people));
};

module.exports = add;