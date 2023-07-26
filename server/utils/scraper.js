const axios = require('axios');
const cheerio=require('cheerio');



/*Utility for checking validity of URL
*/

const  isValidURL=(url)=>{
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // Protocol (optional)
    '((([a-zA-Z\\d]([a-zA-Z\\d-]{0,61}[a-zA-Z\\d])?)\\.)+[a-zA-Z]{2,}|' + // Domain name (e.g., example.com)
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP address (e.g., 192.168.1.1)
    '(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*' + // Port and path (optional)
    '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' + // Query string (optional)
    '(\\#[-a-zA-Z\\d_]*)?$', // Fragment identifier (optional)
    'i' // Case-insensitive flag
  );

  return pattern.test(url);
}

/* Utility for scrapping a website 
*/

const scrapWebsite =async(url)=>{
    try{
        
        const response=await axios.get(url);
        return response?.data
    }
    catch(err){
        console.log("Error scraping website :",err.message);
    }
}


/*Utility for extracting domain name from url
*/

const getDomainName=(url)=>{
    try {
        const urlObj = new URL(url);
        return urlObj.hostname;
      } catch (error) {
        console.error('Invalid URL:', error);
        return null;
      }
}

/* Utility for extracting data from  html 
*/

const extractData=async(url,html)=>{
    const domain=getDomainName(url)
    const $ = cheerio.load(html);
    const unwantedSelectors = ['header', 'footer'];
    for (const selector of unwantedSelectors) {
      $(selector).remove();
    }

    const mainContent = $('body').text().replace(/<[^>]+>/g, '').replace(/[^\w\s]/g, '').trim();
    const words = mainContent.split(/\s+/).filter(word => word !== '');


    const webLinks=[]
    const videoUrls=[]
    const imageUrls=[]

    //image
    $('img').each((index, element) => {
      const imageUrl = $(element).attr('src');
      if (imageUrl && !imageUrls.includes(imageUrl)) {
        imageUrls.push(imageUrl);
      }
    });

    //video URLs 
    $('video').each((index, element) => {
      const videoUrl = $(element).attr('src');
      const videoSources = $(element).find('source');
      if (videoUrl && !videoUrls.includes(videoUrl)) {
        videoUrls.push(videoUrl);
      } else {
        videoSources.each((index, source) => {
          const sourceUrl = $(source).attr('src');
          if (sourceUrl && !videoUrls.includes(sourceUrl)) {
            videoUrls.push(sourceUrl);
          }
        });
      }
    });

    // web links
    $('a').each((index, element) => {
      const webLink = $(element).attr('href');
      if (webLink && !webLinks.includes(webLink)) {
        webLinks.push(webLink);
      }
    });


      return {domain:domain,wordsLength:words?.length,webLinks:webLinks,mediaLinks:{imageLinks:imageUrls,videoLinks:videoUrls}};

}

module.exports={scrapWebsite,extractData,isValidURL}