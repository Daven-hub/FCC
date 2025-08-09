import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Toast = () => (
	<ToastContainer
		position="top-right"
		autoClose={5000}
		hideProgressBar={false}
		newestOnTop={false}
		closeOnClick
		pauseOnFocusLoss
		draggable
		pauseOnHover
		toastClassName={() =>
			'relative flex p-4 min-h-16 rounded-md justify-between overflow-hidden cursor-pointer my-2 shadow-lg'
		}
	/>
);

export const showSuccessToast = (message) => {
	toast.success(
		<div className="flex items-center gap-2">
			<span className="font-medium">{message}</span>
		</div>,
		{
			className: 'bg-green-600 text-white',
			bodyClassName: 'p-3',
			progressClassName: 'bg-green-400',
		},
	);
};

export const showErrorToast = (message) => {
	toast.error(
		<div className="flex items-center gap-2">
			<span className="font-medium">{message}</span>
		</div>,
		{
			className: 'bg-red-600 text-white',
			bodyClassName: 'p-3',
			progressClassName: 'bg-red-400',
		},
	);
};
