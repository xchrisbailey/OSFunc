const puppeteer = require("puppeteer");

const os_url = "https://opensea.io/rankings";

async function getRanks() {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    defaultViewport: null,
    headless: true,
  });

  try {
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246"
    );
    await page.setViewport({ width: 1900, height: 1200 });
    await page.goto(os_url);
    await page.waitForSelector("[role='row']");

    const result = await page.$$eval('[role="row"]', (el) =>
      el.map((e) => {
        const rank = e.querySelector(
          ".Ranking--collection-info div:nth-of-type(1) span div"
        )?.textContent;

        const name = e.querySelector(
          ".Ranking--collection-info div:nth-of-type(3) span div"
        )?.textContent;

        const volume = e
          .querySelectorAll(
            ".FeatureTablereact__FeatureTableCell-sc-128zm2t-0"
          )[1]
          ?.querySelector("div span div")?.textContent;

        const oneDayChange = e
          .querySelectorAll(
            ".FeatureTablereact__FeatureTableCell-sc-128zm2t-0"
          )[2]
          ?.querySelector("div span div")?.textContent;

        const sevenDayChange = e
          .querySelectorAll(
            ".FeatureTablereact__FeatureTableCell-sc-128zm2t-0"
          )[3]
          ?.querySelector("div span div")?.textContent;

        const floor = e
          .querySelectorAll(
            ".FeatureTablereact__FeatureTableCell-sc-128zm2t-0"
          )[4]
          ?.querySelector("div span div")?.textContent;

        const owners = e
          .querySelectorAll(
            ".FeatureTablereact__FeatureTableCell-sc-128zm2t-0"
          )[5]
          ?.querySelector("p")?.textContent;

        const items = e
          .querySelectorAll(
            ".FeatureTablereact__FeatureTableCell-sc-128zm2t-0"
          )[6]
          ?.querySelector("p")?.textContent;

        return {
          rank,
          name,
          volume,
          oneDayChange,
          sevenDayChange,
          floor,
          owners,
          items,
        };
      })
    );

    return result
      .sort((a, b) => parseInt(a.rank) - parseInt(b.rank))
      .slice(0, 10);
  } catch (error) {
    throw error;
  } finally {
    await browser.close();
  }
}

module.exports = getRanks;
