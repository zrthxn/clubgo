import path from 'path'

import Footer from '../../../../../website/src/app/partials/Footer/Footer'
export const Application = Footer

import WebsiteController from '../../../../../website/src/app/Website'
// export const Application = WebsiteController

export const BUILD_PATH = path.join(__dirname, '..', '..', '..', '..', 'dist', 'apps', 'website')