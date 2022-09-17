import { useEffect, useState } from "react";
import { Thumbnails } from "./thumbnails";
import { FaUpload } from 'react-icons/fa';

export const FileInput = ({ files, setFiles }: FileInputProps) => {
	const [preview, setPreview] = useState<string[]>([]);

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
		<div>
			<div className="block">
				<label htmlFor="upload" className="label my-3">
					Upload pictures
				</label>
				<div className="file">
					<label className="file-label">
						<input
							className="file-input"
							type="file"
							name="upload"
							onChange={onChange}
							accept="image/*"
							multiple
						/>
						<span className="file-cta">
							<span className="file-icon">
								<FaUpload />
							</span>
							<span className="file-label">
								Choose files to upload
							</span>
						</span>
					</label>
				</div>
			</div>
			<Thumbnails preview={preview} setPreview={setPreview} />
		</div>
	);
};
