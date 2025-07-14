import '@fontsource/inter'
import './normailize.sass'

import { MainPage } from '@/pages/main'
import { PluginFooter } from '@/widget/pluginFooter'
import { PluginHeader } from '@/widget/pluginHeader/pluginHeader'

export const App = () => {
    return (
        <div>
            <PluginHeader />
            <MainPage />
            <PluginFooter />
        </div>
    )
}
