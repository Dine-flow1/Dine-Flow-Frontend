import Swal from 'sweetalert2';

// Create the Toast instance once
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

// Export all showAlert functions
export const showSuccessAlert = (message: string, title: string = 'Success!') => {
  return Swal.fire({
    icon: 'success',
    title,
    text: message,
    confirmButtonColor: '#10B981',
  });
};

export const showErrorAlert = (message: string, title: string = 'Error!') => {
  return Swal.fire({
    icon: 'error',
    title,
    text: message,
    confirmButtonColor: '#EF4444',
  });
};

export const showWarningAlert = (message: string, title: string = 'Warning!') => {
  return Swal.fire({
    icon: 'warning',
    title,
    text: message,
    confirmButtonColor: '#F59E0B',
  });
};

export const showInfoAlert = (message: string, title: string = 'Info') => {
  return Swal.fire({
    icon: 'info',
    title,
    text: message,
    confirmButtonColor: '#3B82F6',
  });
};

export const showConfirmDialog = (
  title: string,
  text: string,
  confirmButtonText: string = 'Yes',
  cancelButtonText: string = 'Cancel'
): Promise<boolean> => {
  return Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#10B981',
    cancelButtonColor: '#EF4444',
    confirmButtonText,
    cancelButtonText,
  }).then((result) => {
    return result.isConfirmed;
  });
};

// Toast notifications
export const showSuccessToast = (message: string) => {
  return Toast.fire({
    icon: 'success',
    title: message
  });
};

export const showErrorToast = (message: string) => {
  return Toast.fire({
    icon: 'error',
    title: message
  });
};

export const showWarningToast = (message: string) => {
  return Toast.fire({
    icon: 'warning',
    title: message
  });
};

// Export Swal as default if needed elsewhere
export default Swal;