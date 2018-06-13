const axios = require('axios');

axios.get('https://api.guildwars2.com/v2/skills?ids=41218').then(res => {
  const skillData = res.data;
  console.log(skillData.name);
  console.log(skillData);
});
