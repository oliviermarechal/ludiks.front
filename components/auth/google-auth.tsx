import {CredentialResponse, GoogleLogin} from '@react-oauth/google';
import { useAuth } from '@/lib/hooks/use-auth.hook';
import { toast } from 'sonner';

export default function GoogleAuth(props: {
    onSuccess: (data: { token: string, user: { id: string, email: string } }) => void
    inviteId?: string
}) {
    const { googleAuthAsync } = useAuth({ redirectToLogin: false });

    const handleGoogleAuth = async (data: CredentialResponse) => {
        if (!data.credential) {
            return;
        }

        try {
            const result = await googleAuthAsync({
                idToken: data.credential,
                inviteId: props.inviteId
            });
            props.onSuccess(result);
        } catch (error) {
            console.error('Google auth error:', error);
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('Erreur lors de l\'authentification Google');
            }
        }
    }

    return (
        <GoogleLogin 
            auto_select 
            size={'large'} 
            theme={'filled_black'} 
            onSuccess={handleGoogleAuth}
        />
    );
}