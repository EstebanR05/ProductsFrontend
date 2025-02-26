import Swal from 'sweetalert2';

const commonConfig = {
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: '#ffffff', 
    color: '#2d3748',      
    customClass: {
        popup: '!bg-base-100 !text-base-content shadow-lg border border-base-300',
        title: 'text-lg',
    },
};

export const showSuccess = (message) => {
    Swal.fire({
        ...commonConfig,
        icon: 'success',
        title: 'Success',
        text: message,
        iconColor: 'var(--su)',
    });
};

export const showError = (message) => {
    Swal.fire({
        ...commonConfig,
        icon: 'error',
        title: 'Error',
        text: message,
        iconColor: 'var(--er)',
    });
};

export const showConfirm = async (title, text) => {
    const result = await Swal.fire({
        title,
        text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
        background: '#ffffff', 
        color: '#2d3748',      
        confirmButtonColor: 'var(--er)',
        cancelButtonColor: 'var(--n)',
        customClass: {
            popup: '!bg-base-100 !text-base-content rounded-lg border border-base-300',
            confirmButton: 'btn btn-error',
            cancelButton: 'btn btn-ghost',
        },
        buttonsStyling: false,
    });
    return result.isConfirmed;
}; 