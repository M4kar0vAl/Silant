import logoUrl from '/src/assets/logos/logo_light.svg'
import telegramUrl from '/src/assets/social_media/telegram_light.svg'
import vkUrl from '/src/assets/social_media/vk.svg'
import youtubeUrl from '/src/assets/social_media/youtube.svg'

import './Footer.css'

const Footer = () => {
    return (
        <footer className="footer">
            <div className='inner-footer'>
                <img className='footer-logo' src={logoUrl} alt="logo" />
                <div className='footer-social'>
                    <a href="https://t.me/chzsa21" target='_blank'>
                        <img src={telegramUrl} alt="telegram logo" />
                    </a>
                    <a href="https://vk.com/chzsa" target='_blank'>
                        <img src={vkUrl} alt="vk logo" />
                    </a>
                    <a href="https://www.youtube.com/@user-fh5ji4pv6w/playlists" target='_blank'>
                        <img src={youtubeUrl} alt="youtube logo" />
                    </a>
                </div>
                <a href="tel:+78352204243">+7 (835) 220-42-43</a>
                <p className='footer-copyright'>&copy; Мой Силант 2024</p>
            </div>
        </footer>
    )
}

export default Footer