import {CredentialResponse, GoogleLogin} from '@react-oauth/google';
import googleAuthAction from '@/lib/actions/auth/google-auth.action';

export default function GoogleAuth(props: {
    onSuccess: (data: { token: string, user: { id: string, email: string } }) => void
}) {
    const handleGoogleAuth = async (data: CredentialResponse) => {
        if (!data.credential) {
            return;
        }

        const res = await googleAuthAction(data.credential);
        if (!res.data) {
            console.error(res.error);
            return;
        }

        props.onSuccess(res.data);
    }

    return <GoogleLogin auto_select size={'large'} theme={'filled_black'} onSuccess={(data) => handleGoogleAuth(data)} />
}