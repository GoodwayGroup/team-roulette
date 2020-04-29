# Team Roulette

This tool will break up the included team.txt file into however many teams you need.

## Usage

```node ./team-roulette -s <size> <options>```

## Options

```-s --size``` (required) - The size you would like each team to be
```-n --names``` - Generate unique names for each team
```-o --only-names``` - Generate only the necessary unique team names and dont bother assigning members
```-d --distribute-overflow``` - If the teams don't divide evenly, this option will distribute the extra members across the created teams. The default behavior is to create an extra team out of the remaining team members.
