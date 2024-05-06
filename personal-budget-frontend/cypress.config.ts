import { defineConfig } from 'cypress'
import eyesPlugin from '@applitools/eyes-cypress'


export default eyesPlugin(defineConfig({
  e2e: {
    'baseUrl': 'http://0.0.0.0:4200'
  },

  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts'
  }
}))
