import chalk from 'chalk'

const log = console.log

// Intended to log in console server analytics
const analytics = (event, params = null) => {
  const supportedCategories = ['SUCCESS', 'FAIL', 'ERROR']
  const separatorIndex = event.lastIndexOf('_')
  const analyticsCategory = event.slice(separatorIndex + 1)
  const eventCategory = supportedCategories.includes(analyticsCategory) ? analyticsCategory : 'ERROR'

  if (process.env.TEST_RUNNER !== 'true') {
    const user = params.user

    if (user) {
      delete params.user // Delete user data, in order to prevent duplicate inside 'analyticsData'
    }

    log(event, eventCategory)

    if (eventCategory === 'SUCCESS') {
      const message = `
      event: ${chalk.green(event)}
      params: ${chalk.yellow(JSON.stringify(params))}
      userId: ${chalk.yellow(user)}
      `

      log(chalk.white.bgGreenBright.bold(' ANALYTICS: '), message)
    } else {
      const message = `
      event: ${chalk.red(event)}
      params: ${chalk.yellow(JSON.stringify(params))}
      userId: ${chalk.yellow(user)}
      `

      log(chalk.white.bgRedBright.bold(' ANALYTICS: '), message)
    }
  }
}

export default analytics
