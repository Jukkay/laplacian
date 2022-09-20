import { useEffect, useState } from 'react';
import { Thumbnails } from './thumbnails';
import { API } from '../utilities/api';

export const FileInput = () => {
	const [preview, setPreview] = useState<string[]>([]);
	const [success, setSuccess] = useState(false);
	const [files, setFiles] = useState<FileList>();
	const [blurry, setBlurry] = useState(false);

	const uploadPhotos = async () => {
		if (!files || files.length < 1) {
			return;
		}
		const payload = new FormData();
		payload.append('photo', files[0]);
		const response = await API.post('/blur', payload);
		if (response.status == 200) {
			setBlurry(response.data?.blurry);
			if (response.data?.blurry === false)
				setSuccess(true);
			setFiles(undefined);
		}
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		uploadPhotos();
	};
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSuccess(false)
		if (!event.target.files) return;
		setFiles(event.target.files);
	};

	useEffect(() => {
		if (!files || files.length < 1) return;
		setBlurry(false);
		setSuccess(false)
		let imageData = [];
		for (let i = 0; i < files.length; i++) {
			imageData.push(URL.createObjectURL(files[i]));
		}
		setPreview(imageData as never[]);
	}, [files]);

	return (
		<form className="flex flex-col items-center" onSubmit={handleSubmit}>
			<div className="mb-3 w-96">
				<label
					htmlFor="formFile"
					className="form-label inline-block mb-2 text-gray-700"
				>
					Choose image to upload
				</label>
				<input
					className="
								form-control
								block
								w-full
								px-3
								py-1.5
								text-base
								font-normal
								text-gray-700
								bg-white bg-clip-padding
								border border-solid border-gray-300
								rounded
								transition
								ease-in-out
								m-0
								focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
								file:btn
								file:btn-outline
								file:btn-primary
								"
					type="file"
					id="formFile"
					onChange={handleChange}
				/>
			</div>
			<Thumbnails preview={preview} setPreview={setPreview} />
			<div className="card shadow-md bg-warning text-primary-content mt-6">
				{blurry ? (
					<div className="card-body">
						<p>
							Image appears to be blurry. Please, consider taking
							a new picture. Products with good pictures sell a
							lot faster!
						</p>
					</div>
				) : null}
			</div>
			{success ? (
				<div className="card shadow-md bg-success text-primary-content mt-6">
					<div className="card-body">
						<p>Image uploaded successfully!</p>
					</div>
				</div>
			) : (
				<button className="btn btn-primary mt-6">Upload image</button>
			)}
		</form>
	);
};
