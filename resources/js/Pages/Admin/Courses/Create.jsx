import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { Save, ArrowLeft } from 'lucide-react';

export default function Create({ auth, categories }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        category_id: categories.length > 0 ? categories[0].id : '',
        price: 0,
        thumbnail: '',
        status: 'draft',
        difficulty: 'Beginner',
        requirements: '',
        what_you_will_learn: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.courses.store'));
    };

    return (
        <AdminLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-4">
                    <Link href={route('admin.courses.index')} className="text-gray-400 hover:text-gray-600 transition">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Create New Course</h2>
                </div>
            }
        >
            <Head title="Create Course" />

            <div className="max-w-2xl bg-white shadow-sm sm:rounded-lg overflow-hidden">
                <form onSubmit={submit} className="p-6 space-y-6">
                    <div>
                        <InputLabel htmlFor="title" value="Course Title" />
                        <TextInput
                            id="title"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            required
                        />
                        <InputError message={errors.title} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="description" value="Course Description" />
                        <textarea
                            id="description"
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm min-h-[120px]"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            required
                        />
                        <InputError message={errors.description} className="mt-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <InputLabel htmlFor="category_id" value="Category" />
                            <select
                                id="category_id"
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                value={data.category_id}
                                onChange={(e) => setData('category_id', e.target.value)}
                                required
                            >
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                            <InputError message={errors.category_id} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="price" value="Price ($)" />
                            <TextInput
                                id="price"
                                type="number"
                                step="0.01"
                                className="mt-1 block w-full"
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                                required
                            />
                            <InputError message={errors.price} className="mt-2" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <InputLabel htmlFor="thumbnail" value="Thumbnail Image URL (Optional)" />
                            <TextInput
                                id="thumbnail"
                                type="url"
                                className="mt-1 block w-full"
                                value={data.thumbnail}
                                onChange={(e) => setData('thumbnail', e.target.value)}
                                placeholder="https://example.com/image.jpg"
                            />
                            <InputError message={errors.thumbnail} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="difficulty" value="Difficulty Level" />
                            <select
                                id="difficulty"
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                value={data.difficulty}
                                onChange={(e) => setData('difficulty', e.target.value)}
                                required
                            >
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                                <option value="All Levels">All Levels</option>
                            </select>
                            <InputError message={errors.difficulty} className="mt-2" />
                        </div>
                    </div>

                    <div>
                        <InputLabel htmlFor="requirements" value="Requirements (One per line)" />
                        <textarea
                            id="requirements"
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm min-h-[80px]"
                            value={data.requirements}
                            onChange={(e) => setData('requirements', e.target.value)}
                            placeholder="e.g. Basic understanding of HTML&#10;A working computer"
                        />
                        <InputError message={errors.requirements} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="what_you_will_learn" value="What You Will Learn (One per line)" />
                        <textarea
                            id="what_you_will_learn"
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm min-h-[80px]"
                            value={data.what_you_will_learn}
                            onChange={(e) => setData('what_you_will_learn', e.target.value)}
                            placeholder="e.g. Build reusable components&#10;Master state management"
                        />
                        <InputError message={errors.what_you_will_learn} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="status" value="Status" />
                        <select
                            id="status"
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={data.status}
                            onChange={(e) => setData('status', e.target.value)}
                            required
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                        <InputError message={errors.status} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-end border-t border-gray-100 pt-6">
                        <PrimaryButton className="gap-2" disabled={processing}>
                            <Save className="w-4 h-4" />
                            Save & Continue to Curriculum
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
