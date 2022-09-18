import { PointerEvent, SetStateAction } from 'react';
export const Thumbnails = ({ preview, setPreview }: IThumbnails) => {
	// Remove uploaded image
	const handleRemove = (event: PointerEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const removedImage = event.currentTarget.id;
		const newPreview = preview.filter((item) => item != removedImage);
		setPreview(newPreview);
	};

	return preview ? (
		<div className="stack">
			<div className="flex justify-center">
				{preview.map((image, index) => (
					<div key={index} className="flex flex-col items-center">
							<img src={image} className="rounded" alt="Placeholder image" />
						<button
							type="button"
							className="btn btn-warning mr-3 mt-3"
							id={image}
							onClick={handleRemove}
						>
							Remove
						</button>
					</div>
				))}
			</div>
		</div>
	) : null;
};

export interface IThumbnails {
	preview: string[];
	setPreview: SetStateAction<any>
	setFiles?: SetStateAction<any>
  }