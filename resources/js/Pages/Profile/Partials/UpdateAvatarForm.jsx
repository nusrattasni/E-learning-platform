import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, usePage } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function UpdateAvatarForm({ className = '' }) {
    const user = usePage().props.auth.user;
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        avatar: null,
    });
    
    const [preview, setPreview] = useState(user.avatar_path ? `/storage/${user.avatar_path}` : null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('avatar', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('profile.avatar'), {
            preserveScroll: true,
            onSuccess: () => {
                // Force a page reload to update the layout avatar (since Layout might not perfectly react to auth.user changes deeply)
                // Actually Inertia handles auth.user updates globally but a full refresh ensures the browser doesn't cache the image
                window.location.reload(); 
            }
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Profile Picture</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile picture. Allowed types: JPG, PNG, WEBP (Max: 2MB).
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div className="flex items-center gap-6">
                    <div className="shrink-0">
                        {preview ? (
                            <img src={preview} alt="Avatar preview" className="h-24 w-24 object-cover rounded-full border-4 border-indigo-100 shadow-sm" />
                        ) : (
                            <div className="h-24 w-24 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-3xl font-bold shadow-sm">
                                {user.name.charAt(0)}
                            </div>
                        )}
                    </div>
                    <div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            accept="image/jpeg, image/png, image/webp"
                        />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                            Change picture
                        </button>
                        <InputError message={errors.avatar} className="mt-2" />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing || !data.avatar}>Save Picture</PrimaryButton>

                    {recentlySuccessful && (
                        <p className="text-sm text-gray-600">Saved.</p>
                    )}
                </div>
            </form>
        </section>
    );
}
