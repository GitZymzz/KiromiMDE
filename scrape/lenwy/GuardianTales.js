/*  

  Made By kayzuMD
  Base : kayzu
  WhatsApp : wa.me/6289673462138
  Telegram : t.me/kayzuMD
  Youtube : @kayzuhosting

  Channel : https://whatsapp.com/channel/0029VatjTeULo4hk0RJlly0V

  Copy Code?, Recode?, Rename?, Reupload?, Reseller? Taruh Credit Ya :D

  Mohon Untuk Tidak Menghapus Watermark Di Dalam Kode Ini

*/

const axios = require('axios');
const cheerio = require('cheerio');

async function GTChar(query) {
  try {
    const { data } = await axios.get(`https://guardiantalesguides.com/game/guardians/show/${query.toLowerCase()}`);
    const $ = cheerio.load(data);

    // Karakter
    const characterName = $('.stats div:contains("Name:")').text().replace('Name:', '').trim();
    const characterSchool = $('.stats div:contains("School:") em').text().trim();
    const characterGroupBuff = $('.stats div:contains("Group Buff:")').text().replace('Group Buff:', '').trim();
    const characterIntroduced = $('.stats div:contains("Introduced:")').text().replace('Introduced:', '').trim();
    const characterImage = $('.portrait.unique img').attr('src');
    const characterImageUrl = `https://guardiantalesguides.com${characterImage}`;

    // Skill 
    const normalAtkTitle = $('div.info:contains("Normal Atk") .heading').text().trim();
    const normalAtkDesc = $('div.info:contains("Normal Atk") .text h5').text().trim() + ' ' +
      $('div.info:contains("Normal Atk") .text').text().replace($('div.info:contains("Normal Atk") .text h5').text(), '').trim();
      
    const chainSkillTitle = $('div.info:contains("Chain Skill") .heading').text().trim();
    const chainSkillDesc = $('div.info:contains("Chain Skill") .text h5').text().trim() + ' ' +
      $('div.info:contains("Chain Skill") .text').text().replace($('div.info:contains("Chain Skill") .text h5').text(), '').trim();
      
    const specialAbilityTitle = $('div.info:contains("Special Ability") .heading').text().trim();
    const specialAbilityDesc = $('div.info:contains("Special Ability") .text h5').text().trim() + ' ' +
      $('div.info:contains("Special Ability") .text').text().replace($('div.info:contains("Special Ability") .text h5').text(), '').trim();
      
    const exWeaponTitle = $('div.info:contains("Ex Weapon") .heading').text().trim();
    const exWeaponDesc = $('div.info:contains("Ex Weapon") .text h5').text().trim() + ' ' +
      $('div.info:contains("Ex Weapon") .text').text().replace($('div.info:contains("Ex Weapon") .text h5').text(), '').trim();

    // Rank
    const metaRankings = [];
    $('.metaGuardianRankings > div').each((i, el) => {
      const rankTitle = $(el).find('h2').text().trim();
      const rankNumber = $(el).find('.ranks').text().trim();
      const percentageTop = $(el).find('strong').first().text().trim();
      const additionalInfo = $(el).find('div').eq(1).text().trim();

      metaRankings.push({
        rankTitle: rankTitle,
        rankNumber: rankNumber,
        percentageTop: percentageTop,
        additionalInfo: additionalInfo || null
      });
    });

    // Hasil
    return {
      name: characterName,
      school: characterSchool,
      groupBuff: characterGroupBuff,
      introduced: characterIntroduced,
      imgSrc: characterImageUrl,
      skills: {
        normalAtk: {
          title: normalAtkTitle,
          description: normalAtkDesc
        },
        chainSkill: {
          title: chainSkillTitle,
          description: chainSkillDesc
        },
        specialAbility: {
          title: specialAbilityTitle,
          description: specialAbilityDesc
        },
        exWeapon: {
          title: exWeaponTitle,
          description: exWeaponDesc
        }
      },
      metaRankings: metaRankings
    };
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to retrieve character data.');
  }
}

module.exports = GTChar;