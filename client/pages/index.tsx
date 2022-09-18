import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { FileInput } from '../components/fileInput';
import { API } from '../utilities/api';

const Home: NextPage = () => {
	const [fileUploaded, setFileUploaded] = useState(false);
	const [success, setSuccess] = useState(false);
	const [fileError, setFileError] = useState(false);
	const [files, setFiles] = useState<FileList>();
	
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
            			<FileInput />
						
					</div>
				</div>
			</main>
		</div>
	);
};

export default Home;
