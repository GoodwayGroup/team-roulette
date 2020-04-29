const fs = require('fs');
const { program } = require('commander');
const { uniqueNamesGenerator, adjectives, colors } = require('unique-names-generator');

program
  .version('0.0.1')
  .option('-s, --size <number>', 'Team Size')
  .option('-n, --names', 'Generate Team Names')
  .option('-o, --only-names', 'Dont distribute team members, just generate as many manes as needed for the groups provided')
  .option('-d, --distribute-overflow', 'Distribute overflow across all groups. Otherwise overflow will be added as its own group')

program.parse(process.argsv);

const size = program.size;
const names = program.names;
const groupOverflow = program.distributeOverflow ? false : true;

const team = fs.readFileSync('team.txt').toString().split("\n");
team.pop();

console.log(`Loaded team with ${team.length} members...`);

for(let i = team.length - 1; i > 0; i--) {
  let j = Math.floor(Math.random() * (i + 1));
  [team[i], team[j]] = [team[j], team[i]];
};

const groupCount = Math.floor(team.length / size);
const remainder = team.length - (groupCount * size);

const groups = [];

console.log(`Creating groups of ${size}${(names) ? ' with generated names...' : '...'}`);

for (let i = 0; i < groupCount; i += 1) {
  if(program.onlyNames) {
    groups.push(uniqueNamesGenerator({ dictionaries: [adjectives, colors], length: 2 }));
  } else {
    groups.push([]);
  }
}

if (program.onlyNames) {
  console.log(`Generated ${groups.length} team names: \r`);
  groups.forEach(group => console.log(group));
  return;
} 

if (remainder && groupOverflow) {
  const overflow = team.splice(team.length - remainder);
  groups.push(overflow);
}

team.forEach((member, index) => {
  groups[index % groupCount].push(member);
});

if(names) {
  groups.forEach(group => group.unshift(
    uniqueNamesGenerator({ dictionaries: [adjectives, colors], length: 2 })
  ));
}

console.log(`Generated ${groups.length} teams: \r`);
groups.forEach(group => console.log(group));
