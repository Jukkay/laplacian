export const Thumbnails = ({ preview, setPreview }: IThumbnails) => {
	// Remove uploaded image
	const handleRemove = (event: PointerEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const removedImage = event.currentTarget.id;
		const newPreview = preview.filter((item) => item != removedImage);
		setPreview(newPreview);
	};

	return preview ? (
		<div className="block">
			<div className="is-flex is-flex-direction-row is-flex-wrap-wrap">
				{preview.map((image, index) => (
					<div key={image} className="box mx-3 has-text-centered">
						<figure className="image is-128x128">
							<img src={image} alt="Placeholder image" />
						</figure>
						<button
							type="button"
							className="button is-small is-danger is-centered mr-3 mt-3"
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
