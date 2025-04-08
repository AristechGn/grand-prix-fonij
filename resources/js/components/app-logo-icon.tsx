import { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img src="/images/fonij/logo-transparent.png" alt="Logo" {...props} />
    );
}
