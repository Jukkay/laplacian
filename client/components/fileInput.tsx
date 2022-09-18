import { useEffect, useState } from 'react';
import { Thumbnails } from './thumbnails';
import { FaUpload } from 'react-icons/fa';
import { API } from '../utilities/api';

export const FileInput = () => {
	const [preview, setPreview] = useState<string[]>([]);
	const [success, setSuccess] = useState(false);
	const [fileError, setFileError] = useState(false);
	const [files, setFiles] = useState<FileList>();
	const [blurry, setBlurry] = useState(false);

	const uploadPhotos = async () => {
		if (!files || files.length < 1) {
			setFileError(true);
			return;
		}
		// Add files to formData
		const imageData = new FormData();
		for (let i = 0; i < files.length; i++) {
			imageData.append('files', files[i], files[i].name);
		}
		// Upload to server
		const response = await API.post('/image', imageData);
		if (response.status == 200) {
			if (response.data.blurry == true) setBlurry(true);
		}
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		uploadPhotos();
	};
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) return;
		setFiles(event.target.files);
	};

	useEffect(() => {
		if (!files || files.length < 1) return;
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
			<div className="card shadow-md bg-warning text-primary-content">
				{!blurry ?  
				<div className="card-body">
					<p>Image appears to be blurry. Please, consider taking a new picture. Products with good pictures sell a lot faster!</p>
				</div> : null
}
			</div>
			<button className="btn btn-primary mt-6">Upload image</button>
		</form>
	);
};
