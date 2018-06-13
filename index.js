const axios = require('axios');
const readline = require('readline');

var rl = readline.createInterface(process.stdin, process.stdout);

const results = [];

rl.question('Search for: ', answer => {
  axios.get('https://api.guildwars2.com/v2/skills').then(res => {
    const skillIds = res.data;

    for (let i = 0; i < skillIds.length; i += 200) {
      const skillIdChunk = skillIds.slice(i, i + 200);
      let requestURL = 'https://api.guildwars2.com/v2/skills?ids=';
      skillIdChunk.forEach((skillId, index) => {
        requestURL += skillId;
        requestURL += ',';
      });
      requestURL = requestURL.slice(0, -1);

      axios
        .get(requestURL)
        .then(res => {
          const skills = res.data;

          skills.forEach(skill => {
            if (skill.name.toLowerCase().includes(answer.toLowerCase())) {
              console.log(`${skill.id}: ${skill.name}`);
            }
          });
        })
        .catch(err => {
          console.log('ERROR', err);
        });
    }
  });

  rl.close();
});
