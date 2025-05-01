const API_KEY = '266538df44ca53917c14be541f4090c6'
const SPORTS_ENDPOINT = `https://api.the-odds-api.com/v4/sports`

export default defineEventHandler(async () => {
  try {
    const sports: any = await $fetch(`${SPORTS_ENDPOINT}`, {
      params: {
        apiKey: API_KEY
      }
    });

    return {
      data: sports.filter((sport: any) => sport.description.includes('US')), // only US sports for now
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch odds data'
    })
  }
});