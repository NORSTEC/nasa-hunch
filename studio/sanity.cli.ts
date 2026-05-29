import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '4k911a4x',
    dataset: 'production'
  },
  deployment: {
    appId: 'o6fk9d69skymw0seqfmxnl9n',
    autoUpdates: true,
  }
})
