const API_KEY = '266538df44ca53917c14be541f4090c6'
const REGIONS = 'us'
const MARKETS = 'spreads'
const ODDS_FORMAT = 'decimal'
const DATE_FORMAT = 'iso'

export default defineEventHandler(async (event) => {
  const { sportKey } = getQuery(event)

  try {
    const response: any = await $fetch(`https://api.the-odds-api.com/v4/sports/${sportKey}/odds`, {
      params: {
        apiKey: API_KEY,
        regions: REGIONS,
        markets: MARKETS,
        oddsFormat: ODDS_FORMAT,
        dateFormat: DATE_FORMAT,
      }
    })

    console.log('Remaining requests', response?.headers?.['x-requests-remaining'])
    console.log('Used requests', response?.headers?.['x-requests-used'])

    return {
      data: response,
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch odds data'
    })
  }
});