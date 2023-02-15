import Nullstack from 'nullstack'

import Home from './Home'

import './Application.css'

class Application extends Nullstack {
  prepare({ page }) {
    page.locale = 'en-US'
    page.title = 'Daniel Cruz | Linktree'
  }

  render() {
    return (
      <body>
        <Home route="/" />
      </body>
    )
  }
}

export default Application
