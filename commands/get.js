const fs = require('fs');
const chalk = require('chalk');

function get(yargs) {
    yargs.command({
        command: 'get',
        describe: 'Search person by his/her name',
        builder: {
            name: {
                describe: 'Name to find',
                demandOption: true,
                type: 'string'
            }
        },
        handler(argv) {
            const response = getPerson(argv.name);

            if(response.success) {
                console.log(chalk.green.bold('Persona trovata!!!'));
                response.foundedPeople.forEach(people => console.log(people));
            } else {
                console.log(chalk.red.bold('Persona NON trovata!!!'));
                console.log(chalk.yellow.underline(`Forse cercavi uno di questi: ${response.suggestions}`));
            }
        }
    });
};

function getPerson(name) {
    const peopleJSON = fs.readFileSync('./people.json', 'utf-8'),
        people = JSON.parse(peopleJSON),
        foundedPeople = people.filter(item => item.name === name),
        response = { success: true, suggestions: '', foundedPeople };
    
    if(!foundedPeople.length) {
        response.success = false;
        people.map((el) => {
            if(el.name[0] === name[0]) {
                response.suggestions += `${el.name} `;
            }
        });

        return response;
    }

    return response;
};

module.exports = get;