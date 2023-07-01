import React, { useState, useEffect } from "react";
import axios from "axios";
import cheerio from "cheerio";

const AdsTransparencyCenterScraper = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    axios.get("https://adstransparency.google.com/?region=anywhere")
      .then((response) => {
        const $ = cheerio.load(response.data);

        const adElements = $(".ad-details");
        const ads = [];

        for (const adElement of adElements) {
          const advertiserName = adElement.find(".advertiser-name").text();
          const adUrl = adElement.find(".ad-url").text();
          const advertiserId = adElement.find(".advertiser-id").text();
          const adCreativeId = adElement.find(".ad-creative-id").text();
          const adWebAddress = adElement.find(".ad-web-address").text();

          ads.push({
            advertiserName,
            adUrl,
            advertiserId,
            adCreativeId,
            adWebAddress,
          });
        }

        setAds(ads);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Ads Transparency Center Scraper</h1>
      <table>
        <thead>
          <tr>
            <th>Advertiser Name</th>
            <th>Ad URL</th>
            <th>Advertiser ID</th>
            <th>Ad Creative ID</th>
            <th>Ad Web Address</th>
          </tr>
        </thead>
        <tbody>
          {ads.map((ad) => (
            <tr key={ad.advertiserName}>
              <td>{ad.advertiserName}</td>
              <td>{ad.adUrl}</td>
              <td>{ad.advertiserId}</td>
              <td>{ad.adCreativeId}</td>
              <td>{ad.adWebAddress}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdsTransparencyCenterScraper;
