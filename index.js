const axios = require('axios');
const readline = require('readline');

var rl = readline.createInterface(process.stdin, process.stdout);

const results = [];
const DELAY = 500;

const checkSkill = (skillId, keyword) => {
  axios.get(`https://api.guildwars2.com/v2/skills?ids=${skillId}`).then(res => {
    const skillData = res.data[0];
    if (skillData.name.toLowerCase().includes(keyword.toLowerCase())) {
      results.push(skillData);
    }

    console.log(`Searching (${skillId})`);
  });
};

rl.question('Search for: ', answer => {
  axios.get('https://api.guildwars2.com/v2/skills').then(res => {
    const skillIds = res.data;
    skillIds.forEach((skillId, index) =>
      setTimeout(checkSkill, index * DELAY, skillId, answer),
    );

    setTimeout(
      finalResults => {
        finalResults.forEach(result => {
          console.log(result);
        });
      },
      (skillIds.length + 1) * DELAY,
      results,
    );
  });
});
