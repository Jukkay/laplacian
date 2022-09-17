import { ReactNode } from 'react';

export const PhoneMockup = ({ children }: { children: ReactNode }) => {
	return (
		<div className="flex items-center justify-center h-screen">
			<div className="mockup-phone border-primary">
				<div className="camera"></div>
				<div className="display">
					<div className="artboard artboard-demo phone-1">
						{children}
					</div>
				</div>
			</div>
		</div>
	);
};
