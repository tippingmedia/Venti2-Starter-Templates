/**
 * Modal
 */

class Modal {
    constructor (modalButton = "[data-modal]") {
        this.modalButtons = document.querySelectorAll(modalButton);
        this.modalEvents();
    }

    modalEvents () {
        const $this = this;
        for(const modal of this.modalButtons) {
            modal.addEventListener('click',function (evt) {
                evt.preventDefault();
                $this.openModal(this);
            });
        }
    }

    openModal (elm) {
        const $modal = $('[data-remodal-id="' + elm.dataset.modal + '"]');
        const $remodal = $modal.remodal();
        $remodal.open();
    }
}

export { Modal as default };
