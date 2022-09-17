import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { FileInput } from '../components/fileInput';

const Home: NextPage = () => {
	const [fileUploaded, setFileUploaded] = useState(false);
	const [success, setSuccess] = useState(false);
	const [fileError, setFileError] = useState(false);
	const [files, setFiles] = useState<FileList>();

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
		return response;
	};


	const handleChange = (event: React.FormEvent) => {
		event.preventDefault();
		uploadPhotos();
	};
	return fileUploaded ? (
		<div className="">
			<Head>
				<title>Laplacian Image Analysis</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="flex justify-center">
				<p className="prose lg:prose-md">File uploaded</p>
			</main>
		</div>
	) : (
		<div className="">
			<Head>
				<title>Laplacian Image Analysis</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="hero">
				<div className="hero-content text-center">
					<div className="max-w-md">
						<p className="prose lg:prose-md py-6">
							Welcome to Laplacian image analysis demo
						</p>
            <FileInput files={files} setFiles={setFiles}/>
						<button className="btn btn-primary">Select Image</button>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Home;
